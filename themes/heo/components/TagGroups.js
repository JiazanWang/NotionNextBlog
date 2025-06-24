import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { HashTag } from '@/components/HeroIcons'

/**
 * 标签组
 * @param tags
 * @param currentTag
 * @returns {JSX.Element}
 * @constructor
 */
const TagGroups = ({ tags, className }) => {
  const router = useRouter()
  const { locale } = useGlobal()
  const { tag: currentTag } = router.query
  if (!tags) return <></>

  return (
    <div className="space-y-4">
      {/* 标题区域 */}
      <div className='flex items-center space-x-2 text-gray-800 dark:text-gray-200'>
        <div className='p-2 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-orange-500 dark:to-red-600 rounded-lg shadow-lg'>
          <HashTag className='w-4 h-4 text-white' />
        </div>
        <span className='font-semibold text-lg'>{locale.COMMON.TAGS}</span>
      </div>

      {/* 滚动容器 */}
      <div className="relative overflow-visible">
        {/* 标签网格 - 可滚动 */}
        <div 
          id="tags-group" 
          className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2"
        >
          {tags.map((tag, index) => {
            const selected = currentTag === tag.name
            return (
              <Link 
                passHref 
                key={index} 
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className='group block relative'
              >
                <div className={`
                  relative overflow-hidden rounded-lg p-2.5 transition-all duration-300 ease-out cursor-pointer
                  ${selected 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-yellow-500 dark:to-orange-600 text-white shadow-md scale-105 z-20' 
                    : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-800/90'
                  }
                  backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                  hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 hover:z-30
                  hover:border-indigo-400/60 dark:hover:border-yellow-400/60
                  ${!selected ? 'hover:text-indigo-600 dark:hover:text-yellow-500' : ''}
                  group-hover:w-max group-hover:min-w-full group-hover:absolute group-hover:left-0 group-hover:right-auto
                  group-hover:shadow-xl group-hover:border-indigo-500/70 dark:group-hover:border-yellow-500/70
                `}>
                  
                  {/* 背景装饰 */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-br from-white/20 to-transparent rounded-bl-xl opacity-50"></div>
                  
                  {/* 标签内容 */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm leading-tight transition-all duration-300 group-hover:whitespace-nowrap ${
                        selected ? 'text-white' : 'group-hover:text-indigo-600 dark:group-hover:text-yellow-500'
                      } ${!selected ? 'truncate group-hover:truncate-none' : 'truncate'}`}>
                        {tag.name}
                      </div>
                    </div>
                    
                    {/* 文章数量 */}
                    {tag.count && (
                      <div className={`
                        ml-1 px-1 py-0.5 rounded text-xs font-medium transition-all duration-300 min-w-[16px] text-center leading-none flex-shrink-0
                        ${selected 
                          ? 'bg-white/25 text-white' 
                          : 'bg-gray-200/80 dark:bg-gray-600/80 text-gray-600 dark:text-gray-300 group-hover:bg-indigo-200/80 dark:group-hover:bg-yellow-200/20 group-hover:text-indigo-700 dark:group-hover:text-yellow-600'
                        }
                      `}>
                        {tag.count}
                      </div>
                    )}
                  </div>

                  {/* 底部装饰线 */}
                  <div className={`
                    absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out
                    ${selected 
                      ? 'w-full bg-white/30' 
                      : 'w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-yellow-500 dark:to-orange-600'
                    }
                  `}></div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 渐变遮罩 - 底部 */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none rounded-b-xl"></div>
      </div>
    </div>
  )
}

export default TagGroups
