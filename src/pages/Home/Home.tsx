import { Helmet } from "react-helmet";
import HeroSection from "./HeroSection";
import ServiceAdvertisement from "./SeriviceAdverticement";
import FeaturedBrands from "./FeaturedBrands";
import CustomerReviews from "./CustomerReview";
import WhyChooseMechanicalKeyboards from "./whyChooseMechanicalKeyboards";
import CustomizableOptions from "./CustomiZableOptions";

export default function Home() {
  return (
    <div className="py-5">
      <Helmet>
        <title> Mechanical keyboard | Home</title>
      </Helmet>
      <HeroSection></HeroSection>
      <ServiceAdvertisement></ServiceAdvertisement>
      <FeaturedBrands></FeaturedBrands>
      <CustomerReviews></CustomerReviews>
      <WhyChooseMechanicalKeyboards></WhyChooseMechanicalKeyboards>
      <CustomizableOptions></CustomizableOptions>
    </div>
  )
}
