type UserInput = {
  budget: number;
  brand: string;
  color: string;
  occasion: string;
};

type Bag = {
  title: string;
  price: string;
  url: string;
};

export function recommendBag(input: UserInput, bags: Bag[]) {
  return (
    bags.find((bag) => {
      const price = parseFloat(bag.price.replace(/[^0-9.]/g, ""));
      const titleLower = bag.title.toLowerCase();

      return (
        price <= input.budget &&
        titleLower.includes(input.brand) &&
        titleLower.includes(input.color) &&
        titleLower.includes(input.occasion)
      );
    }) ||
    bags.find(
      (bag) => parseFloat(bag.price.replace(/[^0-9.]/g, "")) <= input.budget
    ) ||
    bags[0]
  );
}
