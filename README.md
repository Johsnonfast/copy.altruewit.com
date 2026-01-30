# AItruewit (真智达) - B2B Manufacturing Website

A modern, responsive B2B website for AItruewit, a Shenzhen-based manufacturer of portable electronics.

## Quick Start

### Run Locally

```bash
# Using Python (recommended)
python3 -m http.server 8000

# Or using any static file server
npx serve .
# or
npm run serve
```

Then open http://localhost:8000 in your browser.

### Deploy

The site is a static HTML/CSS/JS project. Deploy to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting

## Project Structure

```
copy.altruewit.com/
├── assets/
│   ├── css/
│   │   ├── design-tokens.css   # Design system tokens
│   │   └── styles.css          # Main stylesheet
│   └── js/
│       ├── components/
│       │   ├── header-nav.js   # Navigation component
│       │   ├── quick-rfq.js    # Quick RFQ form
│       │   └── mobile-drawer.js # Mobile drawer
│       ├── site.js             # Main site script
│       ├── consent.js          # Cookie consent
│       ├── config.js           # Site config
│       └── rfq.js              # Full RFQ form
├── index.html                  # Homepage (6 sections)
├── about/index.html            # About page
├── blog/index.html             # Blog page
├── contact/index.html          # Contact + full RFQ
├── products/index.html         # Products listing
├── oem-customization/index.html # OEM services
├── quality-compliance/index.html # Quality info
├── privacy/index.html          # Privacy policy
├── terms/index.html            # Terms
└── cookies/index.html          # Cookie policy
```

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | #2563EB | Primary buttons, links |
| --color-primary-700 | #1D4ED8 | Hover states |
| --color-bg | #FFFFFF | Background |
| --color-bg-muted | #F6F8FB | Secondary backgrounds |
| --color-text | #0B1220 | Primary text |
| --color-text-muted | #5B667A | Secondary text |
| --color-border | #E6EAF2 | Borders |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| --radius-card | 20px | Cards, panels |
| --radius-input | 14px | Form inputs |
| --radius-pill | 9999px | Buttons, pills |

### Shadows

- `--shadow-card`: 0 30px 80px rgba(15, 23, 42, 0.10)
- `--shadow-button-primary`: 0 10px 24px rgba(37, 99, 235, 0.25)

## Placeholder Fields

### Homepage (index.html)

- Hero section badge: `B2B OEM Manufacturing`
- Hero section title: `Design-Forward Portable Electronics for Global B2B Brands`
- Product placeholders: `Image coming soon`
- Stats chips: Various location/capability text

### Quick RFQ Form

Fields with placeholders:
- `contactName`: "Your full name"
- `businessEmail`: "you@company.com"
- `requirementsMessage`: "Tell us about your project requirements..."

### Contact Form

Additional fields:
- `companyName`: "Your company name"
- `countryRegion`: "Your country"
- `estimatedOrderQuantity`: "e.g., 500 units"
- `companyWebsite`: "https://"
- `whatsappPhone`: "Your contact number"
- `targetMarket`: "e.g., USA, Europe"
- `timeline`: "e.g., Q2 2026"
- `customization`: "Logo, color, packaging, accessories..."

## API Endpoints

### Lead Submission (Reserved)

The Quick RFQ form attempts to POST to `/api/lead`. This endpoint is reserved for future backend implementation.

Current behavior: Falls back to sessionStorage + redirect on failure.

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## Accessibility

- Keyboard navigation support
- Focus visible states
- ARIA labels on interactive elements
- Reduced motion support via `prefers-reduced-motion`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Shenzhen Zhenzhida Electronic Co., Ltd. All rights reserved.
