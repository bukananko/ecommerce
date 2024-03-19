import useFetch from "@/hooks/useFetch";
import type { Product } from "@/types";
import formatCurrency from "@/utils/formatCurrency";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({
  product,
  userId,
}: {
  product: Product;
  userId: string;
}) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState<number>(1);

  const handleQty = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.title === "increase") {
      setQty(qty + 1);
    } else {
      if (qty > 1) {
        setQty(qty - 1);
      }
    }
  };

  const { mutate: handleCart, isPending } = useMutation({
    mutationFn: async () => {
      const { message, success } = await useFetch(`/cart/${product.id}`, {
        method: "POST",
        body: JSON.stringify({ qty, userId }),
      });

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    },
  });

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
              className="px-3 rounded-md absolute left-0 top-0 bottom-0 disabled:text-gray-400">
              -
            </button>
            <input
              type="number"
              min={1}
              max={99999999}
              value={qty === 0 ? "" : qty}
              className="px-7 py-1 rounded-md bg-transparent border w-28 text-center"
              onChange={(e) =>
                setQty(
                  Number(e.target.value) > product.stock
                    ? product.stock
                    : Number(e.target.value)
                )
              }
            />
            <button
              onClick={handleQty}
              title="increase"
              disabled={qty === product.stock}
              className="px-3 rounded-md absolute right-0 bottom-0 top-0 disabled:text-gray-400">
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
            onClick={() => (userId ? handleCart() : navigate("/login"))}
            type="button"
            disabled={isPending}
            className="bg-sky-500 text-white px-4 py-2 rounded-md disabled:opacity-70">
            {isPending ? "Loading..." : "Add to cart"}
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

export default SummaryCard;
