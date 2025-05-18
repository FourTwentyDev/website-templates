# Template Three - Cyberpunk Neon

A modern, cyberpunk-themed FiveM server template featuring neon aesthetics, interactive elements, and advanced animations.

## Design Overview

### Visual Style
- **Cyberpunk Theme**: Dark backgrounds with vibrant neon accents
- **Interactive Elements**: Particle effects and 3D grid background
- **Glassmorphism**: Modern frosted glass effects with neon borders
- **Typography**: Futuristic using Orbitron font family
- **Dynamic Effects**: Glitch animations and hover interactions

### Key Features
- Interactive particle system background
- 3D animated grid using Three.js
- Circular navigation menu
- Custom neon cursor
- Animated statistics counters
- Smooth scroll animations
- Responsive design for all devices

### Technical Stack
- **HTML5**: Modern semantic structure
- **Tailwind CSS**: Utility-first styling
- **JavaScript**: ES6+ features
- **Three.js**: 3D background effects
- **GSAP**: Advanced animations
- **Particles.js**: Interactive background
- **Orbitron Font**: Cyberpunk typography
- **Remix Icons**: Modern icon set

### Page Sections
1. Hero Section with particle effects
2. About Section with feature cards
3. Team Section with staff profiles
4. Rules Section with interactive elements
5. Join Section with server information

## Implementation Details

### Libraries Used
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Particles.js -->
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>

<!-- Orbitron Font -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

<!-- Remix Icons -->
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
```

### Color Scheme
```javascript
colors: {
    neon: {
        blue: '#00f3ff',
        pink: '#ff00ff',
        purple: '#bc13fe',
        yellow: '#ffff00'
    },
    cyber: {
        dark: '#0a0a0a',
        darker: '#050505',
        light: '#2a2a2a'
    }
}
```

### Key Components

#### Particle System
- Interactive background particles
- Connects nearby particles with lines
- Responds to mouse movement
- Customizable colors and behavior

#### 3D Grid Background
- Animated perspective grid
- Built with Three.js
- Smooth camera movement
- Responsive to window size

#### Circular Navigation
- Unique circular menu layout
- Smooth toggle animation
- Responsive design
- Custom hover effects

#### Animation System
- Scroll-triggered reveals
- Counter animations
- Hover interactions
- Text glitch effects

## Customization Guide

### 1. Colors & Branding
- Update Tailwind configuration in index.html
- Modify CSS custom properties in style.css
- Adjust particle colors in main.js
- Replace logo and images

### 2. Content Modification
- Edit text content in index.html
- Update team member information
- Modify server rules
- Customize server details

### 3. Animation Settings
- Adjust GSAP animations in main.js
- Modify particle system configuration
- Customize Three.js grid parameters
- Fine-tune transition timings

### 4. Layout Adjustments
- Modify section spacing
- Adjust card layouts
- Customize responsive breakpoints
- Update navigation positioning

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Setup Instructions
1. Download the template files
2. Place files on your web server
3. Customize content in index.html
4. Modify styles in style.css
5. Adjust animations in main.js
6. Test across different devices

## Performance Optimization
- Lazy loading for images
- Optimized animation performance
- Efficient particle system
- Responsive asset loading

## Credits
- Template by [FourTwentyDevs](https://fourtwenty.dev)
- Icons by [Remix Icons](https://remixicon.com)
- Font by [Orbitron](https://fonts.google.com/specimen/Orbitron)

## License
This template is provided under the MIT License. See the [LICENSE](LICENSE) file for details.
