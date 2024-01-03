const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex gap-5 items-center">
        <p className="text-3xl font-extrabold">404</p>
        <span className="border-r-2 border-r-gray-400 h-10" />
        <p className="text-2xl font-extrabold">This page could not be found</p>
      </div>
    </div>
  );
};

export default ErrorPage;
