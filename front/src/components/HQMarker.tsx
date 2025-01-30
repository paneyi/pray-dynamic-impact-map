import { Marker } from "react-simple-maps";

interface HQMarkerProps {
  coordinates: [number, number];
  picturePath: string;
}

const HQMarker: React.FC<HQMarkerProps> = ({ coordinates, picturePath }) => (
  <Marker coordinates={coordinates}>
    <foreignObject x={-20} y={-20} width={50} height={50}>
      <img src={picturePath} alt="HQ Pastor" className="w-10 h-10 rounded-full object-cover" />
    </foreignObject>
  </Marker>
);

export default HQMarker;