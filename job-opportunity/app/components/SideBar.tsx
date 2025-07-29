'use client';

import { CalendarDays, Clock, MapPin } from 'lucide-react';

interface AboutInfo {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  categories: string[];
  required_skills: string[];
}

const SideBar = ({ about }: { about: AboutInfo }) => {
  const categories = Array.isArray(about.categories) ? about.categories : [];
  const requiredSkills = Array.isArray(about.required_skills) ? about.required_skills : [];

  return (
    <aside className="w-full space-y-6 p-4 bg-white rounded-lg shadow-md text-gray-900">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">About</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span className="whitespace-nowrap">Posted on: {about.posted_on}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>Deadline: {about.deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Location: {about.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span>Start Date: {about.start_date}</span>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 my-4" />

      {categories.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {requiredSkills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;