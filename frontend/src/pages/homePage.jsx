import Header from "../components/home/header";
import Hero from "../components/home/hero";
import Footer from "../components/home/footer";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col">

      <Header />

      <main className="w-full flex-1">
        <Hero />
      </main>

      <Footer />

    </div>
  );
}
