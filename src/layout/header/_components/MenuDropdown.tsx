import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import {NavigationIcon, BlurDecorationIcon, MenuIcon} from '@/components/icon'

type MenuItem = {
  page: {url: string; title: string}
  image: {url: string; alt?: string; width?: number; height?: number}
}

type MenuDropdownProps = {
  items: MenuItem[]
}

export const MenuDropdown = ({items}: MenuDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'tertiary'}
          text={'default'}
          className='flex-center space-x-[0.5rem] text-white h-[2.75rem] w-[6.875rem] uppercase'
        >
          Menu
          <MenuIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' bg-transparent border-none shadow-none translate-y-[0.85rem]'>
        <div className='flex space-x-[0.5rem]'>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.page.url}
              className='w-[16.1875rem] relative overflow-hidden h-[15.625rem] rounded-[0.75rem] border-[1.5px] border-white/90 bg-[#100F27] backdrop-blur-[3px] group hover:bg-white/90 transition-all duration-500'
            >
              <div className='absolute top-0 left-0 size-[7.6875rem]'>
                <span className='absolute z-[2] top-[1.25rem] left-[1.25rem] text-white text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] group-hover:text-[#000117] transition-all duration-500'>
                  0{index + 1}
                </span>
                <BlurDecorationIcon className='absolute top-0 left-0 size-[7.6875rem] group-hover:[&_g]:opacity-100 [&_g]:opacity-40' />
              </div>
              <div className='flex items-center justify-center space-x-[0.75rem] absolute top-[1.25rem] right-0 w-auto group-hover:translate-x-[-1.25rem] transition-all duration-500'>
                <p className='text-white text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] uppercase group-hover:text-[#000117] transition-all duration-500'>
                  {item.page.title}
                </p>
                <NavigationIcon className='w-[0.875rem] h-[1.09375rem] opacity-0 group-hover:opacity-100 transition-all translate-x-[0.5rem] group-hover:translate-x-0 duration-500' />
              </div>
              <Image
                src={item?.image.url}
                alt={item?.image.alt || ''}
                width={item?.image.width || 260}
                height={item?.image.height || 190}
                className='w-[16.1875rem] h-[11.8125rem] object-cover absolute bottom-0 left-0 group-hover:scale-105 transition-all duration-300'
              />
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
