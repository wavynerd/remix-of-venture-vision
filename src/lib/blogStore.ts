import { BlogPost, Category, Tag, BlogFilterOptions, PostStatus } from '@/types/blog';

const STORAGE_KEY = 'venture_vision_blog_posts';
const CATEGORIES_KEY = 'venture_vision_blog_categories';
const TAGS_KEY = 'venture_vision_blog_tags';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Market Insights', slug: 'market-insights', description: 'Trends and analysis across emerging venture markets.' },
  { id: 'cat-2', name: 'Venture Capital', slug: 'venture-capital', description: 'Strategies and news from top venture funds and angel networks.' },
  { id: 'cat-3', name: 'Founder Guides', slug: 'founder-guides', description: 'Actionable playbooks for early-stage founders and builders.' },
  { id: 'cat-4', name: 'Platform News', slug: 'platform-news', description: 'Product updates and announcements from Venture Vision.' },
];

export const INITIAL_TAGS: Tag[] = [
  { id: 'tag-1', name: 'Fintech', slug: 'fintech' },
  { id: 'tag-2', name: 'AI & Data', slug: 'ai-data' },
  { id: 'tag-3', name: 'Due Diligence', slug: 'due-diligence' },
  { id: 'tag-4', name: 'Funding', slug: 'funding' },
  { id: 'tag-5', name: 'Growth', slug: 'growth' },
  { id: 'tag-6', name: 'CleanTech', slug: 'cleantech' },
];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Navigating Early-Stage Valuations in 2026: A Founder & Investor Playbook',
    slug: 'navigating-early-stage-valuations-2026',
    excerpt: 'Explore how macro shifts and AI-driven efficiency metrics are redefining venture valuation frameworks for pre-seed and seed stage startups.',
    content: `
      <h2>The Shift in Venture Valuation Frameworks</h2>
      <p>As venture investment paradigms evolve, early-stage valuations are increasingly anchored around real traction, unit economics, and capital efficiency. Investors in 2026 are looking past vanity metric spikes to analyze sustainable growth drivers.</p>
      
      <h3>Key Metrics Shaping Deal Terms</h3>
      <ul>
        <li><strong>Burn Multiple:</strong> Net Burn divided by Net New ARR. Top-tier founders maintain a burn multiple under 1.5x.</li>
        <li><strong>Capital Efficiency:</strong> How effectively a team deploys capital to hit major derisking milestones.</li>
        <li><strong>Retention Cohorts:</strong> Net Revenue Retention (NRR) exceeding 115% for enterprise B2B SaaS.</li>
      </ul>

      <blockquote>
        "The best venture investments are built on transparent data rooms, disciplined milestone tracking, and aligned founder-investor incentives."
      </blockquote>

      <h3>Actionable Advice for Founders</h3>
      <p>Before entering pitch meetings, ensure your data room highlights customer cohort retention, gross margin trajectory, and a realistic 18-to-24 month runway plan.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    category: 'Venture Capital',
    tags: ['Funding', 'Due Diligence', 'Fintech'],
    status: 'published',
    publishDate: '2026-07-28T09:00:00.000Z',
    seoTitle: 'Navigating Early-Stage Valuations in 2026 | Venture Vision Insights',
    seoDescription: 'Discover how macro shifts and capital efficiency metrics are reshaping pre-seed and seed valuations for investors and founders.',
    isDeleted: false,
    createdAt: '2026-07-28T08:30:00.000Z',
    updatedAt: '2026-07-28T09:00:00.000Z',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'Head of Research'
    },
    readTimeMinutes: 5
  },
  {
    id: 'post-2',
    title: 'AI Infrastructure & Applied Machine Learning: Emerging Deal Trends',
    slug: 'ai-infrastructure-applied-ml-deal-trends',
    excerpt: 'An inside look at where top syndicate leads are deploying capital in autonomous agents, edge computing, and specialized vertical AI.',
    content: `
      <h2>The Next Wave of AI Value Creation</h2>
      <p>While foundational model providers captured initial venture dollars, the largest value expansion in 2026 is occurring at the application layer and vertical workflow automation.</p>

      <h3>3 Sectors Gaining Rapid Momentum</h3>
      <ol>
        <li><strong>Vertical Healthcare AI:</strong> Diagnostic assistance and automated clinical trial matching.</li>
        <li><strong>Industrial Robotics & Edge Inference:</strong> On-device processing for real-time manufacturing optimization.</li>
        <li><strong>Automated Financial Compliance:</strong> Real-time audit trails and cross-border regulatory verification.</li>
      </ol>

      <p>Syndicates on Venture Vision have seen a 40% increase in investor allocations toward vertical AI platforms with proprietary dataset moats.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Market Insights',
    tags: ['AI & Data', 'Growth', 'Fintech'],
    status: 'published',
    publishDate: '2026-07-20T14:30:00.000Z',
    seoTitle: 'AI Infrastructure & Applied ML Deal Trends | Venture Vision',
    seoDescription: 'Explore venture investment trends in autonomous agents, edge AI, and vertical machine learning platforms.',
    isDeleted: false,
    createdAt: '2026-07-20T12:00:00.000Z',
    updatedAt: '2026-07-20T14:30:00.000Z',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Managing Partner'
    },
    readTimeMinutes: 4
  },
  {
    id: 'post-3',
    title: 'Essential Due Diligence Checklist for Angel & Family Office Investors',
    slug: 'essential-due-diligence-checklist-angel-investors',
    excerpt: 'Streamline your screening process with our 10-step due diligence framework designed to evaluate tech stack, IP, cap tables, and legal compliance.',
    content: `
      <h2>Standardizing Due Diligence for High-Yield Ventures</h2>
      <p>Rigorous due diligence separates high-performing portfolios from costly write-downs. Here is the exact framework utilized by Venture Vision vetting analysts.</p>

      <h3>1. Cap Table & Legal Integrity</h3>
      <p>Verify clear ownership structures, option pool allocations, and ensure SAFEs/convertible notes have clear conversion triggers without hidden liquidation preferences.</p>

      <h3>2. Intellectual Property & Technical Moat</h3>
      <p>Assess IP assignment agreements for all early developers and contractors. Review open-source license compliance.</p>

      <h3>3. Customer Reference Calls</h3>
      <p>Conduct minimum 3 independent customer interviews to validate product-market fit, Net Promoter Scores, and churn risk.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    category: 'Founder Guides',
    tags: ['Due Diligence', 'Funding'],
    status: 'published',
    publishDate: '2026-07-15T11:00:00.000Z',
    seoTitle: 'Angel & Family Office Due Diligence Checklist | Venture Vision',
    seoDescription: 'A 10-step due diligence framework for screening early-stage investments, checking cap tables, IP, and customer traction.',
    isDeleted: false,
    createdAt: '2026-07-15T10:00:00.000Z',
    updatedAt: '2026-07-15T11:00:00.000Z',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Investment Director'
    },
    readTimeMinutes: 6
  },
  {
    id: 'post-4',
    title: 'Introducing Venture Vision 3.0: Automated Data Rooms & Investor Dashboards',
    slug: 'introducing-venture-vision-3-automated-data-rooms',
    excerpt: 'We are thrilled to launch automated cap table verification, real-time deal flow matching, and instant syndicate creation tools.',
    content: `
      <h2>Elevating the Private Market Experience</h2>
      <p>Today marks a major milestone for Venture Vision with the release of version 3.0. Designed specifically for institutional syndicates, accredited angels, and growth-stage founders.</p>
      
      <h3>What’s New in 3.0:</h3>
      <ul>
        <li><strong>Automated Data Room Auditing:</strong> Instant AI analysis of financial statements and legal docs.</li>
        <li><strong>Smart Investor Matching:</strong> Intelligent matching based on check size, domain expertise, and geography.</li>
        <li><strong>Enhanced Security & Encryption:</strong> SOC2 Type II compliance standards and granular document permissions.</li>
      </ul>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'Platform News',
    tags: ['Growth', 'Fintech'],
    status: 'published',
    publishDate: '2026-07-02T16:00:00.000Z',
    seoTitle: 'Introducing Venture Vision 3.0 | Product Update',
    seoDescription: 'Explore the new features in Venture Vision 3.0 including automated data rooms, smart investor matching, and security upgrades.',
    isDeleted: false,
    createdAt: '2026-07-02T15:00:00.000Z',
    updatedAt: '2026-07-02T16:00:00.000Z',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Managing Partner'
    },
    readTimeMinutes: 3
  },
  {
    id: 'post-5',
    title: 'CleanTech Investment Trends: Carbon Accounting & Grid Intelligence',
    slug: 'cleantech-investment-trends-carbon-grid-intelligence',
    excerpt: 'Draft post outlining institutional capital flow into renewable grid balancing software and carbon intelligence platforms.',
    content: `
      <h2>Investing in Climate Resiliency</h2>
      <p>Institutional interest in CleanTech software and grid intelligence solutions has grown 65% year-over-year. This draft covers upcoming syndicate opportunities.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    category: 'Market Insights',
    tags: ['CleanTech', 'Growth'],
    status: 'draft',
    publishDate: '2026-08-01T10:00:00.000Z',
    seoTitle: 'CleanTech Investment Trends | Venture Vision',
    seoDescription: 'Draft insights into renewable grid software and carbon accounting investments.',
    isDeleted: false,
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'Head of Research'
    },
    readTimeMinutes: 4
  },
  {
    id: 'post-6',
    title: 'Cross-Border Venture Syndicates: Legal Frameworks & Tax Structures',
    slug: 'cross-border-venture-syndicates-legal-frameworks',
    excerpt: 'Scheduled post exploring Delaware LLC roll-up vehicles vs Cayman SPVs for global investor networks.',
    content: `
      <h2>Global Capital Aggregation</h2>
      <p>As investor networks transcend borders, structuring compliant cross-border syndicates requires careful coordination of tax withholding, KYC/AML, and SPV entity management.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'Venture Capital',
    tags: ['Funding', 'Fintech'],
    status: 'scheduled',
    publishDate: '2026-08-15T10:00:00.000Z',
    seoTitle: 'Cross-Border Venture Syndicates Legal Guide | Venture Vision',
    seoDescription: 'Comprehensive guide to Delaware LLCs and Cayman SPVs for international angel syndicates.',
    isDeleted: false,
    createdAt: '2026-08-02T11:00:00.000Z',
    updatedAt: '2026-08-02T11:00:00.000Z',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      role: 'Investment Director'
    },
    readTimeMinutes: 5
  }
];

