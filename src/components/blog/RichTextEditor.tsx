import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { 
  Bold, Italic, Heading2, Heading3, List, ListOrdered, 
  Quote, Code, Link as LinkIcon, Image as ImageIcon, Eye, Edit3, Code2, Sparkles
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'html'>('editor');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const insertTag = (openTag: string, closeTag: string, defaultContent: string = 'text') => {
    const textarea = document.getElementById('rich-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) {
      onChange(value + `${openTag}${defaultContent}${closeTag}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultContent;
    const replacement = `${openTag}${selectedText}${closeTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 10);
  };

  const handleAddLink = () => {
    if (!linkUrl) return;
    const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    const text = linkText || linkUrl;
    insertTag(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">`, '</a>', text);
    setLinkUrl('');
    setLinkText('');
    setLinkDialogOpen(false);
  };

  const handleAddImage = (urlToAdd?: string) => {
    const finalUrl = urlToAdd || imageUrl;
    if (!finalUrl) return;
    const alt = imageAlt || 'Blog post illustration';
    const imgHtml = `<figure class="my-6">\n  <img src="${finalUrl}" alt="${alt}" class="w-full max-h-[450px] object-cover rounded-xl shadow-md" />\n  <figcaption class="text-xs text-center text-muted-foreground mt-2">${alt}</figcaption>\n</figure>\n`;
    onChange(value + '\n' + imgHtml);
    setImageUrl('');
    setImageAlt('');
    setImageDialogOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          handleAddImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        {/* Editor Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-2">
          <div className="flex flex-wrap items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('<strong>', '</strong>', 'bold text')}
              title="Bold"
              className="h-8 w-8 p-0"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('<em>', '</em>', 'italic text')}
              title="Italic"
              className="h-8 w-8 p-0"
            >
              <Italic className="h-4 w-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<h2>', '</h2>\n', 'Section Heading')}
              title="Heading 2"
              className="h-8 w-8 p-0"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<h3>', '</h3>\n', 'Sub Heading')}
              title="Heading 3"
              className="h-8 w-8 p-0"
            >
              <Heading3 className="h-4 w-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<ul>\n  <li>', '</li>\n  <li>Second item</li>\n</ul>\n', 'First item')}
              title="Bullet List"
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<ol>\n  <li>', '</li>\n  <li>Second item</li>\n</ol>\n', 'First item')}
              title="Numbered List"
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <div className="h-4 w-px bg-border mx-1" />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">\n  ', '\n</blockquote>\n', 'Important quote or insight...')}
              title="Blockquote"
              className="h-8 w-8 p-0"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertTag('\n<pre class="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto"><code>', '</code></pre>\n', '// code snippet')}
              title="Code Block"
              className="h-8 w-8 p-0"
            >
              <Code className="h-4 w-4" />
            </Button>

            {/* Link Dialog */}
            <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Link">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Insert Hyperlink</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Link Text</label>
                    <Input placeholder="e.g. Read Venture Vision Report" value={linkText} onChange={(e) => setLinkText(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Target URL</label>
                    <Input placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddLink}>Insert Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Image Dialog */}
            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Image">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Embed Inline Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Upload Local Image</label>
                    <Input type="file" accept="image/*" onChange={handleFileUpload} className="cursor-pointer" />
                  </div>
                  
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-3 text-xs text-muted-foreground uppercase font-medium">Or External Image URL</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Image URL</label>
                    <Input placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Image Caption / Alt Text</label>
                    <Input placeholder="Market growth chart" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-2 block">Quick Sample Imagery</label>
                    <div className="grid grid-cols-4 gap-2">
                      {SAMPLE_IMAGES.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Sample"
                          className="h-16 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 border border-border transition-opacity"
                          onClick={() => handleAddImage(img)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => handleAddImage()}>Embed Image</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsList className="bg-background border border-border h-8 p-0.5">
            <TabsTrigger value="editor" className="text-xs px-2.5 h-7 gap-1">
              <Edit3 className="h-3.5 w-3.5" /> WYSIWYG
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs px-2.5 h-7 gap-1">
              <Eye className="h-3.5 w-3.5" /> Preview
            </TabsTrigger>
            <TabsTrigger value="html" className="text-xs px-2.5 h-7 gap-1">
              <Code2 className="h-3.5 w-3.5" /> HTML
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <TabsContent value="editor" className="m-0 p-0">
          <textarea
            id="rich-editor-textarea"
            className="w-full min-h-[350px] p-4 bg-background text-foreground font-sans text-base focus:outline-none focus:ring-0 resize-y border-none"
            placeholder="Write your blog post content here... You can use the formatting toolbar above or HTML tags."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0 p-6 min-h-[350px] bg-background">
          <div 
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent"
            dangerouslySetInnerHTML={{ __html: value || '<p className="text-muted-foreground italic">No content to preview yet.</p>' }}
          />
        </TabsContent>

        <TabsContent value="html" className="m-0 p-0">
          <textarea
            className="w-full min-h-[350px] p-4 bg-muted/30 text-foreground font-mono text-sm focus:outline-none resize-y border-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
