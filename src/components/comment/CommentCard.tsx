import { useState } from "react";
import Avatar from "../ui/Avatar";
import CommentForm from "../form/CommentForm";
import type { Product } from "@/types";

type Props = {
  username: string;
  picture: string;
  text: string;
  product: Product;
  userId: string;
};

const CommentCard = (props: Props) => {
  const { text, username, picture, product, userId } = props;
  const [isReply, setIsReply] = useState<boolean>(false);

  return (
    <div className="space-y-2 border-b border-b-white/20 pb-5">
      <div className="flex items-center gap-2">
        <picture>
          <Avatar src={picture} className="size-9" />
        </picture>

        <p className="font-semibold">{username}</p>
      </div>
      <div>
        <p>{text}</p>
      </div>

      {product.owner.id === userId && (
        <button onClick={() => setIsReply(!isReply)} className="text-blue-500">
          Reply
        </button>
      )}

      {isReply && <CommentForm productId={product.id} />}
    </div>
  );
};

export default CommentCard;
