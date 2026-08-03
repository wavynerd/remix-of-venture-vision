import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, BookOpen, ShieldCheck, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur backdrop-filter">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <span>Venture<span className="text-accent">Vision</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6">
          <Link
            to="/"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') && !location.pathname.startsWith('/blog') && !location.pathname.startsWith('/admin')
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/blog"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
              isActive('/blog')
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Insights & Blog</span>
          </Link>

          <Link to="/admin/blog">
            <Button
              variant={isActive('/admin') ? 'default' : 'outline'}
              size="sm"
              className="gap-1.5 font-medium"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>Admin Portal</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
