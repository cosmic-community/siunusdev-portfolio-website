# SIUNUSDEV Portfolio Website

![App Preview](https://imgix.cosmicjs.com/f5cd0980-b26d-11f0-a900-b7bbcbe531cb-photo-1599305445671-ac291c95aaa9-1761484574532.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional portfolio website built with Astro and powered by Cosmic CMS. Features automatic dark/light mode, responsive design, and dynamic content management for showcasing services, products, and technologies.

## ✨ Features

- 🌓 **Automatic Theme Switching** - Adapts to user's system dark/light mode preference
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 🚀 **Fast Performance** - Built with Astro for lightning-fast page loads
- 🔄 **Dynamic Content** - All content managed through Cosmic CMS
- 🎯 **Product Filtering** - Category-based product showcase (Business, Technology, Education)
- 💼 **Services Display** - Comprehensive service presentation with visual icons
- 🛠️ **Technology Stack** - Showcase of expertise and technologies
- 📧 **Newsletter Integration** - Built-in subscription functionality
- 💬 **WhatsApp Contact** - Quick access to company communication
- 🔗 **Social & Marketplace Links** - Direct integration with platforms
- ♿ **Accessible** - WCAG compliant with proper semantic HTML

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fe1d9692c9229c30fe731d&clone_repository=68fe23f592c9229c30fe73a4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Saya akan mengembangkan website dengan Astro, dengan CMS menggunakan Cosmic. Lihat konten website saya sekarang, buatkan apa saja yang perlu dibuat di Cosmic agar konten-konten bisa saya pakai di website saya."

### Code Generation Prompt

> Set up an Astro website powered by my existing content, with clean design, modern and user-friendly, responsive for desktop and mobile, support dark/light mode or based on user's system theme. Use Tailwind CSS so I can customize it in the future.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Astro** - Fast, modern static site generator
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **@cosmicjs/sdk** - Official Cosmic JavaScript SDK

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with a bucket set up
- Basic knowledge of Astro and TypeScript

## 🚀 Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

**Important**: The Cosmic environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY) are automatically included. Never commit your `.env` file to version control.

### 3. Run Development Server

```bash
bun run dev
```

Visit `http://localhost:4321` to see your website in action.

### 4. Build for Production

```bash
bun run build
```

The production-ready files will be in the `dist/` directory.

## 📚 Cosmic SDK Examples

### Fetching Company Information

```typescript
import { cosmic } from './lib/cosmic'

const { object: companyInfo } = await cosmic.objects
  .findOne({
    type: 'company-info',
    slug: 'siunusdev-company-information'
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetching Products with Filtering

```typescript
const query: any = { type: 'products' }

// Filter by category if specified
if (category) {
  query['metadata.category.key'] = category
}

const { objects: products } = await cosmic.objects
  .find(query)
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Services (Ordered)

```typescript
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Manual sorting by order field
const sortedServices = services.sort((a, b) => {
  const orderA = a.metadata?.order || 0
  const orderB = b.metadata?.order || 0
  return orderA - orderB
})
```

## 🎨 Cosmic CMS Integration

This website integrates with the following Cosmic object types:

### Company Info (Singleton)
- Company name, tagline, and description
- Logo and hero section content
- WhatsApp contact number

### Services
- Service name and description
- Icon/image
- Display order

### Products
- Product name and description
- Category (Education, Business, Technology)
- Screenshot image
- Product URL
- Featured flag

### Technologies
- Technology name and description
- Logo/icon
- Display order

### Site Settings (Singleton)
- Footer copyright text
- Newsletter enabled toggle
- Social links (GitHub, Email)
- Marketplace links (Tokopedia, Shopee, Lynk, Mayar)

## 🎨 Customization

The website uses Tailwind CSS for styling. All custom colors and design tokens are defined in `tailwind.config.mjs`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3b82f6',
        dark: '#2563eb',
      },
      // Add your custom colors here
    }
  }
}
```

To customize the design:
1. Edit color values in `tailwind.config.mjs`
2. Modify component styles in the respective `.astro` files
3. Add custom CSS in `src/styles/global.css` if needed

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components automatically adapt to different screen sizes.

## 🌓 Dark Mode

Dark mode is automatically detected based on the user's system preferences using the `prefers-color-scheme` media query. The theme cannot be manually toggled to ensure consistency with the user's system settings.

## 🚀 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `dist`
6. Deploy!

### Deploy to Other Platforms

Astro supports deployment to many platforms. See the [Astro deployment guide](https://docs.astro.build/en/guides/deploy/) for more options.

## 📄 License

This project is created using Cosmic CMS and is available for use and modification.

## 🤝 Support

For questions about Cosmic CMS, visit [Cosmic Documentation](https://www.cosmicjs.com/docs)

For Astro questions, visit [Astro Documentation](https://docs.astro.build)

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and [Astro](https://astro.build)

<!-- README_END -->