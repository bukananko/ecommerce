import useFetch from "@/hooks/useFetch";

export const LoginAction = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const { data, success, message } = await useFetch<string>("/user/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return {
    userId: data,
    success,
    message,
  };
};

export const RegisterAction = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await useFetch("/user/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response;
};
