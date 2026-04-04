import { FiCode, FiStar, FiZap, FiTrendingUp } from 'react-icons/fi'

function getMostUsedLanguage(repos) {
  const counts = {}
  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted.length > 0 ? { name: sorted[0][0], count: sorted[0][1], total: repos.filter(r => r.language).length } : null
}

function getActivityLevel(events) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 30)
  const count = events.filter(e => new Date(e.created_at) > cutoff).length
  if (count >= 21) return { label: 'High', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'bg-emerald-100', count }
  if (count >= 6) return { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: 'bg-amber-100', count }
  return { label: 'Low', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: 'bg-red-100', count }
}

export default function SmartInsights({ repos, events }) {
  const lang = getMostUsedLanguage(repos)
  const topRepo = repos.length > 0
    ? repos.reduce((a, b) => (a.stargazers_count >= b.stargazers_count ? a : b))
    : null
  const activity = getActivityLevel(events)
  const langPct = lang && lang.total > 0 ? Math.round((lang.count / lang.total) * 100) : 0

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
          <FiTrendingUp className="text-violet-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Smart Insights</h2>
          <p className="text-xs text-gray-400">Derived from public profile data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
              <FiCode className="text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-500 bg-white px-2 py-0.5 rounded-full">
              Language
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{lang ? lang.name : '—'}</p>
            <p className="mt-0.5 text-xs text-gray-500">
              {lang ? `${lang.count} of ${lang.total} repos` : 'No language data'}
            </p>
          </div>
          {lang && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-1.5 rounded-full bg-blue-500 transition-all duration-700"
                style={{ width: `${langPct}%` }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
              <FiStar className="text-yellow-500" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-white px-2 py-0.5 rounded-full">
              Top Repo
            </span>
          </div>
          <div>
            <p className="truncate text-2xl font-bold text-gray-900">{topRepo ? topRepo.name : '—'}</p>
            <p className="mt-0.5 text-xs text-gray-500">
              {topRepo ? `${topRepo.stargazers_count.toLocaleString()} stars` : 'No repo data'}
            </p>
          </div>
          {topRepo && (
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                ⭐ Most starred
              </span>
            </div>
          )}
        </div>

        <div className={`flex flex-col gap-3 rounded-xl border p-5 ${activity.bg} ${activity.border}`}>
          <div className="flex items-center justify-between">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm`}>
              <FiZap className={activity.color} />
            </div>
            <span className={`text-xs font-medium bg-white px-2 py-0.5 rounded-full ${activity.color}`}>
              Activity
            </span>
          </div>
          <div>
            <p className={`text-2xl font-bold ${activity.color}`}>{activity.label}</p>
            <p className="mt-0.5 text-xs text-gray-500">{activity.count} events in last 30 days</p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${
                  i < (activity.label === 'High' ? 5 : activity.label === 'Medium' ? 3 : 1)
                    ? activity.label === 'High' ? 'bg-emerald-500' : activity.label === 'Medium' ? 'bg-amber-400' : 'bg-red-400'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