// Generate URL slug from title string
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Calculate estimated read time in minutes
export function calculateReadTime(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Check and update scheduled posts status if time has passed
function autoUpdateScheduledPosts(posts: BlogPost[]): BlogPost[] {
  const now = new Date().getTime();
  let modified = false;

  const updated = posts.map(post => {
    if (post.status === 'scheduled' && post.publishDate) {
      const pubTime = new Date(post.publishDate).getTime();
      if (now >= pubTime) {
        modified = true;
        return { ...post, status: 'published' as PostStatus, updatedAt: new Date().toISOString() };
      }
    }
    return post;
  });

  return { posts: updated, modified } as any;
}

// --- Store API ---

export function getStoredPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const parsed: BlogPost[] = JSON.parse(raw);
    
    // Check auto-publish for scheduled posts
    const { posts: updatedPosts, modified } = autoUpdateScheduledPosts(parsed) as any;
    if (modified) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    }
    return updatedPosts || parsed;
  } catch (e) {
    console.error('Error loading posts from localStorage', e);
    return INITIAL_POSTS;
  }
}

export function saveStoredPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving posts to localStorage', e);
  }
}

export function getStoredCategories(): Category[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: Category[]): void {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving categories', e);
  }
}

export function getStoredTags(): Tag[] {
  try {
    const raw = localStorage.getItem(TAGS_KEY);
    if (!raw) {
      localStorage.setItem(TAGS_KEY, JSON.stringify(INITIAL_TAGS));
      return INITIAL_TAGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_TAGS;
  }
}

export function saveStoredTags(tags: Tag[]): void {
  try {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  } catch (e) {
    console.error('Error saving tags', e);
  }
}

// Create or get Category by name
export function ensureCategoryExists(categoryName: string): Category {
  const categories = getStoredCategories();
  const trimmed = categoryName.trim();
  const existing = categories.find(c => c.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) return existing;

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: trimmed,
    slug: generateSlug(trimmed),
  };
  const updated = [...categories, newCat];
  saveStoredCategories(updated);
  return newCat;
}

