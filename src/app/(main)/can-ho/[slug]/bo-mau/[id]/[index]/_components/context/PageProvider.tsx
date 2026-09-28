'use client'

import {createContext, Dispatch, SetStateAction, useState} from 'react'

// Type cho object với key là string (số) và value là number
type ProductQuantity = Record<string, number>

export type PageContextType = {
  // replaceProductId: {
  //   [key: string]: string
  // }
  // setReplaceProductId: Dispatch<
  //   SetStateAction<{
  //     [key: string]: string
  //   }>
  // >
  replaceProducts: {
    space_id: number
    current_id: number
    replace_id: number
    index: number
  }[]
  setReplaceProducts: Dispatch<
    SetStateAction<
      {
        space_id: number
        current_id: number
        replace_id: number
        index: number
      }[]
    >
  >
  buyMoreProductId: ProductQuantity[]
  setBuyMoreProductId: Dispatch<SetStateAction<ProductQuantity[]>>
}

export const PageContext = createContext<PageContextType | null>(null)

export default function PageProvider({children}: {children: React.ReactNode}) {
  // const [replaceProductId, setReplaceProductId] = useState<{
  //   [key: string]: string
  // }>({})
  const [replaceProducts, setReplaceProducts] = useState<
    {space_id: number; current_id: number; replace_id: number; index: number}[]
  >([])
  const [buyMoreProductId, setBuyMoreProductId] = useState<ProductQuantity[]>(
    [],
  )

  return (
    <PageContext.Provider
      value={{
        replaceProducts,
        setReplaceProducts,
        buyMoreProductId,
        setBuyMoreProductId,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
