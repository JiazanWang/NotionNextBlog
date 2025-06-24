import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'
import { Clock, User } from '@/components/HeroIcons'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
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

  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)

  return (
    <article className="group wow fadeInUp" data-wow-delay='.2s'>
      <div className="
        relative overflow-hidden rounded-xl transition-all duration-500 ease-out cursor-pointer
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
        border border-gray-200/60 dark:border-gray-700/60
        shadow-md hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-yellow-500/10
        hover:scale-[1.008] hover:-translate-y-1
        hover:border-indigo-400/70 dark:hover:border-yellow-400/70
        flex flex-row h-36 w-full max-w-4xl
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500/5 before:to-purple-500/5 dark:before:from-yellow-500/5 dark:before:to-orange-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
      ">
        
        {/* 左侧内容区域 */}
        <div className="relative flex flex-col justify-between p-5 flex-1 min-w-0 h-full z-10">
          
          {/* 上半部分：标题和简介 */}
          <div className="flex-1 min-h-0">
            {/* 头部：标题 */}
            <div className="mb-1.5">
              {/* 标题 */}
              <div className="flex-1 min-w-0">
                <Link href={post?.href} passHref>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-yellow-500 transition-all duration-300 leading-tight tracking-tight">
                    {siteConfig('POST_TITLE_ICON') && (
                      <NotionIcon
                        icon={post.pageIcon}
                        className="inline-block w-3.5 h-3.5 mr-1 align-text-top"
                      />
                    )}
                    {post.title}
                  </h2>
                </Link>
              </div>
            </div>

            {/* 摘要区域 - 灵活高度，最多2行 */}
            {(!showPreview || showSummary) && post.summary && (
              <div className="overflow-hidden">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-all duration-300 font-light">
                  {post.summary}
                </p>
              </div>
            )}
          </div>

          {/* 底部信息：时间和标签 - 固定在底部 */}
          <div className="flex items-center justify-between space-x-2 pt-3 mt-3">
            
            {/* 发布时间 */}
            <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 bg-gray-50/50 dark:bg-gray-800/50 px-2 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{post.lastEditedDay}</span>
            </div>
            
            {/* 所有标签显示 */}
            {post.tagItems && post.tagItems.length > 0 && (
              <div className="flex items-center flex-wrap gap-1 min-w-0 flex-1 justify-end">
                {post.tagItems.slice(0, 7).map(tag => (
                  <TagItemMini key={tag.name} tag={tag} />
                ))}
                {post.tagItems.length > 7 && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 px-1">+{post.tagItems.length - 7}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 右侧区域：分类和图片 */}
        <div className="flex flex-col p-4 w-40 flex-shrink-0">
          {/* 分类标签 - 在图片上方 */}
          {post?.category && (
            <div className="flex justify-end mb-2 relative z-20">
              <Link
                passHref
                href={`/category/${post.category}`}
                className="group inline-block"
              >
                <div className="inline-flex items-center space-x-0.5 px-1 py-0.5 text-xs font-medium rounded transition-all duration-300 bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-yellow-100/20 hover:text-indigo-700 dark:hover:text-yellow-600 hover:scale-105 border border-gray-200/30 dark:border-gray-600/30">
                  <span className="whitespace-nowrap text-xs">{post.category}</span>
                </div>
              </Link>
            </div>
          )}

          {/* 图片区域 - 缩小高度 */}
          {showPageCover && (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <Link href={post?.href} passHref legacyBehavior>
                <div className="relative overflow-hidden rounded-xl h-16 w-full group/img shadow-md">
                  <LazyImage
                    priority={index === 0}
                    src={post?.pageCoverThumbnail}
                    alt={post?.title}
                    className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110'
                  />
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* 装饰性边框 */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 dark:ring-gray-700/30"></div>
                  
                  {/* 阅读更多按钮 - 悬浮在图片上 */}
                                      <div className="absolute bottom-1 right-1 group/btn flex items-center space-x-1 px-1.5 py-0.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded text-xs font-semibold text-indigo-600 dark:text-yellow-500 hover:bg-indigo-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:text-gray-900 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg">
                    <span className="text-xs">阅读</span>
                    <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* 当没有图片时，只显示分类 */}
          {!showPageCover && (
            <div className="flex-1 flex items-start justify-end">
              {/* 分类会自动显示在上方 */}
            </div>
          )}
        </div>

        {/* 装饰元素 */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 dark:from-yellow-500/15 dark:to-orange-600/15 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-indigo-500/10 to-purple-600/10 dark:from-yellow-500/10 dark:to-orange-600/10 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      </div>
    </article>
  )
}

export default BlogPostCard
