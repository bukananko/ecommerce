import { useCookies } from "react-cookie";

const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  return {
    userId: cookie?.userId as string,
    setCookie,
    removeCookie,
  };
};

export default useCookie;
