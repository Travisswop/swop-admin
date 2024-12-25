"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleOrdinal } from "d3-scale";

// Valid GeoJSON URL for world map
// const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

// Data with download counts for specific countries
// const data = [
//   { id: "076", name: "Brazil", value: 800 },
//   { id: "840", name: "United States", value: 1000 },
//   { id: "050", name: "Bangladesh", value: 600 },
//   { id: "356", name: "India", value: 1200 },
//   { id: "360", name: "Indonesia", value: 900 },
// ];
const data = [
  { id: "USA", name: "United States", value: 1000 },
  { id: "BGD", name: "Bangladesh", value: 600 },
  { id: "BRA", name: "Brazil", value: 800 },
  { id: "IND", name: "India", value: 1200 },
  { id: "IDN", name: "Indonesia", value: 900 },
];

// Create a categorical color scale to assign unique colors to countries
const colorScale = scaleOrdinal<string>()
  .domain(data.map((d) => d.id))
  .range([
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#33FFF1", // Cyan
    "#F3FF33", // Yellow
    "#FF8C33", // Orange
    "#8C33FF", // Purple
    "#33FF8C", // Light Green
    "#338CFF", // Light Blue
  ]);

const DownloadsByCountryMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  const handleMouseEnter = (geo: GeoJSON.Feature) => {
    const countryData = data.find((d) => d.id === geo.id);
    setTooltipContent(
      countryData
        ? `${countryData.name}: ${countryData.value} downloads`
        : `${geo?.properties?.name}: No data`
    );
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 w-full mx-auto">
      <h2 className="text-lg font-bold mb-4">Downloads By Country</h2>
      <div className="relative">
        <ComposableMap>
          <Geographies geography={"/features.json"}>
            {({ geographies }) =>
              geographies.map((geo) => {
                console.log("geo", geo);

                const countryData = data.find((d) => d.id === geo.id);
                // Assign a color for countries with data; default gray for others
                const fillColor = countryData
                  ? colorScale(countryData.id)
                  : "#EAEAEC";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFF"
                    onMouseEnter={() => handleMouseEnter(geo)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#999" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
        {tooltipContent && (
          <div
            className="absolute p-2 bg-white border border-gray-300 rounded shadow text-sm pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadsByCountryMap;
