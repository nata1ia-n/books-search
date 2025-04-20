"use client";

import ResultsPanel from "@/components/ResultsPanel";
import SearchForm from "@/components/SearchForm";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SimilarBooksRequest,
  SimilarBooksRequestSchema,
  SimilarBooksResponse,
  SimilarBooksResponseSchema,
} from "./types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsNumber, setResultsNumber] = useState(6);
  const [similarBooks, setSimilarBooks] = useState<SimilarBooksResponse>([]);
  const [searchExecuted, setSearchExecuted] = useState(false);

  const handleSimilarSearch = async () => {
    setSearchExecuted(false);
    const payload: SimilarBooksRequest = {
      query: searchQuery,
      top_k: resultsNumber,
    };

    const parsed = SimilarBooksRequestSchema.safeParse(payload);
    if (!parsed.success) {
      console.error("Invalid search request:", parsed.error.format());
      return;
    }

    try {
      const response = await axios.post("/api/search", payload);

      const result = SimilarBooksResponseSchema.safeParse(response.data);

      if (!result.success) {
        console.error("Invalid response structure:", result.error.format());
        return;
      }

      setSimilarBooks(result.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    if (similarBooks.length > 0) {
      setSearchExecuted(true);
    }
  }, [similarBooks]);

  return (
    <main className="min-h-screen px-6 pb-10 flex flex-col items-center">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: similarBooks.length > 0 ? -60 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-2xl flex flex-col gap-4 ${
          similarBooks.length > 0
            ? "items-start mt-25"
            : "items-center justify-center flex-1"
        }`}
      >
        <h1 className="text-3xl font-bold text-center w-full">Book Search</h1>

        <SearchForm
          searchQuery={searchQuery}
          resultsNumber={resultsNumber}
          onQueryChange={(e) => setSearchQuery(e.target.value)}
          onResultsChange={(e) => setResultsNumber(Number(e.target.value))}
          onSearch={handleSimilarSearch}
        />
      </motion.div>

      <AnimatePresence>
        <ResultsPanel
          similarBooks={similarBooks}
          searchExecuted={searchExecuted}
        />
      </AnimatePresence>
    </main>
  );
}
