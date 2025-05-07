@echo off
echo Creating a completely new React app with Tailwind CSS...

cd /d %~dp0
cd ..\..\..\TheCriticalFew

echo Stopping any running React development servers...
taskkill /f /im node.exe 2>nul

echo Creating new React app...
rmdir /s /q "new-future24" 2>nul
call npx create-react-app new-future24
cd new-future24

echo Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p

echo Configuring Tailwind...
echo /** @type {import('tailwindcss').Config} */ > tailwind.config.js
echo module.exports = { >> tailwind.config.js
echo   content: [ >> tailwind.config.js
echo     "./src/**/*.{js,jsx,ts,tsx}", >> tailwind.config.js
echo   ], >> tailwind.config.js
echo   theme: { >> tailwind.config.js
echo     extend: {}, >> tailwind.config.js
echo   }, >> tailwind.config.js
echo   plugins: [], >> tailwind.config.js
echo } >> tailwind.config.js

echo Updating CSS with Tailwind directives...
echo @tailwind base; > src\index.css
echo @tailwind components; >> src\index.css
echo @tailwind utilities; >> src\index.css

echo Updating App.js with Tailwind styled component...
echo import React from 'react'; > src\App.js
echo. >> src\App.js
echo function App() { >> src\App.js
echo   return ( >> src\App.js
echo     ^<div className="bg-gradient-to-b from-blue-900 to-indigo-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8"^> >> src\App.js
echo       ^<div className="max-w-6xl mx-auto"^> >> src\App.js
echo         ^<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center"^> >> src\App.js
echo           Brilliant Moments in ^<span className="text-blue-300"^>Future24^</span^> >> src\App.js
echo         ^</h1^> >> src\App.js
echo         ^<p className="text-xl mb-16 text-center text-blue-200 max-w-3xl mx-auto"^> >> src\App.js
echo           Explore the key milestones that have shaped our journey from concept to reality. >> src\App.js
echo         ^</p^> >> src\App.js
echo. >> src\App.js
echo         ^<div className="relative"^> >> src\App.js
echo           ^<!-- Vertical timeline line --^> >> src\App.js
echo           ^<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"^>^</div^> >> src\App.js
echo. >> src\App.js
echo           ^<!-- Timeline events --^> >> src\App.js
echo           ^<div className="space-y-24"^> >> src\App.js
echo             ^<!-- Event 1 --^> >> src\App.js
echo             ^<div className="relative"^> >> src\App.js
echo               ^<!-- Year marker --^> >> src\App.js
echo               ^<div className="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> src\App.js
echo                 ^<div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> src\App.js
echo                   2021 >> src\App.js
echo                 ^</div^> >> src\App.js
echo               ^</div^> >> src\App.js
echo. >> src\App.js
echo               ^<!-- Content box --^> >> src\App.js
echo               ^<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%%]"^> >> src\App.js
echo                 ^<h3 className="text-2xl font-bold text-blue-300 mb-2"^>Project Inception^</h3^> >> src\App.js
echo                 ^<p className="text-blue-100"^>The initial idea for Future24 was conceptualized, focusing on innovative solutions for tomorrow's challenges.^</p^> >> src\App.js
echo               ^</div^> >> src\App.js
echo             ^</div^> >> src\App.js
echo. >> src\App.js
echo             ^<!-- Event 2 --^> >> src\App.js
echo             ^<div className="relative"^> >> src\App.js
echo               ^<!-- Year marker --^> >> src\App.js
echo               ^<div className="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> src\App.js
echo                 ^<div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> src\App.js
echo                   2022 >> src\App.js
echo                 ^</div^> >> src\App.js
echo               ^</div^> >> src\App.js
echo. >> src\App.js
echo               ^<!-- Content box --^> >> src\App.js
echo               ^<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%%]"^> >> src\App.js
echo                 ^<h3 className="text-2xl font-bold text-blue-300 mb-2"^>Team Formation^</h3^> >> src\App.js
echo                 ^<p className="text-blue-100"^>A diverse team of experts came together, bringing unique perspectives and skills to turn the vision into reality.^</p^> >> src\App.js
echo               ^</div^> >> src\App.js
echo             ^</div^> >> src\App.js
echo. >> src\App.js
echo             ^<!-- Event 3 --^> >> src\App.js
echo             ^<div className="relative"^> >> src\App.js
echo               ^<!-- Year marker --^> >> src\App.js
echo               ^<div className="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> src\App.js
echo                 ^<div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> src\App.js
echo                   2023 >> src\App.js
echo                 ^</div^> >> src\App.js
echo               ^</div^> >> src\App.js
echo. >> src\App.js
echo               ^<!-- Content box --^> >> src\App.js
echo               ^<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%%]"^> >> src\App.js
echo                 ^<h3 className="text-2xl font-bold text-blue-300 mb-2"^>Breakthrough Innovation^</h3^> >> src\App.js
echo                 ^<p className="text-blue-100"^>After months of research and development, the core technology behind Future24 was successfully demonstrated.^</p^> >> src\App.js
echo               ^</div^> >> src\App.js
echo             ^</div^> >> src\App.js
echo. >> src\App.js
echo             ^<!-- Event 4 --^> >> src\App.js
echo             ^<div className="relative"^> >> src\App.js
echo               ^<!-- Year marker --^> >> src\App.js
echo               ^<div className="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> src\App.js
echo                 ^<div className="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> src\App.js
echo                   2024 >> src\App.js
echo                 ^</div^> >> src\App.js
echo               ^</div^> >> src\App.js
echo. >> src\App.js
echo               ^<!-- Content box --^> >> src\App.js
echo               ^<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%%]"^> >> src\App.js
echo                 ^<h3 className="text-2xl font-bold text-blue-300 mb-2"^>Global Launch^</h3^> >> src\App.js
echo                 ^<p className="text-blue-100"^>Future24 officially launched worldwide, introducing cutting-edge solutions to users across the globe.^</p^> >> src\App.js
echo               ^</div^> >> src\App.js
echo             ^</div^> >> src\App.js
echo           ^</div^> >> src\App.js
echo         ^</div^> >> src\App.js
echo. >> src\App.js
echo         ^<div className="mt-20 text-center"^> >> src\App.js
echo           ^<button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"^> >> src\App.js
echo             Join Our Journey >> src\App.js
echo           ^</button^> >> src\App.js
echo         ^</div^> >> src\App.js
echo       ^</div^> >> src\App.js
echo     ^</div^> >> src\App.js
echo   ); >> src\App.js
echo } >> src\App.js
echo. >> src\App.js
echo export default App; >> src\App.js

echo Setup complete! Starting the development server...
start cmd /k "cd new-future24 && npm start"

echo A new command prompt window will open to run the server.
echo A brand new React app with Tailwind CSS has been created in the TheCriticalFew\new-future24 folder.
pause