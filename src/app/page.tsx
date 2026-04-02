import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import PackagesSection from "@/components/home/Packages";
import FeaturedAds from "@/components/home/FeaturedAds";
import CategoryNav from "@/components/home/CategoryNav";
import FAQSection from "@/components/home/FAQ";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <CategoryNav />
      <FeaturedAds />
      <PackagesSection />
      <FAQSection />
    </MainLayout>
  );
}
