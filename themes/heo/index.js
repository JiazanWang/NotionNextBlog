/**
 *   HEO 主题说明
 *  > 主题设计者 [张洪](https://zhheo.com/)
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
 */

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import CategoryBar from './components/CategoryBar'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestPostsGroup from './components/LatestPostsGroup'
import { NoticeBar } from './components/NoticeBar'
import PostAdjacent from './components/PostAdjacent'
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import SideLeft from './components/SideLeft'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'

/**
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()

  // 判断是否应该使用右侧布局（文章列表在右侧）
  const shouldUseRightLayout = () => {
    const route = router.route
    return route === '/' || 
           route === '/page/[page]' || 
           route === '/category/[category]' ||
           route === '/category/[category]/page/[page]' ||
           route === '/tag/[tag]' ||
           route === '/tag/[tag]/page/[page]' ||
           route === '/search/[keyword]' ||
           route === '/search/[keyword]/page/[page]' ||
           route === '/[prefix]/[slug]' || 
           siteConfig('HEO_HERO_BODY_REVERSE', false, CONFIG)
  }

  const headerSlot = (
    <header>
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 通知横幅 */}
      {router.route === '/' ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
      {fullWidth ? null : <PostHeader {...props} isDarkMode={isDarkMode} />}
    </header>
  )

  // 检测是否为文章详情页
  const isArticlePage = router.route === '/[prefix]/[slug]'
  
  // 左侧栏 仅文章详情页显示目录
  const slotLeft = isArticlePage && !fullWidth ? <SideLeft {...props} /> : null
  
  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  // 根据是否为文章详情页调整最大宽度
  const maxWidth = fullWidth 
    ? 'max-w-[96rem] mx-auto' 
    : isArticlePage 
      ? 'max-w-[90rem]' // 文章详情页三列布局需要更大宽度
      : 'max-w-[75rem]' // 其他页面保持原有宽度

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  // 加载wow动画
  useEffect(() => {
    loadWowJS()
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        {isArticlePage && !fullWidth ? (
          // 文章详情页三列布局
          <div
            id='container-inner'
            className='w-full mx-auto xl:flex justify-center items-start relative z-10 min-h-screen gap-2'>
            {/* 左侧目录栏 */}
            <div className='hidden xl:block w-72 flex-shrink-0 self-stretch'>
              <div className='sticky top-0 h-screen overflow-hidden'>
                {slotLeft}
              </div>
            </div>

            {/* 中间内容区域 */}
            <div className={`flex-1 max-w-4xl min-h-screen ${className || ''}`}>
              {/* 主区上部嵌入 */}
              {slotTop}
              {children}
            </div>

            {/* 右侧信息栏 */}
            <div className='hidden xl:block w-80 flex-shrink-0 self-stretch'>
              <div className='sticky top-0 h-screen overflow-hidden'>
                {slotRight}
              </div>
            </div>
          </div>
        ) : (
          // 其他页面保持原有两列布局
          <div
            id='container-inner'
            className={`${shouldUseRightLayout() ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center items-start relative z-10 min-h-screen`}>
            <div className={`flex-1 max-w-3xl min-h-screen ${className || ''}`}>
              {/* 主区上部嵌入 */}
              {slotTop}
              {children}
            </div>

            <div className='lg:w-2'></div>

            <div className='hidden xl:block w-80 flex-shrink-0 self-stretch'>
              <div className='sticky top-0 min-h-screen'>
                {/* 主区快右侧 */}
                {slotRight}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* 统一容器 - 包含分类条、文章列表和分页 */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                      border border-gray-200/50 dark:border-gray-700/50
                      rounded-xl
                      hover:border-indigo-600 dark:hover:border-yellow-600 duration-200
                      overflow-hidden">
        {/* 文章分类条 */}
        <div className="px-6 pt-4 pb-4">
          <CategoryBar {...props} />
        </div>
        
        {/* 文章列表 */}
        <div className="px-6 pb-6">
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* 统一容器 - 包含分类条、文章列表和分页 */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
                      border border-gray-200/50 dark:border-gray-700/50
                      rounded-xl
                      hover:border-indigo-600 dark:hover:border-yellow-600 duration-200
                      overflow-hidden">
        {/* 文章分类条 */}
        <div className="px-6 pt-4 pb-4">
          <CategoryBar {...props} />
        </div>
        
        {/* 文章列表 */}
        <div className="px-6 pb-6">
          {siteConfig('POST_LIST_STYLE') === 'page' ? (
            <BlogPostListPage {...props} />
          ) : (
            <BlogPostListScroll {...props} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [])
  return (
    <div currentSearch={currentSearch}>
      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  // 归档页顶部显示条，如果是默认归档则不显示。分类详情页显示分类列表，标签详情页显示当前标签

  return (
    <div className='p-8 rounded-2xl border border-white/20 dark:border-gray-700/30 max-w-6xl w-full 
                    bg-white/70 dark:bg-gray-900/70 backdrop-blur-md
                    shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40'>
      {/* 文章分类条 */}
      <CategoryBar {...props} border={false} />

      <div className='mt-6'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
            siteInfo={props.siteInfo}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const [hasCode, setHasCode] = useState(false)

  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-3xl mx-auto'} ${hasCode ? 'xl:w-[55vw] mx-auto' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
        {/* 文章锁 */}
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='mx-auto md:w-full'>
            {/* 文章主体 */}
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'>
              {/* Notion文章主体 */}
              <section
                className='wow fadeInUp p-5 justify-center mx-auto max-w-none'
                data-wow-delay='.2s'>
                <AISummary aiSummary={post.aiSummary}/>
                <WWAds orientation='horizontal' className='w-full' />
                {post && <NotionPage post={post} />}
                <WWAds orientation='horizontal' className='w-full' />
              </section>

              {/* 上一篇\下一篇文章 */}
              <PostAdjacent {...props} />

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <div className='px-5'>
                  {/* 版权 */}
                  <PostCopyright {...props} />
                  {/* 文章推荐 */}
                  <PostRecommend {...props} />
                </div>
              )}
            </article>

            {/* 评论区 */}
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                {/* 评论区上方广告 */}
                <div className='py-2'>
                  <AdSlot />
                </div>
                {/* 评论互动 */}
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  // const { meta, siteInfo } = props
  const { onLoading, fullWidth } = useGlobal()
  return (
    <>
      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-16'
            unmount={false}>
            {/* 404卡牌 */}
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
              {/* 左侧动图 */}
              <LazyImage
                className='error-img h-60 md:h-full p-4'
                src={
                  'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
                }></LazyImage>

              {/* 右侧文字 */}
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
                  404
                </h1>
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
                <Link href='/'>
                  <button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>
                    回到主页
                  </button>
                </Link>
              </div>
            </div>

            {/* 404页面底部显示最新文章 */}
            <div className='mt-12'>
              <LatestPostsGroup {...props} />
            </div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0 max-w-6xl mx-auto'>
      {/* 精致的标题区域 */}
      <div className='mb-12 text-center'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <div className='w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 dark:from-yellow-400 dark:to-orange-400 rounded-full'></div>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200'>
            {locale.COMMON.CATEGORY}
          </h1>
          <div className='w-1 h-12 bg-gradient-to-b from-purple-500 to-blue-500 dark:from-orange-400 dark:to-yellow-400 rounded-full'></div>
        </div>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          探索不同主题的精彩内容
        </p>
      </div>

      {/* 分类卡片网格 */}
      <div
        id='category-list'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {categoryOptions?.map(category => {
          return (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              className='block group'>
              <div className='relative overflow-hidden rounded-2xl 
                            bg-white/70 dark:bg-gray-900/70 
                            backdrop-blur-md border border-white/20 dark:border-gray-700/30
                            shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40
                            hover:shadow-2xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/60
                            hover:scale-[1.02] hover:-translate-y-1
                            transition-all duration-500 ease-out
                            cursor-pointer p-6'>
                
                {/* 背景装饰渐变 */}
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-yellow-400/5 dark:to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                
                {/* 内容区域 */}
                <div className='relative z-10'>
                  {/* 图标区域 */}
                  <div className='flex items-center justify-center w-16 h-16 mb-4 mx-auto
                                bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-yellow-400/10 dark:to-orange-400/10
                                rounded-2xl group-hover:scale-110 transition-transform duration-300'>
                    <HashTag className='w-8 h-8 text-blue-600 dark:text-yellow-400 
                                      group-hover:text-blue-700 dark:group-hover:text-yellow-300
                                      transition-colors duration-300' />
                  </div>
                  
                  {/* 分类名称 */}
                  <h3 className='text-xl font-bold text-center mb-3
                               text-gray-800 dark:text-gray-200
                               group-hover:text-blue-600 dark:group-hover:text-yellow-400
                               transition-colors duration-300'>
                    {category.name}
                  </h3>
                  
                  {/* 文章数量 */}
                  <div className='flex items-center justify-center'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                   bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400
                                   group-hover:bg-blue-100/80 dark:group-hover:bg-yellow-400/20
                                   group-hover:text-blue-700 dark:group-hover:text-yellow-500
                                   transition-all duration-300'>
                      <i className='fas fa-file-alt mr-2 text-xs opacity-70'></i>
                      {category.count} 篇文章
                    </span>
                  </div>
                </div>

                {/* 精致的边框光效 */}
                <div className='absolute inset-0 rounded-2xl border border-transparent 
                              group-hover:border-blue-500/20 dark:group-hover:border-yellow-400/20 
                              transition-colors duration-500'></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 底部装饰 */}
      <div className='mt-16 text-center'>
        <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-yellow-400 dark:to-orange-400 rounded-full mx-auto'></div>
      </div>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  // 按文章数量排序标签
  const sortedTags = tagOptions.sort((a, b) => b.count - a.count)

  return (
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0 max-w-7xl mx-auto'>
      {/* 精致的标题区域 */}
      <div className='mb-12 text-center'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <div className='w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 dark:from-orange-400 dark:to-red-400 rounded-full'></div>
          <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200'>
            {locale.COMMON.TAGS}
          </h1>
          <div className='w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-500 dark:from-red-400 dark:to-orange-400 rounded-full'></div>
        </div>
        <p className='text-gray-600 dark:text-gray-400 text-lg'>
          发现感兴趣的标签，探索相关文章
        </p>
      </div>

      {/* 标签云 - 瀑布流布局 */}
      <div
        id='tag-list'
        className='flex flex-wrap gap-3 justify-center'>
        {sortedTags.map((tag, index) => {
          // 根据文章数量动态调整标签大小
          const getTagSize = (count) => {
            if (count >= 10) return 'large'
            if (count >= 5) return 'medium'
            if (count >= 3) return 'small'
            return 'tiny'
          }
          
          const tagSize = getTagSize(tag.count)
          const sizeClasses = {
            large: 'text-lg px-6 py-3',
            medium: 'text-base px-5 py-2.5',
            small: 'text-sm px-4 py-2',
            tiny: 'text-xs px-3 py-1.5'
          }
          
          // 动态颜色主题
          const colorThemes = [
            'from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400',
            'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400',
            'from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400',
            'from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400',
            'from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400',
            'from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400',
            'from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400',
            'from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400'
          ]
          
          const colorTheme = colorThemes[index % colorThemes.length]
          
          return (
            <Link
              key={tag.name}
              href={`/tag/${tag.name}`}
              className='inline-block group'>
              <div className={`relative overflow-hidden rounded-2xl 
                            bg-white/70 dark:bg-gray-900/70 
                            backdrop-blur-sm border border-white/20 dark:border-gray-700/30
                            shadow-md shadow-gray-200/20 dark:shadow-gray-900/40
                            hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/60
                            hover:scale-105 hover:-translate-y-1
                            transition-all duration-300 ease-out
                            cursor-pointer ${sizeClasses[tagSize]}
                            font-medium`}>
                
                {/* 渐变背景装饰 */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colorTheme} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* 内容区域 */}
                <div className='relative z-10 flex items-center gap-2'>
                  {/* 标签图标 */}
                  <HashTag className={`${tagSize === 'large' ? 'w-5 h-5' : tagSize === 'medium' ? 'w-4 h-4' : 'w-3 h-3'} 
                                     text-gray-500 dark:text-gray-400 
                                     group-hover:text-gray-700 dark:group-hover:text-gray-300
                                     transition-colors duration-300`} />
                  
                  {/* 标签名称 */}
                  <span className='text-gray-700 dark:text-gray-300 
                                 group-hover:text-gray-900 dark:group-hover:text-white
                                 transition-colors duration-300 font-medium'>
                    {tag.name}
                  </span>
                  
                  {/* 文章数量 */}
                  <span className={`inline-flex items-center justify-center 
                                  ${tagSize === 'large' ? 'w-6 h-6 text-xs' : tagSize === 'medium' ? 'w-5 h-5 text-xs' : 'w-4 h-4 text-xs'}
                                  bg-gray-200/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400
                                  group-hover:bg-gray-300/80 dark:group-hover:bg-gray-600/80
                                  group-hover:text-gray-800 dark:group-hover:text-gray-200
                                  rounded-full font-bold transition-all duration-300`}>
                    {tag.count}
                  </span>
                </div>

                {/* 精致的边框光效 */}
                <div className={`absolute inset-0 rounded-2xl border border-transparent 
                              group-hover:border-gradient group-hover:bg-gradient-to-r group-hover:${colorTheme}
                              group-hover:border-opacity-20 transition-all duration-300`}></div>
                
                {/* 微妙的内阴影效果 */}
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 dark:ring-gray-700/20 
                              group-hover:ring-white/20 dark:group-hover:ring-gray-600/30 
                              transition-all duration-300'></div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 统计信息 */}
      <div className='mt-16 text-center'>
        <div className='inline-flex items-center gap-4 px-6 py-3 
                      bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm 
                      border border-white/20 dark:border-gray-700/30 
                      rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40'>
          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
            <i className='fas fa-tags text-purple-500 dark:text-orange-400'></i>
            <span className='text-sm font-medium'>
              共 {tagOptions.length} 个标签
            </span>
          </div>
          <div className='w-px h-4 bg-gray-300 dark:bg-gray-600'></div>
          <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
            <i className='fas fa-file-alt text-blue-500 dark:text-cyan-400'></i>
            <span className='text-sm font-medium'>
              共 {tagOptions.reduce((total, tag) => total + tag.count, 0)} 篇文章
            </span>
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className='mt-12 text-center'>
        <div className='w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-orange-400 dark:to-red-400 rounded-full mx-auto'></div>
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
