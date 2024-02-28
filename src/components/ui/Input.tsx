import { forwardRef } from "react";

type InputType = React.ComponentProps<"input"> & { label: string };

const Input = forwardRef<HTMLInputElement, InputType>(
  (props: InputType, ref) => {
    const { id, label, type = "text" } = props;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id}>{label}</label>
        <input
          required
          type={type}
          className="border outline-none px-4 py-1 rounded-md bg-transparent focus:border-white/50 focus:outline-[#66C9DC]"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
