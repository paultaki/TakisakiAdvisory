@echo off
echo Setting up React Timeline project...

cd /d %~dp0
cd ..\..\..\TheCriticalFew\my-timeline-app

echo Creating components directory...
mkdir src\components 2>nul

echo Copying BrilliantMoments component...
copy /Y "%~dp0BrilliantMoments.jsx" "src\components\"

echo Updating App.js...
copy /Y "%~dp0App.js" "src\"

echo Updating index.css...
copy /Y "%~dp0index.css" "src\"

echo Copying Tailwind config files...
copy /Y "%~dp0tailwind.config.js" "."
copy /Y "%~dp0postcss.config.js" "."

echo Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer

echo Setup complete! Run 'npm start' to view your timeline.
pause