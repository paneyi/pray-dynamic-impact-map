import { Marker } from "react-simple-maps";

interface StateMarkerProps {
  state: string;
  coordinates: [number, number];
  engagementScore: number;
  onMouseEnter: (event: React.MouseEvent<SVGCircleElement>) => void;
  onMouseLeave: () => void;
}

const StateMarker: React.FC<StateMarkerProps> = ({ state, coordinates, engagementScore, onMouseEnter, onMouseLeave }) => {
  return (
    <Marker key={state} coordinates={coordinates}>
      <circle
        r={Math.min(Math.max(engagementScore / 2, 5), 20)}
        fill="#E3C17A"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        opacity={0.8}
      >
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="fill" values="#E3C17A;#FFD700;#E3C17A" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </Marker>
  );
};

export default StateMarker;