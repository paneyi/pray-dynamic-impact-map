interface StateEngagementTooltipProps {
  tooltip: {
    name: string;
    score: number;
    x: number;
    y: number;
  };
}

const StateEngagementTooltip: React.FC<StateEngagementTooltipProps> = ({ tooltip }) => (
  <div
		className="absolute bg-black text-white text-xs rounded p-1"
		style={{ top: tooltip.y, left: tooltip.x }}
	>
		{tooltip.name}: {tooltip.score} engagements
	</div>
);

export default StateEngagementTooltip;