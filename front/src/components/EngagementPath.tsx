interface EngagementPathProps {
  id: string;
  pathD: string;
}

const EngagementPath: React.FC<EngagementPathProps> = ({ id, pathD }) => (
  <>
    <path
      id={id}
      d={pathD}
      fill="none"
      stroke="#FFA500"
      strokeWidth={2}
      strokeOpacity={0.8}
      strokeLinecap="round"
    />
    <circle r={4} fill="#C0A772" opacity={0.8}>
      <animateMotion repeatCount="indefinite" dur="3s">
        <mpath href={`#${id}`} />
      </animateMotion>
    </circle>
  </>
);

export default EngagementPath;