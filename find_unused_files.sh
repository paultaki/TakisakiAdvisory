#\!/bin/bash

# Create temporary directory for analysis
mkdir -p /tmp/file_analysis
cd /mnt/c/Users/pault/Documents/WebDevelopment/Paul\ Takisaki.com

# Get all files excluding hidden folders
find . -type f -not -path "*/\.*" -not -path "*/node_modules/*" -not -path "*/_archive/*" > /tmp/file_analysis/all_files.txt

# Get all HTML, CSS, JS files for searching references
find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.xml" -o -name "*.txt" -o -name "*.toml" -o -name "*.md" \) -not -path "*/\.*" -not -path "*/node_modules/*" > /tmp/file_analysis/source_files.txt

# Create list of referenced files
> /tmp/file_analysis/referenced_files.txt

# Search for image references
while IFS= read -r file; do
    grep -hioE '(src < /dev/null | href|url|content)=["\x27]?[^"\x27>]+(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg|\.ico)["\x27]?' "$file" 2>/dev/null | \
    grep -oE '[^/"\x27]+\.(jpg|jpeg|png|gif|webp|svg|ico)' >> /tmp/file_analysis/referenced_files.txt
    
    # Also check CSS url() references
    grep -hioE 'url\(["\x27]?[^)"]+(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg)["\x27]?\)' "$file" 2>/dev/null | \
    grep -oE '[^/"\x27()]+\.(jpg|jpeg|png|gif|webp|svg)' >> /tmp/file_analysis/referenced_files.txt
done < /tmp/file_analysis/source_files.txt

# Search for CSS/JS references
while IFS= read -r file; do
    grep -hioE '(href|src)=["\x27][^"\x27]+(\.css|\.js)["\x27]' "$file" 2>/dev/null | \
    grep -oE '[^/"\x27]+\.(css|js)' >> /tmp/file_analysis/referenced_files.txt
done < /tmp/file_analysis/source_files.txt

# Search for HTML references
while IFS= read -r file; do
    grep -hioE 'href=["\x27][^"\x27]+\.html["\x27]' "$file" 2>/dev/null | \
    grep -oE '[^/"\x27]+\.html' >> /tmp/file_analysis/referenced_files.txt
done < /tmp/file_analysis/source_files.txt

# Remove duplicates and sort
sort -u /tmp/file_analysis/referenced_files.txt > /tmp/file_analysis/referenced_unique.txt

echo "Analysis complete. Files saved in /tmp/file_analysis/"
