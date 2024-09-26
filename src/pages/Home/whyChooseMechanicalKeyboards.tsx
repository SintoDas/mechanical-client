import { Card } from 'flowbite-react';

const WhyChooseMechanicalKeyboards = () => {
  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Why Choose Mechanical Keyboards?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Tactile Feedback</h3>
          <p className="text-gray-700">
            Experience satisfying tactile feedback with each keystroke, improving typing accuracy and speed.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Durability</h3>
          <p className="text-gray-700">
            Built to last with individual switches rated for tens of millions of key presses.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">N-Key Rollover</h3>
          <p className="text-gray-700">
            Enjoy accurate multi-key presses, perfect for gaming and typing.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Variety of Switch Types</h3>
          <p className="text-gray-700">
            Choose from different switch types for a personalized typing experience.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default WhyChooseMechanicalKeyboards;
