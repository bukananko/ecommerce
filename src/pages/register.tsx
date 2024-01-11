import { useNavigate } from "react-router-dom";
import { RegisterAction } from "@/actions";
import AuthLayout from "@/components/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import toast from "react-hot-toast";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z
    .object({
      username: z
        .string()
        .min(4)
        .max(32)
        .regex(/^[a-z0-9]+$/, {
          message:
            "Username must not contain spaces/symbols, and must be in lowercase",
        }),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Password do not match!",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { success, message } = await RegisterAction({
      username: data.username,
      password: data.password,
    });

    if (!success) return toast.error(message);

    if (success) {
      toast.success(message);
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthLayout type="register">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 space-y-5">
        <Input
          autoFocus
          minLength={4}
          maxLength={32}
          label="Username"
          id="username"
          placeholder="Enter Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}

        <Input
          minLength={8}
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="Enter password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 rounded-md py-1 w-full hover:bg-blue-500">
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
