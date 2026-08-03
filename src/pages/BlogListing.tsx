import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { getFilteredPosts, getStoredCategories, getStoredTags } from '@/lib/blogStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, PaginationContent, PaginationItem, 
  PaginationLink, PaginationNext, PaginationPrevious 
} from '@/components/ui/pagination';
import { Search, Calendar, Clock, Tag as TagIcon, ArrowRight, X, Sparkles, Filter } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => ['All', ...getStoredCategories().map(c => c.name)], []);
  const popularTags = useMemo(() => getStoredTags().slice(0, 8), []);

  const pageSize = 6;

  const { posts, total, totalPages } = useMemo(() => {
    return getFilteredPosts({
      searchQuery,
      category: selectedCategory,
      tag: selectedTag,
      status: 'published',
      page: currentPage,
      pageSize,
    });
  }, [searchQuery, selectedCategory, selectedTag, currentPage]);

  const featuredPost = useMemo(() => {
    if (currentPage === 1 && !searchQuery && selectedCategory === 'All' && !selectedTag) {
      return posts[0];
    }
    return null;
  }, [currentPage, searchQuery, selectedCategory, selectedTag, posts]);

  const gridPosts = featuredPost ? posts.slice(1) : posts;

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-16 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" /> Private Market Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
            Venture Vision <span className="text-accent">Insights & News</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Market analysis, venture capital trends, and practical guides curated for accredited investors and forward-thinking founders.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles by topic, keyword, or tag..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 pr-10 py-6 text-base rounded-full border-border bg-card shadow-sm focus-visible:ring-accent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-border pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCategorySelect(cat)}
                className={`rounded-full font-medium text-xs sm:text-sm ${
                  selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedTag) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Clear Filters
            </Button>
          )}
        </div>

        {/* Tags Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
            <TagIcon className="h-3.5 w-3.5" /> Filter by Tag:
          </span>
          {popularTags.map((t) => (
            <Badge
              key={t.id}
              variant={selectedTag === t.name ? 'default' : 'outline'}
              onClick={() => handleTagSelect(t.name)}
              className={`cursor-pointer transition-all ${
                selectedTag === t.name 
                  ? 'bg-accent text-accent-foreground border-accent' 
                  : 'hover:bg-accent/10 hover:text-accent hover:border-accent/40'
              }`}
            >
              #{t.name}
            </Badge>
          ))}
        </div>

        {/* Featured Post Banner (Only on page 1 with no search filter) */}
        {featuredPost && (
          <div className="mb-12">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-muted">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground font-semibold shadow-md">
                    Featured Article
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <Badge variant="outline" className="border-border text-foreground font-medium">
                      {featuredPost.category}
                    </Badge>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(featuredPost.publishDate), 'MMM d, yyyy')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTimeMinutes || 5} min read
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-accent transition-colors leading-tight mb-4">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="h-9 w-9 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="text-xs font-bold text-foreground">{featuredPost.author.name}</div>
                      <div className="text-[10px] text-muted-foreground">{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 font-semibold">
                      Read Full Article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => {
              const formattedDate = post.publishDate ? format(new Date(post.publishDate), 'MMM d, yyyy') : '';
              return (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur text-foreground border-none shadow-sm text-xs">
                      {post.category}
                    </Badge>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTimeMinutes || 4} min read
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-3">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {post.tags.map((t) => (
                        <span key={t} className="text-[11px] font-medium text-accent hover:underline">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-7 w-7 rounded-full object-cover border border-border"
                        />
                        <span className="text-xs font-medium text-foreground">{post.author.name}</span>
                      </div>

                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:underline"
                      >
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Articles Found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any published posts matching your search query or category filters.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Search & Filters
            </Button>
          </div>
        )}

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => setCurrentPage(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Venture Vision Inc. All rights reserved. Empowering private market investment decisions.</p>
        </div>
      </footer>
    </div>
  );
}
