type Props = {
  src?: string;
  size?: number;
  className?: string;
  preview?: string;
};

const Avatar = ({ src, className, preview, size = 100 }: Props) => {
  return (
    <img
      loading="lazy"
      src={preview ? preview : src ? src : "/profile.png"}
      alt="Profile Picture"
      width={size}
      height={size}
      className={`rounded-full aspect-square object-cover bg-gray-200 ${className}`}
    />
  );
};

export default Avatar;
