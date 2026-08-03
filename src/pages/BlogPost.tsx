import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getPostBySlug, getRelatedPosts } from '@/lib/blogStore';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, 
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Check, Tag as TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const found = getPostBySlug(slug);
    if (found) {
      setPost(found);

      // SEO Dynamic Meta Injections
      document.title = found.seoTitle || `${found.title} | Venture Vision`;
      
      const updateMeta = (name: string, content: string, attr: string = 'name') => {
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      const description = found.seoDescription || found.excerpt;
      updateMeta('description', description);
      updateMeta('og:title', found.seoTitle || found.title, 'property');
      updateMeta('og:description', description, 'property');
      updateMeta('og:image', found.featuredImage, 'property');
      updateMeta('og:type', 'article', 'property');
    } else {
      setPost(null);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto max-w-4xl px-4 py-20 text-center flex-1">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-8">The requested blog post does not exist or may have been archived.</p>
          <Button onClick={() => navigate('/blog')} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Blog Listing
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const formattedDate = post.publishDate ? format(new Date(post.publishDate), 'MMMM d, yyyy') : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Article link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.category}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        {/* Header Metadata */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-accent text-accent-foreground font-semibold">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTimeMinutes || 5} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed font-normal mb-6">
            {post.excerpt}
          </p>

          {/* Author Info Bar & Share Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover border border-border"
              />
              <div>
                <div className="text-sm font-bold text-foreground">{post.author.name}</div>
                <div className="text-xs text-muted-foreground">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Share:</span>
              <Button variant="outline" size="sm" onClick={handleCopyLink} className="h-8 gap-1.5 text-xs">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Link'}
              </Button>
              <Button variant="outline" size="icon" onClick={shareOnTwitter} className="h-8 w-8 p-0" title="Share on X (Twitter)">
                <Twitter className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" onClick={shareOnLinkedin} className="h-8 w-8 p-0" title="Share on LinkedIn">
                <Linkedin className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-muted shadow-md max-h-[500px]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Main Article Body */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-accent prose-img:rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Tags Footer */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6 mb-12">
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-2">
              <TagIcon className="h-3.5 w-3.5" /> Article Tags:
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 text-center text-xs text-muted-foreground mt-16">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Venture Vision Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
