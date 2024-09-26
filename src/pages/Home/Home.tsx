import { Helmet } from "react-helmet";
import HeroSection from "../../comoponents/ui/HeroSection";
import ServiceAdvertisement from "../../comoponents/ui/SeriviceAdverticement";

export default function Home() {
  return (
    <div className="py-5">
      <Helmet>
        <title> Mechanical keyboard | Home</title>
      </Helmet>

      <HeroSection></HeroSection>

      <ServiceAdvertisement></ServiceAdvertisement>

     
    </div>
  )
}
