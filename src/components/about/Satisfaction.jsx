import React from "react";
import CountUp from "react-countup";

const Satisfaction = () => {
  const stats = [
    {
      label: "Successful Bookings",
      end: 5000,
      duration: 2.5,
      suffix: "+",
    },
    {
      label: "Happy Customers",
      end: 98,
      duration: 2.5,
      suffix: "%",
    },
    {
      label: "Events Hosted",
      end: 150,
      duration: 2,
      suffix: "+",
    },
    {
      label: "Cities Covered",
      end: 25,
      duration: 2,
      suffix: "+",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto my-20 px-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl py-12">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Trusted by Thousands of Event Lovers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center"
            >
              <h3 className="text-5xl font-bold text-white">
                <CountUp
                  end={item.end}
                  duration={item.duration}
                />
                {item.suffix}
              </h3>

              <p className="mt-3 text-purple-100 text-lg">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Satisfaction;