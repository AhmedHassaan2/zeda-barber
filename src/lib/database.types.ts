export interface Service {
  id: string
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  price: number | null
  image_url: string | null
  order_index: number
  created_at: string
}

export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  image_url: string | null
  video_url: string | null
  order_index: number
  created_at: string
}

export interface Hairstyle {
  id: string
  title_ar: string
  title_en: string
  image_url: string
  order_index: number
  created_at: string
}

export interface TeamMember {
  id: string
  name_ar: string
  name_en: string
  role_ar: string | null
  role_en: string | null
  image_url: string | null
  order_index: number
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  updated_at: string
}
