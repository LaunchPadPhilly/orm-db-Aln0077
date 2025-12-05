'use client'
import { useState } from 'react'

const quickTechs = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
]

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [inputValue, setInputValue] = useState('');

  const addTech = (tech) => {
    //removes whitespace
    const trimmedTech = tech.trim();

    //Checks for duplicates or empty strings
    if (!trimmedTech) return;
    if (technologies.includes(trimmedTech)) return;

    //Add to the technologies using onChange callback
    onChange([...technologies, trimmedTech]);

    //Clears input field afterward
    setInputValue('')
  }

  const removeTech = (deletedTech) => {
    //filter() creates a new array without deletedTech
    onChange(technologies.filter(tech => tech !== deletedTech));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      //preventDefault prevents submission when pressing enter key
      e.preventDefault();
      addTech(inputValue);
    }
  }
  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a technology..."
          className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        <button
          onClick={() => addTech(inputValue)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      
      {/* Selected Technologies */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tech}
              <button
                onClick={() => removeTech(tech)}
                className="hover:text-blue-600 font-bold"
                aria-label={`Remove ${tech}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Quick-Add Buttons */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-2">
          {quickTechs
            .filter(tech => !technologies.includes(tech))
            .map((tech) => (
              <button
                key={tech}
                onClick={() => addTech(tech)}
                className="px-3 py-1 rounded-lg text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tech}
              </button>
            ))}
        </div>
      </div>
    </div>
  );

}