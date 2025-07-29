'use client';

import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface SearchFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  location: string;
  category: string;
  datePosted: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilter }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    category: '',
    datePosted: ''
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({ location: '', category: '', datePosted: '' });
    onFilter({ location: '', category: '', datePosted: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="flex items-center gap-3">
        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="Education">Education</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date Posted
              </label>
              <select
                value={filters.datePosted}
                onChange={(e) => handleFilterChange('datePosted', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Any Time</option>
                <option value="2024">This Year</option>
                <option value="2023">Last Year</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter; 