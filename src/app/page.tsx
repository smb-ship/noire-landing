import BottleStage from "@/components/BottleStage";
import Closing from "@/components/Closing";
import Collection from "@/components/Collection";
import Craft from "@/components/Craft";
import { DemoProvider } from "@/components/Demo";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Story from "@/components/Story";

export default function Home() {
  return (
    <DemoProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <BottleStage />
      <main id="main">
        <Hero />
        <Collection />
        <Story />
        <Craft />
        <Closing />
      </main>
      <Footer />
    </DemoProvider>
  );
}
