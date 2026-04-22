"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Rocket, 
  Image as ImageIcon, 
  Youtube, 
  MapPin, 
  Type, 
  FileText,
  Save,
  Send,
  Plus
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SubmitAdPage() {
  const router = useRouter();
  const [mediaUrls, setMediaUrls] = useState([{ type: "image", url: "" }]);
  const [submitting, setSubmitting] = useState(false);

  const addMediaField = () => {
    setMediaUrls([...mediaUrls, { type: "image", url: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const city = formData.get("city") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      
      // Get current logged in user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to post an ad.");

      // Insert into actual ads table
      const { error } = await supabase.from('ads').insert({
        user_id: user.id,
        title,
        category,
        city,
        price: Number(price),
        description,
        media_urls: mediaUrls.map(m => m.url).filter(url => url !== ""),
        status: "Approved"
      });

      if (error) throw error;
      
      alert("Listing submitted successfully! It is now pending moderation.");
      router.push("/dashboard/ads");
    } catch (err: any) {
      alert("Error submitting ad: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Post <span className="text-primary font-black uppercase">New Ad</span></h1>
          <p className="text-muted-foreground">Complete the details below to submit your listing for review.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          {/* Basic Info */}
          <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Ad Title</label>
                <Input name="title" required placeholder="e.g. 2024 Luxury Electric SUV" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category</label>
                <select name="category" required className="w-full h-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Vehicles">Vehicles</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Services">Services</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">City</label>
                <Input name="city" required placeholder="e.g. New York" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Price (Rs.)</label>
                <Input name="price" required type="number" placeholder="50000" className="bg-white/5 border-white/10" />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <textarea 
                  name="description"
                  required
                  className="w-full min-h-[150px] rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell buyers more about your listing..."
                />
              </div>
            </div>
          </section>

          {/* External Media */}
          <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> External Media
              </h3>
              <Button type="button" variant="outline" size="sm" onClick={addMediaField} className="border-white/10 hover:bg-white/5 font-bold">
                <Plus className="w-4 h-4 mr-2" /> Add More
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Only external URLs are allowed (e.g. GitHub raw, Image hosting, YouTube).</p>
            
            <div className="space-y-4">
              {mediaUrls.map((media, index) => (
                <div key={index} className="flex gap-4">
                  <select className="w-32 h-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="image">Image URL</option>
                    <option value="youtube">YouTube</option>
                  </select>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    className="flex-1 bg-white/5 border-white/10"
                    value={media.url}
                    onChange={(e) => {
                      const newMedia = [...mediaUrls];
                      newMedia[index].url = e.target.value;
                      setMediaUrls(newMedia);
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button type="button" variant="ghost" className="text-muted-foreground hover:text-white" onClick={() => router.push("/dashboard/ads")}>Cancel</Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 shadow-lg shadow-primary/20 font-bold"
            >
              {submitting ? "Submitting..." : "Submit Listing for Review"} <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
