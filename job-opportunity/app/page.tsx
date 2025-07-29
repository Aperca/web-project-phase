'use client'
import JobList from './components/JobList';
import { useState } from 'react';

interface FilterOptions {
  location: string;
  category: string;
  datePosted: string;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    category: '',
    datePosted: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
              <p className="text-gray-600 mt-1">Showing 73 results</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-black font-medium">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
                  <option>Most relevant</option>
                  <option>Newest first</option>
                  <option>Oldest first</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobList filters={filters} />
      </div>
    </div>
  );
}