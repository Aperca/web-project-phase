'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { useGetJobByIdQuery } from '@/app/services/opportunityApi';
import SideBar from '@/app/components/SideBar';
import { MapPin, Check } from 'lucide-react';

const JobDetailContent = () => {
  const { id } = useParams();
  const { data: job, isLoading, error, refetch } = useGetJobByIdQuery(id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !job?.data) {
    const errorMessage = error 
      ? ('status' in error ? `Error ${error.status}` : error.message || 'Unknown error')
      : 'Job not found';
      
    return (
      <div className="text-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 text-lg mb-2">Error loading job details</p>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = job.data.logoUrl && job.data.logoUrl.trim() !== '' 
    ? job.data.logoUrl 
    : '/next.svg';

  const aboutInfo = {
    posted_on: job.data.datePosted || 'N/A',
    deadline: job.data.deadline || 'N/A',
    location: job.data.location?.join(', ') || 'Remote',
    start_date: job.data.startDate || 'N/A',
    categories: job.data.opType || [],
    required_skills: job.data.skills || [],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen bg-gray-100">
      <main className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
            <img
              src={imageUrl}
              alt={`${job.data.orgName} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/next.svg';
              }}
            />
          </div>
          <div className="flex-grow min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.data.title}</h1>
            <p className="text-lg text-gray-700 mb-1">{job.data.orgName}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {aboutInfo.location}
            </p>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-black">Description</h2>
            <p className="text-gray-800 leading-relaxed">{job.data.description}</p>
          </div>
          
          {job.data.responsibilities && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Responsibilities</h2>
              <ul className="space-y-2">
                {job.data.responsibilities.split('\n').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {job.data.requirements && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-black">Requirements</h2>
              <ul className="space-y-2">
                {job.data.requirements.split('\n').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{item.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      
      <aside className="w-full lg:w-1/4">
        <SideBar about={aboutInfo} />
      </aside>
    </div>
  );
};

const JobDetailPage = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <JobDetailContent />
    </Suspense>
  );
};

export default JobDetailPage;