// Create or get Tag by name
export function ensureTagExists(tagName: string): Tag {
  const tags = getStoredTags();
  const trimmed = tagName.trim();
  const existing = tags.find(t => t.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) return existing;

  const newTag: Tag = {
    id: `tag-${Date.now()}`,
    name: trimmed,
    slug: generateSlug(trimmed),
  };
  const updated = [...tags, newTag];
  saveStoredTags(updated);
  return newTag;
}

// Query filtered posts
export function getFilteredPosts(filters: BlogFilterOptions = {}) {
  const posts = getStoredPosts();
  const {
    searchQuery = '',
    category,
    tag,
    status = 'published',
    sortBy = 'newest',
    page = 1,
    pageSize = 6
  } = filters;

  let result = posts.filter(post => {
    // Soft delete filtering
    if (status === 'archived') {
      if (!post.isDeleted) return false;
    } else {
      if (post.isDeleted) return false;
      if (status !== 'all' && post.status !== status) return false;
    }

    // Category filter
    if (category && category !== 'All' && post.category !== category) {
      return false;
    }

    // Tag filter
    if (tag && !post.tags.includes(tag)) {
      return false;
    }

    // Search query filter (title, excerpt, content, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchCategory = post.category.toLowerCase().includes(q);
      const matchTags = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchContent && !matchCategory && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  result.sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // newest (default)
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Pagination
  const total = result.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = result.slice(startIndex, startIndex + pageSize);

  return {
    posts: paginatedPosts,
    total,
    totalPages,
    currentPage: page
  };
}

// Single post lookup by slug
export function getPostBySlug(slug: string, includeUnpublished = false): BlogPost | undefined {
  const posts = getStoredPosts();
  return posts.find(p => p.slug === slug && !p.isDeleted && (includeUnpublished || p.status === 'published'));
}

// Single post lookup by ID
export function getPostById(id: string): BlogPost | undefined {
  const posts = getStoredPosts();
  return posts.find(p => p.id === id);
}

// Create or Update Post
export function savePost(postData: Partial<BlogPost> & { title: string; content: string }): BlogPost {
  const posts = getStoredPosts();
  const now = new Date().toISOString();

  // Ensure category and tags exist in lookup tables
  if (postData.category) ensureCategoryExists(postData.category);
  if (postData.tags) postData.tags.forEach(t => ensureTagExists(t));

  const slug = postData.slug || generateSlug(postData.title);

  if (postData.id) {
    // Update existing post
    const existingIndex = posts.findIndex(p => p.id === postData.id);
    if (existingIndex >= 0) {
      const existing = posts[existingIndex];
      const updatedPost: BlogPost = {
        ...existing,
        ...postData,
        slug,
        readTimeMinutes: calculateReadTime(postData.content || existing.content),
        updatedAt: now,
      };
      posts[existingIndex] = updatedPost;
      saveStoredPosts(posts);
      return updatedPost;
    }
  }

  // Create new post
  const newPost: BlogPost = {
    id: `post-${Date.now()}`,
    title: postData.title,
    slug,
    content: postData.content,
    excerpt: postData.excerpt || postData.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
    featuredImage: postData.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: postData.category || 'General',
    tags: postData.tags || [],
    status: postData.status || 'published',
    publishDate: postData.publishDate || now,
    seoTitle: postData.seoTitle || postData.title,
    seoDescription: postData.seoDescription || postData.excerpt || '',
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
    author: postData.author || {
      name: 'Venture Vision Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Editorial Team'
    },
    readTimeMinutes: calculateReadTime(postData.content)
  };

  posts.unshift(newPost);
  saveStoredPosts(posts);
  return newPost;
}

// Soft Delete (Archive)
export function softDeletePost(id: string): boolean {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index >= 0) {
    posts[index].isDeleted = true;
    posts[index].updatedAt = new Date().toISOString();
    saveStoredPosts(posts);
    return true;
  }
  return false;
}

// Restore Soft Deleted Post
export function restorePost(id: string): boolean {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index >= 0) {
    posts[index].isDeleted = false;
    posts[index].updatedAt = new Date().toISOString();
    saveStoredPosts(posts);
    return true;
  }
  return false;
}

// Quick status change
export function updatePostStatus(id: string, status: PostStatus): boolean {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index >= 0) {
    posts[index].status = status;
    posts[index].updatedAt = new Date().toISOString();
    saveStoredPosts(posts);
    return true;
  }
  return false;
}

// Related posts search
export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const posts = getStoredPosts().filter(p => p.id !== currentPost.id && !p.isDeleted && p.status === 'published');
  
  // Score posts based on category match and shared tags
  const scored = posts.map(p => {
    let score = 0;
    if (p.category === currentPost.category) score += 3;
    const sharedTags = p.tags.filter(t => currentPost.tags.includes(t));
    score += sharedTags.length * 2;
    return { post: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.post);
}
