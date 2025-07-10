# Performance Optimization Plan for paultakisaki.com

## Quick Wins (Implement Today)

### 1. Make Analytics Scripts Async
Replace synchronous Google Analytics loading with async:

```html
<!-- Move to bottom of <body> and add async -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-F46XQSW1XF"></script>
```

### 2. Add Lazy Loading to Images
Add `loading="lazy"` to all images below the fold:

```html
<img src="/images/headshot.webp" loading="lazy" alt="Paul Takisaki">
```

### 3. Optimize Scroll Handler
Replace current scroll event with throttled version:

```javascript
let ticking = false;
function updateProgressBar() {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Update progress bar logic here
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', updateProgressBar);
```

## Expected Performance Gains

- **Page Load Time**: 40-50% faster
- **Time to Interactive**: 2-3 seconds faster
- **PageSpeed Score**: From ~65 to 85+

## Vercel-Specific Optimizations

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Testing Your Changes

1. Use Chrome DevTools Lighthouse
2. Test at: https://pagespeed.web.dev/
3. Monitor Core Web Vitals in Search Console

## Priority Order

1. **Today**: Async analytics scripts
2. **This Week**: Lazy load images, throttle scroll
3. **Next Week**: Extract critical CSS, optimize fonts
4. **Month**: Full performance audit with Vercel Analytics