import { Container } from "@/components/layout/Container";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">AdFlow <span className="text-primary">PRO</span></span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The premium moderated marketplace for businesses and individuals to reach their audience effectively.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 uppercase text-xs tracking-widest text-white/50">Platform</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Browse Ads</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/submit" className="hover:text-primary transition-colors">Post an Ad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 uppercase text-xs tracking-widest text-white/50">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AdFlow Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
