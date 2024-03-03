import formatCurrency from "@/utils/formatCurrency";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  image: string;
  ratio?: "square";
  title: string;
  price: number;
  store: string;
  totalSoldItems: number;
  href: string;
};

const Card = (props: Props) => {
  const { image, ratio, title, price, store, totalSoldItems, href } = props;

  return (
    <div className="w-40 md:w-48 overflow-hidden max-md:mx-auto hover:scale-105 transition-all duration-300 relative group">
      <Link to={href}>
        <picture>
          <img
            title={title}
            src={image}
            alt="Product"
            loading="lazy"
            width={100}
            height={100}
            className={`w-full rounded-md ${
              ratio === "square"
                ? "aspect-square object-cover object-center"
                : "object-contain"
            }`}
          />
        </picture>
      </Link>

      <Link to={href} title={title} className="mt-2 space-y-1 inline-block">
        <p className="line-clamp-2 text-sm">{title}</p>

        <p className="font-extrabold line-clamp-1">
         {formatCurrency(price)}
        </p>

        <div className="flex gap-1 items-center">
          <div>
            <FaStore size={15} title="Store" />
          </div>
          <p className="text-sm line-clamp-1">{store}</p>
        </div>

        {totalSoldItems > 0 && <p className="text-sm">{totalSoldItems} Sold</p>}
      </Link>
    </div>
  );
};

export default Card;
