import { Helmet } from "react-helmet";
import HeroSection from "./HeroSection";
import ServiceAdvertisement from "./SeriviceAdverticement";
import FeaturedBrands from "./FeaturedBrands";
import CustomerReviews from "./CustomerReview";
import WhyChooseMechanicalKeyboards from "./whyChooseMechanicalKeyboards";
import CustomizableOptions from "./CustomiZableOptions";
import FeaturedProducts from "./FeaturedProducts";
import CustomFooter from "../../comoponents/ui/CustomFooter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mechanical Keyboard | Home</title>
      </Helmet>
      <HeroSection />
      <ServiceAdvertisement />
      <FeaturedProducts />
      <FeaturedBrands />
      <CustomerReviews />
      <WhyChooseMechanicalKeyboards />
      <CustomizableOptions />
      <CustomFooter></CustomFooter>
     </>

  )
}
