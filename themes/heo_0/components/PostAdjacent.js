import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

/**
 * 上一篇，下一篇文章
 * @param {prev,next} param0
 * @returns
 */
export default function PostAdjacent({ prev, next }) {
  const [isShow, setIsShow] = useState(false)
  const router = useRouter()
  const { locale } = useGlobal()

  useEffect(() => {
    setIsShow(false)
  }, [router])

  useEffect(() => {
    // 文章滑动到底部时显示下一篇文章推荐
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // 计算滚动百分比，只有当滚动到80%以上时才显示卡片
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight
      
      if (scrollPercentage > 0.8) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // 初始检查
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!prev || !next || !siteConfig('HEO_ARTICLE_ADJACENT', null, CONFIG)) {
    return <></>
  }

  return (
    <div id='article-end'>
      {/* 移动端 */}
      <section className='lg:hidden pt-8 text-gray-800 items-center text-xs md:text-sm flex flex-col m-1 '>
        <Link
          href={`/${prev.slug}`}
          passHref
          className='cursor-pointer justify-between space-y-1 px-5 py-6 rounded-t-xl dark:bg-[#1e1e1e] border dark:border-gray-600 border-b-0 items-center dark:text-white flex flex-col w-full h-18 duration-200'>
          <div className='flex justify-start items-center w-full'>上一篇</div>
          <div className='flex justify-center items-center text-lg font-bold'>
            {prev.title}
          </div>
        </Link>
        <Link
          href={`/${next.slug}`}
          passHref
          className='cursor-pointer justify-between space-y-1 px-5 py-6 rounded-b-xl dark:bg-[#1e1e1e] border dark:border-gray-600 items-center dark:text-white flex flex-col w-full h-18 duration-200'>
          <div className='flex justify-start items-center w-full'>下一篇</div>
          <div className='flex justify-center items-center text-lg font-bold'>
            {next.title}
          </div>
        </Link>
      </section>

      {/* 桌面端 */}

      <div
        id='pc-next-post'
        className={`${isShow ? 'mb-5 opacity-100' : '-mb-24 opacity-0'} hidden md:block fixed z-40 right-10 bottom-4 duration-200 transition-all`}>
        <Link
          href={`/${next.slug}`}
          className='text-sm block p-4 w-72 h-28 cursor-pointer drop-shadow-xl duration transition-all dark:bg-[#1e1e1e] border dark:border-gray-600 bg-white dark:text-gray-300 dark:hover:text-yellow-600 hover:font-bold hover:text-blue-600 rounded-lg'>
          <div className='font-semibold'>{locale.COMMON.NEXT_POST}</div>
          <hr className='mt-2 mb-3' />
          <div className='line-clamp-2'>{next?.title}</div>
        </Link>
      </div>
    </div>
  )
}
