const Checkbox = (props: React.ComponentProps<"input">) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer appearance-none accent-sky-500 border rounded-md size-5 checked:bg-sky-500 checked:border-none cursor-pointer"
        {...props}
      />
      <svg
        className="absolute size-3 top-1 left-1 hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
