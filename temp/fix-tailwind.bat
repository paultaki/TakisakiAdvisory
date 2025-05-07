@echo off
echo Fixing Tailwind CSS PostCSS plugin issue...

cd /d C:\Users\pault\Documents\WebDevelopment\TheCriticalFew\timeline-app

echo Uninstalling current Tailwind packages...
call npm uninstall tailwindcss postcss autoprefixer

echo Installing the correct versions...
call npm install -D tailwindcss@3.3.0 postcss@8.4.23 autoprefixer@10.4.14

echo Installing @tailwindcss/postcss-plugin...
call npm install -D @tailwindcss/postcss

echo Fixing postcss.config.js...
echo module.exports = { > postcss.config.js
echo   plugins: { >> postcss.config.js
echo     '@tailwindcss/postcss': {}, >> postcss.config.js
echo     autoprefixer: {}, >> postcss.config.js
echo   }, >> postcss.config.js
echo } >> postcss.config.js

echo Tailwind CSS configuration has been fixed.
echo Please restart the development server:
echo npm start
pause