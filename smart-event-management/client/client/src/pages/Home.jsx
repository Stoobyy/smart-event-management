import EventCarousel from "../components/EventCarousel";
import EventDashboard from "../components/EventDashboard";
import SiteFooter from "../components/SiteFooter";
import Topbar from "../components/TopBar";

export default function Home() {
  return (
    <>
      <Topbar />
      <EventCarousel />
      <EventDashboard />
      <SiteFooter />
    </>
  );
}