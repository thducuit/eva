import {NavigationSwiperIcon} from '@/components/icon'
import {cn} from '@/lib/utils'

const ProjectNavigation = ({className}: {className?: string}) => {
  return (
    <div
      className={cn(
        'project-navigation pointer-events-none xsm:w-[96%] absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex items-center justify-between w-[94rem] z-[2]',
        className,
      )}
    >
      <button className='pointer-events-auto prev-project-swiper size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
        <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] group-hover:text-[#000117]' />
      </button>

      <button className='pointer-events-auto next-project-swiper size-[2rem] p-[0.48438rem_0.5625rem_0.42188rem_0.5625rem] rounded-[0.375rem] bg-[#dedede]/58 flex items-center justify-center cursor-pointer group hover:bg-[#F6E280] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'>
        <NavigationSwiperIcon className='w-[0.875rem] h-[1.09375rem] rotate-180' />
      </button>
    </div>
  )
}

export default ProjectNavigation
