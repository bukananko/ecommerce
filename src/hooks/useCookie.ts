import { useCookies } from "react-cookie";

const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  return {
    userId: cookie?.userId,
    setCookie,
    removeCookie,
  };
};

export default useCookie;
