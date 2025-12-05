import Link from 'next/link';
export default function Contact() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-300/40 via-stone-100 to-amber-50/30">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl text-gray-700 font-bold mb-12">Get In Touch</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-8">
            Id love to hear from you! Feel free to reach out through any of these channels.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📧</span>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">apere0103@exlaunchpadphilly.org</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">🔗</span>
              <div>
                <p className="font-bold text-gray-900">LinkedIn</p>
                <a href="https://www.linkedin.com/in/alan-perez-28b313319/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/alan-perez
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">💻</span>
              <div>
                <p className="font-bold text-gray-900">GitHub</p>
                <a href="https://github.com/Aln0077" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com/alan-perez
                </a>
                <p className="text-sm text-blue-600">✏️ TODO: Add your GitHub URL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}