export const NavigationIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='18'
      viewBox='0 0 14 18'
      fill='none'
      className={className}
    >
      <rect
        y='0.25'
        width='7'
        height='7'
        rx='2'
        fill='#000117'
      />
      <rect
        y='10.75'
        width='7'
        height='7'
        rx='2'
        fill='#000117'
      />
      <rect
        x='7'
        y='5.5'
        width='7'
        height='7'
        rx='2'
        fill='#000117'
      />
    </svg>
  )
}

export const NavigationSwiperIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='19'
      viewBox='0 0 14 19'
      fill='none'
      className={className}
    >
      <rect
        width='7'
        height='7'
        rx='2'
        transform='matrix(-1 0 0 1 14 0.75)'
        className='fill-white group-hover:fill-[#000117] transition-all duration-300'
      />
      <rect
        width='7'
        height='7'
        rx='2'
        transform='matrix(-1 0 0 1 14 11.25)'
        className='fill-white group-hover:fill-[#000117] transition-all duration-300'
      />
      <rect
        width='7'
        height='7'
        rx='2'
        transform='matrix(-1 0 0 1 7 6)'
        className='fill-white group-hover:fill-[#000117] transition-all duration-300'
      />
    </svg>
  )
}

export const SearchIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <path
        d='M10 10L14 14M6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const MenuIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='10'
      viewBox='0 0 14 10'
      fill='none'
      className={className}
    >
      <path
        d='M1 8.33268H13M1 4.99935H13M1 1.66602H13'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const GoogleIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <g clipPath='url(#clip0_103_2213)'>
        <path
          d='M15.3337 8.31942C15.3337 7.81087 15.2924 7.29958 15.2045 6.79929H8.14807V9.68011H12.1889C12.0213 10.6092 11.4825 11.4311 10.6935 11.9534V13.8227H13.1043C14.52 12.5197 15.3337 10.5955 15.3337 8.31942Z'
          fill='#4285F4'
        />
        <path
          d='M8.14807 15.6287C10.1657 15.6287 11.8673 14.9662 13.107 13.8227L10.6963 11.9534C10.0255 12.4097 9.15965 12.6681 8.15082 12.6681C6.19911 12.6681 4.54428 11.3514 3.95053 9.58115H1.46279V11.5081C2.73277 14.0343 5.31947 15.6287 8.14807 15.6287Z'
          fill='#34A853'
        />
        <path
          d='M3.94778 9.58114C3.63441 8.65202 3.63441 7.64593 3.94778 6.71681V4.78985H1.4628C0.401729 6.90374 0.401722 9.39422 1.46279 11.5081L3.94778 9.58114Z'
          fill='#FBBC04'
        />
        <path
          d='M8.14807 3.62706C9.21463 3.61057 10.2455 4.01191 11.0179 4.74861L13.1538 2.61273C11.8013 1.34274 10.0063 0.644529 8.14807 0.66652C5.31947 0.66652 2.73278 2.26088 1.4628 4.78985L3.94778 6.71681C4.53879 4.94379 6.19636 3.62706 8.14807 3.62706Z'
          fill='#EA4335'
        />
      </g>
      <defs>
        <clipPath id='clip0_103_2213'>
          <rect
            width='16'
            height='16'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export const UserIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='14'
      viewBox='0 0 10 14'
      fill='none'
      className={className}
    >
      <path
        d='M9.08268 12.25C9.08268 9.99484 7.25451 8.16667 4.99935 8.16667C2.74419 8.16667 0.916016 9.99484 0.916016 12.25M4.99935 6.41667C3.71068 6.41667 2.66602 5.372 2.66602 4.08333C2.66602 2.79467 3.71068 1.75 4.99935 1.75C6.28801 1.75 7.33268 2.79467 7.33268 4.08333C7.33268 5.372 6.28801 6.41667 4.99935 6.41667Z'
        stroke='white'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const XIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='41'
      viewBox='0 0 40 41'
      fill='none'
      className={className}
    >
      <path
        d='M13.2245 12.969L27.3667 27.1111C27.5244 27.2689 27.5244 27.5431 27.3667 27.7009C27.2089 27.8586 26.9347 27.8586 26.777 27.7009L12.6348 13.5587C12.4771 13.401 12.4771 13.1268 12.6348 12.969C12.7926 12.8113 13.0668 12.8112 13.2245 12.969Z'
        fill='white'
        stroke='white'
        strokeWidth='1.66667'
      />
      <path
        d='M12.0443 28.2899C11.5611 27.8067 11.5611 27.0053 12.0443 26.5221L26.1864 12.38C26.6696 11.8968 27.471 11.8968 27.9542 12.38C28.4374 12.8632 28.4374 13.6646 27.9542 14.1477L13.8121 28.2899C13.3289 28.7731 12.5275 28.7731 12.0443 28.2899Z'
        fill='white'
      />
    </svg>
  )
}

export const SearchInputIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
      className={className}
    >
      <path
        d='M9.58496 2.20703C14.017 2.20721 17.626 5.81694 17.626 10.249C17.6258 14.681 14.0169 18.2899 9.58496 18.29C5.15288 18.29 1.54315 14.6811 1.54297 10.249C1.54297 5.81683 5.15277 2.20703 9.58496 2.20703ZM9.58496 2.45703C5.28345 2.45703 1.79297 5.95659 1.79297 10.249C1.79314 14.5413 5.28356 18.04 9.58496 18.04C13.8862 18.0399 17.3758 14.5412 17.376 10.249C17.376 5.95669 13.8863 2.45721 9.58496 2.45703Z'
        fill='#CCCCCC'
        stroke='#CCCCCC'
      />
      <path
        d='M18.3326 19.6236C18.1742 19.6236 18.0159 19.5652 17.8909 19.4402L16.2242 17.7736C15.9826 17.5319 15.9826 17.1319 16.2242 16.8902C16.4659 16.6486 16.8659 16.6486 17.1076 16.8902L18.7742 18.5569C19.0159 18.7986 19.0159 19.1986 18.7742 19.4402C18.6492 19.5652 18.4909 19.6236 18.3326 19.6236Z'
        fill='#CCCCCC'
      />
    </svg>
  )
}

