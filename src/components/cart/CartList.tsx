import formatCurrency from "@/utils/formatCurrency";
import Checkbox from "../ui/Checkbox";
import React, { useCallback, useContext, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Product } from "@/types";
import { GlobalContext } from "@/utils/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import useDebounce from "@/hooks/useDebounce";
import Loading from "../ui/Loading";

type Props = {
  product: Product;
  qtyItem: number;
  cartId: string;
};

const CartList = ({ product, qtyItem, cartId }: Props) => {
  const { setSelectedCart, selectedCart } = useContext(GlobalContext);
  const [qty, setQty] = useState<number>(qtyItem);
  const queryClient = useQueryClient();

  const handleChecked = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setSelectedCart([
          ...selectedCart,
          { ...product, selected: true, qty: qtyItem },
        ]);
      } else {
        setSelectedCart([
          ...selectedCart.filter((item) => item.id !== product.id),
        ]);
      }
    },
    [selectedCart]
  );

  const { mutate: updateQty } = useMutation({
    mutationFn: async () => {
      await useFetch(`/cart/${cartId}`, {
        method: "PATCH",
        body: JSON.stringify({ qty: qty === 0 ? 1 : qty }),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const updateQtyDebounced = useDebounce(updateQty, 500);

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: async () => {
      await useFetch(`/cart/${cartId}`, {
        method: "DELETE",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const isChecked = selectedCart
    .map((item) => item.qty > 0 && item.id)
    .includes(product.id);

  const handleQtyChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.MouseEvent<HTMLButtonElement>
    ) => {
      if (e.target instanceof HTMLInputElement) {
        const value = Number(e.target.value);

        setQty(value > product.stock ? product.stock : value);

        if (value === 0) {
          setSelectedCart([
            ...selectedCart.filter((item) => item.id !== product.id),
          ]);
        } else {
          setSelectedCart([
            ...selectedCart.filter((item) => item.id !== product.id),
            {
              ...product,
              selected: true,
              qty: value > product.stock ? product.stock : value,
            },
          ]);
        }

        updateQtyDebounced();
      } else if (e.currentTarget instanceof HTMLButtonElement) {
        const title = e.currentTarget.title as "increase" | "decrease";

        setQty(title === "increase" ? qty + 1 : qty - 1);
        setSelectedCart([
          ...selectedCart.filter((item) => item.id !== product.id),
          {
            ...product,
            selected: true,
            qty: title === "increase" ? qty + 1 : qty - 1,
          },
        ]);

        updateQtyDebounced();
      }
    },
    [qty, selectedCart]
  );

  return (
    <div className="flex gap-5 items-center lg:w-1/2">
      <Checkbox id={product.id} onChange={handleChecked} checked={isChecked} />

      <img
        title={product.name}
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={100}
        height={100}
        className={`rounded-md aspect-square object-cover object-center w-32`}
      />

      <div className="space-y-2 w-full">
        <label htmlFor={product.id} className="space-y-2 cursor-pointer">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-lg text-gray-400">
            {formatCurrency(product.price)}
          </p>
        </label>

        <div className="flex items-center justify-end gap-5">
          <button disabled={isPendingDelete} onClick={() => handleDelete()}>
            {isPendingDelete ? (
              <Loading size={21} />
            ) : (
              <FaRegTrashAlt title="Delete" size={20} />
            )}
          </button>

          <div className="relative w-fit">
            <button
              onClick={handleQtyChange}
              title="decrease"
              disabled={qty === 1 || qty === 0}
              className="px-3 rounded-md absolute left-0 top-0 bottom-0 disabled:opacity-50">
              -
            </button>
            <input
              required
              type="number"
              min={1}
              max={99999999}
              value={qty === 0 ? "" : qty}
              className="px-7 py-1 rounded-md bg-transparent border w-28 text-center"
              onChange={handleQtyChange}
            />
            <button
              onClick={handleQtyChange}
              title="increase"
              disabled={qty === product.stock}
              className="px-3 rounded-md absolute right-0 bottom-0 top-0 disabled:opacity-50">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
