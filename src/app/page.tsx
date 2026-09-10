import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {Experience} from "@/components/Experience";
import {Projects} from "@/components/Projects";
import {Education} from "@/components/Education";
import {Blog} from "@/components/Blog";
import {Footer} from "@/components/Footer";
export default function Page() {
  return (
    <>
      <Navbar/>
      <main className="flex-1">
        <Hero/>
        <Experience showHeading={false}/>
        <Education/>
        <Projects showHeading={false}/>
        <Blog/>
      </main>
      <Footer/>
    </>
  );
}