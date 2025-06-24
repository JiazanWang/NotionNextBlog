import Live2D from '@/components/Live2D'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { AnalyticsCard } from './AnalyticsCard'
import Card from './Card'
import { InfoCard } from './InfoCard'
import LatestPostsGroupMini from './LatestPostsGroupMini'
import TagGroups from './TagGroups'
import TouchMeCard from './TouchMeCard'

const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const { tagOptions, currentTag, rightAreaSlot } = props
  const [scrollOffset, setScrollOffset] = useState(0)
  const sideRightRef = useRef(null)
  const containerRef = useRef(null)

  // 只摘取标签的前60个，防止右侧过长
  const sortedTags = tagOptions?.slice(0, 60) || []

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sideRight = sideRightRef.current
          const container = containerRef.current
          
          if (!sideRight || !container) {
            ticking = false
            return
          }

          // 获取文章内容区域
          const articleWrapper = document.getElementById('article-wrapper') || 
                                document.querySelector('.article') || 
                                document.querySelector('[id*="article"]')
          
          if (!articleWrapper) {
            ticking = false
            return
          }

          // 获取文章滚动信息
          const articleRect = articleWrapper.getBoundingClientRect()
          const articleTop = articleWrapper.offsetTop
          const articleHeight = articleWrapper.scrollHeight
          const windowHeight = window.innerHeight
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          
          // 计算文章的滚动进度（0 到 1）
          const articleStart = articleTop - windowHeight * 0.1 // 文章开始显示时
          const articleEnd = articleTop + articleHeight - windowHeight * 0.9 // 文章结束时
          const articleScrollRange = articleEnd - articleStart
          
          let articleScrollPercent = 0
          if (articleScrollRange > 0) {
            articleScrollPercent = Math.min(Math.max((scrollTop - articleStart) / articleScrollRange, 0), 1)
          }
          
          // 获取右侧栏信息
          const sideRightContentHeight = sideRight.scrollHeight
          const sideRightVisibleHeight = container.clientHeight
          
          // 计算右侧栏需要移动的距离，基于文章滚动进度
          const maxOffset = Math.max(sideRightContentHeight - sideRightVisibleHeight, 0)
          const targetOffset = maxOffset * articleScrollPercent
          
          // 调试信息
          console.log('Article Scroll Debug:', {
            articleScrollPercent: (articleScrollPercent * 100).toFixed(1) + '%',
            scrollTop,
            articleStart,
            articleEnd,
            articleHeight,
            sideContentHeight: sideRightContentHeight,
            sideVisibleHeight: sideRightVisibleHeight,
            maxOffset,
            targetOffset: targetOffset.toFixed(1)
          })
          
          // 应用同步滚动偏移
          setScrollOffset(-targetOffset)

          ticking = false
        })
        ticking = true
      }
    }

    // 添加滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    // 初始计算
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div 
      id='sideRight' 
      ref={containerRef}
      className='w-full h-full relative overflow-hidden'
    >
      {/* 信息卡片区域 - 同步滚动 */}
      <div 
        ref={sideRightRef}
        className="space-y-2 transition-transform duration-100 ease-out h-full"
        style={{ 
          transform: `translateY(${scrollOffset}px)`,
        }}
      >
        {/* 个人信息卡片 */}
        <InfoCard {...props} className='w-80 wow fadeInUp' />

        {/* 联系交流群 */}
        <div className='wow fadeInUp'>
          <TouchMeCard />
        </div>

        {/* 最新文章列表 */}
        <div
          className={
            'border border-gray-200/50 dark:border-gray-700/50 wow fadeInUp hover:border-indigo-600 dark:hover:border-yellow-600 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-xl lg:p-6 p-4 hidden lg:block'
          }>
          <LatestPostsGroupMini {...props} />
        </div>

        {rightAreaSlot}

        <FaceBookPage />
        <Live2D />

        {/* 标签和成绩 */}
        <div
          className={
            'border border-gray-200/50 dark:border-gray-700/50 wow fadeInUp hover:border-indigo-600 dark:hover:border-yellow-600 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-xl lg:p-6 p-4'
          }>
          <TagGroups tags={sortedTags} currentTag={currentTag} />
          <hr className='mx-1 flex border-dashed relative my-4' />
          <AnalyticsCard {...props} />
        </div>
      </div>
    </div>
  )
}
