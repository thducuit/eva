/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {useEffect, useMemo, useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import {cn} from '@/lib/utils'
import {usePathname, useRouter} from 'next/navigation'

/**
 * Draw Attention API → React Renderer (plug-and-play)
 * ---------------------------------------------------
 * Tailored to OKHUB JSON + fixes per feedback:
 *  - Tooltip ALWAYS on hover (regardless of click/hover trigger)
 *  - Zoom happens INSIDE a fixed box (outer layout unaffected)
 *    -> using translate + scale on an inner layer with overflow-hidden
 */

type Point = {x: number; y: number} // normalized [0..1]

type Area = {
  id: string
  type: 'poly' | 'rect'
  name: string
  description?: string // raw text or HTML
  linkUrl?: string
  newWindow?: boolean
  coords: Point[] // rect: [p0, p1], poly: points
  fillColor?: string // per-hotspot color (#a1d67c, etc.)
}

type StyleConfig = {
  highlightColor: string
  highlightOpacity: number // 0..1
  hoverColor: string
  hoverOpacity: number // 0..1
  borderColor: string
  borderOpacity: number // 0..1
  borderWidth: number // px
  layout: 'left' | 'right'
  trigger: 'click' | 'hover'
  panelBg: string
  panelTitleColor: string
  panelTextColor: string
}

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}
function toPixel(p: Point, w: number, h: number) {
  return {x: p.x * w, y: p.y * h}
}
function rectCornersFromPoints(p0: Point, p1: Point): Point[] {
  const x1 = Math.min(p0.x, p1.x),
    y1 = Math.min(p0.y, p1.y)
  const x2 = Math.max(p0.x, p1.x),
    y2 = Math.max(p0.y, p1.y)
  return [
    {x: x1, y: y1},
    {x: x2, y: y1},
    {x: x2, y: y2},
    {x: x1, y: y2},
  ]
}
// (centroid function removed — we anchor tooltip at bbox center now)

