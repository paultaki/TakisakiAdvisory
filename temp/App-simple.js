import React from 'react';

function App() {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-indigo-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center">
          Brilliant Moments in <span className="text-blue-300">Future24</span>
        </h1>
        
        <p className="text-xl mb-16 text-center text-blue-200 max-w-3xl mx-auto">
          Explore the key milestones that have shaped our journey from concept to reality.
        </p>
        
        <div className="mt-20 text-center">
          <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full">
            Testing Tailwind
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;