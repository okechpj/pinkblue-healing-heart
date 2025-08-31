import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  message: string;
  image?: string;
  rating?: number;
}

interface EditTestimonialModalProps {
  testimonial: Testimonial;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditTestimonialModal = ({ testimonial, isOpen, onClose, onUpdate }: EditTestimonialModalProps) => {
  const [formData, setFormData] = useState({
    name: testimonial.name,
    message: testimonial.message,
    image: testimonial.image || '',
    rating: testimonial.rating?.toString() || '5'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: formData.name,
          message: formData.message,
          image: formData.image,
          rating: parseInt(formData.rating) || 5
        })
        .eq('id', testimonial.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial updated successfully!",
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Testimonial Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Updating...' : 'Update Testimonial'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};