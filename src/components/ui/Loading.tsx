import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  className: string;
  size: number;
};

const Loading = ({ className, size }: Props) => {
  return (
    <div className={`animate-spin ${className}`}>
      <AiOutlineLoading3Quarters size={size} />
    </div>
  );
};

export default Loading;
