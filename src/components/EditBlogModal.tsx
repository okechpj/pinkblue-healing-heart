import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  image?: string;
}

interface EditBlogModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditBlogModal = ({ post, isOpen, onClose, onUpdate }: EditBlogModalProps) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    author: post.author,
    tags: post.tags?.join(', ') || '',
    image: post.image || ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: formData.title,
          content: formData.content,
          author: formData.author,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          image: formData.image
        })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="wellness, healing, tips"
              />
            </div>
            <div>
              <Label>Blog Image</Label>
              <ImageUpload
                bucket="blog-images"
                onUpload={(url) => setFormData({ ...formData, image: url })}
                currentImage={formData.image}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};