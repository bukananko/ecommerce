import Card from "@/components/ui/Card";
import useCookie from "@/hooks/useCookie";
import { getOwnedProducts } from "@/utils/getData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ManageProductsPage = () => {
  const { userId } = useCookie();
  const { pathname } = window.location;

  const { data } = useInfiniteQuery({
    queryKey: ["ownedProducts"],
    queryFn: ({ pageParam }) => getOwnedProducts({ pageParam, userId }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  const products = data?.pages.flatMap((product) => product) ?? [];

  return (
    <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:px-36 px-2">
      {products.map((product, i) => (
        <Link key={i} to={`${pathname}?id=${product.id}`}>
          <Card
            price={product.price}
            store={product.owner.username}
            title={product.name}
            totalSoldItems={product.sold}
            ratio="square"
            image={"/seblak.jpg" || product.image}
          />
        </Link>
      ))}
    </main>
  );
};

export default ManageProductsPage;
