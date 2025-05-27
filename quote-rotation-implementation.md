# Quote Rotation Implementation Guide

This guide explains how to add the quote rotation system to any page on the website.

## Implementation Steps

### 1. Add CSS Link to Head Section

Add the following line inside the `<head>` section of your HTML file:

```html
<link rel="stylesheet" href="/css/quote-rotation.css">
```

### 2. Add the Quote Container to Your Footer

Find your footer section and add the following HTML:

```html
<!-- Quote Rotation Container -->
<div id="quote-rotation-container" class="quote-rotation-container my-4 max-w-3xl mx-auto px-4"></div>
```

Typically, this should be placed inside the footer, between the logo and the copyright text.

### 3. Add the JavaScript File

Add the script tag just before the closing `</body>` tag:

```html
<!-- Quote Rotation -->
<script src="/js/quote-rotation.js"></script>
```

## Notes on Customization

### Modifying Quotes

To update or change the quotes, edit the `quotes` array in the `/js/quote-rotation.js` file. Each quote requires:

- `text`: The quote text
- `author`: Who said it
- `category`: Category of the quote (Leadership development, Strategic impact, Personal approach)

### Styling Adjustments

All styling for the quote rotation system is contained in `/css/quote-rotation.css`. You can modify:

- Font sizes
- Colors
- Transition speeds
- Spacing and layout

### Settings Configuration

You can adjust settings by modifying the QuoteRotation class constructor options in the JavaScript file:

- `rotationInterval`: Time between quotes in milliseconds (default: 8000)
- `fadeTransitionDuration`: Duration of the fade transition in milliseconds (default: 800)

## Example

```html
<!-- Footer -->
<footer class="bg-black text-gray-400 text-sm py-6 flex flex-col items-center">
  <a href="index.html">
    <img src="images/logo-shadow.png" alt="Takisaki Strategy Logo" class="h-[50px] mb-2 opacity-80" />
  </a>
  
  <!-- Quote Rotation Container -->
  <div id="quote-rotation-container" class="quote-rotation-container my-4 max-w-3xl mx-auto px-4"></div>
  
  <div class="flex space-x-6 my-4">
    <!-- Social icons here -->
  </div>
  <p class="text-center">Takisaki Strategy | © 2025 Paul Takisaki</p>
</footer>

<!-- Scripts -->
<script>
  // Your existing scripts
</script>

<!-- Quote Rotation -->
<script src="/js/quote-rotation.js"></script>
```