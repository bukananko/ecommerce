import ProductCard from "@/components/product/ProductCard";
import Loading from "@/components/ui/Loading";
import { getProductsByQuery } from "@/utils/getData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParam] = useSearchParams();
  const query = searchParam.get("q") as string;

  const { data, isLoading, refetch } = useInfiniteQuery({
    queryKey: [query],
    queryFn: ({ pageParam }) => getProductsByQuery({ pageParam, query }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap((product) => product) ?? [];

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query]);

  if (isLoading) {
    return (
      <Loading className="flex justify-center items-center h-dvh" size={40} />
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col h-dvh">
        <p className="text-lg">No results</p>
        <Link to="/" className="text-lg text-blue-500 hover:underline">
          Back to home?
        </Link>
      </div>
    );
  }

  return (
    <main className="md:px-28 px-2 mt-24">
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 space-y-5">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            href={`/product/${product.id}`}
            price={product.price}
            store={product.owner.username}
            title={product.name}
            totalSoldItems={product.sold}
            image={product.image}
          />
        ))}
      </div>
    </main>
  );
};

export default SearchPage;
