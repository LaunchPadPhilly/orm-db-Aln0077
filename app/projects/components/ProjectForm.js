'use client'
import { useState } from "react";
import TechnologyInput from "./TechnologyInput";

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  // Form field states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  
  // UI states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    // URL regex for external URLs (http/https)
    const externalUrlRegex = /^https?:\/\/.+\..+/;
    // Regex for relative paths (starts with /)
    const relativePathRegex = /^\//;
    
    if (imageUrl && !externalUrlRegex.test(imageUrl) && !relativePathRegex.test(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL or relative path (e.g., /images/project.jpg)';
    }
    
    if (projectUrl && !externalUrlRegex.test(projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid URL (must start with http:// or https://)';
    }
    
    if (githubUrl && !externalUrlRegex.test(githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL (must start with http:// or https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setProjectUrl('');
    setGithubUrl('');
    setTechnologies([]);
    setErrors({});
    setIsLoading(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formData = {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      };
      
      await onSubmit(formData);
      resetForm();
    } catch (error) {
      setErrors({ 
        submit: error.message || 'Failed to submit project. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="My Awesome Project"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          
          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.imageUrl 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>
          
          {/* Project URL */}
          <div>
            <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Project URL
            </label>
            <input
              type="text"
              id="projectUrl"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.projectUrl 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="https://myproject.com"
            />
            {errors.projectUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.projectUrl}</p>
            )}
          </div>
          
          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL
            </label>
            <input
              type="text"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.githubUrl 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="https://github.com/username/repo"
            />
            {errors.githubUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.githubUrl}</p>
            )}
          </div>
          
          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies <span className="text-red-500">*</span>
            </label>
            <TechnologyInput
              technologies={technologies}
              onChange={setTechnologies}
              error={errors.technologies}
            />
          </div>
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onCancel();
              }}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}