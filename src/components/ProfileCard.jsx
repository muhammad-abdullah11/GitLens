import { FiMapPin, FiBriefcase, FiLink, FiTwitter, FiExternalLink } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

export default function ProfileCard({ user }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="h-28 w-28 rounded-2xl object-cover ring-4 ring-gray-100"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name || user.login}</h1>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <FaGithub className="text-gray-400 text-sm" />
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {user.login}
              </a>
              <FiExternalLink className="text-gray-300 text-xs" />
            </div>
          </div>
          {user.bio && (
            <p className="max-w-prose text-sm leading-relaxed text-gray-600">{user.bio}</p>
          )}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500 sm:justify-start">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-gray-400 shrink-0" />
                {user.location}
              </span>
            )}
            {user.company && (
              <span className="flex items-center gap-1.5">
                <FiBriefcase className="text-gray-400 shrink-0" />
                {user.company}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                className="flex items-center gap-1.5 text-blue-600 hover:underline"
              >
                <FiLink className="shrink-0" />
                {user.blog.replace(/^https?:\/\//, '')}
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                className="flex items-center gap-1.5 text-blue-600 hover:underline"
              >
                <FiTwitter className="shrink-0" />
                @{user.twitter_username}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
