"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

type Bag = {
  title: string;
  price: string;
  url: string;
};

function ResultContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [bag, setBag] = useState<Bag | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/result?id=${id}`)
        .then((res) => res.json())
        .then((data) => setBag(data.recommendation));
    }
  }, [id]);

  if (!bag) return <p>Loading recommendation...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Your Recommended Bag</h1>
      <div className="p-4 border rounded-md shadow-md max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">{bag.title}</h2>
        <p className="text-gray-700 mb-2">{bag.price}</p>
        <a
          href={bag.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on site
        </a>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}