// A simple library function to demonstrate shared code
export const calculateDiscount = (price: number, discount: number): number => {
  return price * (1 - discount);
};
