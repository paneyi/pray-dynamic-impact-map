import EngagementPath from "./EngagementPath";
import StateMarker from "./StateMarker";

interface StateEngagementProps {
  state: string;
  stateCoordinates: [number, number];
  projectedStateCoordinates: [number, number];
  projectedHqCoordinates: [number, number];
  engagementScore: number;
  onHover: (event: React.MouseEvent<SVGCircleElement> | null) => void;
}

const StateEngagement: React.FC<StateEngagementProps> = ({
  state,
  stateCoordinates,
  projectedStateCoordinates,
  projectedHqCoordinates,
  engagementScore,
  onHover,
}) => {
	const midpoint = [
		(projectedHqCoordinates[0] + projectedStateCoordinates[0]) / 2,
		(projectedHqCoordinates[1] + projectedStateCoordinates[1]) / 2 - 200
	];

	const pathId = `path-${state}`
	const pathD = `
		M${projectedHqCoordinates[0]},${projectedHqCoordinates[1]} 
		Q${midpoint[0]},${midpoint[1]} 
		${projectedStateCoordinates[0]},${projectedStateCoordinates[1]}
	`;

  return (
    <>
      <EngagementPath id={pathId} pathD={pathD} />
      <StateMarker
				state={state}
				coordinates={stateCoordinates}
				engagementScore={engagementScore}
				onMouseEnter={(e) => onHover(e)}
				onMouseLeave={() => onHover(null)}
			/>
    </>
  );
};

export default StateEngagement;