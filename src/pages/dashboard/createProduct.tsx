import Input from "@/components/ui/Input";
import { FaX } from "react-icons/fa6";
import { TbPhotoPlus } from "react-icons/tb";
import { useState } from "react";
import Select from "@/components/ui/Select";
import useFetch from "@/hooks/useFetch";
import useCookie from "@/hooks/useCookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UploadImg } from "@/actions";

type ProductValue = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
};

const CreateProductPage = () => {
  const { userId } = useCookie();
  const navigate = useNavigate();
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [value, setValue] = useState({} as ProductValue);
  const [previewImage, setPreviewImage] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const image = fileImage !== null ? await UploadImg(fileImage) : null;

      const { message, success } = await useFetch<ProductValue>("/product", {
        method: "POST",
        body: JSON.stringify({ ...value, image, userId }),
      });

      if (!success) toast.error(message);
      toast.success(message);
      navigate("/dashboard/manage-products");
    },
  });

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setFileImage(e.target.files[0]);
    }
  };

  return (
    <main className="md:px-36 px-2 flex gap-10 max-md:flex-col">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
          className="w-80 h-auto space-y-5">
          <Input
            label="Name"
            id="name"
            placeholder="Product name..."
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
              className="bg-gray-100 dark:bg-white/10 p-2 rounded-md outline-none h-44 w-full focus:outline-[#66C9DC]"
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
          </div>

          <Input
            label="Price"
            id="price"
            type="number"
            min={1}
            max={99999999}
            placeholder="Product price..."
            onChange={(e) =>
              setValue({ ...value, price: Number(e.target.value) })
            }
          />

          <Input
            label="Stock"
            id="stock"
            type="number"
            min={1}
            max={99999999}
            placeholder="Product stock..."
            onChange={(e) =>
              setValue({ ...value, stock: Number(e.target.value) })
            }
          />

          <Select
            onChange={(e) => setValue({ ...value, category: e.target.value })}
          />

          {!previewImage && (
            <label
              htmlFor="file"
              className="flex gap-2 items-center w-max cursor-pointer hover:">
              <TbPhotoPlus size={27} title="Upload Image" />
              <input
                required
                type="file"
                id="file"
                className="hidden"
                accept="image/*"
                onChange={getFile}
              />
              Add image
            </label>
          )}

          {previewImage && (
            <div className="relative w-fit lg:hidden">
              <button
                onClick={() => {
                  setPreviewImage("");
                  setFileImage(null);
                }}
                className="absolute -top-2 -right-2 p-2 bg-black text-white rounded-full">
                <FaX title="Delete Image" />
              </button>
              <img
                src={previewImage}
                alt="Post"
                width={600}
                height={600}
                className="w-auto h-auto rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={
              isPending ||
              !previewImage ||
              !value.name ||
              !value.price ||
              !value.stock
            }
            className="bg-blue-600 py-1 rounded-full w-full disabled:bg-blue-800">
            {isPending ? "Loading..." : "Publish"}
          </button>
        </form>
      </div>

      {previewImage && (
        <div className="relative w-fit max-lg:hidden">
          <button
            onClick={() => {
              setPreviewImage("");
              setFileImage(null);
            }}
            className="absolute -top-2 -right-2 p-2 bg-black text-white rounded-full">
            <FaX title="Delete Image" />
          </button>
          <img
            src={previewImage}
            alt="Post"
            width={600}
            height={600}
            className="w-auto h-auto rounded-md"
          />
        </div>
      )}
    </main>
  );
};

export default CreateProductPage;
