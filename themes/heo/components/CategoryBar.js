import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 博客列表上方嵌入条
 * @param {*} props
 * @returns
 */
export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  // 创建一个ref引用
  const categoryBarItemsRef = useRef(null)

  // 点击#right时，滚动#category-bar-items到最右边
  const handleToggleScroll = () => {
    if (categoryBarItemsRef.current) {
      const { scrollWidth, clientWidth } = categoryBarItemsRef.current
      if (scrollRight) {
        categoryBarItemsRef.current.scrollLeft = 0
      } else {
        categoryBarItemsRef.current.scrollLeft = scrollWidth - clientWidth
      }
      setScrollRight(!scrollRight)
    }
  }

  return (
    <div
      id='category-bar'
      className="wow fadeInUp relative">

      {/* 分类导航栏 - 增强的层级效果 */}
      <div className="relative bg-gradient-to-r from-white/95 via-white/90 to-white/95 
                      dark:from-gray-800/95 dark:via-gray-800/90 dark:to-gray-800/95 
                      backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 
                      rounded-2xl shadow-lg shadow-gray-200/40 dark:shadow-gray-900/40 
                      hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60
                      transition-all duration-300 overflow-hidden">
        
        <div className="flex items-center p-3">
          <div
            id='category-bar-items'
            ref={categoryBarItemsRef}
            className='scroll-smooth flex-1 flex justify-start flex-nowrap items-center overflow-x-scroll gap-2 px-1'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <MenuItem href='/' name={locale.NAV.INDEX} />
            {categoryOptions?.map((c, index) => (
              <MenuItem key={index} href={`/category/${c.name}`} name={c.name} />
            ))}
          </div>

          <div className='flex items-center gap-2 ml-3 pl-3 border-l border-gray-200/60 dark:border-gray-700/60'>
            <button
              className='group flex items-center justify-center w-9 h-9 rounded-xl
                         bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800
                         border border-gray-200/60 dark:border-gray-600/60
                         hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20
                         hover:border-indigo-300 dark:hover:border-yellow-500/50
                         transition-all duration-200 ease-out
                         hover:scale-105 active:scale-95 hover:shadow-md'
              onClick={handleToggleScroll}>
              {scrollRight ? (
                <ChevronDoubleLeft className='w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-yellow-500 transition-colors duration-200' />
              ) : (
                <ChevronDoubleRight className='w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-yellow-500 transition-colors duration-200' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 按钮
 * @param {*} param0
 * @returns
 */
const MenuItem = ({ href, name }) => {
  const router = useRouter()
  const { category } = router.query
  const selected = (router.asPath === '/' && name === '首页') || category === name
  
  return (
    <Link href={href}>
      <div
        className={`
          relative whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium
          transition-all duration-200 ease-out
          hover:scale-105 active:scale-95
          ${selected 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-yellow-400 dark:to-orange-500 text-white shadow-lg shadow-indigo-500/30 dark:shadow-yellow-500/30 border border-indigo-400 dark:border-yellow-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md'
          }
        `}>
        {selected && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 dark:from-yellow-300/20 dark:to-orange-400/20 rounded-xl blur-sm"></div>
        )}
        <span className="relative z-10">{name}</span>
      </div>
    </Link>
  )
}
