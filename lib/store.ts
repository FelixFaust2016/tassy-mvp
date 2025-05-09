type Recommendation = {
  title: string;
  price: string;
  url: string;
};

const store = new Map<string, Recommendation>();

export function saveRecommendation(id: string, rec: Recommendation) {
  store.set(id, rec);
}

export function getRecommendation(id: string): Recommendation | undefined {
  return store.get(id);
}
