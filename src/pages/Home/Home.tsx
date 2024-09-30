import { Helmet } from "react-helmet";
import HeroSection from "./HeroSection";
import ServiceAdvertisement from "./SeriviceAdverticement";
import FeaturedBrands from "./FeaturedBrands";
import CustomerReviews from "./CustomerReview";
import WhyChooseMechanicalKeyboards from "./whyChooseMechanicalKeyboards";
import CustomizableOptions from "./CustomiZableOptions";
import FeaturedProducts from "./FeaturedProducts";


export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mechanical Keyboard | Home</title>
      </Helmet>
      <div className="min-h-screen space-y-10 p-4 "> {/* Added padding to the parent div */}
        <div className="my-8"><HeroSection /></div> {/* Added vertical margin */}
        <div className="my-8"><ServiceAdvertisement /></div>
        <div className="my-8"><FeaturedProducts /></div>
        <div className="my-8"><FeaturedBrands /></div>
        <div className="my-8"><CustomerReviews /></div>
        <div className="my-8"><WhyChooseMechanicalKeyboards /></div>
        <div className="my-8"><CustomizableOptions /></div>
      </div>
    
     </>

  )
}
