@echo off
echo Creating a simple HTML+Tailwind solution without React...

cd /d C:\Users\pault\Documents\WebDevelopment\TheCriticalFew

echo Creating a new directory for the HTML version...
mkdir future24-html 2>nul
cd future24-html

echo Creating index.html with timeline and Tailwind CSS...
echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="en"^> >> index.html
echo ^<head^> >> index.html
echo   ^<meta charset="UTF-8"^> >> index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> index.html
echo   ^<title^>Future24 - Brilliant Moments^</title^> >> index.html
echo   ^<script src="https://cdn.tailwindcss.com"^>^</script^> >> index.html
echo ^</head^> >> index.html
echo ^<body^> >> index.html
echo   ^<div class="bg-gradient-to-b from-blue-900 to-indigo-900 min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8"^> >> index.html
echo     ^<div class="max-w-6xl mx-auto"^> >> index.html
echo       ^<h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center"^> >> index.html
echo         Brilliant Moments in ^<span class="text-blue-300"^>Future24^</span^> >> index.html
echo       ^</h1^> >> index.html
echo       >> index.html
echo       ^<p class="text-xl mb-16 text-center text-blue-200 max-w-3xl mx-auto"^> >> index.html
echo         Explore the key milestones that have shaped our journey from concept to reality. >> index.html
echo       ^</p^> >> index.html
echo       >> index.html
echo       ^<div class="relative"^> >> index.html
echo         <!-- Vertical timeline line --> >> index.html
echo         ^<div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"^>^</div^> >> index.html
echo         >> index.html
echo         <!-- Timeline events --> >> index.html
echo         ^<div class="space-y-24"^> >> index.html
echo           <!-- Event 1 --> >> index.html
echo           ^<div class="relative"^> >> index.html
echo             <!-- Year marker --> >> index.html
echo             ^<div class="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> index.html
echo               ^<div class="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> index.html
echo                 2021 >> index.html
echo               ^</div^> >> index.html
echo             ^</div^> >> index.html
echo             >> index.html
echo             <!-- Content box --> >> index.html
echo             ^<div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%%]"^> >> index.html
echo               ^<h3 class="text-2xl font-bold text-blue-300 mb-2"^>Project Inception^</h3^> >> index.html
echo               ^<p class="text-blue-100"^>The initial idea for Future24 was conceptualized, focusing on innovative solutions for tomorrow's challenges.^</p^> >> index.html
echo             ^</div^> >> index.html
echo           ^</div^> >> index.html
echo >> index.html
echo           <!-- Event 2 --> >> index.html
echo           ^<div class="relative"^> >> index.html
echo             <!-- Year marker --> >> index.html
echo             ^<div class="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> index.html
echo               ^<div class="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> index.html
echo                 2022 >> index.html
echo               ^</div^> >> index.html
echo             ^</div^> >> index.html
echo             >> index.html
echo             <!-- Content box --> >> index.html
echo             ^<div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%%]"^> >> index.html
echo               ^<h3 class="text-2xl font-bold text-blue-300 mb-2"^>Team Formation^</h3^> >> index.html
echo               ^<p class="text-blue-100"^>A diverse team of experts came together, bringing unique perspectives and skills to turn the vision into reality.^</p^> >> index.html
echo             ^</div^> >> index.html
echo           ^</div^> >> index.html
echo >> index.html
echo           <!-- Event 3 --> >> index.html
echo           ^<div class="relative"^> >> index.html
echo             <!-- Year marker --> >> index.html
echo             ^<div class="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> index.html
echo               ^<div class="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> index.html
echo                 2023 >> index.html
echo               ^</div^> >> index.html
echo             ^</div^> >> index.html
echo             >> index.html
echo             <!-- Content box --> >> index.html
echo             ^<div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:ml-auto md:mr-[55%%]"^> >> index.html
echo               ^<h3 class="text-2xl font-bold text-blue-300 mb-2"^>Breakthrough Innovation^</h3^> >> index.html
echo               ^<p class="text-blue-100"^>After months of research and development, the core technology behind Future24 was successfully demonstrated.^</p^> >> index.html
echo             ^</div^> >> index.html
echo           ^</div^> >> index.html
echo >> index.html
echo           <!-- Event 4 --> >> index.html
echo           ^<div class="relative"^> >> index.html
echo             <!-- Year marker --> >> index.html
echo             ^<div class="absolute left-1/2 transform -translate-x-1/2 -top-6"^> >> index.html
echo               ^<div class="bg-blue-500 text-white text-xl font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl"^> >> index.html
echo                 2024 >> index.html
echo               ^</div^> >> index.html
echo             ^</div^> >> index.html
echo             >> index.html
echo             <!-- Content box --> >> index.html
echo             ^<div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-md mx-auto md:mx-0 md:mr-auto md:ml-[55%%]"^> >> index.html
echo               ^<h3 class="text-2xl font-bold text-blue-300 mb-2"^>Global Launch^</h3^> >> index.html
echo               ^<p class="text-blue-100"^>Future24 officially launched worldwide, introducing cutting-edge solutions to users across the globe.^</p^> >> index.html
echo             ^</div^> >> index.html
echo           ^</div^> >> index.html
echo         ^</div^> >> index.html
echo       ^</div^> >> index.html
echo       >> index.html
echo       ^<div class="mt-20 text-center"^> >> index.html
echo         ^<button class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"^> >> index.html
echo           Join Our Journey >> index.html
echo         ^</button^> >> index.html
echo       ^</div^> >> index.html
echo     ^</div^> >> index.html
echo   ^</div^> >> index.html
echo ^</body^> >> index.html
echo ^</html^> >> index.html

echo Simple HTML solution created successfully!
echo You can open this file directly in your browser:
echo C:\Users\pault\Documents\WebDevelopment\TheCriticalFew\future24-html\index.html
echo.
echo This is the simplest approach to see the timeline with Tailwind styling.
pause