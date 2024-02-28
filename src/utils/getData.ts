import type { Product, User } from "@/types";
import useFetch from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import useCookie from "@/hooks/useCookie";

export const getCurrentUser = () => {
  const { userId } = useCookie();
  return useQuery({
    queryKey: ["user"],
    queryFn: () => useFetch<User>(`/user/${userId}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};

export const getOwnedProducts = async ({
  pageParam,
  userId,
}: {
  pageParam: number;
  userId: string;
}) => {
  const url = `/product/owned?skip=${10 * pageParam}&id=${userId}`;
  const { data } = await useFetch<Product[]>(url);
  return data;
};
