'use client';

import Link from 'next/link';
import Image from 'next/image';

type JobProps = {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    image: string;
    categories?: string[];
}

const JobCard = ({id, title, company, location, description, image, categories}: JobProps) => {
  const imageUrl = image && image.trim() !== '' ? image : '/next.svg'; // Fallback to a default image
  
  return (
    <Link href={`/job/${id}`} passHref>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex gap-4 p-4 items-start">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100">
            <img
              src={imageUrl}
              alt={`${company} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/next.svg'; // Fallback to Next.js logo
              }}
            />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <h2 className="text-xl text-gray-900 font-bold mb-1 truncate">{title}</h2>
            <p className="text-sm text-gray-700 mb-1 truncate">{company} • {location}</p>
            <p className="text-sm text-gray-800 mt-1 line-clamp-2">{description}</p>
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {categories.map((cat) => (
                  <span key={cat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
    </Link>
  )
}

export default JobCard;