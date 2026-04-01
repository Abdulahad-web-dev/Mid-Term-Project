import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  );
}
