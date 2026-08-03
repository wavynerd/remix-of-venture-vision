import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RichTextEditor from '@/components/blog/RichTextEditor';
import SeoPreview from '@/components/blog/SeoPreview';
import { 
  getPostById, savePost, generateSlug, 
  getStoredCategories, getStoredTags, ensureCategoryExists, ensureTagExists 
} from '@/lib/blogStore';
import { PostStatus } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Save, Lock, Unlock, Image as ImageIcon, 
  Plus, X, Calendar, Sparkles, Check, FileText 
} from 'lucide-react';
import { toast } from 'sonner';

const SAMPLE_FEATURED_IMAGES = [
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
];

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugLocked, setIsSlugLocked] = useState(true);
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState(SAMPLE_FEATURED_IMAGES[0]);
  const [category, setCategory] = useState('Market Insights');
  const [tags, setTags] = useState<string[]>(['Funding', 'Venture Capital']);
  const [status, setStatus] = useState<PostStatus>('published');
  const [publishDate, setPublishDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Lookup option state
  const [availableCategories, setAvailableCategories] = useState(() => getStoredCategories());
  const [availableTags, setAvailableTags] = useState(() => getStoredTags());
  
  // On-the-fly dialog states
  const [newCatName, setNewCatName] = useState('');
  const [newCatDialogOpen, setNewCatDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const existing = getPostById(id);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug);
        setContent(existing.content);
        setExcerpt(existing.excerpt);
        setFeaturedImage(existing.featuredImage);
        setCategory(existing.category);
        setTags(existing.tags || []);
        setStatus(existing.status);
        if (existing.publishDate) {
          setPublishDate(new Date(existing.publishDate).toISOString().slice(0, 16));
        }
        setSeoTitle(existing.seoTitle || existing.title);
        setSeoDescription(existing.seoDescription || existing.excerpt);
      } else {
        toast.error('Post not found');
        navigate('/admin/blog');
      }
    }
  }, [id, isEditing, navigate]);

  // Handle Title change & Auto Slug generation
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (isSlugLocked) {
      setSlug(generateSlug(newTitle));
    }
    if (!seoTitle || seoTitle === title) {
      setSeoTitle(newTitle);
    }
  };

  const toggleSlugLock = () => {
    if (isSlugLocked) {
      setIsSlugLocked(false);
    } else {
      setIsSlugLocked(true);
      setSlug(generateSlug(title));
    }
  };

  // Handle Excerpt change
  const handleExcerptChange = (newExcerpt: string) => {
    setExcerpt(newExcerpt);
    if (!seoDescription || seoDescription === excerpt) {
      setSeoDescription(newExcerpt);
    }
  };

  // Handle local image upload file -> Data URL
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFeaturedImage(result);
          toast.success('Featured image uploaded');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Category on the fly
  const handleCreateCategory = () => {
    if (!newCatName.trim()) return;
    const created = ensureCategoryExists(newCatName);
    setAvailableCategories(getStoredCategories());
    setCategory(created.name);
    setNewCatName('');
    setNewCatDialogOpen(false);
    toast.success(`Category "${created.name}" created!`);
  };

  // Create Tag on the fly
  const handleAddTag = (tagNameToAdd?: string) => {
    const target = tagNameToAdd || newTagName;
    if (!target.trim()) return;
    const created = ensureTagExists(target);
    setAvailableTags(getStoredTags());
    if (!tags.includes(created.name)) {
      setTags([...tags, created.name]);
    }
    setNewTagName('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  // Form Submission
  const handleSubmit = (overrideStatus?: PostStatus) => {
    if (!title.trim()) {
      toast.error('Article title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Article content is required');
      return;
    }

    const finalStatus = overrideStatus || status;
    const formattedPubDate = new Date(publishDate).toISOString();

    const saved = savePost({
      id: isEditing ? id : undefined,
      title,
      slug: slug || generateSlug(title),
      content,
      excerpt,
      featuredImage,
      category,
      tags,
      status: finalStatus,
      publishDate: formattedPubDate,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
    });

    toast.success(`Post successfully ${isEditing ? 'updated' : 'created'} as ${finalStatus.toUpperCase()}!`);
    navigate('/admin/blog');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-border pb-6">
          <div>
            <Link 
              to="/admin/blog" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog Admin
            </Link>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/admin/blog')}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => handleSubmit('draft')} className="gap-1.5">
              <FileText className="h-4 w-4" /> Save Draft
            </Button>
            <Button onClick={() => handleSubmit()} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-1.5 shadow-sm">
              <Save className="h-4 w-4" /> {isEditing ? 'Update Post' : 'Publish / Schedule'}
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Core Content) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Title & Slug */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-bold">Article Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Navigating Early-Stage Venture Valuations in 2026"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="mt-1.5 text-lg font-semibold"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="slug" className="text-xs font-semibold text-muted-foreground">URL Slug</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleSlugLock} 
                    className="h-6 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                  >
                    {isSlugLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    {isSlugLocked ? 'Auto-generating (Click to edit)' : 'Unlocked (Click to auto-generate)'}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-2 rounded-md">/blog/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={isSlugLocked}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* WYSIWYG Content Editor */}
            <div className="space-y-2">
              <Label className="text-sm font-bold">Post Content (WYSIWYG / HTML Editor) *</Label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>

            {/* Short Excerpt */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="excerpt" className="text-sm font-bold">Post Excerpt / Summary</Label>
                <span className="text-xs text-muted-foreground">{excerpt.length} chars</span>
              </div>
              <Textarea
                id="excerpt"
                rows={3}
                placeholder="A concise summary of the article displayed on the listing page and cards..."
                value={excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
              />
            </div>

            {/* SEO Metadata & Live Preview */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
              <div className="border-b border-border pb-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" /> Search Engine Optimization (SEO)
                </h3>
                <p className="text-xs text-muted-foreground">Customize how this article appears in search engines and social media shares.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="seoTitle" className="text-xs font-semibold">SEO Title</Label>
                    <span className={`text-[11px] ${seoTitle.length > 60 ? 'text-amber-500 font-bold' : 'text-muted-foreground'}`}>
                      {seoTitle.length} / 60 optimal chars
                    </span>
                  </div>
                  <Input
                    id="seoTitle"
                    placeholder="Title for Google search results..."
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="seoDescription" className="text-xs font-semibold">SEO Meta Description</Label>
                    <span className={`text-[11px] ${seoDescription.length > 160 ? 'text-amber-500 font-bold' : 'text-muted-foreground'}`}>
                      {seoDescription.length} / 160 optimal chars
                    </span>
                  </div>
                  <Textarea
                    id="seoDescription"
                    rows={3}
                    placeholder="Compelling description summarizing key insights for Google search snippets..."
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Live SEO Preview Component */}
              <SeoPreview 
                title={seoTitle || title}
                slug={slug || generateSlug(title)}
                description={seoDescription || excerpt}
                featuredImage={featuredImage}
              />
            </div>

          </div>

          {/* Right Sidebar (Settings, Image, Category, Publishing) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Status & Publishing Controls */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                Publishing Settings
              </h3>

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-muted-foreground">Article Status</Label>
                <RadioGroup value={status} onValueChange={(val) => setStatus(val as PostStatus)} className="space-y-2">
                  <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/30 cursor-pointer">
                    <RadioGroupItem value="published" id="st-published" />
                    <Label htmlFor="st-published" className="font-semibold cursor-pointer text-sm">Published</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/30 cursor-pointer">
                    <RadioGroupItem value="draft" id="st-draft" />
                    <Label htmlFor="st-draft" className="font-semibold cursor-pointer text-sm">Draft</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-border p-3 hover:bg-muted/30 cursor-pointer">
                    <RadioGroupItem value="scheduled" id="st-scheduled" />
                    <Label htmlFor="st-scheduled" className="font-semibold cursor-pointer text-sm">Scheduled</Label>
                  </div>
                </RadioGroup>
              </div>

              {status === 'scheduled' && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <Label htmlFor="pubDate" className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Scheduled Publish Date & Time
                  </Label>
                  <Input
                    id="pubDate"
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">The post will automatically transition to 'Published' once this time is reached.</p>
                </div>
              )}
            </div>

            {/* Featured Image Selector */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
                <ImageIcon className="h-4 w-4 text-accent" /> Featured Image
              </h3>

              <div className="overflow-hidden rounded-lg border border-border bg-muted h-44 relative">
                <img
                  src={featuredImage}
                  alt="Featured Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = SAMPLE_FEATURED_IMAGES[0];
                  }}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Upload Local Image File</Label>
                  <Input type="file" accept="image/*" onChange={handleImageFileUpload} className="cursor-pointer text-xs mt-1" />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Or Direct Image URL</Label>
                  <Input 
                    value={featuredImage} 
                    onChange={(e) => setFeaturedImage(e.target.value)} 
                    placeholder="https://images.unsplash.com/..." 
                    className="text-xs font-mono mt-1" 
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Quick Sample Imagery</Label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {SAMPLE_FEATURED_IMAGES.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Preset"
                        onClick={() => setFeaturedImage(img)}
                        className={`h-10 w-full object-cover rounded cursor-pointer border transition-all ${
                          featuredImage === img ? 'ring-2 ring-accent border-accent' : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Category & Tags Management */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
              
              {/* Category */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-bold text-foreground">Category *</Label>
                  
                  {/* Create Category Dialog */}
                  <Dialog open={newCatDialogOpen} onOpenChange={setNewCatDialogOpen}>
                    <DialogTrigger asChild>
                      <button type="button" className="text-[11px] text-accent hover:underline flex items-center gap-1 font-semibold">
                        <Plus className="h-3 w-3" /> New Category
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Category On-The-Fly</DialogTitle>
                      </DialogHeader>
                      <div className="py-2">
                        <Input
                          placeholder="Category Name (e.g. Sustainable Tech)"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleCreateCategory}>Save & Select</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags Multi-select & Create */}
              <div>
                <Label className="text-xs font-bold text-foreground mb-2 block">Article Tags</Label>
                
                {/* Active Tags Pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3 min-h-[32px] p-2 bg-muted/20 rounded-lg border border-border">
                  {tags.map((t) => (
                    <Badge key={t} className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/40 text-xs gap-1">
                      #{t}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(t)} />
                    </Badge>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">No tags selected yet.</span>
                  )}
                </div>

                {/* Add Tag Input */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add tag (e.g. Fintech)"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="text-xs"
                  />
                  <Button type="button" size="sm" onClick={() => handleAddTag()} variant="secondary">
                    Add
                  </Button>
                </div>

                {/* Suggested Available Tags */}
                <div className="mt-3">
                  <span className="text-[11px] text-muted-foreground block mb-1.5">Existing tags click to add:</span>
                  <div className="flex flex-wrap gap-1">
                    {availableTags.map((t) => (
                      <Badge
                        key={t.id}
                        variant="outline"
                        onClick={() => handleAddTag(t.name)}
                        className="cursor-pointer text-[10px] hover:border-accent hover:text-accent"
                      >
                        +{t.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
