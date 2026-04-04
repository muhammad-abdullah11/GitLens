import { FaGithub } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-20 bg-white">
      <FaGithub className="text-8xl text-blue-600" />
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">GitHub Profile Visualizer</h1>
        <p className="max-w-md text-lg text-gray-500">
          Explore any GitHub profile — repos, stats, and social links at a glance.
        </p>
      </div>
      <SearchBar />
    </main>
  )
}
