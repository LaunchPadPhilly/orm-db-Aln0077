import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-300/40 via-stone-100 to-amber-50/30">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-normal mb-8 text-gray-700">About Me</h1>
        
        <div className="flex gap-8 items-center mb-8">
          {/* Profile photo */}
          <Image 
            src="/profile.jpg"
            alt="My photo"
            width={300}
            height={300}
            className="rounded-full"
          />
          
          {/* Bio */}
          <div>
            <p className="text-lg text-gray-700">
              Hi, I’m Alan Perez, an entry-level Software Engineer with hands-on 
              training from Launchpad and real-world experience building automation tools and 
              AI-driven workflows during my internship at Seer Interactive. I specialize in 
              full-stack web development with a focus on React, JavaScript, and creating clean, 
              user-centered applications. I’ve built projects like BloomPath, an AI-powered career 
              navigation platform, which strengthened my skills in frontend development, 
              API integration, and system design. I enjoy solving meaningful problems, 
              learning new technologies quickly, and applying my skills to build tools that make a 
              real impact. I’m motivated, adaptable, and excited to grow within a collaborative 
              engineering team.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">My Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              HTML & CSS
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
              JavaScript
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
              Next.js
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}