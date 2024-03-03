import type { Product } from "@/types";
import formatCurrency from "@/utils/formatCurrency";

type Props = {
  handleQty: (e: React.MouseEvent<HTMLButtonElement>) => void;
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  product: Product;
};

const CardSummary = ({ handleQty, qty, product, setQty }: Props) => {
  return (
    <div className="w-72 sticky top-24">
      <div className="p-3 rounded-md border space-y-5">
        <h3 className="text-2xl font-bold">Order Summary</h3>

        <div className="flex items-center gap-2">
          <div className="relative w-fit">
            <button
              onClick={handleQty}
              title="decrease"
              disabled={qty === 1 || qty === 0}
              className="px-3 rounded-md absolute left-0 top-0 bottom-0 disabled:text-gray-400 disabled:cursor-not-allowed">
              -
            </button>
            <input
              type="number"
              min={1}
              max={99999999}
              value={qty === 0 ? "" : qty}
              className="px-7 py-1 rounded-md bg-transparent border w-28 text-center"
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <button
              onClick={handleQty}
              title="increase"
              className="px-3 rounded-md absolute right-0 bottom-0 top-0 ">
              +
            </button>
          </div>

          <p>Stock: {product?.stock}</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <h4>Total:</h4>
          <p className="font-bold text-lg">
            {formatCurrency(product?.price * qty)}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="bg-sky-500 text-white px-4 py-2 rounded-md">
            Add to cart
          </button>
          <button
            type="button"
            className="border border-sky-500  px-4 py-2 rounded-md">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSummary;
