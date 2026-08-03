import { Globe, Share2 } from 'lucide-react';

interface SeoPreviewProps {
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
}

export default function SeoPreview({ title, slug, description, featuredImage }: SeoPreviewProps) {
  const displayTitle = title || 'Your Post Title Here';
  const displaySlug = slug || 'your-post-slug';
  const displayDescription = description || 'Provide a compelling meta description summarizing the key takeaways of your blog post to boost search engine click-through rates.';
  const displayImage = featuredImage || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-accent" /> SEO & Social Share Preview
        </h3>
        <span className="text-xs text-muted-foreground font-mono">Live Simulation</span>
      </div>

      {/* Google Search Result Mockup */}
      <div className="space-y-1.5 rounded-lg border border-border/80 bg-background p-4 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-sans">
          <Globe className="h-3.5 w-3.5" />
          <span>https://venturevision.com › blog › </span>
          <span className="font-medium">{displaySlug}</span>
        </div>
        <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer tracking-normal leading-snug line-clamp-1">
          {displayTitle}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {displayDescription}
        </p>
      </div>

      {/* Social Media Open Graph Card Mockup */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <Share2 className="h-3.5 w-3.5" /> Social Media Preview Card (Twitter / LinkedIn / OpenGraph)
        </span>
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm max-w-md">
          <div className="h-40 w-full overflow-hidden bg-muted">
            <img 
              src={displayImage} 
              alt="OG Preview" 
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="p-3.5 space-y-1 bg-muted/20">
            <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">VENTUREVISION.COM</div>
            <h5 className="text-sm font-bold text-foreground line-clamp-1 leading-snug">{displayTitle}</h5>
            <p className="text-xs text-muted-foreground line-clamp-2">{displayDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
