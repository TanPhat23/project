import { LandingContent } from "@/components/homePageComponents/landing-content";
import { LandingHero } from "@/components/homePageComponents/landing-hero";
import { LandingNavbar } from "@/components/homePageComponents/landing-nav";

export default function Home(){
  return (
    <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
    </div>
  )
}