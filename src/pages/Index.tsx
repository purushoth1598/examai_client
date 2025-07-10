
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Benefits } from "@/components/sections/Benefits";
import { Header } from "@/components/layout/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <Features />
      <Benefits />
    </div>
  );
};

export default Index;
