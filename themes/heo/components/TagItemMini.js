import { HashTag } from '@/components/HeroIcons'
import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      onClick={(e) => e.stopPropagation()}
      passHref
      className="group inline-block"
    >
      <div className={`
        inline-flex items-center space-x-0.5 px-1.5 py-0.5 text-xs font-medium rounded-md 
        transition-all duration-200 backdrop-blur-sm border
        ${selected 
          ? 'bg-blue-500/80 dark:bg-yellow-500/80 text-white dark:text-gray-900 border-blue-500/40 dark:border-yellow-500/40 shadow-sm shadow-blue-500/20 dark:shadow-yellow-500/20' 
          : 'bg-gray-50/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200/30 dark:border-gray-700/30 hover:bg-blue-50/80 dark:hover:bg-yellow-400/5 hover:text-blue-600 dark:hover:text-yellow-500 hover:border-blue-300/40 dark:hover:border-yellow-400/40'
        }
        hover:scale-105 active:scale-95
      `}>
        <HashTag className='w-2 h-2 opacity-60' />
        <span className="whitespace-nowrap text-xs">
          {tag.name}
          {tag.count && (
            <span className="ml-0.5 opacity-50 text-xs">
              {tag.count}
            </span>
          )}
        </span>
      </div>
    </Link>
  )
}

export default TagItemMini
