import { useContext } from "react";
import Avatar from "../ui/Avatar";
import type { Comment, Product } from "@/types";
import { GlobalContext } from "@/utils/context";

type Props = {
  product: Product;
  userId: string;
  comment: Comment;
};

const CommentCard = (props: Props) => {
  const { product, userId, comment } = props;
  const { reply, setReply } = useContext(GlobalContext);

  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar
          src={comment.owner.picture ?? "/profile.png"}
          className="size-9"
        />

        <p className="font-semibold">{comment.owner.username}</p>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>

      {product.owner.id === userId && !comment.reply && (
        <button
          onClick={() => {
            console.log(comment.id);
            setReply({
              active: reply.ref !== comment.id ? true : false,
              ref: comment.id as string,
            });
          }}
          className="text-blue-500">
          {reply.active && reply.ref === comment.id ? "Cancel" : "Reply"}
        </button>
      )}
    </>
  );
};

export default CommentCard;
