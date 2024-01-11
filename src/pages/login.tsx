import { useNavigate } from "react-router-dom";
import { LoginAction } from "@/actions";
import AuthLayout from "@/components/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

type FormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [_, setCookie] = useCookies(["userId"]);
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z.object({
    username: z
      .string()
      .min(4)
      .max(32)
      .regex(/^[a-z0-9]+$/, {
        message:
          "Username must not contain spaces/symbols, and must be in lowercase",
      }),
    password: z.string().min(8),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { success, message, userId } = await LoginAction({
      username: data.username,
      password: data.password,
    });

    if (!success) toast.error(message);

    if (success) {
      toast.success(message);
      setCookie("userId", userId, { maxAge: 60 * 60 * 24 });
      navigate("/", { replace: true });
    }
  };

  return (
    <AuthLayout type="login">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 h-auto space-y-5">
        <Input
          autoFocus
          label="Username"
          id="username"
          placeholder="Enter Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}

        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password")}
        />

        <button
          type="submit"
          className="bg-blue-600 rounded-md py-1 w-full hover:bg-blue-500">
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
