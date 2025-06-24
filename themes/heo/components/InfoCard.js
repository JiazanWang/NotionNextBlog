import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
  return (
    <Card className='wow fadeInUp bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white flex flex-col w-80 overflow-hidden relative hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group'>
      <div className="info-card" style={{ color: '#111827' }}>
        {/* 信息卡牌第一行 */}
        <div className='flex justify-between'>
          {/* 问候语 */}
          <GreetingsWords />
          {/* 头像 */}
          <div
            className={`${isSlugPage ? 'absolute right-0 -mt-8 -mr-6 hover:opacity-0 hover:scale-150 blur' : 'cursor-pointer'} justify-center items-center flex transform transition-all duration-300 group-hover:scale-110`}>
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-full ring-2 ring-gray-300/50 dark:ring-white/30 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-400/30 dark:group-hover:ring-yellow-400/30'
              width={isSlugPage ? 100 : 28}
              alt={siteConfig('AUTHOR')}
            />
          </div>
        </div>

        <h2 className='text-3xl font-extrabold mt-3 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-yellow-500' style={{ color: '#111827' }}>{siteConfig('AUTHOR')}</h2>

        {/* 公告栏 */}
        <div className="announcement-content transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
          <Announcement post={notice} />
        </div>

        <div className='flex justify-between'>
          <div className='flex space-x-3'>
            {/* 两个社交按钮 */}
            {url1 && (
              <div className='w-10 text-center bg-gray-100/80 dark:bg-white/20 backdrop-blur-sm p-2 rounded-full border border-gray-300/50 dark:border-white/30 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-white/40 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg'>
                <Link href={url1}>
                  <i className={`${icon1} transition-all duration-300 hover:text-blue-600 dark:hover:text-yellow-500`} style={{ color: '#374151' }} />
                </Link>
              </div>
            )}
            {url2 && (
              <div className='bg-gray-100/80 dark:bg-white/20 backdrop-blur-sm p-2 rounded-full w-10 items-center flex justify-center border border-gray-300/50 dark:border-white/30 transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-white/40 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg'>
                <Link href={url2}>
                  <i className={`${icon2} transition-all duration-300 hover:text-blue-600 dark:hover:text-yellow-500`} style={{ color: '#374151' }} />
                </Link>
              </div>
            )}
          </div>
          {/* 第三个按钮 */}
          <MoreButton />
        </div>
      </div>
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <Link href={url3}>
      <div
        className={
          'group bg-gray-100/80 dark:bg-white/30 backdrop-blur-sm border border-gray-300/50 dark:border-white/40 hover:bg-gray-200/80 dark:hover:bg-white/50 hover:scale-105 flex items-center transition-all duration-200 py-2 px-3 rounded-full space-x-1'
        }
        style={{ color: '#374151' }}>
        <ArrowRightCircle
          className={
            'w-6 h-6 transition-all duration-100'
          }
          style={{ color: '#374151' }}
        />
        <div className='font-bold' style={{ color: '#374151' }}>{text3}</div>
      </div>
    </Link>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className='select-none cursor-pointer py-1 px-2 bg-gray-100/70 dark:bg-white/25 backdrop-blur-sm border border-gray-300/50 dark:border-white/30 hover:bg-gray-200/80 dark:hover:bg-white/40 hover:scale-105 text-sm rounded-lg duration-200 transition-all'
      style={{ color: '#374151' }}>
      {greeting}
    </div>
  )
}
