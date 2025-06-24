import FlipCard from '@/components/FlipCard'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'

/**
 * 交流频道
 * @returns
 */
export default function TouchMeCard() {
  if (!JSON.parse(siteConfig('HEO_SOCIAL_CARD', null, CONFIG))) {
    return <></>
  }
  return (
    <div className={'relative h-28 text-gray-900 dark:text-white flex flex-col'}>
      <FlipCard
        className='cursor-pointer lg:p-6 p-4 border border-gray-200/50 dark:border-gray-700/50 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-indigo-600 dark:hover:border-yellow-600 transition-all duration-300 ease-out'
        frontContent={
          <div className='h-full'>
            <h2 className='font-[1000] text-3xl text-gray-900 dark:text-white'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_1', null, CONFIG)}
            </h2>
            <h3 className='pt-2 text-gray-700 dark:text-gray-200'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_2', null, CONFIG)}
            </h3>
            <div
              className='absolute left-0 top-0 w-full h-full opacity-10 dark:opacity-20'
              style={{
                background:
                  'url(https://bu.dusays.com/2023/05/16/64633c4cd36a9.png) center center no-repeat'
              }}></div>
          </div>
        }
        backContent={
          <Link href={siteConfig('HEO_SOCIAL_CARD_URL', null, CONFIG)}>
            <div className='font-[1000] text-xl h-full text-gray-900 dark:text-white'>
              {siteConfig('HEO_SOCIAL_CARD_TITLE_3', null, CONFIG)}
            </div>
          </Link>
        }
      />
    </div>
  )
}
