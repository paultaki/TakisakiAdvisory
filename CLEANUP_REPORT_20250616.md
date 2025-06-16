# File Cleanup Report - June 16, 2025

## Summary
Identified and archived duplicate and unused files to reduce project clutter and improve maintainability.

## Files Moved to Archive

### Duplicate Testimonial Images
Located in: `_archive/unused-20250616/duplicate-testimonials/`

**Exact Duplicates (same MD5 hash):**
- `Sarah_Merrit.webp` - Moved from `resume/images/`
- `ben_prather.webp` - Moved from `resume/images/`
- `lagen.webp` - Moved from `resume/images/`
- `mundy.webp` - Moved from `resume/images/`
- `reznik.webp` - Moved from `resume/images/`
- `shank.webp` - Moved from `resume/images/`

**Different Versions (kept optimized versions in `images/testimonials/`):**
- `aparna.webp` - Moved larger version from `resume/images/` (6.8KB vs 2.4KB)
- `buia.webp` - Moved larger version from `resume/images/` (5.5KB vs 3.8KB)
- `caralis.webp` - Moved larger version from `resume/images/` (6.8KB vs 4.0KB)
- `venkatesh.webp` - Moved larger version from `resume/images/` (2.9KB vs 1.8KB)

### Logo Variations and Duplicates
Located in: `_archive/unused-20250616/logo-variations/`

**Obvious Duplicates:**
- `logo-shadow black copy.png` - Moved from `images/` (duplicate with "copy" in name)

**Temporary/Draft Files:**
- `lgoo 4.webp` - Moved from `resume/images/` (typo in filename)
- `logo 3.webp` - Moved from `resume/images/` (numbered draft)
- `pt-logo 2.webp` - Moved from `resume/images/` (numbered draft)

**Exact Logo Duplicates:**
All these were exact duplicates of files in the main `images/` folder:
- `paul-logo.webp` - Moved from `resume/images/`
- `pc_logo.webp` - Moved from `resume/images/`
- `pt-logo-white.webp` - Moved from `resume/images/`
- `pt-logo.png` - Moved from `resume/images/`
- `pt-logo.webp` - Moved from `resume/images/`
- `techcheck_logo.webp` - Moved from `resume/images/`

### Other Duplicate Images
Located in: `_archive/unused-20250616/`

**Favicon Duplicates:**
- `favicon.ico` - Moved from `images/` (duplicate of root favicon.ico)
- `favicon2.ico` - Moved from `images/` (alternate version)

**General Image Duplicates:**
All exact duplicates of files in the main `images/` folder:
- `headshot.webp` - Moved from `resume/images/`
- `newsletter.webp` - Moved from `resume/images/`
- `one_on_one.webp` - Moved from `resume/images/`
- `paul_effect.webp` - Moved from `resume/images/`
- `pc.webp` - Moved from `resume/images/`
- `unscalable.webp` - Moved from `resume/images/`
- `warm1on1.webp` - Moved from `resume/images/`

**Temporary/Untitled Files:**
- `Untitled-1.webp` - Moved from `resume/images/` (539KB temporary file)

## Analysis

1. **Testimonial Images**: The `resume/images/` folder contained duplicates of testimonial images already in `images/testimonials/`. In most cases, the versions in `images/testimonials/` were optimized (smaller file sizes), so we kept those and archived the larger versions.

2. **Logo Files**: Multiple exact duplicates of logo files existed in `resume/images/`. The resume HTML files reference logos from the parent `../images/` directory, making these duplicates unnecessary.

3. **File Organization**: The cleanup removed approximately 1MB of duplicate files and improved project organization by consolidating assets in their proper locations.

## Recommendations

1. **Use Shared Assets**: Continue referencing shared images (logos, icons, testimonials) from the main `images/` directory rather than duplicating them in subdirectories.

2. **Image Optimization**: The testimonial images in `images/testimonials/` are properly optimized. Apply similar optimization to other images as needed.

3. **Naming Conventions**: Avoid temporary names like "Untitled-1" or numbered variations like "logo 2". Use descriptive, final names for production files.

4. **Regular Cleanup**: Periodically check for duplicate files, especially after major updates or when working with multiple developers.

## Total Files Archived: 32 files

All archived files are preserved in `_archive/unused-20250616/` and can be restored if needed.