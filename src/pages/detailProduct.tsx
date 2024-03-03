import CommentCard from "@/components/comment/CommentCard";
import CardSummary from "@/components/product/CardSummary";
import formatCurrency from "@/utils/formatCurrency";
import { getDetailProduct } from "@/utils/getData";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = getDetailProduct(id!);

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-dvh">Loading...</div>
    );

  return (
    <main className="space-y-20">
      <div className="relative md:px-28 px-2 flex-1 mt-24 flex items-start justify-between gap-10">
        <picture className="w-80">
          <img
            title={"seblak"}
            src={"/seblak.jpg"}
            alt="Product"
            loading="lazy"
            width={100}
            height={100}
            className={`w-full rounded-md`}
          />
        </picture>

        <div className="space-y-2 flex-1 w-fit">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-4xl font-extrabold">
            {formatCurrency(product?.price!)}
          </p>

          <p className="whitespace-pre-line">
            Details: <br /> {product?.description}
          </p>
        </div>

        <CardSummary
          handleQty={handleQty}
          product={product!}
          qty={qty}
          setQty={setQty}
        />
      </div>

      <div className="w-full md:px-28 px-2 space-y-5">
        <h3 className="text-3xl font-bold">Reviews</h3>

        <CommentCard />
      </div>
    </main>
  );
};

export default DetailProductPage;
