
import { Card } from 'flowbite-react';

const CustomizableOptions = () => {
  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Customizable Options
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Switch Types</h3>
          <p className="text-gray-700">
            Choose from a variety of mechanical switch types including Cherry MX, Gateron, and Kailh for a personalized typing experience.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Keycap Styles</h3>
          <p className="text-gray-700">
            Select different keycap materials and profiles, such as ABS or PBT, and options like SA, DSA, or Cherry profiles to match your style.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Backlighting</h3>
          <p className="text-gray-700">
            Customize your keyboard with RGB backlighting options, including effects and colors to match your gaming setup or workspace.
          </p>
        </Card>
        <Card className="border border-gray-300">
          <h3 className="font-semibold">Layout Options</h3>
          <p className="text-gray-700">
            Choose from different layouts such as TKL (Tenkeyless), 75%, or full-size keyboards to suit your typing needs and preferences.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default CustomizableOptions;
