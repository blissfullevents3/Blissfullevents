import React from "react";
const DashboardCard = ({
  title,
  value,
  color,
  icon,
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg p-6 text-white ${color}`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm opacity-80">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-5xl opacity-30">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;