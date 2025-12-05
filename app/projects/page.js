'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';

export default function Projects() {
  // State for projects data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch projects from API on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects from the database
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle project creation
  const handleCreateProject = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to create project: ${response.status}`);
      }

      const newProject = await response.json();
      setProjects([newProject, ...projects]); // Add new project to the top
      setShowForm(false);
    } catch (err) {
      console.error('Error creating project:', err);
      throw err; // Re-throw so form can display the error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle project deletion
  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete project: ${response.status}`);
      }

      // Remove project from state
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err.message || 'Failed to delete project. Please try again.');
    }
  };

  const placeholderProjects = projects;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - students will add "Add New Project" button here */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Add New Project
          </button>
        </div>

        {/* ProjectForm component */}
        <ProjectForm 
          isOpen={showForm} 
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />

        {/* Error message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-800">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading your projects...</p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && placeholderProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {placeholderProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-white font-bold text-xl">No Image</p>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-sm bg-gray-200 px-3 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-sm text-black-700 px-3 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          /* Empty State - Students will enhance this */
          <div className="text-center py-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
              <p className="text-gray-600 mb-6">
                Get started by setting up your database and implementing the API routes!
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside text-left">
                <li>Set up your Neon database</li>
                <li>Implement the API routes</li>
                <li>Add project creation functionality</li>
                <li>Convert this page to use database data</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Learning Objectives for Students:
// 1. Understand server vs client components
// 2. Learn React state management patterns
// 3. Implement API integration
// 4. Handle async operations and error states
// 5. Build interactive user interfaces
// 6. Practice component composition
