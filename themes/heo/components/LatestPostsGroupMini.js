import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Clock, Sparkles } from '@/components/HeroIcons'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
export default function LatestPostsGroupMini({ latestPosts, siteInfo }) {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()
  const SUB_PATH = siteConfig('SUB_PATH', '')

  return latestPosts ? (
    <>
      {/* 标题区域 */}
      <div className='mb-4 px-2 flex items-center justify-between'>
        <div className='flex items-center space-x-2 text-gray-800 dark:text-gray-200'>
          <div className='p-2 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-yellow-500 dark:to-orange-600 rounded-lg shadow-lg'>
            <Sparkles className='w-4 h-4 text-white' />
          </div>
          <span className='font-semibold text-lg'>{locale.COMMON.LATEST_POSTS}</span>
        </div>
      </div>

      {/* 文章列表 */}
      <div className='space-y-3'>
        {latestPosts.map(post => {
          const selected = currentPath === `${SUB_PATH}/${post.slug}`
          const headerImage = post?.pageCoverThumbnail
            ? post.pageCoverThumbnail
            : siteInfo?.pageCover

          return (
            <Link
              key={post.id}
              title={post.title}
              href={post?.href}
              passHref
              className='block group'>
              <div className='flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl transition-all duration-300 ease-out hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 hover:border-indigo-400/50 dark:hover:border-yellow-400/50'>
                
                {/* 文章封面 */}
                <div className='relative w-16 h-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700'>
                  <LazyImage
                    src={headerImage}
                    className='object-cover w-full h-full transition-all duration-300 group-hover:scale-110'
                    alt={post.title}
                  />
                  {/* 渐变遮罩 */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
                </div>

                {/* 文章信息 */}
                <div className='flex-1 min-w-0'>
                  <h3 className={`font-medium text-sm leading-5 line-clamp-2 transition-all duration-300 ${
                    selected 
                      ? 'text-indigo-600 dark:text-yellow-500' 
                      : 'text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-yellow-500'
                  }`}>
                    {post.title}
                  </h3>
                  
                  {/* 发布时间 */}
                  <div className='flex items-center space-x-1 mt-1 text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-300'>
                    <Clock className='w-3 h-3' />
                    <span>{post.lastEditedDay}</span>
                  </div>
                </div>

                {/* 右侧指示器 */}
                <div className='flex-shrink-0'>
                  <div className='w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 group-hover:bg-indigo-500 dark:group-hover:bg-yellow-500 group-hover:scale-125'></div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  ) : null
}
