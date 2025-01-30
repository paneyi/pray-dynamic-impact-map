import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoAlbersUsa } from "d3-geo";

import HQMarker from "./HQMarker";
import PastorInfo from "./PastorInfo";
import StateEngagementTooltip from "./StateEngagementTooltip";
import StateEngagement from "./StateEngagement";
import TotalReach from "./TotalReach";

import useGetEngagements from "../hooks/useGetEngagements";
import useGetPastor from "../hooks/useGetPastor";

const MAP_TOPO_JSON = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const DEFAULT_PASTOR_ID = "d097d9dc-5be7-4430-898a-394f79f20cdd";

interface TooltipData {
	name: string;
	score: number;
	x: number;
	y: number;
}

const DynamicImpactMap: React.FC = () => {
	const { pastor, loading: pastorLoading, error: pastorError } = useGetPastor(DEFAULT_PASTOR_ID);
  const { engagements, stateEngagements, loading: engagementsLoading, error: engagementsError } = useGetEngagements(DEFAULT_PASTOR_ID);

  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const projection = geoAlbersUsa()
    .scale(1000)
    .translate([400, 300]);

	if (pastorLoading || engagementsLoading) return <p>Loading...</p>;
  if (pastorError) return <p>Error: {pastorError}</p>;
  if (engagementsError) return <p>Error: {engagementsError}</p>;
  if (!pastor) return <p>No pastor found</p>;

	const projectedHqCoordinates = projection(pastor.hqCoordinates);

  return (
		<div className="relative p-6 rounded-lg shadow-lg w-full max-w-screen-lg mx-auto overflow-hidden">
      <PastorInfo name={pastor.name} picturePath={pastor.picturePath} />
      <ComposableMap projection={projection} className="impact-map w-full h-auto overflow-hidden">
        <Geographies geography={MAP_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#F3E9D2", outline: 'none', stroke: "#CBBBA0" },
                  hover: { fill: '#E9DFC7', outline: 'none' },
                  pressed: { fill: '#E0D5BF', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
				{Object.entries(stateEngagements).map(([state, engagementsList]) => {
					const sampleStateEngagement = engagementsList[0];
					const projectedStateCoordinates = projection(sampleStateEngagement.coordinates);
					
					if (!projectedStateCoordinates || !projectedHqCoordinates) return null;

					return <StateEngagement
						key={state}
						state={state}
						stateCoordinates={sampleStateEngagement.coordinates}
						projectedStateCoordinates={projectedStateCoordinates}
						projectedHqCoordinates={projectedHqCoordinates}
						engagementScore={engagementsList.length}
						onHover={(e) => {
							const mapContainer = document.querySelector(".impact-map");

							if (!e || !mapContainer) return;

							const rect = mapContainer.getBoundingClientRect();
						
							setTooltip({
								name: state,
								score: engagementsList.length,
								x: e.clientX - rect.left + 20, // Adjust relative to the map
								y: e.clientY - rect.top + 40  // Adjust relative to the map
							});
						}}
					/>
				}
          
        )}
        <HQMarker coordinates={pastor.hqCoordinates} picturePath={pastor.picturePath} />
      </ComposableMap>
      <TotalReach count={engagements?.length || 0} />
      {tooltip && <StateEngagementTooltip tooltip={tooltip} />}
    </div>
  );
};

export default DynamicImpactMap;