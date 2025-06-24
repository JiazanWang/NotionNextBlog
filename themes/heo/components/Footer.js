import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'
/**
 * 页脚
 * @returns
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BIO = siteConfig('BIO')
  return (
    <footer className='relative flex-shrink-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 justify-center text-center m-auto w-full leading-6 text-gray-600 dark:text-gray-100 text-sm'>
      {/* 精致的渐变过渡区 */}
      <div
        id='color-transition'
        className='h-6 bg-gradient-to-b from-transparent via-gray-100/30 to-gray-200/50 dark:from-transparent dark:via-gray-800/30 dark:to-gray-700/50'
      />

      {/* 主要页脚内容 */}
      <div
        id='footer-bottom'
        className='relative w-full flex flex-col py-4 px-6 lg:flex-row justify-between items-center 
                   bg-white/70 dark:bg-gray-900/70 backdrop-blur-md 
                   border-t border-white/20 dark:border-gray-700/30
                   shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40
                   gap-3 lg:gap-6'>
        
        {/* 背景装饰渐变 */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 dark:from-yellow-400/3 dark:via-orange-400/3 dark:to-red-400/3'></div>
        
        {/* 左侧：版权信息 */}
        <div id='footer-bottom-left' className='relative z-10 text-center lg:text-start flex-1 lg:flex-none'>
          <div className='space-y-1'>
            <div className='flex items-center justify-center lg:justify-start gap-2 text-sm'>
              <i className='fas fa-code text-blue-500 dark:text-yellow-400 opacity-70'></i>
              <PoweredBy />
            </div>
            <div className='flex items-center justify-center lg:justify-start gap-2 text-xs opacity-80'>
              <i className='fas fa-copyright text-gray-500 dark:text-gray-400'></i>
              <CopyRightDate />
              <a
                href={'/about'}
                className='hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200 font-medium'>
                {siteConfig('AUTHOR')}
              </a>
              {BIO && <span className='mx-1 opacity-60'> | {BIO}</span>}
            </div>
          </div>
        </div>

        {/* 中间：社交按钮 */}
        <div id='footer-bottom-center' className='relative z-10 flex justify-center'>
          <div className='p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm 
                         border border-white/30 dark:border-gray-700/30
                         shadow-md shadow-gray-200/20 dark:shadow-gray-900/30
                         hover:shadow-lg hover:shadow-gray-200/30 dark:hover:shadow-gray-900/50
                         transition-all duration-300'>
            <SocialButton />
          </div>
        </div>

        {/* 右侧：备案和统计信息 */}
        <div id='footer-bottom-right' className='relative z-10 text-center lg:text-end flex-1 lg:flex-none'>
          <div className='space-y-1'>
            {/* 备案信息 */}
            {BEI_AN && (
              <div className='flex items-center justify-center lg:justify-end gap-2 text-xs'>
                <i className='fas fa-shield-alt text-green-500 dark:text-emerald-400 opacity-70' />
                <a href='https://beian.miit.gov.cn/' 
                   className='hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200'>
                  {siteConfig('BEI_AN')}
                </a>
              </div>
            )}
            <div className='flex items-center justify-center lg:justify-end gap-1'>
              <BeiAnGongAn />
            </div>

            {/* 访问统计 */}
            <div className='flex items-center justify-center lg:justify-end gap-3 text-xs opacity-70'>
              <span className='hidden busuanzi_container_site_pv flex items-center gap-1'>
                <i className='fas fa-eye text-purple-500 dark:text-pink-400' />
                <span className='busuanzi_value_site_pv'></span>
              </span>
              <span className='hidden busuanzi_container_site_uv flex items-center gap-1'>
                <i className='fas fa-users text-orange-500 dark:text-cyan-400' />
                <span className='busuanzi_value_site_uv'></span>
              </span>
            </div>
          </div>
        </div>

        {/* 精致的边框光效 */}
        <div className='absolute inset-0 rounded-none border border-transparent 
                      bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-yellow-400/10 dark:via-orange-400/10 dark:to-red-400/10
                      opacity-0 hover:opacity-100 transition-opacity duration-500'></div>
      </div>

           </footer>
  )
}

export default Footer
