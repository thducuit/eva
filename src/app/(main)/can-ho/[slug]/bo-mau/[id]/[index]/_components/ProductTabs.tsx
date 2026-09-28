'use client'

import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Separator} from '@/components/ui/separator'
import {ProductCard} from '@/app/(main)/can-ho/[slug]/bo-mau/[id]/[index]/_components/ProductCard'
import {IColorSet, IProduct} from '@/types/colorSet.interface'
import PriceSummary from './PriceSummary'
import {useContext, useMemo, useState} from 'react'
import {PageContext, PageContextType} from './context/PageProvider'

interface ProductTabsProps {
  products: IColorSet
}

const ProductTabs = ({products}: ProductTabsProps) => {
  const [priceDifference, setPriceDifference] = useState(0)
  const [selectedProducts, setSelectedProducts] = useState<
    Map<number, IProduct>
  >(new Map())
  const [productQuantities, setProductQuantities] = useState<
    Map<number, number>
  >(new Map())

  const {setReplaceProducts, setBuyMoreProductId} = useContext(
    PageContext,
  ) as PageContextType

  // Xử lý tích chọn sản phẩm
  const handleProductSelect = (
    productId: number,
    isSelected: boolean,
    productData?: IProduct,
  ) => {
    if (isSelected && productData) {
      // Cập nhật selectedProducts
      setSelectedProducts((prev) => {
        const newMap = new Map(prev)
        newMap.set(productId, productData)
        return newMap
      })

      // Khởi tạo số lượng mặc định là 1 khi tích chọn
      setProductQuantities((prevQuantities) => {
        const newQuantities = new Map(prevQuantities)
        if (!newQuantities.has(productId)) {
          newQuantities.set(productId, 1)
        }
        return newQuantities
      })

      // Cập nhật buyMoreProductId
      setBuyMoreProductId((prev) => {
        const newArray = [...prev]
        newArray.push({[productId.toString()]: 1})
        return newArray
      })
    } else {
      // Cập nhật selectedProducts
      setSelectedProducts((prev) => {
        const newMap = new Map(prev)
        newMap.delete(productId)
        return newMap
      })

      // Xóa số lượng khi bỏ tích chọn
      setProductQuantities((prevQuantities) => {
        const newQuantities = new Map(prevQuantities)
        newQuantities.delete(productId)
        return newQuantities
      })

      // Cập nhật buyMoreProductId
      setBuyMoreProductId((prev) => {
        const newArray = [...prev]
        const indexToRemove = newArray.findIndex(
          (item) => item[productId.toString()] !== undefined,
        )
        if (indexToRemove !== -1) {
          newArray.splice(indexToRemove, 1)
        }
        return newArray
      })
    }
  }

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (productId: number, quantity: number) => {
    setProductQuantities((prev) => {
      const newQuantities = new Map(prev)
      newQuantities.set(productId, quantity)
      return newQuantities
    })

    setBuyMoreProductId((prev) => {
      const newArray = [...prev]
      const indexToUpdate = newArray.findIndex(
        (item) => item[productId.toString()] !== undefined,
      )
      if (indexToUpdate !== -1) {
        newArray[indexToUpdate] = {[productId.toString()]: quantity}
      } else {
        newArray.push({[productId.toString()]: quantity})
      }
      return newArray
    })
  }

  // Tính tổng giá của các sản phẩm đã tích chọn
  const calculateTotalPrice = useMemo(() => {
    let total = 0
    selectedProducts.forEach((productData, productId: number) => {
      const quantity = productQuantities.get(productId) || 1
      const price = Number(productData.product.price) || 0
      total += price * quantity
    })
    return total
  }, [selectedProducts, productQuantities])

  // Lấy tổng giá hiện tại
  const priceBuyMore = calculateTotalPrice

  console.log(products);
  

  return (
    <div className='xsm:relative'>
      <Tabs
        defaultValue='default'
        className='w-[16.875rem]'
      >
        <TabsList className='bg-transparent mb-[0.5rem] p-0'>
          <TabsTrigger
            className='text-[0.875rem] text-center text-white font-semibold leading-[0.875rem] tracking-[0.00875rem] data-[state=active]:bg-transparent data-[state=active]:text-[#F6E280] p-0 relative after:content-[] after:absolute after:bottom-[-0.125rem] after:left-0 after:h-[0.125rem] after:bg-[#F6E280] after:w-0 data-[state=active]:after:w-full after:transition-[width] after:duration-300 after:ease-out lg:hover:text-[#F6E280] lg:hover:after:w-full cursor-pointer'
            value='default'
          >
            Mặc định
          </TabsTrigger>
          <Separator
            orientation='vertical'
            className='h-[0.75rem]! border-[0.125rem]! border-[#D9D9D9] rounded-[0.3125rem] opacity-30 mx-[1.25rem]'
          />
          <TabsTrigger
            className='text-[0.875rem] text-center text-white font-semibold leading-[0.875rem] tracking-[0.00875rem] data-[state=active]:bg-transparent data-[state=active]:text-[#F6E280] p-0 relative after:content-[] after:absolute after:bottom-[-0.125rem] after:left-0 after:h-[0.125rem] after:bg-[#F6E280] after:w-0 data-[state=active]:after:w-full after:transition-[width] after:duration-300 after:ease-out lg:hover:text-[#F6E280] lg:hover:after:w-full cursor-pointer'
            value='replace'
          >
            Thay thế
          </TabsTrigger>
          <Separator
            orientation='vertical'
            className='h-[0.75rem]! border-[0.125rem]! border-[#D9D9D9] rounded-[0.3125rem] opacity-30 mx-[1.25rem]'
          />
          <TabsTrigger
            className='text-[0.875rem] text-center text-white font-semibold leading-[0.875rem] tracking-[0.00875rem] data-[state=active]:bg-transparent data-[state=active]:text-[#F6E280] p-0 relative after:content-[] after:absolute after:bottom-[-0.125rem] after:left-0 after:h-[0.125rem] after:bg-[#F6E280] after:w-0 data-[state=active]:after:w-full after:transition-[width] after:duration-300 after:ease-out lg:hover:text-[#F6E280] lg:hover:after:w-full cursor-pointer'
            value='buy-more'
          >
            Mua thêm
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value='default'
          className='space-y-[0.9375rem] xsm:max-h-full max-h-[23.875rem] xsm:w-[20.9375rem] w-[30.1875rem] xsm:ml-0 ml-[-0.5rem] overflow-y-auto custom-scrollbar'
        >
          {Array.isArray([
            ...products.product_group_1,
            ...products.product_group_2,
          ]) &&
            [...products.product_group_1, ...products.product_group_2]
              .filter((data) => data?.product?.id != null)
              .map((data, index) => (
                <ProductCard
                  key={index}
                  productGroup={data}
                  detail
                />
              ))}
        </TabsContent>
        <TabsContent
          value='replace'
          className='space-y-[0.9375rem] xsm:max-h-full max-h-[23.875rem] w-[30.1875rem] xsm:w-[20.9375rem] ml-[-0.5rem] xsm:ml-0 overflow-y-auto custom-scrollbar'
        >
          {Array.isArray(products.product_group_2) &&
            products.product_group_2
              .filter((data) => data?.product?.id != null && data.product.is_replace)
              .map((data, index) => (
                <ProductCard
                  key={index}
                  productGroup={data}
                  popup
                  detail
                  setPriceDifference={setPriceDifference}
                  setReplaceProducts={setReplaceProducts}
                  index={index}
                />
              ))}
        </TabsContent>
        <TabsContent
          value='buy-more'
          className='space-y-[0.9375rem] xsm:max-h-full max-h-[23.875rem] w-[30.1875rem] xsm:w-[20.9375rem] ml-[-0.5rem] xsm:ml-0 overflow-y-auto custom-scrollbar'
        >
          {Array.isArray(products.product_group_4) &&
            products.product_group_4
              .filter((data) => data?.product?.id != null)
              .map((data, index) => (
                <ProductCard
                  key={index}
                  productGroup={data}
                  buyMore
                  detail
                  isSelected={selectedProducts.has(data.product?.id || 0)}
                  onSelect={handleProductSelect}
                  quantity={productQuantities.get(data.product?.id || 0) || 1}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
        </TabsContent>
      </Tabs>
      <div className='xsm:sticky xsm:bottom-0 xsm:left-0 z-[10] xsm:bg-[#000117] xsm:pt-[1.25rem] xsm:mx-[-1.25rem] xsm:pl-[1.25rem]'>
        <PriceSummary
          priceDifference={priceDifference}
          priceBuyMore={priceBuyMore}
        />
      </div>
    </div>
  )
}

export default ProductTabs
