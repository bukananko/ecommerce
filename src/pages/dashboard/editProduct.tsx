import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import useFetch from "@/hooks/useFetch";
import { getDetailProduct } from "@/utils/getData";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type ProductValue = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

const EditProductPage = () => {
  const id = useParams().id as string;
  const navigate = useNavigate();

  const { data: product } = getDetailProduct(id);
  const [value, setValue] = useState({} as ProductValue);

  const { mutate, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();

      const url = `/product/${id}`;

      const { message, success } = await useFetch(url, {
        method: "PATCH",
        body: JSON.stringify({ ...value }),
      });

      if (!success) toast.error(message);
      toast.success(message);
      navigate("/dashboard/manage-products");
    },
  });

  return (
    <main>
      <div className="relative md:px-28 px-2 flex-1 flex items-start gap-10">
        <picture className="w-80">
          <img
            title={product?.name}
            src={product?.image}
            alt={product?.name}
            loading="lazy"
            width={100}
            height={100}
            className={`w-full h-auto rounded-md`}
          />
        </picture>

        <form onSubmit={(e) => mutate(e)} className="space-y-4 w-80">
          <Input
            label="Name"
            defaultValue={product?.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />

          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <textarea
              required
              name="description"
              id="description"
              placeholder="Product description..."
              maxLength={500}
              defaultValue={product?.description}
              className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none h-44 w-full focus:outline-[#66C9DC]"
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
          </div>

          <Input
            label="Price"
            type="number"
            defaultValue={product?.price}
            onChange={(e) =>
              setValue({ ...value, price: Number(e.target.value) })
            }
          />

          <Input
            label="Stock"
            type="number"
            defaultValue={product?.stock}
            onChange={(e) =>
              setValue({ ...value, stock: Number(e.target.value) })
            }
          />

          <Select
            defaultValue={product?.category}
            onChange={(e) => setValue({ ...value, category: e.target.value })}
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 py-1 rounded-full w-full disabled:bg-blue-800 disabled:cursor-not-allowed">
            {isPending ? "Loading..." : "Publish"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProductPage;
