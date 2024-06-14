const displayKg = (num) => {
  const formatter = new Intl.NumberFormat("en-SL", {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "narrow",
    minimumFractionDigits: 2,
  });

  return formatter.format(num);
};

export default displayKg;
