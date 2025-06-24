import { useState, useEffect, useRef } from 'react'
import Card from './Card'
import Catalog from './Catalog'

/**
 * 文章详情页左侧栏 - 仅显示目录
 * @param {*} props
 * @returns
 */
export default function SideLeft(props) {
  const { post } = props
  const [isFixed, setIsFixed] = useState(false)
  const [leftPosition, setLeftPosition] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动距离超过200px时，固定目录位置（大概是页面标题区域滚出后）
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const triggerPoint = 200
      
      if (scrollTop > triggerPoint && !isFixed) {
        // 计算当前容器的左边距
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setLeftPosition(rect.left)
        }
        setIsFixed(true)
      } else if (scrollTop <= triggerPoint && isFixed) {
        setIsFixed(false)
      }
    }

    // 处理窗口大小变化
    const handleResize = () => {
      if (isFixed && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setLeftPosition(rect.left)
      }
    }

    // 添加事件监听
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    // 初始检查
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [isFixed])

  // 只在有目录且是文章页时显示
  if (!post || !post.toc || post.toc.length === 0) {
    return null
  }

  return (
    <div 
      id='sideLeft' 
      ref={containerRef}
      className='hidden xl:block w-72 h-full relative'
      style={{ minHeight: '100vh' }}
    >
      {/* 目录区 - 动态定位 */}
      <div 
        className={`transition-all duration-300 ease-out ${
          isFixed 
            ? 'fixed top-16 z-40 w-72' // 固定在左上角，稍微靠上
            : 'sticky top-24' // 初始时跟随滚动
        }`}
        style={isFixed ? { left: `${leftPosition}px` } : {}}
      >
        {/* 文章目录 */}
        <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-indigo-600 dark:hover:border-yellow-600 transition-all duration-300 ease-out cursor-pointer wow fadeInUp'>
          <Catalog toc={post.toc} />
        </Card>
      </div>
      
      {/* 占位元素，当目录固定时保持布局稳定 */}
      {isFixed && (
        <div className="w-72 h-0" />
      )}
    </div>
  )
} 