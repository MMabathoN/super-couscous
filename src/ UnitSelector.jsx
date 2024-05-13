import React, { useState } from "react";

const UnitSelector = ({ defaultUnit, onChange }) => {
  const [selectedUnit, setSelectedUnit] = useState(defaultUnit);

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    if (typeof onChange === "function") {
      onChange(unit);
    }
  };

  return (
    <div>
      <label htmlFor="metric">
        <input
          id="metric"
          type="radio"
          value="metric"
          checked={selectedUnit === "metric"}
          onChange={() => handleUnitChange("metric")}
        />
        Celsius
      </label>
      <label htmlFor="imperial">
        <input
          id="imperial"
          type="radio"
          value="imperial"
          checked={selectedUnit === "imperial"}
          onChange={() => handleUnitChange("imperial")}
        />
        Fahrenheit
      </label>
    </div>
  );
};

export default UnitSelector;
