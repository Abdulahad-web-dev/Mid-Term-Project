import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import PackagesSection from "@/components/home/Packages";
import FeaturedAds from "@/components/home/FeaturedAds";
import CategoryNav from "@/components/home/CategoryNav";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <CategoryNav />
      <FeaturedAds />
      <PackagesSection />
    </MainLayout>
  );
}
