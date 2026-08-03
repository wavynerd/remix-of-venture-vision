import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground tracking-tight">Related Articles</h3>
          <p className="text-sm text-muted-foreground">More insights tailored for venture founders and investors</p>
        </div>
        <Link 
          to="/blog" 
          className="text-sm font-semibold text-accent hover:underline flex items-center gap-1 group"
        >
          View All Posts <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const formattedDate = post.publishDate ? format(new Date(post.publishDate), 'MMM d, yyyy') : '';
          return (
            <article 
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <Link to={`/blog/${post.slug}`} className="relative h-44 overflow-hidden bg-muted">
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
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
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
                  <h4 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h4>
                </Link>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${post.slug}`} 
                  className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:underline"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
