export interface Review {
  id: string
  name: string
  location: string | null
  rating: number
  text: string
  status: 'pending' | 'approved' | 'rejected'
  admin_reply: string | null
  created_at: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string | null
  image_path: string
  display_order: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  phone: string
  email: string | null
  comment: string | null
  is_read: boolean
  created_at: string
}
