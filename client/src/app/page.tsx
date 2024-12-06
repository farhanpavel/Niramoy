import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/page";
import Hero from "./_home/Hero";
import Feature from "./_home/Feature";
import Benefits from "./_home/Benefits";
import Bottom from "./_home/Bottom";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-[#faf5f5]">
        <Hero />
      </div>
      <div className="mt-10">
        <Feature />
      </div>
      <div className="mt-10">
        <Benefits />
      </div>
      <div className="mt-10">
        <Bottom />
      </div>
    </div>
  );
}
