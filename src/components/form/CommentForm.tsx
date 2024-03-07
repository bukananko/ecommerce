import { useRef, useState } from "react";
import Avatar from "../ui/Avatar";
import { RiSendPlane2Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import toast from "react-hot-toast";
import useCookie from "@/hooks/useCookie";

type Props = {
  productId: string;
};

const CommentForm = ({ productId }: Props) => {
  const { userId } = useCookie();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      const url = `/comment/${productId}`;

      const { message, success } = await useFetch(url, {
        method: "POST",
        body: JSON.stringify({ comment, userId }),
      });

      if (!success) toast.error(message);
      toast.success(message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);

    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${
      e.currentTarget.scrollHeight > 112 ? 112 : e.currentTarget.scrollHeight
    }px`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        mutate();
      }}
      className="flex gap-2 items-center max-md:px-3 py-2 sticky bottom-0 bg-white dark:bg-[#121212] right-0 left-0">
      <Avatar className="w-9 h-max" />

      <div className="w-full md:w-1/2 relative flex flex-col">
        <textarea
          ref={textAreaRef}
          rows={1}
          required
          maxLength={500}
          onChange={handleChange}
          placeholder="Add a comment..."
          className="w-full py-2 px-4 rounded-md bg-gray-200 dark:bg-white/10 outline-none"
        />
      </div>

      {textAreaRef.current?.value && (
        <button type="submit" className="p-2 hover:opacity-80">
          <RiSendPlane2Line size={23} />
        </button>
      )}
    </form>
  );
};

export default CommentForm;
