@echo off
echo Fixing Tailwind CSS using a simpler approach...

cd /d C:\Users\pault\Documents\WebDevelopment\TheCriticalFew\timeline-app

echo Updating index.css to use Tailwind via CDN...
echo /* Tailwind CSS via CDN */ > src\index.css
echo body { >> src\index.css
echo   margin: 0; >> src\index.css
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', >> src\index.css
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; >> src\index.css
echo   -webkit-font-smoothing: antialiased; >> src\index.css
echo   -moz-osx-font-smoothing: grayscale; >> src\index.css
echo } >> src\index.css
echo code { >> src\index.css
echo   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace; >> src\index.css
echo } >> src\index.css

echo Updating public/index.html to include Tailwind CSS from CDN...
echo ^<!DOCTYPE html^> > public\index.html
echo ^<html lang="en"^> >> public\index.html
echo ^<head^> >> public\index.html
echo   ^<meta charset="utf-8" /^> >> public\index.html
echo   ^<link rel="icon" href="%PUBLIC_URL%/favicon.ico" /^> >> public\index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1" /^> >> public\index.html
echo   ^<meta name="theme-color" content="#000000" /^> >> public\index.html
echo   ^<meta name="description" content="Future24 - Brilliant Moments Timeline" /^> >> public\index.html
echo   ^<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /^> >> public\index.html
echo   ^<link rel="manifest" href="%PUBLIC_URL%/manifest.json" /^> >> public\index.html
echo   ^<script src="https://cdn.tailwindcss.com"^>^</script^> >> public\index.html
echo   ^<script^> >> public\index.html
echo     tailwind.config = { >> public\index.html
echo       theme: { >> public\index.html
echo         extend: {} >> public\index.html
echo       } >> public\index.html
echo     } >> public\index.html
echo   ^</script^> >> public\index.html
echo   ^<title^>Future24 Timeline^</title^> >> public\index.html
echo ^</head^> >> public\index.html
echo ^<body^> >> public\index.html
echo   ^<noscript^>You need to enable JavaScript to run this app.^</noscript^> >> public\index.html
echo   ^<div id="root"^>^</div^> >> public\index.html
echo ^</body^> >> public\index.html
echo ^</html^> >> public\index.html

echo Tailwind CSS has been added via CDN which should avoid the PostCSS issues.
echo This is a simpler approach for development purposes.
echo Please restart the development server:
echo npm start
pause