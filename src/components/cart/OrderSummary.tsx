import formatCurrency from "@/utils/formatCurrency";
import Checkbox from "../ui/Checkbox";
import { useContext } from "react";
import { GlobalContext } from "@/utils/context";
import { Cart } from "@/types";

const OrderSummary = ({ cart }: { cart: Cart[] }) => {
  const { selectedCart, setSelectedCart } = useContext(GlobalContext);

  const totalPrice = selectedCart
    .map((item) => item.price * item.qty)
    .reduce((a, b) => a + b, 0);

  const allProductsOnCart = cart.map((item) => {
    return {
      ...item.product,
      qty: item.qtyItem,
      selected: true,
    };
  });

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setSelectedCart([...allProductsOnCart]);
    } else {
      setSelectedCart([]);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 lg:right-1/2 left-0 lg:left-28 dark:bg-dark">
      <div className="rounded-md max-lg:px-2 py-3 flex justify-between items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            onChange={handleChecked}
            checked={selectedCart.length === cart.length}
          />
          Select all
        </label>

        <div className="flex gap-10 items-center">
          <div className="text-end">
            <p>Total:</p>
            <p className="font-bold text-lg">{formatCurrency(totalPrice)}</p>
          </div>

          <button
            type="button"
            disabled={selectedCart.length === 0}
            className="bg-sky-500 text-white px-4 py-2 rounded-md disabled:opacity-50">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
