const BackgroundGradients = () => {
  return (
    <>
      <div
        className='h-[11.0625rem] opacity-65 absolute top-0 left-0 w-full'
        style={{
          background:
            'linear-gradient(0deg, rgba(0, 1, 23, 0.00) 0%, #000117 100%)',
        }}
      />
      <div
        className='h-[18.6875rem] absolute bottom-0 left-0 w-full'
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 1, 23, 0.00) 0%, #000117 100%)',
        }}
      />
    </>
  )
}

export default BackgroundGradients
