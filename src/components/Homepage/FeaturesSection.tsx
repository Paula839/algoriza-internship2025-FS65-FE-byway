import FeatureIcon1 from '../../assets/HomePage/feature-icon1.svg';
import FeatureIcon2 from '../../assets/HomePage/feature-icon2.svg';
import FeatureIcon3 from '../../assets/HomePage/feature-icon3.svg';

const FeaturesSection = () => (
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold">Why Choose Us</h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center">
          <img src={FeatureIcon1} alt="Feature 1" className="w-16 h-16" />
          <h3 className="mt-4 text-xl font-semibold">Feature One</h3>
          <p className="mt-2 text-gray-600">Description of feature one.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={FeatureIcon2} alt="Feature 2" className="w-16 h-16" />
          <h3 className="mt-4 text-xl font-semibold">Feature Two</h3>
          <p className="mt-2 text-gray-600">Description of feature two.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={FeatureIcon3} alt="Feature 3" className="w-16 h-16" />
          <h3 className="mt-4 text-xl font-semibold">Feature Three</h3>
          <p className="mt-2 text-gray-600">Description of feature three.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
