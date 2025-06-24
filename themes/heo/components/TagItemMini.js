import { HashTag } from '@/components/HeroIcons'
import Link from 'next/link'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <Link
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className="group inline-block"
    >
      <div className={`
        inline-flex items-center space-x-0.5 px-1 py-0.5 text-xs font-medium rounded transition-all duration-300
        ${selected 
          ? 'bg-indigo-500 dark:bg-yellow-500 text-white dark:text-gray-900' 
          : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-yellow-100/20 hover:text-indigo-700 dark:hover:text-yellow-600'
        }
        hover:scale-105 border border-gray-200/30 dark:border-gray-600/30
      `}>
        <HashTag className='w-2 h-2' />
        <span className="whitespace-nowrap text-xs">
          {tag.name}
          {tag.count && (
            <span className="ml-0.5 opacity-75 text-xs">
              {tag.count}
            </span>
          )}
        </span>
      </div>
    </Link>
  )
}

export default TagItemMini
