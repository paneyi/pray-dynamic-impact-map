interface TotalReachProps {
  count: number;
}

const TotalReach: React.FC<TotalReachProps> = ({ count }) => (
  <div className="mt-4 text-left text-center sm:text-left">
    <h2 className="text-sm font-semibold text-gray-700">Total Reach</h2>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{count}</p>
  </div>
);

export default TotalReach;