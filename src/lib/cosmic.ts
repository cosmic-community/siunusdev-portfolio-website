import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG as string,
  readKey: import.meta.env.COSMIC_READ_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch company info
export async function getCompanyInfo() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'company-info',
        slug: 'siunusdev-company-information'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch company info')
  }
}

// Fetch all services
export async function getServices() {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Manual sorting by order field
    return response.objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 0
      const orderB = b.metadata?.order || 0
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch services')
  }
}

// Fetch products with optional category filter
export async function getProducts(category?: string) {
  try {
    const query: any = { type: 'products' }
    
    // Only add category filter if provided
    if (category) {
      query['metadata.category.key'] = category
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

// Fetch featured products
export async function getFeaturedProducts() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured products')
  }
}

// Fetch all technologies
export async function getTechnologies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'technologies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Manual sorting by order field
    return response.objects.sort((a: any, b: any) => {
      const orderA = a.metadata?.order || 0
      const orderB = b.metadata?.order || 0
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch technologies')
  }
}

// Fetch site settings
export async function getSiteSettings() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'site-settings',
        slug: 'siunusdev-site-settings'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch site settings')
  }
}