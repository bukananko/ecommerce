import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/utils/getData";
import { useInfiniteQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data } = useInfiniteQuery({
    queryKey: ["allProducts"],
    queryFn: ({ pageParam }) => getAllProducts({ pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap((product) => product) ?? [];

  return (
    <main className="md:px-28 px-2 flex-1 py-3">
      <div className="flex justify-center items-center flex-col h-dvh relative">
        <h1 className="p-10 bg-gradient-to-r from-[#66C9DC] via-transparent to-[#F66D50] text-transparent bg-clip-text text-7xl lg:text-9xl font-hero">
          shopai
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-sm:text-sm text-center text-xl">
          An open source e-commerce platform that lets you sell everything in
          the universe.
        </p>

        <div className="content"></div>
        <div className="content2 max-sm:hidden"></div>
      </div>

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

export default HomePage;
