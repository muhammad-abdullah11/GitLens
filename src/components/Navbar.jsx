import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { FiGlobe } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm px-6 py-3.5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-black no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <FaGithub className="text-white text-base" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">GitLens</span>
        </Link>
      </div>
    </nav>
  )
}
