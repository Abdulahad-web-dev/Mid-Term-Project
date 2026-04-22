"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Share2, Flag, User, Phone, MessageSquare, ShieldCheck, Loader2, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Get ad details
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setAd(data);
      } catch (err) {
        console.error("Error fetching ad:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, supabase]);

  const handleBuyNow = async () => {
    if (!user) {
      alert("Please login to buy this product.");
      router.push("/login");
      return;
    }

    if (user.id === ad.user_id) {
      alert("You cannot buy your own product.");
      return;
    }

    setBuying(true);
    try {
      const { error } = await supabase.from('orders').insert({
        ad_id: ad.id,
        buyer_id: user.id,
        seller_id: ad.user_id,
        amount: ad.price,
        status: 'Pending',
        title: ad.title // Storing title for easy display
      });

      if (error) throw error;

      alert("Purchase request sent successfully! The seller will be notified.");
      router.push("/dashboard/payments"); // Redirect to payments/history
    } catch (err: any) {
      console.error("Error during purchase:", err);
      alert("Failed to process purchase: " + err.message);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!ad) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Ad not found.
        </div>
      </MainLayout>
    );
  }

  const imageUrl = ad.media_urls && ad.media_urls.length > 0 
    ? ad.media_urls[0] 
    : "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200";

  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Media and Description */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-video rounded-3xl overflow-hidden border border-white/10"
              >
                <img src={imageUrl} alt={ad.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary text-white border-none px-4 py-1">{ad.package || 'Standard'} Ad</Badge>
                  <Badge variant="secondary" className="bg-white/5 border-white/10">{ad.category}</Badge>
                  <Badge variant="outline" className="border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {ad.city}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold">{ad.title}</h1>

                <div className="flex items-center gap-6 text-sm text-muted-foreground border-y border-white/5 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Published: {new Date(ad.created_at).toLocaleDateString()}
                  </div>
                  {ad.expiry && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Expires: {new Date(ad.expiry).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-white">Description</h3>
                  <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {ad.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Seller and Actions */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] sticky top-24">
                <div className="text-4xl font-bold mb-6 text-primary">Rs. {Number(ad.price).toLocaleString()}</div>

                <div className="space-y-4 mb-8">
                  <Button 
                    onClick={handleBuyNow} 
                    disabled={buying}
                    className="w-full h-14 gap-3 text-white bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 font-black text-lg shadow-xl shadow-primary/20"
                  >
                    {buying ? <Loader2 className="animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                    BUY NOW
                  </Button>
                  <Button variant="outline" className="w-full h-12 gap-2 border-white/10 hover:bg-white/5">
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </Button>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        Verified Seller
                        <ShieldCheck className="w-4 h-4 text-primary shadow-sm" />
                      </div>
                      <div className="text-xs text-muted-foreground">Member since 2024</div>
                    </div>
                  </div>
                  <Link href={`/seller/${ad.user_id}`} className="text-sm text-primary hover:underline font-medium">
                    View Seller Profile
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground hover:text-white">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground hover:text-destructive">
                    <Flag className="w-4 h-4" /> Report
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> 
                  Safe Buying Tips
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                  <li>Meet in a public place.</li>
                  <li>Inspect the item before paying.</li>
                  <li>Use secure payment methods.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
