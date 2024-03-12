import CommentCard from "@/components/comment/CommentCard";
import ReplyCommentCard from "@/components/comment/ReplyCommentCard";
import CommentForm from "@/components/form/CommentForm";
import SummaryCard from "@/components/product/SummaryCard";
import Loading from "@/components/ui/Loading";
import useCookie from "@/hooks/useCookie";
import { GlobalContext } from "@/utils/context";
import formatCurrency from "@/utils/formatCurrency";
import { getCommentsOnProduct, getDetailProduct } from "@/utils/getData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const DetailProductPage = () => {
  const { userId } = useCookie();
  const id = useParams().id as string;
  const { reply } = useContext(GlobalContext);
  const { data: product, isLoading } = getDetailProduct(id!);

  const { data } = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) =>
      getCommentsOnProduct({ productId: id, pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 10) return undefined;
      return pages.length;
    },
    initialPageParam: 0,
  });

  const comments = data?.pages.flatMap((comment) => comment) ?? [];

  if (isLoading)
    return (
      <Loading className="flex justify-center items-center h-dvh" size={40} />
    );

  return (
    <main className="space-y-20">
      <div className="relative md:px-28 px-2 flex-1 mt-24 flex items-start justify-between gap-10 h-dvh">
        <picture className="w-80">
          <img
            title={product?.name}
            src={product?.image}
            alt={product?.name}
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

          <p>
            Details: <br /> {product?.description}
          </p>
        </div>

        <SummaryCard product={product!} />
      </div>

      <div className="w-full md:px-28 px-2 space-y-5">
        <h3 className="text-3xl font-bold">Reviews</h3>

        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <div
              key={i}
              className="space-y-2 border-b border-b-white/20 pb-5 w-1/2">
              <CommentCard
                userId={userId}
                product={product!}
                comment={comment}
              />

              {comment.reply && <ReplyCommentCard reply={comment.reply} />}

              {reply.active && reply.ref === comment.id && (
                <CommentForm
                  isReply={true}
                  userId={userId}
                  commentId={comment.id as string}
                />
              )}
            </div>
          ))
        ) : (
          <p className="font-semibold">No reviews yet</p>
        )}

        {product?.owner.id !== userId && userId && (
          <CommentForm userId={userId} productId={id} />
        )}
      </div>
    </main>
  );
};

export default DetailProductPage;
