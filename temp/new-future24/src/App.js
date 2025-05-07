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
 
        <div className="relative"> 
          <!-- Vertical timeline line --> 
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"></div> 
 
          <!-- Timeline events --> 
          <div className="space-y-24"> 
            <!-- Event 1 --> 
            <div className="relative"> 
              <!-- Year marker --> 
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6"> 
                <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"> 
                  2021 
                </div> 
              </div> 
 
              <!-- Content box --> 
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%]"> 
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Project Inception</h3> 
                <p className="text-blue-100">The initial idea for Future24 was conceptualized, focusing on innovative solutions for tomorrow's challenges.</p> 
              </div> 
            </div> 
 
            <!-- Event 2 --> 
            <div className="relative"> 
              <!-- Year marker --> 
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6"> 
                <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"> 
                  2022 
                </div> 
              </div> 
 
              <!-- Content box --> 
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%]"> 
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Team Formation</h3> 
                <p className="text-blue-100">A diverse team of experts came together, bringing unique perspectives and skills to turn the vision into reality.</p> 
              </div> 
            </div> 
 
            <!-- Event 3 --> 
            <div className="relative"> 
              <!-- Year marker --> 
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6"> 
                <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"> 
                  2023 
                </div> 
              </div> 
 
              <!-- Content box --> 
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%]"> 
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Breakthrough Innovation</h3> 
                <p className="text-blue-100">After months of research and development, the core technology behind Future24 was successfully demonstrated.</p> 
              </div> 
            </div> 
 
            <!-- Event 4 --> 
            <div className="relative"> 
              <!-- Year marker --> 
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-6"> 
                <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"> 
                  2024 
                </div> 
              </div> 
 
              <!-- Content box --> 
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%]"> 
                <h3 className="text-2xl font-bold text-blue-300 mb-2">Global Launch</h3> 
                <p className="text-blue-100">Future24 officially launched worldwide, introducing cutting-edge solutions to users across the globe.</p> 
              </div> 
            </div> 
          </div> 
        </div> 
 
        <div className="mt-20 text-center"> 
          <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"> 
            Join Our Journey 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default App; 