function normalizeCoordPair(
  x: number,
  y: number,
  imgW: number,
  imgH: number,
): Point {
  if (x > 1 || y > 1) return {x: clamp(x / imgW), y: clamp(y / imgH)}
  return {x: clamp(x), y: clamp(y)}
}
function parseCoordsString(s: string): number[] {
  return s
    .split(/[\s,]+/)
    .map((v) => parseFloat(v))
    .filter((n) => !Number.isNaN(n))
}
function hexToRgba(hex: string, alpha = 1) {
  const m = hex.trim().replace('#', '')
  const full =
    m.length === 3
      ? m
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : m
  const bigint = Number.parseInt(full, 16)
  const r = (bigint >> 16) & 255,
    g = (bigint >> 8) & 255,
    b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function parseInlineStyle(styleStr?: string): Record<string, string> {
  const out: Record<string, string> = {}
  if (!styleStr || typeof styleStr !== 'string') return out
  styleStr.split(';').forEach((rule) => {
    const [k, v] = rule.split(':')
    if (!k || !v) return
    out[k.trim().toLowerCase()] = v.trim()
  })
  return out
}

// ---- Adapter for your Draw Attention endpoint shape
function parseFromDA(json: any): {
  imageUrl?: string
  width: number
  height: number
  areas: Area[]
  style: StyleConfig
} {
  const img = json?.featured_image
  const imageUrl: string | undefined = img?.url
  const imgW: number = img?.width || 1500 // from sample
  const imgH: number = img?.height || 1156 // from sample

  const meta = json?.meta || {}
  const layout = (
    meta?._da_map_layout === 'right' ? 'right' : 'left'
  ) as StyleConfig['layout']
  const trigger = (
    meta?._da_event_trigger === 'hover' ? 'hover' : 'click'
  ) as StyleConfig['trigger']

  const style: StyleConfig = {
    highlightColor: meta?._da_map_highlight_color || '#3b82f6',
    highlightOpacity: clamp(
      Number.parseFloat(meta?._da_map_highlight_opacity ?? '0.6') || 0.6,
    ),
    hoverColor:
      meta?._da_map_hover_color || meta?._da_map_highlight_color || '#60a5fa',
    hoverOpacity: clamp(
      Number.parseFloat(meta?._da_map_hover_opacity ?? '0.85') || 0.85,
    ),
    borderColor: meta?._da_map_border_color || 'transparent',
    borderOpacity: clamp(
      Number.parseFloat(meta?._da_map_border_opacity ?? '1') || 1,
    ),
    borderWidth: Number.parseInt(meta?._da_map_border_width ?? '0', 10) || 0,
    layout,
    trigger,
    panelBg: meta?._da_map_background_color || '#fff',
    panelTitleColor: meta?._da_map_title_color || '#111',
    panelTextColor: meta?._da_map_text_color || '#444',
  }

  // hotspots source: prefer parsed array, fallback to JSON string
  let rawHotspots: any[] = []
  if (Array.isArray(meta?._da_hotspots) && meta._da_hotspots.length)
    rawHotspots = meta._da_hotspots
  else if (typeof meta?._da_hotspots_json === 'string') {
    try {
      rawHotspots = JSON.parse(meta._da_hotspots_json)
    } catch {}
  }

  const areas: Area[] = rawHotspots.map((it: any, i: number) => {
    const id = String(i)
    const title = it?.title || ''
    const desc = (it?.description || '') as string
    const linkRaw =
      it?.['action-url-url'] ??
      (it?.action === 'url' ? it?.['action-url-url'] : undefined)
    const link =
      typeof linkRaw === 'string' && linkRaw.trim().length > 0
        ? linkRaw
        : undefined
    const newWindow = (it?.['action-url-open-in-window'] === 'on' ||
      it?.['action-url-open-in-window'] === true) as boolean

    // Per-hotspot color from inline style
    const styleMap = parseInlineStyle(it?.style)
    const perColor =
      styleMap['background'] ||
      styleMap['background-color'] ||
      styleMap['fill'] ||
      styleMap['color']

    const shape = String(it?.shape || 'polygon').toLowerCase()
    const flat = parseCoordsString(String(it?.coordinates || ''))

    if (shape === 'rect' && flat.length >= 4) {
      const [x1, y1, x2, y2] = flat // expected pixel coords
      const p0 = normalizeCoordPair(x1, y1, imgW, imgH)
      const p1 = normalizeCoordPair(x2, y2, imgW, imgH)
      return {
        id,
        type: 'rect',
        name: title,
        description: desc,
        linkUrl: link,
        newWindow,
        coords: [p0, p1],
        fillColor: perColor,
      }
    }

    // default polygon
    const pts: Point[] = []
    for (let k = 0; k < flat.length; k += 2) {
      const x = flat[k]
      const y = flat[k + 1]
      if (typeof x === 'number' && typeof y === 'number') {
        pts.push(normalizeCoordPair(x, y, imgW, imgH))
      }
    }
    return {
      id,
      type: 'poly',
      name: title,
      description: desc,
      linkUrl: link,
      newWindow,
      coords: pts,
      fillColor: perColor,
    }
  })

  return {imageUrl, width: imgW, height: imgH, areas, style}
}

type IndexDetailBuildingProps = {
  initialData: any
  className?: string
}

export default function IndexDetailBuilding({
  initialData,
  className,
}: IndexDetailBuildingProps) {
  const pathname = usePathname()
  const router = useRouter()
  console.log('Pathname', pathname)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // const [zoom, setZoom] = useState(1)
  const [containerW, setContainerW] = useState<number>(0)

  // Parse data directly from props to avoid flash
  const parsedData = useMemo(() => {
    if (initialData && !initialData.error) {
      return parseFromDA(initialData)
    }
    return null
  }, [initialData])

  const imgSrc = parsedData?.imageUrl
  const areas = parsedData?.areas || []
  const style = parsedData?.style || null
  const imgNatural = useMemo(
    () => ({
      w: parsedData?.width || 1500,
      h: parsedData?.height || 1156,
    }),
    [parsedData],
  )

  // Observe container width (for responsive outer box only)
  useEffect(() => {
    const el = containerRef.current?.parentElement || containerRef.current
    if (!el) return
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            for (const entry of entries) setContainerW(entry.contentRect.width)
          })
        : null
    if (ro) ro.observe(el)
    else {
      const handler = () => setContainerW(el.clientWidth)
      handler()
      window.addEventListener('resize', handler)
      return () => window.removeEventListener('resize', handler)
    }
    return () => ro?.disconnect()
  }, [])

  const display = useMemo(() => {
    const cw = containerW || 960
    const maxW = Math.min(cw, 1100)
    const ratio = imgNatural.w / imgNatural.h
    const width = Math.max(320, maxW)
    const height = width / ratio
    return {width, height}
  }, [imgNatural.w, imgNatural.h, containerW])

  // Precompute transform so zoom happens INSIDE fixed box (outer size unaffected)
  // const zoomTranslate = useMemo(
  //   () => ({
  //     x: (display.width * (1 - zoom)) / 2,
  //     y: (display.height * (1 - zoom)) / 2,
  //   }),
  //   [display.width, display.height, zoom],
  // )

  // const zoomLayerStyle = useMemo(
  //   () =>
  //     ({
  //       width: `${display.width}px`,
  //       height: `${display.height}px`,
  //       transform: `translate(${zoomTranslate.x}px, ${zoomTranslate.y}px) scale(${zoom})`,
  //       transformOrigin: 'top left',
  //     } as React.CSSProperties),
  //   [display.width, display.height, zoomTranslate.x, zoomTranslate.y, zoom],
  // )

  // Active area depending on trigger for side panel selection
  const activeArea = useMemo(() => {
    if (!style) return null
    if (style.trigger === 'hover')
      return areas.find((a) => a.id === hoveredId) || null
    return areas.find((a) => a.id === selectedId) || null
  }, [areas, style, hoveredId, selectedId])

  const InfoPanel = () => {
    if (!style || !activeArea) return null
    const {name, description, linkUrl, newWindow} = activeArea
    return (
      <div style={{background: style.panelBg, color: style.panelTextColor}}>
        <div
          className='font-semibold'
          style={{color: style.panelTitleColor}}
        >
          {name}
        </div>
        {description && (
          <div
            className='prose prose-sm dark:prose-invert mt-2'
            style={{color: style.panelTextColor}}
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, '<br/>'),
            }}
          />
        )}
        {linkUrl && (
          <div className='mt-3'>
            <a
              href={linkUrl}
              target={newWindow ? '_blank' : '_self'}
              rel='noreferrer'
              className='inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:bg-white/10'
            >
              Open link
            </a>
          </div>
        )}
      </div>
    )
  }

  // Layout grid: image + info panel (if trigger=click). Tooltip shows on hover regardless.
  return (
    <div className={cn('w-full h-full', className)}>
      <div className='w-full h-full'>
        {/* Left or right panel depending on layout */}
        {style?.layout === 'right' && (
          <aside className='order-1 lg:order-none'>
            <InfoPanel />
          </aside>
        )}

        <div className='order-2 w-full h-full'>
          {/* <div className='mb-3 flex items-center gap-2'>
            <div className='ml-auto flex items-center gap-2 text-sm'>
              <span>Zoom</span>
              <input
                type='range'
                min={0.75}
                max={2}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number.parseFloat(e.target.value))}
              />
            </div>
          </div> */}

          {/* Fixed-size outer box; inner layer scales */}
          <div
            ref={containerRef}
            // className='relative select-none rounded-2xl overflow-hidden shadow-sm border bg-white'
            // style={{width: display.width, height: display.height}}
            className='w-full h-full'
          >
            <div
              className='absolute inset-0'
              // style={zoomLayerStyle}
            >
              {imgSrc ? (
                <Image
                  ref={imgRef}
                  src={imgSrc}
                  alt='map'
                  width={display.width}
                  height={display.height}
                  className='w-full xsm:h-[30.6875rem] h-[49.25rem] object-cover'
                  draggable={false}
                />
              ) : (
                <div className='absolute inset-0 grid place-items-center text-gray-400 text-sm'>
                  No image. Click Load.
                </div>
              )}

              {/* SVG overlay (same base size; whole layer is scaled via CSS) */}
              {imgSrc && style && (
                <svg
                  className='absolute inset-0 w-full h-[49.25rem] xsm:h-[30.6875rem]'
                  width={imgRef.current?.clientWidth || display.width}
                  height={imgRef.current?.clientHeight || display.height}
                  viewBox={`0 0 ${
                    imgRef.current?.clientWidth || display.width
                  } ${imgRef.current?.clientHeight || display.height}`}
                  preserveAspectRatio='none'
                >
                  {areas.map((a) => {
                    const isActive = activeArea?.id === a.id
                    const isHovered = hoveredId === a.id
                    const visible =
                      isHovered || (style.trigger === 'click' && isActive)
                    const baseColor = a.fillColor || style.highlightColor // prefer per-area color
                    const fillColor = baseColor
                    const fillOpacity = visible ? style.highlightOpacity : 0
                    const stroke = hexToRgba(
                      style.borderColor,
                      style.borderOpacity,
                    )

                    return (
                      <g
                        key={a.id}
                        onMouseEnter={() => setHoveredId(a.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (style.trigger === 'click') setSelectedId(a.id)
                          if (a.linkUrl) {
                            const url = `${pathname}${a.linkUrl}`
                            if (a.newWindow) {
                              window.open(url, '_blank')
                            } else {
                              router.push(url)
                            }
                          }
                        }}
                        className='cursor-pointer'
                      >
                        {a.type === 'rect'
                          ? (() => {
                              const actualWidth =
                                imgRef.current?.clientWidth || display.width
                              const actualHeight =
                                imgRef.current?.clientHeight || display.height
                              const p0 = toPixel(
                                a.coords[0],
                                actualWidth,
                                actualHeight,
                              )
                              const p1 = toPixel(
                                a.coords[1],
                                actualWidth,
                                actualHeight,
                              )
                              const x = Math.min(p0.x, p1.x)
                              const y = Math.min(p0.y, p1.y)
                              const w = Math.abs(p1.x - p0.x)
                              const h = Math.abs(p1.y - p0.y)
                              return (
                                <motion.rect
                                  x={x}
                                  y={y}
                                  width={w}
                                  height={h}
                                  fill={fillColor}
                                  animate={{
                                    fillOpacity,
                                    strokeWidth: visible
                                      ? style.borderWidth
                                      : 0,
                                  }}
                                  initial={{fillOpacity: 0, strokeWidth: 0}}
                                  transition={{duration: 0.15}}
                                  stroke={stroke}
                                  pointerEvents='all'
                                />
                              )
                            })()
                          : (() => {
                              const actualWidth =
                                imgRef.current?.clientWidth || display.width
                              const actualHeight =
                                imgRef.current?.clientHeight || display.height
                              const pts = a.coords
                                .map((p) => {
                                  const t = toPixel(
                                    p,
                                    actualWidth,
                                    actualHeight,
                                  )
                                  return `${t.x},${t.y}`
                                })
                                .join(' ')
                              return (
                                <motion.polygon
                                  points={pts}
                                  fill={fillColor}
                                  animate={{
                                    fillOpacity,
                                    strokeWidth: visible
                                      ? style.borderWidth
                                      : 0,
                                  }}
                                  initial={{fillOpacity: 0, strokeWidth: 0}}
                                  transition={{duration: 0.15}}
                                  stroke={stroke}
                                  pointerEvents='all'
                                />
                              )
                            })()}
                      </g>
                    )
                  })}
                </svg>
              )}
            </div>

            {/* Tooltip ALWAYS on hover (position corrected for zoom) */}
            <AnimatePresence>
              {hoveredId &&
                (() => {
                  const a = areas.find((x) => x.id === hoveredId)
                  if (!a || !a?.name) return null
                  const pts =
                    a.type === 'rect'
                      ? rectCornersFromPoints(a.coords[0], a.coords[1])
                      : a.coords
                  let minX = Infinity,
                    minY = Infinity,
                    maxX = -Infinity,
                    maxY = -Infinity
                  for (const p of pts) {
                    if (p.x < minX) minX = p.x
                    if (p.y < minY) minY = p.y
                    if (p.x > maxX) maxX = p.x
                    if (p.y > maxY) maxY = p.y
                  }
                  const anchor = {x: (minX + maxX) / 2, y: (minY + maxY) / 2}
                  // Use actual image dimensions for positioning
                  const actualWidth =
                    imgRef.current?.clientWidth || display.width
                  const actualHeight =
                    imgRef.current?.clientHeight || display.height
                  const c = toPixel(anchor, actualWidth, actualHeight)
                  const left = c.x
                  const top = c.y
                  return (
                    <div
                      className='absolute pointer-events-none max-w-xs'
                      style={{left, top, transform: 'translate(12px, -50%)'}}
                    >
                      <motion.div
                        key={a.id}
                        initial={{opacity: 0, scale: 0.98}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.98}}
                        className='relative px-3 py-2 rounded-lg shadow-lg text-white bg-black/90'
                      >
                        <span className='absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-black/90' />
                        <div className='text-xs font-semibold tracking-wide whitespace-nowrap'>
                          {a.name}
                        </div>
                      </motion.div>
                    </div>
                  )
                })()}
            </AnimatePresence>
          </div>
        </div>

        {style?.layout !== 'right' && (
          <aside className='order-3'>
            <InfoPanel />
          </aside>
        )}
      </div>
    </div>
  )
}
