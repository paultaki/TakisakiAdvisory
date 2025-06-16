# Comprehensive Unused Files Report
## Paul Takisaki.com Project
### Date: June 15, 2025

---

## Executive Summary

This report identifies unused files in the paultakisaki.com project. The analysis found:
- **295 total image files** across all folders
- **52MB test folder** containing 110 files (completely unused)
- Multiple duplicate images across different folders
- Several backup/old files
- Draft content in "in progress" and "ready to publish" folders

---

## 1. UNUSED IMAGES

### High Priority Images (Large Files)
These files are consuming significant disk space and are not referenced in any code:

1. **images/90days.png** (2.7M)
   - Reason: Not referenced in any HTML, CSS, or JS files
   
2. **images/ChatGPT Image Apr 10, 2025, 10_14_54 PM.png** (1.9M)
   - Reason: Appears to be a temporary/working file
   - Duplicates in: resume/images/, test/images/

3. **images/chess2-Recovered.psd** (2.0M)
   - Reason: Photoshop source file (should not be in production)
   
4. **images/Untitled-1-Recovered.psd** (Size unknown)
   - Reason: Photoshop recovery file

5. **images/about-paul-takisaki.png** (825K)
   - Reason: Not referenced in any code files

6. **images/executive-coaching-paul-takisaki.jpg** (262K)
   - Reason: Not referenced, appears to be old marketing image

7. **images/leadership-development-paul-takisaki.jpg** (262K)
   - Reason: Not referenced, appears to be old marketing image

### Logo Variations (Unused)
Multiple unused logo variations taking up space:

1. **images/logo-shadow black copy.png** (279K)
   - Reason: Duplicate/backup file
   
2. **images/logo-shadow black.png** (216K)
   - Reason: Not referenced
   
3. **images/logo-shadow LKarge.png** (229K)
   - Reason: Working file with typo in name

### Old/Backup Files
1. **images/headshot old.webp** (90K)
   - Reason: Old version (filename indicates backup)
   - Duplicates in: resume/images/, test/images/

2. **resume/index old.html** (27K)
   - Reason: Backup of old resume index

3. **resume/case-studies/styles old.css** (12K)
   - Reason: Old stylesheet backup

### Unused Icon/Favicon Files
1. **images/favicon2.ico** (51K)
   - Reason: Duplicate favicon
   
2. **images/favicon-96x96.png** (7.6K)
   - Reason: Not referenced in site.webmanifest

3. **images/apple-touch-icon.png** (21K)
   - Reason: Not referenced in HTML headers

---

## 2. TEST FOLDER (52MB - Completely Unused)

The entire `/test` folder contains:
- **Total size**: 52MB
- **Total files**: 110
- **Purpose**: Appears to be testing/development files

### Recommendation: DELETE ENTIRE FOLDER
This folder contains duplicates of production images and test HTML files that are not linked anywhere.

Key files in test folder:
- test/TSV.html
- test/TVL.html
- test/index.html
- test/insights.html
- test/lve2.html
- test/images/ (contains 105 image duplicates)

---

## 3. DUPLICATE FILES ACROSS FOLDERS

### Major Duplicates (Same file in multiple locations):

1. **8020.webp** (23K each)
   - images/8020.webp
   - resume/images/8020.webp
   - test/images/8020.webp

2. **Testimonial Images** (duplicated across 3 folders)
   - Sarah_Merrit.webp (67K × 3)
   - aparna.webp (2.3K-6.7K × 3)
   - ben_prather.webp (6.8K × 3)
   - buia.webp (3.7K × 3)
   - caralis.webp (3.9K × 3)
   - lagen.webp (7.0K × 3)
   - mundy.webp (7.6K × 3)
   - reznik.webp (5.0K × 3)
   - shank.webp (5.9K × 3)
   - venkatesh.webp (2.7K × 3)

3. **Logo Files** (multiple versions)
   - pt-logo.png (multiple sizes)
   - pt-logo.webp (multiple locations)
   - paul-logo.webp (duplicates)
   - pc_logo.webp (duplicates)

---

## 4. DRAFT/UNPUBLISHED CONTENT

### In Progress Folder
1. **insights/in progress/authentic-leadership.html** (36K)
   - Status: Draft article not yet published
   
2. **insights/in progress/unscalable.html** (45K)
   - Status: Draft article not yet published

### Ready to Publish Folder
1. **insights/ready to publish/communication.html** (33K)
   - Status: Completed but not in sitemap
   
2. **insights/ready to publish/images/** (4.0K folder)
   - Contains duplicate images from main insights folder

---

## 5. ORPHANED FILES

### HTML Files Not in Sitemap and Not Linked
1. **components/newsletter-form.html**
   - Appears to be a component file (may be included dynamically)

2. **insights/insights-template.html**
   - Template file (not meant to be accessed directly)

3. **fist90/90day.html**
   - Not linked from anywhere
   
4. **fist90/first90.html**
   - Not linked from anywhere

---

## 6. UNUSED SPECIALTY IMAGES

### Chess Theme Images (Multiple Versions)
1. images/chess origional.webp (40K) - typo in filename
2. images/chess.webp (133K)
3. images/chess2.webp (34K)
4. images/chss_pt.webp (18K)
5. test/images/chess3.webp (133K)
6. test/images/chesswhite.webp (23K)

### Ocean Theme Images (Unused)
1. images/ocean.webp (7.7K)
2. images/ocean2.webp (8.7K)
3. images/ocean3.webp (10K)

### Other Unused Themed Images
1. images/advantage.webp (26K)
2. images/hands_free.webp (28K)
3. images/one_on_one.webp (36K)
4. images/warm1on1.webp (32K)
5. images/strategy_sticks.webp (119K)

---

## 7. RECOMMENDATIONS

### Immediate Actions (Quick Wins)
1. **Delete entire /test folder** - Save 52MB
2. **Remove all .psd files** - Save ~4MB
3. **Delete old/backup files** - Save ~150KB
4. **Remove "ChatGPT Image" files** - Save 5.7MB

### Image Consolidation
1. **Consolidate testimonial images** - Keep only in /images/testimonials/
2. **Remove duplicate logos** - Standardize on one location
3. **Delete unused chess variations** - Keep only the used version

### Content Decisions Needed
1. **Draft content in "in progress"** - Complete or archive
2. **"Ready to publish" content** - Publish or remove
3. **fist90 folder content** - Integrate or remove

### Long-term Improvements
1. Implement image optimization pipeline
2. Set up automated unused file detection
3. Create clear file naming conventions
4. Establish backup/version control policy

---

## Total Potential Space Savings: ~65MB+

By implementing all recommendations, you can reduce the project size significantly while maintaining all necessary functionality.