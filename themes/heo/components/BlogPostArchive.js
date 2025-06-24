import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

/**
 * 博客归档列表
 * @param posts 所有文章
 * @param archiveTitle 归档标题
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostArchive = ({ posts = [], archiveTitle, siteInfo }) => {
  if (!posts || posts.length === 0) {
    return <></>
  } else {
    return (
      <div className='mb-8'>
        {/* 年月标题 - 精致紧凑设计 */}
        <div className='pb-4 mb-6 border-b border-gray-200/30 dark:border-gray-700/30' id={archiveTitle}>
          <div className='flex items-center gap-3'>
            <div className='w-0.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 dark:from-yellow-400 dark:to-orange-400 rounded-full'></div>
            <h2 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
              {archiveTitle}
            </h2>
            <div className='flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-600'></div>
          </div>
        </div>

        {/* 文章卡片网格 - 紧凑布局 */}
        <div className='grid gap-3'>
          {posts?.map(post => {
            const showPreview =
              siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
            if (
              post &&
              !post.pageCoverThumbnail &&
              siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
            ) {
              post.pageCoverThumbnail = siteInfo?.pageCover
            }
            const showPageCover =
              siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
              post?.pageCoverThumbnail &&
              !showPreview
            
            return (
              <Link href={post?.href} key={post.id} className='block'>
                <article
                  className='group relative overflow-hidden rounded-xl 
                            bg-white/60 dark:bg-gray-900/60 
                            backdrop-blur-sm border border-white/20 dark:border-gray-700/20
                            shadow-sm shadow-gray-200/10 dark:shadow-gray-900/20
                            hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-gray-900/30
                            hover:scale-[1.01] hover:-translate-y-0.5
                            transition-all duration-300 ease-out
                            cursor-pointer'>
                
                {/* 背景装饰渐变 */}
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 dark:from-yellow-400/3 dark:to-orange-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                
                <div className='relative p-4'>
                  <div className={`flex ${showPageCover ? 'gap-4' : 'gap-3'} ${showPageCover ? 'items-start' : 'items-center'}`}>
                    
                    {/* 图片封面 - 小尺寸 */}
                    {showPageCover && (
                      <div className='flex-shrink-0'>
                        <div className='relative overflow-hidden rounded-lg group/image'>
                          <LazyImage
                            className='w-20 h-16 object-cover 
                                      transition-transform duration-300 group-hover/image:scale-105'
                            src={post?.pageCoverThumbnail}
                            alt={post?.title}
                          />
                          {/* 图片遮罩 */}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-200'></div>
                        </div>
                      </div>
                    )}

                    {/* 文字内容区域 - 紧凑布局 */}
                    <div className='flex-1 min-w-0'>
                      
                      {/* 顶部：分类和日期 */}
                      <div className='flex items-center justify-between mb-2'>
                        {post?.category && (
                          <Link
                            href={`/category/${post.category}`}
                            onClick={(e) => e.stopPropagation()}
                            className='inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
                                      bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400
                                      hover:bg-blue-100 dark:hover:bg-blue-900/30
                                      transition-colors duration-200 cursor-pointer'>
                            <i className='fas fa-folder-open mr-1 text-xs opacity-60'></i>
                            {post.category}
                          </Link>
                        )}
                        
                        {/* 发布日期 */}
                        <time className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                          {post.date?.start_date}
                        </time>
                      </div>

                      {/* 标题 - 紧凑 */}
                      <div className='block mb-2 group/title'>
                        <h3 className='text-base font-semibold leading-snug
                                      text-gray-800 dark:text-gray-100
                                      group-hover/title:text-blue-600 dark:group-hover/title:text-yellow-400
                                      transition-colors duration-200
                                      line-clamp-2'>
                          {post.title}
                        </h3>
                      </div>

                      {/* 底部：标签和阅读更多 */}
                      <div className='flex items-center justify-between'>
                        {/* 标签 - 小尺寸 */}
                        <div className='flex flex-wrap gap-1'>
                          {post.tagItems?.slice(0, 7).map(tag => (
                            <TagItemMini key={tag.name} tag={tag} />
                          ))}
                          {post.tagItems?.length > 7 && (
                            <span className='text-xs text-gray-400 dark:text-gray-500 px-1'>
                              +{post.tagItems.length - 7}
                            </span>
                          )}
                        </div>

                        {/* 阅读更多按钮 - 小尺寸 */}
                        <div className='inline-flex items-center text-xs font-medium
                                      text-blue-600 dark:text-yellow-400
                                      group-hover:text-blue-700 dark:group-hover:text-yellow-300
                                      transition-colors duration-200 group/more'>
                          阅读
                          <i className='fas fa-arrow-right ml-1 text-xs 
                                      transform group-hover/more:translate-x-0.5 
                                      transition-transform duration-200'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* 精致的边框光效 */}
                  <div className='absolute inset-0 rounded-xl border border-transparent 
                                group-hover:border-blue-500/10 dark:group-hover:border-yellow-400/10 
                                transition-colors duration-300'></div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

export default BlogPostArchive
