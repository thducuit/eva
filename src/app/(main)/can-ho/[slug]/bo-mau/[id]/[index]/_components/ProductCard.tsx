'use client'

import {CheckIcon, NavigationSwiperIcon, PencilIcon} from '@/components/icon'
import {Button} from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import {Grid, Navigation} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

import ImageFallback from '@/components/image/ImageFallback'
import fetchData from '@/fetches/fetchData'
import useIsMobile from '@/hooks/useIsMobile'
import {cn, convertRemToPx} from '@/lib/utils'
import {
  IColorSet,
  IProduct,
  IReplacementProduct,
} from '@/types/colorSet.interface'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import 'swiper/css'
import 'swiper/css/grid'
import ProductPopup from './ProductPopup'

interface ProductCardProps {
  popup?: boolean
  buyMore?: boolean
  productGroup?: IColorSet['product_group_1'][0]
  setPriceDifference?: Dispatch<SetStateAction<number>>
  setReplaceProducts?: Dispatch<
    SetStateAction<
      {
        space_id: number
        current_id: number
        replace_id: number
        index: number
      }[]
    >
  >
  isSelected?: boolean
  onSelect?: (
    productId: number,
    isSelected: boolean,
    productData?: IProduct,
  ) => void
  quantity?: number
  onQuantityChange?: (productId: number, quantity: number) => void
  detail?: boolean
  index?: number
}

const SLIDES_PER_VIEW = 3
const GRID_ROWS = 2
const PER_PAGE = SLIDES_PER_VIEW * GRID_ROWS

