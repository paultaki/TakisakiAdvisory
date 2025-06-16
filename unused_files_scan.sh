#!/bin/bash

# Change to project directory
cd "/mnt/c/Users/pault/Documents/WebDevelopment/Paul Takisaki.com"

# Create temp files to store results
all_images_file="/tmp/all_images.txt"
referenced_images_file="/tmp/referenced_images.txt"
unused_images_file="/tmp/unused_images.txt"

echo "=== COMPREHENSIVE UNUSED FILES SCAN ==="
echo "Date: $(date)"
echo "======================================"
echo

# 1. Find all image files
echo "1. SCANNING ALL IMAGE FILES..."
find images resume/images insights/images test/images fist90/images -type f \( -name "*.webp" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.ico" -o -name "*.psd" \) 2>/dev/null | sort > "$all_images_file"

# 2. Find all references to images in code files
echo "2. SCANNING FOR IMAGE REFERENCES..."
grep -r -h -o -E '(src=|href=|url\(|background:|background-image:)[^"'\'']*\.(webp|png|jpg|jpeg|svg|ico)' --include="*.html" --include="*.css" --include="*.js" --include="*.json" --include="*.xml" . 2>/dev/null | sed -E 's/.*[("'\''[:space:]]([^"'\''()[:space:]]+\.(webp|png|jpg|jpeg|svg|ico)).*/\1/' | sort -u > "$referenced_images_file"

# Also check for images referenced without quotes
grep -r -h -o -E '[a-zA-Z0-9_/-]+\.(webp|png|jpg|jpeg|svg|ico)' --include="*.html" --include="*.css" --include="*.js" --include="*.json" --include="*.xml" . 2>/dev/null | sort -u >> "$referenced_images_file"

# 3. Process and find unused images
echo
echo "=== UNUSED IMAGE FILES ==="
echo
while IFS= read -r image_path; do
    filename=$(basename "$image_path")
    # Check if the filename is referenced anywhere
    if ! grep -q "$filename" "$referenced_images_file"; then
        # Also check for partial path references
        partial_path=$(echo "$image_path" | sed 's|^\./||')
        if ! grep -q "$partial_path" "$referenced_images_file"; then
            if [ -f "$image_path" ]; then
                size=$(ls -lh "$image_path" | awk '{print $5}')
                echo "- $image_path (Size: $size)"
                
                # Determine reason
                if [[ "$image_path" == *"test/"* ]]; then
                    echo "  Reason: Located in test folder"
                elif [[ "$filename" == *"-old"* ]] || [[ "$filename" == *"old."* ]]; then
                    echo "  Reason: Old/backup file"
                elif [[ "$filename" == *"-copy"* ]] || [[ "$filename" == *"copy."* ]]; then
                    echo "  Reason: Copy/duplicate file"
                elif [[ "$filename" == *.psd ]]; then
                    echo "  Reason: Photoshop source file"
                else
                    echo "  Reason: Not referenced in any code files"
                fi
                echo
            fi
        fi
    fi
done < "$all_images_file"

# 4. Check for backup files
echo
echo "=== BACKUP/OLD FILES ==="
echo
find . -type f \( -name "*-old*" -o -name "*-copy*" -o -name "*-backup*" -o -name "*.bak" -o -name "*.orig" -o -name "*old.*" \) -exec ls -lh {} \; 2>/dev/null | while read line; do
    size=$(echo "$line" | awk '{print $5}')
    file=$(echo "$line" | awk '{for(i=9;i<=NF;i++) printf "%s ", $i; print ""}' | sed 's/ *$//')
    echo "- $file (Size: $size)"
    echo "  Reason: Backup/old file based on naming convention"
    echo
done

# 5. Check for orphaned HTML files
echo
echo "=== ORPHANED HTML FILES ==="
echo
# First, get all HTML files referenced in sitemap
sitemap_files=$(grep -o '<loc>[^<]*</loc>' sitemap.xml 2>/dev/null | sed 's/<[^>]*>//g' | sed 's|.*/||' | grep '\.html$' || echo "")

# Find all HTML files
find . -name "*.html" -type f | while read -r html_file; do
    filename=$(basename "$html_file")
    filepath=$(echo "$html_file" | sed 's|^\./||')
    
    # Skip if in sitemap
    if echo "$sitemap_files" | grep -q "$filename"; then
        continue
    fi
    
    # Check if linked from any other HTML file
    if ! grep -r -q "$filename" --include="*.html" --exclude="$filename" . 2>/dev/null; then
        if ! grep -r -q "$filepath" --include="*.html" . 2>/dev/null; then
            size=$(ls -lh "$html_file" | awk '{print $5}')
            echo "- $html_file (Size: $size)"
            
            if [[ "$filepath" == *"test/"* ]]; then
                echo "  Reason: Located in test folder"
            elif [[ "$filepath" == *"in progress"* ]]; then
                echo "  Reason: Draft content in progress"
            elif [[ "$filepath" == *"ready to publish"* ]]; then
                echo "  Reason: Content ready to publish but not yet live"
            elif [[ "$filename" == *"template"* ]]; then
                echo "  Reason: Template file"
            else
                echo "  Reason: Not in sitemap and not linked from any HTML file"
            fi
            echo
        fi
    fi
done

# 6. Check for duplicate images
echo
echo "=== DUPLICATE IMAGES ==="
echo
# Find potential duplicates by filename
find images resume/images insights/images test/images -type f \( -name "*.webp" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -exec basename {} \; 2>/dev/null | sort | uniq -d | while read -r dup_name; do
    echo "Duplicate filename: $dup_name"
    find . -name "$dup_name" -type f -exec ls -lh {} \; | while read line; do
        size=$(echo "$line" | awk '{print $5}')
        file=$(echo "$line" | awk '{for(i=9;i<=NF;i++) printf "%s ", $i; print ""}' | sed 's/ *$//')
        echo "  - $file (Size: $size)"
    done
    echo
done

# 7. Check entire test folder
echo
echo "=== TEST FOLDER ANALYSIS ==="
echo
if [ -d "test" ]; then
    total_size=$(du -sh test 2>/dev/null | awk '{print $1}')
    file_count=$(find test -type f | wc -l)
    echo "Total size: $total_size"
    echo "Total files: $file_count"
    echo
    echo "File types in test folder:"
    find test -type f -exec bash -c 'echo "${0##*.}"' {} \; | sort | uniq -c | sort -nr
fi

# 8. Check for unused CSS/JS files
echo
echo "=== POTENTIALLY UNUSED CSS/JS FILES ==="
echo
find . -name "*.css" -o -name "*.js" | grep -v node_modules | while read -r file; do
    filename=$(basename "$file")
    filepath=$(echo "$file" | sed 's|^\./||')
    
    # Check if referenced in HTML files
    if ! grep -r -q "$filename" --include="*.html" . 2>/dev/null; then
        if ! grep -r -q "$filepath" --include="*.html" . 2>/dev/null; then
            # Also check if imported in other JS/CSS files
            if ! grep -r -q "$filename" --include="*.js" --include="*.css" --exclude="$filename" . 2>/dev/null; then
                size=$(ls -lh "$file" | awk '{print $5}')
                echo "- $file (Size: $size)"
                
                if [[ "$filepath" == *"test/"* ]]; then
                    echo "  Reason: Located in test folder"
                else
                    echo "  Reason: Not referenced in any HTML, CSS, or JS files"
                fi
                echo
            fi
        fi
    fi
done

# Clean up temp files
rm -f "$all_images_file" "$referenced_images_file" "$unused_images_file"

echo
echo "=== SCAN COMPLETE ==="