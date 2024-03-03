const formatCurrency = (price: number) => {
  const { format } = new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return format(price);
};

export default formatCurrency;
