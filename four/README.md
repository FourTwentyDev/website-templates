# Modern Kindle-Style FiveM Server Template

A minimalist, typography-focused template inspired by modern e-readers. This template emphasizes readability and clean design while incorporating modern web technologies for smooth interactions.

## Features

- Clean, minimalist design inspired by modern e-readers
- Smooth scrolling and animations using Lenis and GSAP
- Responsive typography with dynamic scaling
- Dark mode support
- Paper-like texture background
- Elegant transitions and hover effects
- Optimized for readability
- Mobile-first responsive design

## Technologies Used

- TailwindCSS for styling
- Framer Motion for animations
- GSAP for scroll animations
- Lenis for smooth scrolling
- SF Pro Display & Inter fonts
- Remix Icons

## Customization

### Colors

The template uses a carefully chosen color palette that can be customized in the Tailwind configuration:

```javascript
colors: {
    kindle: {
        paper: '#F8F5F1',    // Background color
        text: '#2D2D2D',     // Text color
        accent: '#9C8E75',   // Accent color
        muted: '#B4B4B4',    // Muted text color
        dark: '#1A1A1A'      // Dark mode background
    }
}
```

### Typography

The template uses two main fonts:
- SF Pro Display for headings
- Inter for body text

### Animations

Animations are handled by:
- Framer Motion for component animations
- GSAP for scroll-triggered animations
- Lenis for smooth scrolling behavior

## Browser Support

The template is optimized for modern browsers and includes fallbacks for older browsers. It also respects user preferences for reduced motion and dark mode.

## Credits

- Template by [FourTwentyDevs](https://fourtwenty.dev)
- Icons by [Remix Icons](https://remixicon.com/)
- Fonts by Apple (SF Pro Display) and Google Fonts (Inter)
