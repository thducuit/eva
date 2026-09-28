import ProjectCard from '@/app/_components/ProjectCard'
import {RelatedProjectDataResType} from '@/types/search.interface'

export default function ProjectRelated({
  data,
}: {
  data: RelatedProjectDataResType
}) {
  return (
    <section className='w-full mt-[5rem] xsm:mt-[2.5rem]'>
      <h2 className='text-grey-50 text-[2rem] font-medium leading-[1.18] tracking-[0.005rem] xsm:h6'>
        Có thể bạn quan tâm
      </h2>
      <div className='grid grid-cols-3 gap-[1.44rem] mt-[2rem] xsm:mt-[1rem] xsm:grid-cols-1 xsm:gap-4'>
        {Array.isArray(data) &&
          data.map((project, index) => (
            <ProjectCard
              key={index}
              title={project?.name}
              images={project?.acf?.images}
              slug={project?.slug}
            />
          ))}
      </div>
    </section>
  )
}
