import Carousel from "../components/Carousel";
import QuickAccess from "../components/QuickAccess";
import ServicesPanel from "../components/ServicesPanel";
//import ReclamacionesBanner from "../components/ReclamacionesBanner";
import NewsSection from "../components/NewsSection";
import LocationMap from "../components/LocationMap";
import InterestLinks from "../components/InterestLinks";

export default function Home() {
  return (
    <div>
      <Carousel />
      <QuickAccess />
      <ServicesPanel />
      {/* <ReclamacionesBanner /> */}
      <NewsSection />
      <InterestLinks />
      <LocationMap />
    </div>
  );
}
