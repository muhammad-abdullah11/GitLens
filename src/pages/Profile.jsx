import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FiUsers, FiUserCheck, FiBook } from 'react-icons/fi'
import { FaCaretUp } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'
import ProfileCard from '../components/ProfileCard'
import StatsCard from '../components/StatsCard'
import RepoCard from '../components/RepoCard'
import ContributionChart from '../components/ContributionChart'
import SmartInsights from '../components/SmartInsights'

function getMostActiveRepo(events) {
  const counts = {}
  events.forEach(e => {
    if (e.type === 'PushEvent') {
      const name = e.repo.name.includes('/') ? e.repo.name.split('/')[1] : e.repo.name
      counts[name] = (counts[name] || 0) + 1
    }
  })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted.length > 0 ? sorted[0][0] : null
}

export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])
    setEvents([])

    async function fetchData() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=12`),
          axios.get(`https://api.github.com/users/${username}/events?per_page=100`),
        ])
        setUser(userRes.data)
        setRepos(reposRes.data)
        setEvents(eventsRes.data)
      } catch (err) {
        if (err.response?.status === 404) {
          setError(`No GitHub user found for "${username}".`)
        } else {
          setError('Something went wrong. Please try again.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  const mostActiveRepo = getMostActiveRepo(events)
  const topStarredRepo = repos.length > 0 ? repos[0].name : null

  function getBadge(repo) {
    if (repo.name === topStarredRepo && repo.name === mostActiveRepo) {
      return { type: 'starred', label: <FaCaretUp /> }
    }
    if (repo.name === topStarredRepo) {
      return { type: 'starred', label: <FaCaretUp /> }
    }
    if (repo.name === mostActiveRepo) {
      return { type: 'active', label: <FaCaretUp /> }
    }
    return null
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 bg-white">
      <div className="mb-8 flex justify-center">
        <SearchBar defaultValue={username} />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-4 py-32">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-gray-500">Fetching profile…</p>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
          <p className="text-lg font-semibold text-red-600">{error}</p>
          <p className="mt-2 text-sm text-gray-500">Check the username and try again.</p>
        </div>
      )}

      {user && (
        <div className="flex flex-col gap-8">
          <ProfileCard user={user} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard icon={FiUsers} label="Followers" value={user.followers} />
            <StatsCard icon={FiUserCheck} label="Following" value={user.following} />
            <StatsCard icon={FiBook} label="Public Repos" value={user.public_repos} />
          </div>

          <SmartInsights repos={repos} events={events} />

          <ContributionChart events={events} />

          {repos.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-black">Trending Repositories</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} badge={getBadge(repo)} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  )
}
