export type PostStatus = 'draft' | 'published' | 'scheduled';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: PostStatus;
  publishDate: string; // ISO date string e.g. "2026-08-03T12:00:00.000Z"
  seoTitle: string;
  seoDescription: string;
  isDeleted: boolean; // Soft delete / archived flag
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTimeMinutes?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogFilterOptions {
  searchQuery?: string;
  category?: string;
  tag?: string;
  status?: PostStatus | 'all' | 'archived';
  sortBy?: 'newest' | 'oldest' | 'title';
  page?: number;
  pageSize?: number;
}
