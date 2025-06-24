import Live2D from '@/components/Live2D'
import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import { AnalyticsCard } from './AnalyticsCard'
import Card from './Card'
import Catalog from './Catalog'
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
  const { post, tagOptions, currentTag, rightAreaSlot } = props
  const infoCardRef = useRef(null)
  const catalogRef = useRef(null)
  const sideRightParentRef = useRef(null)
  const [catalogStyle, setCatalogStyle] = useState({})

  // 只摘取标签的前60个，防止右侧过长
  const sortedTags = tagOptions?.slice(0, 60) || []

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const infoCard = infoCardRef.current
          const catalog = catalogRef.current
          const sideRightParent = sideRightParentRef.current

          if (!infoCard || !catalog || !sideRightParent) {
            ticking = false
            return
          }

          const infoCardRect = infoCard.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const documentHeight = document.documentElement.scrollHeight
          const catalogHeight = catalog.offsetHeight

          // 判断InfoCard是否完全滚出视野
          const infoCardScrolledOut = infoCardRect.bottom <= 20

          if (infoCardScrolledOut) {
            // InfoCard已滚出，开始智能定位
            
            // 计算剩余滚动距离（到页面底部）
            const remainingScroll = documentHeight - scrollTop - windowHeight
            
            // 如果剩余滚动距离小于目录高度，则开始同步滚动
            if (remainingScroll <= catalogHeight) {
              // 同步滚动阶段：目录向上偏移，与页面底部对齐
              const offset = catalogHeight - remainingScroll
              setCatalogStyle({
                position: 'sticky',
                top: Math.max(20 - offset, 20 - catalogHeight + windowHeight - 40),
                transition: 'top 0.1s ease-out'
              })
            } else {
              // 固定阶段：目录固定在顶部
              setCatalogStyle({
                position: 'sticky',
                top: 20,
                transition: 'top 0.3s ease-out'
              })
            }
          } else {
            // InfoCard还在视野内，目录正常流
            setCatalogStyle({
              position: 'static',
              transition: 'top 0.3s ease-out'
            })
          }

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
  }, [post])

  return (
    <div 
      id='sideRight' 
      ref={sideRightParentRef}
      className='hidden xl:block w-80 h-full relative'
      style={{ minHeight: '100vh' }}
    >
      {/* InfoCard - 正常滚动 */}
      <div ref={infoCardRef} className="space-y-2">
        <InfoCard {...props} className='w-80 wow fadeInUp' />
      </div>

      {/* 目录区 - 智能定位 */}
      <div 
        ref={catalogRef}
        style={catalogStyle}
        className="space-y-2 mt-2"
      >
        {/* 文章页显示目录 */}
        {post && post.toc && post.toc.length > 0 && (
          <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white shadow-2xl wow fadeInUp'>
            <Catalog toc={post.toc} />
          </Card>
        )}

        {/* 联系交流群 */}
        <div className='wow fadeInUp'>
          <TouchMeCard />
        </div>

        {/* 最新文章列表 */}
        <div
          className={
            'border border-gray-200/50 dark:border-gray-700/50 wow fadeInUp hover:border-indigo-600 dark:hover:border-yellow-600 duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-900 dark:text-white rounded-xl lg:p-6 p-4 hidden lg:block shadow-2xl'
          }>
          <LatestPostsGroupMini {...props} />
        </div>

        {rightAreaSlot}

        <FaceBookPage />
        <Live2D />

        {/* 标签和成绩 */}
        <Card
          className={
            'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white shadow-2xl hover:border-indigo-600 dark:hover:border-yellow-600 duration-200'
          }>
          <TagGroups tags={sortedTags} currentTag={currentTag} />
          <hr className='mx-1 flex border-dashed relative my-4' />
          <AnalyticsCard {...props} />
        </Card>
      </div>
    </div>
  )
}
