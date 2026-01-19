/**
 * Payload CMS Data Fetcher
 * Fetches content from Payload CMS API for Astro static builds
 */

const PAYLOAD_API_URL = import.meta.env.PUBLIC_PAYLOAD_API_URL || 'http://localhost:3006'

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * Generic fetch function for Payload API
 */
async function fetchPayload<T>(endpoint: string): Promise<PayloadResponse<T>> {
  const url = `${PAYLOAD_API_URL}/api/${endpoint}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Payload API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from Payload API (${url}):`, error)
    throw error
  }
}

/**
 * Fetch singleton collection (returns first document or null)
 */
async function fetchSingleton<T>(collection: string): Promise<T | null> {
  const response = await fetchPayload<T>(`${collection}?limit=1`)
  return response.docs[0] || null
}

/**
 * Fetch all documents from a collection
 */
async function fetchCollection<T>(collection: string, limit: number = 100): Promise<T[]> {
  const response = await fetchPayload<T>(`${collection}?limit=${limit}`)
  return response.docs
}

// =============================================================================
// EXPORTED FUNCTIONS FOR ASTRO COMPONENTS
// =============================================================================

/**
 * Get Site configuration (singleton)
 */
export async function getSiteData() {
  return fetchSingleton('site')
}

/**
 * Get Pricing data (singleton)
 */
export async function getPricingData() {
  return fetchSingleton('pricing')
}

/**
 * Get About data (singleton)
 */
export async function getAboutData() {
  return fetchSingleton('about')
}

/**
 * Get Features data (singleton)
 */
export async function getFeaturesData() {
  return fetchSingleton('features')
}

/**
 * Get Rooms data (singleton)
 */
export async function getRoomsData() {
  return fetchSingleton('rooms')
}

/**
 * Get Gallery data (singleton)
 */
export async function getGalleryData() {
  return fetchSingleton('gallery')
}

/**
 * Get all Reviews (multi-document collection)
 */
export async function getReviews() {
  return fetchCollection('reviews')
}

/**
 * Get all FAQ items (multi-document collection)
 */
export async function getFAQ() {
  return fetchCollection('faq')
}

// =============================================================================
// TYPE DEFINITIONS (for reference)
// =============================================================================

export interface SiteData {
  name: string
  slogan?: string
  description?: string
  hero_slogan?: string
  hero_images?: { path: string; alt: string }[]
  location?: {
    address?: string
    region?: string
    country?: string
    gps?: {
      lat: number
      lng: number
    }
  }
  capacity?: {
    max_guests?: number
    bedrooms?: number
    total_rooms?: number
  }
  contact?: {
    email?: string
    phone?: string
    whatsapp?: string
  }
  meta?: {
    title?: string
    description?: string
    keywords?: { keyword: string }[]
  }
  social?: {
    facebook?: string
    instagram?: string
  }
  rating?: {
    score?: number
    max?: number
    reviews_count?: number
    overall_score?: number
    max_overall?: number
  }
  highlights?: { text: string }[]
  amenity_tags?: { tag: string }[]
  blog_cta?: {
    heading?: string
    description?: string
  }
}

export interface Review {
  author: string
  text: string
  date?: string
  rating: number
  group?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Media {
  id: string
  alt: string
  caption?: string
  category?: string
  url: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  sizes?: {
    thumbnail?: {
      url: string
      width: number
      height: number
    }
    card?: {
      url: string
      width: number
      height: number
    }
    hero?: {
      url: string
      width: number
      height: number
    }
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string | Media
  gallery?: Array<{
    image: string | Media
  }>
  category: string
  tags?: Array<{ tag: string }>
  relatedPosts?: Array<{ post: string | BlogPost }>
  status: 'draft' | 'published'
  publishedAt: string
  author?: string
}

/**
 * Get all published Blog posts (multi-document collection)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchPayload<BlogPost>('blog?where[status][equals]=published&sort=-publishedAt&depth=2')
  return response.docs
}

/**
 * Get single Blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await fetchPayload<BlogPost>(`blog?where[slug][equals]=${slug}&limit=1&depth=2`)
  return response.docs[0] || null
}
