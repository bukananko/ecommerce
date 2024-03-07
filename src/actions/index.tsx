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

export const UploadImg = async (file: File) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const { secure_url } = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());

  console.log(secure_url);

  return secure_url as string;
};
