import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ id, image }: { id: string; image: string }) => {
  return (
    <div className="w-40 md:w-48 overflow-hidden mx-auto">
      <Link to={`/product/${id}`}>
        <img
          title="Product"
          src={image}
          alt="Product"
          loading="lazy"
          width={100}
          height={100}
          className="w-full object-contain rounded-md"
        />
      </Link>

      <Link
        to={`/product/${id}`}
        title="Product"
        className="mt-2 space-y-1 inline-block">
        <p className="line-clamp-2 text-sm">
          Kursi Plastik Kursi Cafe Kursi Makan Kursi Belajar Kursi Cafe Makan -
          Mini Pink
        </p>

        <p className="font-extrabold line-clamp-1">Rp38.000.000.000</p>

        <div className="flex gap-1 items-center">
          <div>
            <FaStore size={15} title="Store" />
          </div>
          <p className="text-sm line-clamp-1">
            aishop dahkgdkag a khavsk ak kah kha k
          </p>
        </div>

        <p className="text-sm">15 Sold</p>
      </Link>
    </div>
  );
};

export default Card;
