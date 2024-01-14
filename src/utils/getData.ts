import type { User } from "@/types";
import useFetch from "@/hooks/useFetch";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUser = () => {
  const [cookies] = useCookies(["userId"]);
  return useQuery({
    queryKey: ["user"],
    queryFn: () => useFetch<User>(`/user/${cookies.userId}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  });
};
