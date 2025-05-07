import React from 'react';

function BrilliantMoments() {
  const timelineEvents = [
    {
      year: 2021,
      title: "Project Inception",
      description: "The initial idea for Future24 was conceptualized, focusing on innovative solutions for tomorrow's challenges."
    },
    {
      year: 2022,
      title: "Team Formation",
      description: "A diverse team of experts came together, bringing unique perspectives and skills to turn the vision into reality."
    },
    {
      year: 2023,
      title: "Breakthrough Innovation",
      description: "After months of research and development, the core technology behind Future24 was successfully demonstrated."
    },
    {
      year: 2024,
      title: "Global Launch",
      description: "Future24 officially launched worldwide, introducing cutting-edge solutions to users across the globe."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-indigo-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
          Brilliant Moments in <span className="text-blue-300">Future24</span>
        </h1>
        
        <p className="text-xl mb-16 text-center text-blue-200 max-w-3xl mx-auto">
          Explore the key milestones that have shaped our journey from concept to reality.
        </p>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"></div>
          
          {/* Timeline events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                {/* Year marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-6">
                  <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                    {event.year}
                  </div>
                </div>
                
                {/* Content box - alternating sides */}
                <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 ${
                  index % 2 === 0 ? 'md:ml-auto md:mr-[55%]' : 'md:mr-auto md:ml-[55%]'
                }`}>
                  <h3 className="text-2xl font-bold text-blue-300 mb-2">{event.title}</h3>
                  <p className="text-blue-100">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <a href="#contact" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105">
            Join Our Journey
          </a>
        </div>
      </div>
    </div>
  );
}

export default BrilliantMoments;