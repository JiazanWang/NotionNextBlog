// import Image from 'next/image'
import { ArrowSmallRight, PlusSmall } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 顶部英雄区
 * 左右布局，
 * 左侧：banner组
 * 右侧：今日卡牌遮罩
 * @returns
 */
const Hero = props => {
  const HEO_HERO_REVERSE = siteConfig('HEO_HERO_REVERSE', false, CONFIG)
  return (
    <div
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-2 -mt-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${HEO_HERO_REVERSE ? 'xl:flex-row-reverse' : ''}
           recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] overflow-x-scroll w-full mx-auto flex-row flex-nowrap flex relative gap-2`}>
        {/* 左侧banner组 - 移动端隐藏 */}
        <div className='hidden md:flex md:w-[400px] lg:w-[480px] xl:w-[520px] 2xl:w-[560px] flex-shrink-0'>
          <BannerGroup {...props} />
        </div>

        {/* 右侧置顶文章组 - 移动端占满整个宽度 */}
        <div className='flex-1 min-w-0'>
          <TopGroup {...props} />
        </div>
      </div>
    </div>
  )
}

/**
 * 英雄区左侧banner组
 * @returns
 */
function BannerGroup(props) {
  return (
    // 左侧英雄区
    <div
      id='bannerGroup'
      className='flex flex-col justify-between w-full h-full'>
      {/* 动图 */}
      <Banner {...props} />
      {/* 导航分类 */}
      <GroupMenu />
    </div>
  )
}

/**
 * 英雄区左上角banner动图
 * @returns
 */
function Banner(props) {
  const router = useRouter()
  const { allNavPages } = props
  /**
   * 随机跳转文章
   */
  function handleClickBanner() {
    const randomIndex = Math.floor(Math.random() * allNavPages.length)
    const randomPost = allNavPages[randomIndex]
    router.push(`${siteConfig('SUB_PATH', '')}/${randomPost?.slug}`)
  }

  // 遮罩文字
  const coverTitle = siteConfig('HEO_HERO_COVER_TITLE')

  return (
    <div
      id='banners'
      onClick={handleClickBanner}
      className='hidden xl:flex xl:flex-col group h-full bg-white dark:bg-[#1e1e1e] rounded-xl border dark:border-gray-700 mb-1 relative overflow-hidden xl:w-full'>
      <div
        id='banner-title'
        className='z-10 flex flex-col absolute top-10 left-10'>
        <div className='text-4xl font-bold mb-3  dark:text-white'>
          {siteConfig('HEO_HERO_TITLE_1', null, CONFIG)}
          <br />
          {siteConfig('HEO_HERO_TITLE_2', null, CONFIG)}
        </div>
        <div className='text-xs text-gray-600  dark:text-gray-200'>
          {siteConfig('HEO_HERO_TITLE_3', null, CONFIG)}
        </div>
      </div>

      {/* 斜向滚动的图标 */}
      <TagsGroupBar />

      {/* 遮罩 */}
      <div
        id='banner-cover'
        style={{ backdropFilter: 'blur(15px)' }}
        className={
          'z-20 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 duration-300 transition-all bg-[#4259efdd] dark:bg-[#dca846] dark:text-white cursor-pointer absolute w-full h-full top-0 flex justify-center items-center'
        }>
        <div className='-translate-x-32 group-hover:translate-x-0 duration-300 transition-all ease-in'>
          <div className='text-7xl text-white font-extrabold'>{coverTitle}</div>
        </div>
      </div>
    </div>
  )
}

/**
 * 图标滚动标签组
 * 英雄区左上角banner条中斜向滚动的图标
 */
function TagsGroupBar() {
  let groupIcons = siteConfig('HEO_GROUP_ICONS', null, CONFIG)
  if (groupIcons) {
    groupIcons = groupIcons.concat(groupIcons)
  }
  return (
    <div className='tags-group-all flex -rotate-[40deg] h-full relative left-8'>
      <div className='tags-group-wrapper flex flex-nowrap absolute top-16'>
        {groupIcons?.map((g, index) => {
          return (
            <div key={index} className='tags-group-icon-pair ml-3 select-none'>
              <div
                style={{ background: g.color_1 }}
                className={
                  'tags-group-icon w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md'
                }>
                <LazyImage
                  priority={true}
                  src={g.img_1}
                  title={g.title_1}
                  className='w-2/3 hidden xl:block'
                />
              </div>
              <div
                style={{ background: g.color_2 }}
                className={
                  'tags-group-icon mt-2 w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md'
                }>
                <LazyImage
                  priority={true}
                  src={g.img_2}
                  title={g.title_2}
                  className='w-2/3 hidden xl:block'
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 英雄区左下角3个指定分类按钮
 * @returns
 */
function GroupMenu() {
  const url_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.url || ''
  const title_1 = siteConfig('HEO_HERO_CATEGORY_1', {}, CONFIG)?.title || ''
  const url_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.url || ''
  const title_2 = siteConfig('HEO_HERO_CATEGORY_2', {}, CONFIG)?.title || ''
  const url_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.url || ''
  const title_3 = siteConfig('HEO_HERO_CATEGORY_3', {}, CONFIG)?.title || ''

  return (
    <div className='h-[120px] select-none xl:h-14 flex flex-col justify-between xl:space-y-0 xl:flex-row w-24 lg:w-40 xl:w-full xl:flex-nowrap xl:space-x-2'>
      <Link
        href={url_1}
        className='group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 flex h-14 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold text-sm lg:text-base pl-4 relative -mt-1'>
          {title_1}
          <span className='absolute -bottom-0.5 left-4 w-4 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-4 duration-700 ease-in-out transition-all scale-[1.5] translate-y-4 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-star text-2xl'></i>
        </div>
      </Link>
      <Link
        href={url_2}
        className='group relative overflow-hidden bg-gradient-to-r from-red-500 to-yellow-500 flex h-14 justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold text-sm lg:text-base pl-4 relative -mt-1'>
          {title_2}
          <span className='absolute -bottom-0.5 left-4 w-4 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='hidden lg:block absolute right-4 duration-700 ease-in-out transition-all scale-[1.5] translate-y-4 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-fire-flame-curved text-2xl'></i>
        </div>
      </Link>
      {/* 第三个标签在小屏上不显示 */}
      <Link
        href={url_3}
        className='group relative overflow-hidden bg-gradient-to-r from-teal-300 to-cyan-300 hidden h-14 xl:flex justify-start items-center text-white rounded-xl xl:hover:w-1/2 xl:w-1/3 transition-all duration-500 ease-in'>
        <div className='font-bold text-base pl-4 relative -mt-1'>
          {title_3}
          <span className='absolute -bottom-0.5 left-4 w-4 h-0.5 bg-white rounded-full'></span>
        </div>
        <div className='absolute right-4 duration-700 ease-in-out transition-all scale-[1.5] translate-y-4 rotate-12 opacity-20 group-hover:opacity-80 group-hover:scale-100 group-hover:translate-y-0 group-hover:rotate-0'>
          <i className='fa-solid fa-book-bookmark text-2xl'></i>
        </div>
      </Link>
    </div>
  )
}

/**
 * 置顶文章区域
 */
function TopGroup(props) {
  const { latestPosts, allNavPages, siteInfo } = props
  const { locale } = useGlobal()

  // 获取置顶推荐文章
  const topPosts = getTopPosts({ latestPosts, allNavPages })

  // 复制文章列表实现无缝滚动
  const scrollPosts = topPosts ? [...topPosts, ...topPosts] : []

  // 根据文章数量计算动画时长,确保动画连贯
  const animationDuration = (topPosts?.length || 0) * 5

  return (
    <div
      id='hero-right-wrapper'
      className='w-full relative'>
      {/* 新增的毛玻璃容器 */}
      <div className='relative w-full h-[210px] rounded-xl bg-white/70 dark:bg-black/70 backdrop-blur-md border dark:border-gray-700 shadow-md flex overflow-hidden'>
        {/* 左侧竖排标题 - 移动端调整宽度 */}
        <div className='flex items-center justify-center bg-blue-500 px-2 md:px-3 lg:px-4 h-full flex-shrink-0'>
          <div 
            className='text-base md:text-lg lg:text-xl font-bold text-white tracking-wider'
            style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}>
            推荐文章
          </div>
        </div>
        
        {/* 右侧推荐文章滚动区域 */}
        <div className='flex-1 h-full overflow-hidden relative p-2 md:p-3 lg:p-4'>
          <div
            id='top-group'
            style={ animationDuration > 0 ? { animation: `scrollLeft ${animationDuration}s linear infinite` } : {} }
            className='flex flex-nowrap space-x-2 md:space-x-3 lg:space-x-4 absolute h-full'>
            {scrollPosts?.map((p, index) => {
              return (
                <Link href={`${siteConfig('SUB_PATH', '')}/${p?.slug}`} key={`${p?.id}-${index}`}>
                  <div className='cursor-pointer h-full group relative flex flex-col w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-80 flex-shrink-0 overflow-hidden shadow bg-white dark:bg-black dark:text-white rounded-xl hover:scale-105 transition-transform duration-300'>
                    <LazyImage
                      priority={index === 0}
                      className='h-24 md:h-28 lg:h-32 object-cover'
                      alt={p?.title}
                      src={p?.pageCoverThumbnail || siteInfo?.pageCover}
                    />
                    <div className='group-hover:text-indigo-600 dark:group-hover:text-yellow-600 line-clamp-1 overflow-hidden m-2 md:m-3 font-semibold text-sm md:text-base'>
                      {p?.title}
                    </div>
                    {/* hover 悬浮的 '荐' 字 */}
                    <div className='opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-200 transition-all absolute -top-2 -left-2 bg-indigo-600 dark:bg-yellow-600  text-white rounded-xl overflow-hidden pr-2 pb-2 pl-4 pt-4 text-xs'>
                      {locale.COMMON.RECOMMEND_BADGES}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {/* CSS动画样式 */}
      <style jsx>{`
        #top-group:hover {
          animation-play-state: paused;
        }
        
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

/**
 * 获取推荐置顶文章
 */
function getTopPosts({ latestPosts, allNavPages }) {
  // 默认展示最近更新
  if (
    !siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) ||
    siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) === ''
  ) {
    return latestPosts
  }

  // 显示包含'推荐'标签的文章
  let sortPosts = []

  // 排序方式
  if (
    JSON.parse(
      siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', null, CONFIG)
    )
  ) {
    sortPosts = Object.create(allNavPages).sort((a, b) => {
      const dateA = new Date(a?.lastEditedDate)
      const dateB = new Date(b?.lastEditedDate)
      return dateB - dateA
    })
  } else {
    sortPosts = Object.create(allNavPages)
  }

  const topPosts = []
  for (const post of sortPosts) {
    // 查找标签
    if (
      post?.tags?.indexOf(
        siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG)
      ) >= 0
    ) {
      topPosts.push(post)
    }
  }
  return topPosts
}

export default Hero
