import quotes from "@/data/quotes.json";

export type QuoteData = {
  id: number;
  text: string;
  author: string;
};

export const getRandomQuote = (): QuoteData => {
  return quotes[Math.floor(Math.random() * quotes.length)] as QuoteData;
};
