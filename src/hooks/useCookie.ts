import { useCookies } from "react-cookie";

const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  return {
    cookie,
    setCookie,
    removeCookie,
  };
};

export default useCookie;
