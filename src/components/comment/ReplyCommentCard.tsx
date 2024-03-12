import type { Reply } from "@/types";
import Avatar from "../ui/Avatar";
import { FaStore } from "react-icons/fa";

const ReplyCommentCard = ({ reply }: { reply: Reply }) => {
  return (
    <div className="dark:bg-white/5 rounded-lg py-3 px-5 space-y-2">
      <div className="flex items-center gap-2">
        <Avatar
          src={reply.owner.picture ?? "/profile.png"}
          className="size-8"
        />

        <p className="font-semibold">{reply.owner.username}</p>

        <FaStore size={15} title="Store" />
      </div>
      <div>
        <p>{reply.text}</p>
      </div>
    </div>
  );
};

export default ReplyCommentCard;