export const ArrowRightIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      className={className}
    >
      <path
        d='M3.33203 8.66602H12.6654M12.6654 8.66602L8.66536 4.66602M12.6654 8.66602L8.66536 12.666'
        stroke='#000117'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const BlurDecorationIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='170'
      height='180'
      viewBox='0 0 170 180'
      fill='none'
      className={className}
    >
      <g
        className='transition-all duration-500'
        filter='url(#filter0_f_169_3021)'
      >
        <circle
          cx='8.5'
          cy='18.5'
          r='61.5'
          fill='#FFAF69'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_169_3021'
          x='-153'
          y='-143'
          width='323'
          height='323'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='50'
            result='effect1_foregroundBlur_169_3021'
          />
        </filter>
      </defs>
    </svg>
  )
}

export const LocationIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='16'
      viewBox='0 0 12 16'
      fill='none'
      className={className}
    >
      <path
        d='M6 0C2.692 0 0 2.71067 0 6.04333C0 10.7787 5.436 15.668 5.66733 15.8733C5.75877 15.9552 5.87715 16.0005 5.99987 16.0006C6.12259 16.0007 6.24106 15.9557 6.33267 15.874C6.564 15.668 12 10.7787 12 6.04333C12 2.71067 9.308 0 6 0ZM6 9.33333C4.162 9.33333 2.66667 7.838 2.66667 6C2.66667 4.162 4.162 2.66667 6 2.66667C7.838 2.66667 9.33333 4.162 9.33333 6C9.33333 7.838 7.838 9.33333 6 9.33333Z'
        fill='white'
      />
    </svg>
  )
}

export const PhoneIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <path
        d='M15.5477 11.7424L13.3149 9.50954C12.5174 8.71209 11.1618 9.0311 10.8428 10.0678C10.6036 10.7855 9.80612 11.1842 9.08841 11.0247C7.49352 10.626 5.34042 8.5526 4.9417 6.87797C4.70246 6.16024 5.18093 5.36279 5.89863 5.12359C6.93531 4.80461 7.25429 3.44895 6.45684 2.65151L4.224 0.418659C3.58604 -0.139553 2.6291 -0.139553 2.07089 0.418659L0.555745 1.93381C-0.959401 3.5287 0.715235 7.75516 4.46323 11.5032C8.21122 15.2511 12.4377 17.0056 14.0326 15.4106L15.5477 13.8955C16.106 13.2575 16.106 12.3006 15.5477 11.7424Z'
        fill='white'
      />
    </svg>
  )
}

export const MailIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      className={className}
    >
      <path
        d='M8.46281 10.522C8.31169 10.6164 8.14168 10.6542 7.99056 10.6542C7.83943 10.6542 7.66942 10.6164 7.5183 10.522L0 5.93164V12.0332C0 13.3366 1.05785 14.3945 2.36128 14.3945H13.6387C14.9421 14.3945 16 13.3366 16 12.0332V5.93164L8.46281 10.522Z'
        fill='white'
      />
      <path
        d='M13.6388 2.60547H2.3614C1.24688 2.60547 0.302366 3.39886 0.0756836 4.45671L8.00957 9.2926L15.9246 4.45671C15.6979 3.39886 14.7534 2.60547 13.6388 2.60547Z'
        fill='white'
      />
    </svg>
  )
}

export const PencilIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      className={className}
    >
      <path
        d='M6.99984 3.33406L1.6665 8.66739V11.3341L4.33317 11.334L9.6665 6.00072M6.99984 3.33406L8.91226 1.42163L8.91341 1.42049C9.17666 1.15724 9.30852 1.02538 9.46053 0.975988C9.59442 0.932483 9.73866 0.932483 9.87256 0.975988C10.0245 1.02534 10.1562 1.15705 10.419 1.41993L11.5789 2.5798C11.8429 2.84381 11.975 2.97588 12.0244 3.1281C12.068 3.26199 12.0679 3.40622 12.0244 3.54012C11.975 3.69223 11.8431 3.82409 11.5795 4.08773L11.5789 4.08829L9.6665 6.00072M6.99984 3.33406L9.6665 6.00072'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export const CheckIcon = ({className}: {className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='10'
      viewBox='0 0 13 10'
      fill='none'
      className={className}
    >
      <path
        d='M6.48693 6.86966C6.90256 7.2853 6.90256 7.99782 6.48693 8.41346L5.62596 9.27443C5.21032 9.69007 4.4978 9.69007 4.08216 9.27443L0.311729 5.47431C-0.10391 5.05867 -0.10391 4.34614 0.311729 3.93051L1.17269 3.06954C1.58833 2.6539 2.30085 2.6539 2.71649 3.06954L6.48693 6.86966Z'
        fill='#000117'
      />
      <path
        d='M9.78264 0.311729C10.1983 -0.10391 10.9108 -0.10391 11.3264 0.311729L12.1874 1.17269C12.603 1.58833 12.603 2.30085 12.1874 2.71649L5.65595 9.21826C5.24031 9.6339 4.52778 9.6339 4.11215 9.21826L3.25118 8.3573C2.83554 7.94166 2.83554 7.22914 3.25118 6.8135L9.78264 0.311729Z'
        fill='#000117'
      />
    </svg>
  )
}
