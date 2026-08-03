import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { 
  getStoredPosts, softDeletePost, restorePost, 
  updatePostStatus, getStoredCategories 
} from '@/lib/blogStore';
import { BlogPost, PostStatus } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { 
  Plus, Search, Edit, Trash2, RotateCcw, ExternalLink, 
  FileText, CheckCircle, Clock, Archive, Filter, Sparkles 
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function BlogManagement() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all' | 'archived'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = useMemo(() => getStoredCategories(), []);

  // Stats Counters
  const stats = useMemo(() => {
    const total = posts.filter(p => !p.isDeleted).length;
    const published = posts.filter(p => !p.isDeleted && p.status === 'published').length;
    const drafts = posts.filter(p => !p.isDeleted && p.status === 'draft').length;
    const scheduled = posts.filter(p => !p.isDeleted && p.status === 'scheduled').length;
    const archived = posts.filter(p => p.isDeleted).length;
    return { total, published, drafts, scheduled, archived };
  }, [posts]);

  // Refresh posts list from storage
  const refreshPosts = () => {
    setPosts(getStoredPosts());
  };

  // Filtered dataset
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Soft delete filter
      if (statusFilter === 'archived') {
        if (!post.isDeleted) return false;
      } else {
        if (post.isDeleted) return false;
        if (statusFilter !== 'all' && post.status !== statusFilter) return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && post.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchSlug = post.slug.toLowerCase().includes(q);
        const matchCategory = post.category.toLowerCase().includes(q);
        if (!matchTitle && !matchSlug && !matchCategory) return false;
      }

      return true;
    });
  }, [posts, statusFilter, categoryFilter, searchQuery]);

  const handleSoftDelete = () => {
    if (!deleteId) return;
    const success = softDeletePost(deleteId);
    if (success) {
      toast.success('Post archived (soft deleted) successfully');
      refreshPosts();
    } else {
      toast.error('Failed to archive post');
    }
    setDeleteId(null);
  };

  const handleRestore = (id: string) => {
    const success = restorePost(id);
    if (success) {
      toast.success('Post restored to active status!');
      refreshPosts();
    }
  };

  const handleToggleStatus = (id: string, currentStatus: PostStatus) => {
    const nextStatus: PostStatus = currentStatus === 'published' ? 'draft' : 'published';
    const success = updatePostStatus(id, nextStatus);
    if (success) {
      toast.success(`Post status updated to ${nextStatus.toUpperCase()}`);
      refreshPosts();
    }
  };

  const getStatusBadge = (post: BlogPost) => {
    if (post.isDeleted) {
      return (
        <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400 bg-amber-500/10 gap-1">
          <Archive className="h-3 w-3" /> Archived
        </Badge>
      );
    }
    if (post.status === 'published') {
      return (
        <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 gap-1">
          <CheckCircle className="h-3 w-3" /> Published
        </Badge>
      );
    }
    if (post.status === 'scheduled') {
      return (
        <Badge variant="outline" className="border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-500/10 gap-1">
          <Clock className="h-3 w-3" /> Scheduled
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-slate-500/50 text-slate-600 dark:text-slate-400 bg-slate-500/10 gap-1">
        <FileText className="h-3 w-3" /> Draft
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-1">
        
        {/* Header Title & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Content Management
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Blog Posts Admin</h1>
            <p className="text-sm text-muted-foreground">Manage public articles, drafts, scheduled releases, and soft-deleted archives.</p>
          </div>

          <Link to="/admin/blog/new">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-sm">
              <Plus className="h-4 w-4" /> Create New Post
            </Button>
          </Link>
        </div>

        {/* Stats Dashboard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div 
            onClick={() => setStatusFilter('all')}
            className={`cursor-pointer rounded-xl border p-4 bg-card shadow-sm transition-all ${
              statusFilter === 'all' ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="text-xs font-medium text-muted-foreground mb-1">Total Posts</div>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('published')}
            className={`cursor-pointer rounded-xl border p-4 bg-card shadow-sm transition-all ${
              statusFilter === 'published' ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Published
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.published}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('draft')}
            className={`cursor-pointer rounded-xl border p-4 bg-card shadow-sm transition-all ${
              statusFilter === 'draft' ? 'border-slate-500 ring-1 ring-slate-500' : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> Drafts
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.drafts}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('scheduled')}
            className={`cursor-pointer rounded-xl border p-4 bg-card shadow-sm transition-all ${
              statusFilter === 'scheduled' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Scheduled
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.scheduled}</div>
          </div>

          <div 
            onClick={() => setStatusFilter('archived')}
            className={`cursor-pointer rounded-xl border p-4 bg-card shadow-sm transition-all ${
              statusFilter === 'archived' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
              <Archive className="h-3.5 w-3.5" /> Archived
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.archived}</div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, slug, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Active</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="archived">Archived (Soft Deleted)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Posts Data Table */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[400px]">Article & Slug</TableHead>
                <TableHead>Category & Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => {
                  const pubDateStr = post.publishDate ? format(new Date(post.publishDate), 'MMM d, yyyy HH:mm') : 'N/A';
                  return (
                    <TableRow key={post.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="h-12 w-16 object-cover rounded-lg border border-border bg-muted flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-foreground truncate text-sm leading-snug">
                              {post.title}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono truncate">
                              /blog/{post.slug}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs font-medium">
                            {post.category}
                          </Badge>
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-[10px] text-muted-foreground">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(post)}
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground font-mono">
                        {pubDateStr}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {post.isDeleted ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRestore(post.id)}
                              className="h-8 gap-1 text-xs text-emerald-600 border-emerald-600/30 hover:bg-emerald-500/10"
                              title="Restore archived post"
                            >
                              <RotateCcw className="h-3.5 w-3.5" /> Restore
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(post.id, post.status)}
                                className="h-8 text-xs"
                                title="Toggle Draft/Publish"
                              >
                                {post.status === 'published' ? 'Draft' : 'Publish'}
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                title="Edit Post"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>

                              {post.status === 'published' && (
                                <Link to={`/blog/${post.slug}`} target="_blank">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-accent"
                                    title="Preview Public Article"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </Link>
                              )}

                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteId(post.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                title="Soft Delete / Archive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Filter className="h-8 w-8 text-muted-foreground/60" />
                      <p className="font-medium text-sm">No blog posts matching the selected criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Soft Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-amber-500" /> Archive Blog Post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This post will be soft-deleted and moved to the **Archived** tab. It will no longer appear on the public blog, but you can restore it at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSoftDelete} className="bg-amber-600 hover:bg-amber-700 text-white">
              Archive Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
