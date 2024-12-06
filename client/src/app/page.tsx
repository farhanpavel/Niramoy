import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/page";
import Hero from "./_home/Hero";
import Feature from "./_home/Feature";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-[#faf5f5]">
        <Hero />
      </div>
      <div className="mt-20">
        <Feature />
      </div>
    </div>
  );
}
