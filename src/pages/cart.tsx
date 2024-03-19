import CartList from "@/components/cart/CartList";
import OrderSummary from "@/components/cart/OrderSummary";
import Loading from "@/components/ui/Loading";
import useCookie from "@/hooks/useCookie";
import { getCartByUserId } from "@/utils/getData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { userId } = useCookie();

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["cart"],
    queryFn: ({ pageParam }) => getCartByUserId({ pageParam, userId }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
  });

  const cart = data?.pages.flatMap((cartItem) => cartItem) ?? [];

  if (isLoading)
    return (
      <Loading className="flex justify-center items-center h-dvh" size={40} />
    );

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-dvh flex-col text-lg">
        <h3>Cart empty</h3>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to home?
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="md:px-28 px-2 py-10">
        <h3 className="text-3xl font-bold">Shopping Cart</h3>
      </header>

      <main className="md:px-28 px-2 mb-24 space-y-5">
        {cart.map((cartItem, i) => (
          <Fragment key={i}>
            <CartList
              product={cartItem.product}
              qtyItem={cartItem.qtyItem}
              cartId={cartItem.id}
            />
          </Fragment>
        ))}

        <OrderSummary cart={cart} />
      </main>
    </>
  );
};

export default CartPage;
