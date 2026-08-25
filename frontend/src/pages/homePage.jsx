import Header from "../components/home/header";
import Hero from "../components/home/hero";
import Footer from "../components/home/footer";
import FeaturedCollection from "../components/home/featuredCollection";
import BestSellers from "../components/home/bestSellers";


export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">

      <Header />

      <main className="w-full flex-1">
        <Hero />
        <FeaturedCollection />
        <BestSellers />
      </main>

      <Footer />

    </div>
  );
}
