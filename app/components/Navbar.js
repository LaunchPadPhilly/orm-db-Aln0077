import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-transparent text-gray-900 mt-1">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Your name or logo */}
          <Link href="/" className="text-2xl font-normal hover:text-blue-400">
            Alan Perez
          </Link>
          
          {/* Navigation links */}
          <div className="flex gap-6">
            <Link href="/" className="hover:bg-gray-50 no-underline">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-400 no-underline">
              About
            </Link>
            <Link href="/projects" className="hover:text-blue-400 no-underline">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-blue-400 no-underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}