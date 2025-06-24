import Link from 'next/link'
import { useState } from 'react'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0

  if (!link || !link.show) {
    return null
  }

  return (
    <div
      className='relative'
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}>
      {/* 不含子菜单 */}
      {!hasSubMenu && (
        <Link
          target={link?.target}
          href={link?.href}
          className='group relative overflow-hidden rounded-xl mx-1 flex justify-center items-center px-4 py-2 no-underline tracking-widest transition-all duration-300 
                     hover:bg-white/20 dark:hover:bg-gray-800/30 
                     hover:backdrop-blur-md hover:border hover:border-white/20 dark:hover:border-gray-700/30 
                     hover:shadow-lg hover:shadow-gray-200/10 dark:hover:shadow-gray-900/20
                     hover:scale-105 active:scale-95'>
          <div className='relative z-10 flex items-center gap-2'>
            {link?.icon && <i className={`${link?.icon} text-gray-700 dark:text-gray-300`} />} 
            <span className='font-medium text-gray-700 dark:text-gray-300'>{link?.name}</span>
          </div>
          {/* 精致的背景光效 */}
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-yellow-400/10 dark:to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
        </Link>
      )}
      {/* 含子菜单的按钮 */}
      {hasSubMenu && (
        <>
          <div className='group relative overflow-hidden cursor-pointer rounded-xl mx-1 flex justify-center items-center px-4 py-2 no-underline tracking-widest transition-all duration-300
                          hover:bg-white/20 dark:hover:bg-gray-800/30 
                          hover:backdrop-blur-md hover:border hover:border-white/20 dark:hover:border-gray-700/30 
                          hover:shadow-lg hover:shadow-gray-200/10 dark:hover:shadow-gray-900/20
                          hover:scale-105 active:scale-95'>
            <div className='relative z-10 flex items-center gap-2'>
              {link?.icon && <i className={`${link?.icon} text-gray-700 dark:text-gray-300`} />} 
              <span className='font-medium text-gray-700 dark:text-gray-300'>{link?.name}</span>
              <i className='fas fa-chevron-down text-xs opacity-60 text-gray-700 dark:text-gray-300'></i>
            </div>
            {/* 精致的背景光效 */}
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-yellow-400/10 dark:to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
          </div>
          
          {/* 子菜单 */}
          <div
            className={`${show ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} 
                        absolute top-full left-0 mt-2 transition-all duration-300 ease-out z-50`}>
            <div className='bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 
                            rounded-2xl shadow-2xl shadow-gray-200/20 dark:shadow-gray-900/40 
                            p-2 w-44 overflow-hidden'>
              {link.subMenus?.map((subLink, index) => (
                <Link
                  key={index}
                  href={subLink.href}
                  target={subLink?.target}
                  className='group relative block px-4 py-3 no-underline rounded-xl transition-all duration-200
                             hover:bg-white/70 dark:hover:bg-gray-800/70 
                             hover:backdrop-blur-md hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-gray-900/30
                             hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]'>
                  <div className='relative z-10 flex items-center gap-3'>
                    {subLink?.icon && <i className={`${subLink.icon} opacity-70 group-hover:opacity-100 transition-opacity duration-200`} />}
                    <span className='font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white whitespace-nowrap transition-colors duration-200'>
                      {subLink?.name}
                    </span>
                  </div>
                  {/* 子菜单项的增强光效 */}
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-yellow-400/10 dark:to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl'></div>
                  {/* 额外的发光边框效果 */}
                  <div className='absolute inset-0 border border-transparent group-hover:border-blue-500/20 dark:group-hover:border-yellow-400/20 rounded-xl transition-colors duration-200'></div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
