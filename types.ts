// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Company Info interface
export interface CompanyInfo extends CosmicObject {
  type: 'company-info'
  metadata: {
    company_name: string
    tagline?: string
    description?: string
    logo?: {
      url: string
      imgix_url: string
    }
    hero_title?: string
    hero_subtitle?: string
    whatsapp_number?: string
  }
}

// Service interface
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    service_name: string
    description: string
    icon?: {
      url: string
      imgix_url: string
    }
    order?: number
  }
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    product_name: string
    description?: string
    category?: {
      key: string
      value: string
    }
    screenshot?: {
      url: string
      imgix_url: string
    }
    product_url?: string
    featured?: boolean
  }
}

// Technology interface
export interface Technology extends CosmicObject {
  type: 'technologies'
  metadata: {
    technology_name: string
    description: string
    logo?: {
      url: string
      imgix_url: string
    }
    order?: number
  }
}

// Site Settings interface
export interface SiteSettings extends CosmicObject {
  type: 'site-settings'
  metadata: {
    footer_copyright?: string
    newsletter_enabled?: boolean
    social_links?: {
      github?: string
      email?: string
    }
    marketplace_links?: {
      tokopedia?: string
      shopee?: string
      lynk?: string
      mayar?: string
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  object?: T
  total: number
  limit?: number
  skip?: number
}

// Category type for products
export type ProductCategory = 'education' | 'business' | 'technology'