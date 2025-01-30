interface PastorInfoProps {
  name: string;
  picturePath: string;
}

const PastorInfo: React.FC<PastorInfoProps> = ({ name, picturePath })  => (
  <div className="flex items-center space-x-3 flex-wrap sm:justify-start">
    <img src={picturePath} alt="Pastor" className="w-15 h-15 rounded-full object-cover" />
    <h2 className="text-lg sm:text-xl font-semibold text-gray-700">{name} <span>ⓘ</span></h2>
  </div>
);

export default PastorInfo;