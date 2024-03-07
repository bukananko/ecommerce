import { category } from "@/utils/constant";

const Select = (props: React.ComponentProps<"select">) => {
  const { defaultValue = "Category" } = props;

  return (
    <select
      {...props}
      name="category"
      id="category"
      defaultValue={defaultValue}
      className="w-full py-1 rounded-md px-3">
      <option disabled>Category</option>
      {category.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