export const ProductCard = ({
  popup = false,
  buyMore = false,
  productGroup,
  setPriceDifference,
  setReplaceProducts,
  isSelected = false,
  onSelect,
  quantity = 1,
  onQuantityChange,
  detail = false,
  index = 0,
}: ProductCardProps) => {
  // const {data: session} = useSession()

  // ID sản phẩm gốc (chỉ để fetch danh sách thay thế)
  const [baseId, setBaseId] = useState<number | null>(null)

  // Danh sách thay thế
  const [products, setProducts] = useState<IReplacementProduct[]>([])

  // Sản phẩm đã thay thế xong (hiển thị trên card)
  const [replacedProduct, setReplacedProduct] =
    useState<IReplacementProduct | null>(null)

  // Sản phẩm đang được chọn trong popup (chưa xác nhận)
  const [selectedReplacement, setSelectedReplacement] =
    useState<IReplacementProduct | null>(null)

  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  // Xử lý click để toggle trạng thái tích chọn
  const handleCardClick = (e: React.MouseEvent) => {
    // Ngăn chặn event bubbling khi click vào button popup hoặc quantity controls
    if (
      (e.target as HTMLElement).closest('button') ||
      (e.target as HTMLElement).closest('input')
    ) {
      return
    }

    if (onSelect && productGroup?.product?.id) {
      onSelect(productGroup.product.id, !isSelected, productGroup)
    }
  }

  // Xử lý tăng số lượng
  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onQuantityChange && productGroup?.product?.id) {
      onQuantityChange(productGroup.product.id, quantity + 1)
    }
  }

  // Xử lý giảm số lượng
  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onQuantityChange && productGroup?.product?.id && quantity > 1) {
      onQuantityChange(productGroup.product.id, quantity - 1)
    }
  }

  // Xử lý thay đổi số lượng từ input
  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation()
    const newQuantity = parseInt(e.target.value) || 1
    if (onQuantityChange && productGroup?.product?.id && newQuantity >= 1) {
      onQuantityChange(productGroup.product.id, newQuantity)
    }
  }

  const showNav = !isMobile && (products?.length ?? 0) > PER_PAGE

  // Khi mở popup → đặt baseId để fetch
  const handleOpen = () => {
    setBaseId(productGroup?.product?.id ?? null)
    setSelectedReplacement(replacedProduct ?? null) // nếu đã thay rồi, preselect
    setOpen(true)
  }

  // Fetch danh sách thay thế theo baseId
  useEffect(() => {
    const fetchProducts = async () => {
      if (!baseId) {
        setProducts([])
        return
      }
      const response = await fetchData({
        api: `api/v1/replacement-products/${baseId}`,
      })
      setProducts(response || [])
    }
    fetchProducts()
  }, [baseId])

  // Product hiển thị trên card (ưu tiên hàng đã thay)
  const displayProduct = useMemo(
    () =>
      replacedProduct ??
      (productGroup?.product as unknown as IReplacementProduct | undefined) ??
      null,
    [replacedProduct, productGroup?.product],
  )

  const differencePrice = useCallback(
    (productPrice: string) => {
      if (!productGroup?.product) return 0

      const originalPrice = Number(productGroup.product.price)
      const newPrice = Number(productPrice)
      const quantity = Number(productGroup.quantity)

      if (productGroup.product.type === 'do-roi') {
        // Đồ rời: tính chênh lệch đơn giá * số lượng
        const priceDiff = (newPrice - originalPrice) * quantity
        if (priceDiff > 0) {
          return priceDiff
        }
        return 0
      }

      if (productGroup.product.type === 'may-do') {
        // Máy đo: tính chênh lệch dựa trên diện tích
        let originalTotalPrice = 0
        let newTotalPrice = 0

        if (productGroup.product.unit === 'Md') {
          // Mét dài
          const length = Number(productGroup.wide) / 1000
          originalTotalPrice = length * quantity * originalPrice
          newTotalPrice = length * quantity * newPrice
        } else if (productGroup.product.unit === 'M2') {
          // Mét vuông
          const area =
            (Number(productGroup.wide) / 1000) *
            (Number(productGroup.high) / 1000)
          originalTotalPrice = area * quantity * originalPrice
          newTotalPrice = area * quantity * newPrice
        }

        return newTotalPrice - originalTotalPrice
      }

      return 0
    },
    [
      productGroup?.product,
      productGroup?.quantity,
      productGroup?.wide,
      productGroup?.high,
    ],
  )

  // State để lưu giá trị chênh lệch trước đó
  const [previousPriceDiff, setPreviousPriceDiff] = useState<number>(0)

  useEffect(() => {
    // Tính chênh lệch giá mới
    const newPriceDiff = selectedReplacement?.price
      ? differencePrice(selectedReplacement.price)
      : 0

    // Cập nhật tổng giá chênh lệch
    setPriceDifference?.((prev) => {
      // Trừ đi giá trị cũ và cộng giá trị mới
      return prev - previousPriceDiff + Math.round(Number(newPriceDiff))
    })

    // Cập nhật danh sách sản phẩm thay thế
    if (selectedReplacement?.id) {
      setReplaceProducts?.((prev) => {
        // Xóa entry cũ nếu có cùng index
        const filtered = prev.filter((item) => item.index !== index)
        // Thêm entry mới
        return [
          ...filtered,
          {
            space_id: productGroup?.spaces.term_id ?? 0,
            current_id: productGroup?.product?.id ?? 0,
            replace_id: selectedReplacement.id,
            index: index,
          },
        ]
      })
    }

    // Lưu giá trị hiện tại để lần sau trừ đi
    setPreviousPriceDiff(Math.round(Number(newPriceDiff)))
  }, [
    differencePrice,
    selectedReplacement?.price,
    selectedReplacement?.id,
    productGroup?.spaces.term_id,
    productGroup?.product?.id,
    setPriceDifference,
    setReplaceProducts,
    previousPriceDiff,
    index,
  ])

  return (
    <div
      className="
        relative flex items-center gap-[1.25rem] w-[28.1875rem] xsm:w-full xsm:h-[8.15rem] h-[7.3125rem] rounded-[0.375rem] overflow-hidden
        bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(45,38,1,0.64)_55.93%)]
        before:content-[''] before:absolute before:inset-0 before:rounded-[0.375rem]
        after:content-[''] after:absolute after:inset-0 after:rounded-[0.375rem]
        after:bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(89,74,1,0.64)_55.93%)]
        after:opacity-0 lg:hover:after:opacity-100
        after:transition-opacity duration-500 ease-out cursor-pointer group
      "
    >
      {productGroup && (
        <ProductPopup
          product={productGroup.product}
          space={productGroup.spaces.name}
          quantity={productGroup.quantity}
          productGroup={productGroup}
        />
      )}
      <div className='w-[10.625rem] h-full overflow-hidden rounded-[0.375rem] relative z-[1] xsm:w-[8.1875rem]'>
        <Image
          src={
            displayProduct?.featured_image?.url ||
            productGroup?.product?.featured_image?.url ||
            'https://placehold.co/600x400/png'
          }
          alt={
            displayProduct?.featured_image?.alt ||
            productGroup?.product?.featured_image?.alt ||
            ''
          }
          width={170}
          height={120}
          className='w-full h-full object-contain bg-white transition-transform duration-500 lg:group-hover:scale-110'
        />
      </div>
      <article
        className={cn(
          'relative z-[1] transition-all duration-500 ease-out',
          isSelected && 'xsm:mt-[-2rem]',
        )}
      >
        <h3 className='w-[11.8125rem] text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem] line-clamp-3 xsm:text-[0.75rem] xsm:w-[10.5rem] xsm:leading-[1.125rem]'>
          {displayProduct?.name || productGroup?.product?.name || ''}
        </h3>
        {detail && (
          <>
            <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[0.5rem] xsm:line-clamp-1'>
              Không gian:{' '}
              <span className='text-[#efefef]'>
                {productGroup?.spaces.name || 'Chưa có'}
              </span>
            </p>
            {/* {session?.accessToken && (
              <>
                {replacedProduct ? (
                  <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[1.5rem] xsm:mt-[0.5rem]'>
                    Đơn giá:{' '}
                    <span className='text-[#F6E280] font-semibold'>
                      {formatVND(Number(replacedProduct.price))}
                    </span>
                  </p>
                ) : (
                  <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[1.5rem] xsm:mt-[0.5rem]'>
                    Đơn giá:{' '}
                    <span className='text-[#F6E280] font-semibold'>
                      {formatVND(Number(productGroup?.product.price))}
                    </span>
                  </p>
                )}
              </>
            )} */}
          </>
        )}
      </article>

      {popup && productGroup?.product?.is_replace && (
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger asChild>
            <div>
              <Button
                onClick={handleOpen}
                className='size-[1.875rem] rounded-[0.375rem] bg-[#000117] absolute z-[5] top-[0.625rem] right-[0.625rem] lg:hover:bg-[#7F5315] transition-all duration-500 ease-out'
              >
                <PencilIcon className='size-[0.65rem]' />
              </Button>
              <p
                onClick={handleOpen}
                className='text-white text-[0.75rem] leading-[0.75rem] tracking-[0.0075rem] underline absolute z-[5] bottom-[1.25rem] right-[0.625rem] xsm:hidden lg:hover:text-[#F6E280] transition-all duration-500 ease-out before:w-full before:h-[2rem] before:bg-transparent before:absolute-center'
              >
                Xem thêm
              </p>
            </div>
          </SheetTrigger>

          <SheetContent
            side='bottom'
            className='h-[30.625rem] bg-[#000117]/90 border-none focus:outline-none focus:ring-0 ring-0 ring-offset-0 xsm:h-[32.625rem] xsm:rounded-t-[0.375rem] xsm:border-[#dbdbdb]/30 xsm:overflow-hidden'
            closeButton={false}
          >
            <div className='relative overflow-hidden w-full h-full'>
              <div className='w-[95.8125rem] h-[12.5rem] absolute left-1/2 -translate-x-1/2 top-[-8.125rem] rounded-full opacity-40 bg-[linear-gradient(180deg,_#A6762C_0%,_#F0D977_100%)] blur-[100px] z-[1] xsm:opacity-80 xsm:top-[-10.125rem] xsm:rounded-t-[0.375rem]' />
              <SheetHeader className='pt-[2.5rem] px-[6.25rem] relative pb-0 z-[2] mb-[2.6875rem] flex flex-row items-center justify-between xsm:items-start xsm:pt-[1.25rem] xsm:px-[1.25rem] xsm:mb-[1.25rem]'>
                <SheetTitle className='text-[1.25rem] text-[#EFEFEF] font-semibold leading-[1.625rem]'>
                  Đồ thay thế phù hợp
                </SheetTitle>
                {showNav && (
                  <div className='pointer-events-none project-navigation w-[4.75rem] flex items-center justify-between xsm:hidden'>
                    <button className='pointer-events-auto prev-button size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
                      <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] group-hover:text-[#000117]' />
                    </button>
                    <button className='pointer-events-auto next-button size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
                      <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] rotate-180' />
                    </button>
                  </div>
                )}
              </SheetHeader>

              {isMobile ? (
                <div className='flex flex-col gap-[0.9375rem] px-[1.25rem] overflow-y-auto xsm:overflow-y-auto custom-scrollbar h-[22.875rem]'>
                  {Array.isArray(products) &&
                    products.length > 0 &&
                    products.map((product, index) => {
                      const active = selectedReplacement?.id === product.id
                      return (
                        <div
                          key={index}
                          className="
                          relative flex flex-shrink-0 items-center xsm:h-[6.125rem] gap-[1.25rem] xsm:w-[20.9375rem] w-[28.1875rem] h-[7.3125rem] rounded-[0.375rem] overflow-hidden
                          bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(45,38,1,0.64)_55.93%)]
                          before:content-[''] before:absolute before:inset-0 before:rounded-[0.375rem]
                          after:content-[''] after:absolute after:inset-0 after:rounded-[0.375rem]
                          after:bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(89,74,1,0.64)_55.93%)]
                          after:opacity-0 lg:hover:after:opacity-100
                          after:transition-opacity duration-500 ease-out cursor-pointer
                        "
                        >
                          {productGroup && (
                            <ProductPopup
                              product={product}
                              space={productGroup.spaces.name}
                              quantity={productGroup.quantity}
                              // showPrice={false}
                            />
                          )}
                          <div className='w-[10.625rem] xsm:w-[8.1875rem] h-full overflow-hidden rounded-[0.375rem] relative z-[1]'>
                            <ImageFallback
                              src={
                                product?.featured_image?.url ||
                                'https://placehold.co/600x400/png'
                              }
                              alt={product?.featured_image?.alt || ''}
                              width={170}
                              height={120}
                              className='w-full h-full object-cover transition-transform duration-300 lg:group-hover:scale-105'
                            />
                          </div>
                          <article className='relative z-[1]'>
                            <h3 className='w-[11.8125rem] text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem] line-clamp-3 relative z-[1] xsm:text-[0.75rem] xsm:w-[10.5rem] xsm:leading-[1.125rem]'>
                              {product.name}
                            </h3>
                            {detail && (
                              <>
                                <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[0.5rem] xsm:line-clamp-1'>
                                  Không gian:{' '}
                                  <span className='text-[#efefef]'>
                                    {productGroup?.spaces.name || 'Chưa có'}
                                  </span>
                                </p>
                                {/* {session?.accessToken && (
                                  <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[0.5rem]'>
                                    <span className='text-[#F6E280] font-semibold'>
                                      +
                                      {formatVND(
                                        Number(differencePrice(product.price)),
                                      )}
                                    </span>
                                  </p>
                                )} */}
                              </>
                            )}
                          </article>
                          <div
                            onClick={() => setSelectedReplacement(product)}
                            className='size-[1.25rem] rounded-full border-[2px] border-[#7D7D7D] z-[3] top-[0.625rem] right-[0.625rem] absolute'
                          />
                          {active && (
                            <div className='size-[1.25rem] rounded-full bg-[#f6e280] flex items-center justify-center absolute z-[4] top-[0.625rem] right-[0.625rem]'>
                              <CheckIcon className='w-[0.8rem] h-[0.6rem] text-[#000117]' />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  {products.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                      <p className='text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem]'>
                        Không có sản phẩm thay thế
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Swiper
                  slidesPerView={SLIDES_PER_VIEW}
                  grid={{rows: GRID_ROWS, fill: 'row'}}
                  spaceBetween={convertRemToPx(1.25)}
                  modules={[Grid, Navigation]}
                  className='w-[87rem] rounded-[0.375rem]'
                  navigation={
                    showNav
                      ? {nextEl: '.next-button', prevEl: '.prev-button'}
                      : false
                  }
                  watchOverflow={true}
                  speed={700}
                >
                  {Array.isArray(products) &&
                    products.length > 0 &&
                    products.map((product, index) => {
                      const active = selectedReplacement?.id === product.id
                      return (
                        <SwiperSlide key={index}>
                          <div
                            // onClick={() => setSelectedReplacement(product)}
                            className="
                              relative flex items-center gap-[1.25rem] w-[28.1875rem] h-[7.3125rem] rounded-[0.375rem] overflow-hidden
                              bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(45,38,1,0.64)_55.93%)]
                              before:content-[''] before:absolute before:inset-0 before:rounded-[0.375rem]
                              after:content-[''] after:absolute after:inset-0 after:rounded-[0.375rem]
                              after:bg-[linear-gradient(98deg,_rgba(0,1,23,0.64)_0%,_rgba(89,74,1,0.64)_55.93%)]
                              after:opacity-0 lg:hover:after:opacity-100
                              after:transition-opacity duration-500 ease-out cursor-pointer
                            "
                          >
                            {productGroup && (
                              <ProductPopup
                                product={product}
                                space={productGroup.spaces.name}
                                quantity={productGroup.quantity}
                                // showPrice={false}
                                productGroup={productGroup}
                              />
                            )}
                            <div className='w-[10.625rem] h-full overflow-hidden rounded-[0.375rem] relative z-[1]'>
                              <ImageFallback
                                src={
                                  product?.featured_image?.url ||
                                  'https://placehold.co/600x400/png'
                                }
                                alt={product?.featured_image?.alt || ''}
                                width={170}
                                height={120}
                                className='w-full h-full object-cover transition-transform duration-300 lg:group-hover:scale-105'
                              />
                            </div>

                            <article className='relative z-[1]'>
                              <h3 className='w-[11.8125rem] text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem] line-clamp-3 relative z-[1] xsm:text-[0.75rem] xsm:w-[10.5rem] xsm:leading-[1.125rem]'>
                                {product.name}
                              </h3>
                              {detail && (
                                <>
                                  <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[0.5rem] xsm:line-clamp-1'>
                                    Không gian:{' '}
                                    <span className='text-[#efefef]'>
                                      {productGroup?.spaces.name || 'Chưa có'}
                                    </span>
                                  </p>
                                  {/* {session?.accessToken && (
                                    <p className='text-[#B4B4B4] text-[0.875rem] leading-[0.875rem] tracking-[0.00875rem] mt-[1.5rem]'>
                                      <span className='text-[#F6E280] font-semibold'>
                                        +
                                        {formatVND(
                                          Number(
                                            differencePrice(product.price),
                                          ),
                                        )}
                                      </span>
                                    </p>
                                  )} */}
                                </>
                              )}
                            </article>

                            <div
                              onClick={() => setSelectedReplacement(product)}
                              className='size-[1.25rem] rounded-full border-[2px] border-[#7D7D7D] z-[3] top-[0.625rem] right-[0.625rem] absolute'
                            />
                            {active && (
                              <div className='size-[1.25rem] rounded-full bg-[#f6e280] flex items-center justify-center absolute z-[4] top-[0.625rem] right-[0.625rem]'>
                                <CheckIcon className='w-[0.8rem] h-[0.6rem] text-[#000117]' />
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  {products.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                      <p className='text-[#EFEFEF] font-medium leading-[1.125rem] tracking-[0.00875rem] text-[0.875rem]'>
                        Không có sản phẩm thay thế
                      </p>
                    </div>
                  )}
                </Swiper>
              )}

              <div className='flex items-center justify-end mr-[6.25rem] mt-[2.5rem] space-x-[0.75rem] xsm:fixed xsm:bottom-0 xsm:left-0 xsm:right-0  xsm:bg-[#000117]/90 xsm:w-full xsm:p-[1.25rem] xsm:z-[50]'>
                <Button
                  onClick={() => setOpen(false)}
                  variant={'quaternary'}
                  className='text-[0.875rem] xsm:w-[10.09375rem] font-semibold tracking-[0.00875rem] text-[#f6e280] w-[7.5rem] h-[2.75rem] hover:text-[#000117] uppercase'
                >
                  Hủy bỏ
                </Button>

                <Button
                  variant={'primary'}
                  disabled={!selectedReplacement}
                  text='default'
                  className='w-[7.5rem] xsm:w-[10.09375rem] h-[2.75rem] hover:text-[#000117] uppercase'
                  onClick={() => {
                    if (selectedReplacement) {
                      setReplacedProduct(selectedReplacement) // cập nhật card
                      setOpen(false)
                    }
                  }}
                >
                  <span className='relative z-[1]'>Thay thế</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Checkbox tích chọn sản phẩm */}
      {buyMore && (
        <>
          <div
            onClick={handleCardClick}
            className='size-[1.25rem] absolute border-[#7D7D7D] border-[1.5px] rounded-[0.375rem] top-[0.625rem] right-[0.625rem] z-[5]'
          />
          {isSelected && (
            <div
              onClick={handleCardClick}
              className='size-[1.25rem] absolute bg-[#F6E280] rounded-[0.375rem] top-[0.625rem] right-[0.625rem] z-[6] flex items-center justify-center'
            >
              <CheckIcon className='w-[0.78119rem] h-[0.6rem]' />
            </div>
          )}
        </>
      )}

      {/* Hiển thị controls số lượng chỉ khi sản phẩm được tích chọn */}
      {buyMore && isSelected && (
        <div className='p-[0.125rem] rounded-[0.5rem] bg-[#eee] flex items-center justify-center absolute bottom-[0.625rem] right-[0.625rem] z-[5]'>
          <button
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className='size-[1.25rem] rounded-[0.25rem] bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='size-3'
            >
              <path
                d='M4 8H12'
                stroke='#000117'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <input
            type='number'
            min='1'
            value={quantity.toString().padStart(2, '0')}
            onChange={handleQuantityInputChange}
            className='w-[1rem] text-center mx-[0.5rem] text-[0.875rem] leading-[1.25rem] tracking-[0.00875rem] font-medium text-black'
          />
          <button
            onClick={handleIncreaseQuantity}
            className='flex-center size-[1.25rem] rounded-[0.25rem] bg-white cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              className='size-4'
            >
              <path
                d='M4.66675 7.99935H8.00008M8.00008 7.99935H11.3334M8.00008 7.99935V11.3327M8.00008 7.99935V4.66602'
                stroke='#1A1A1A'
                strokeOpacity='0.75'
                strokeWidth='1.33333'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
