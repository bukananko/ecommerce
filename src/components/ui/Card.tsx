import { FaStore } from "react-icons/fa";

type Props = {
  image: string;
  ratio?: "square";
  title: string;
  price: number;
  store: string;
  totalSoldItems: number;
};

const Card = (props: Props) => {
  const { image, ratio, title, price, store, totalSoldItems } = props;

  return (
    <div className="w-40 md:w-48 overflow-hidden max-md:mx-auto hover:scale-105 transition-all duration-300 relative group">
      <div>
        <img
          title={title}
          src={image}
          alt="Product"
          loading="lazy"
          width={100}
          height={100}
          className={`w-full object-contain rounded-md ${
            ratio === "square" ? "aspect-square" : ""
          }`}
        />
      </div>

      <div title={title} className="mt-2 space-y-1 inline-block">
        <p className="line-clamp-2 text-sm">{title}</p>

        <p className="font-extrabold line-clamp-1">
          {new Intl.NumberFormat("in-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(price)}
        </p>

        <div className="flex gap-1 items-center">
          <div>
            <FaStore size={15} title="Store" />
          </div>
          <p className="text-sm line-clamp-1">{store}</p>
        </div>

        {totalSoldItems > 0 && <p className="text-sm">{totalSoldItems} Sold</p>}
      </div>
    </div>
  );
};

export default Card;
