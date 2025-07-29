'use client';

import React, { useMemo } from 'react';
import { useGetOpportunitiesQuery } from '../services/opportunityApi';
import JobCard from './JobCard';

interface FilterOptions {
  location: string;
  category: string;
  datePosted: string;
}

interface JobListProps {
  filters?: FilterOptions;
}

const JobList: React.FC<JobListProps> = ({ filters = { location: '', category: '', datePosted: '' } }) => {
  const { data, error, isLoading } = useGetOpportunitiesQuery();

  const filteredJobs = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];

    return data.data.filter((job: any) => {
      const matchesLocation = filters.location === '' || 
        (job.location && 
          (Array.isArray(job.location) 
            ? job.location.some((loc: string) => loc.toLowerCase().includes(filters.location.toLowerCase()))
            : job.location.toLowerCase().includes(filters.location.toLowerCase())
          )
        );

      const matchesCategory = filters.category === '' || 
        (job.categories && job.categories.some((cat: string) => 
          cat.toLowerCase().includes(filters.category.toLowerCase())
        ));

      const matchesDate = filters.datePosted === '' || 
        (job.datePosted && job.datePosted.includes(filters.datePosted));

      return matchesLocation && matchesCategory && matchesDate;
    });
  }, [data, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error fetching opportunities</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  // Check if data exists and has the expected structure
  if (!data || !data.data || !Array.isArray(data.data)) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No opportunities found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No jobs match your filter criteria</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {filteredJobs.map((job: any) => {
            // Ensure all required fields are present with fallbacks
            const jobData = {
              id: job.id || job._id || 'unknown',
              title: job.title || job.name || 'Untitled Position',
              company: job.orgName || job.company || 'Unknown Company',
              location: job.location ? (Array.isArray(job.location) ? job.location.join(', ') : job.location) : 'Location not specified',
              description: job.description || job.summary || 'No description available',
              image: job.logoUrl || job.logo || '',
              categories: job.categories || job.tags || []
            };

            return (
              <JobCard
                key={jobData.id}
                {...jobData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobList;
