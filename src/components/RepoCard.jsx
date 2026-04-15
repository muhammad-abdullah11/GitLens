import { FiStar, FiGitBranch, FiExternalLink, FiActivity } from 'react-icons/fi'
import { VscCircleFilled } from 'react-icons/vsc'

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
}

const badgeStyles = {
  starred: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
}

export default function RepoCard({ repo, badge, recentCommits }) {
  const s = badge ? badgeStyles[badge.type] : null
  return (
    <a
      href={repo.html_url}
      target="_blank"
      className="group relative flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
    >
      {badge && (
        <span
          className={`absolute right-4 top-4 flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text} ${s.border}`}
        >
          {badge.label}
        </span>
      )}

      <div className="flex items-start justify-between gap-2 pr-24">
        <h3 className="truncate font-semibold text-blue-600 group-hover:text-blue-700">
          {repo.name}
        </h3>
        <FiExternalLink className="mt-0.5 shrink-0 text-xs text-gray-300 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {repo.description ? (
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{repo.description}</p>
      ) : (
        <p className="text-sm italic text-gray-300">No description</p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1 font-medium text-gray-500">
            <VscCircleFilled style={{ color: langColors[repo.language] || '#8b949e' }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiStar className="text-gray-400" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch className="text-gray-300" />
          {repo.forks_count.toLocaleString()}
        </span>
        {recentCommits > 0 && (
          <span className="flex items-center gap-1 font-medium text-blue-500 ml-auto">
            <FiActivity /> {recentCommits} recent commits
          </span>
        )}
      </div>
    </a>
  )
}
