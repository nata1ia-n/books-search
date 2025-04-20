import { SimilarBooksResponse } from "@/app/types";
import BookCard from "@/components/BookCard";
import { motion } from "framer-motion";
import { FC } from "react";

interface ResultsPanelProps {
  similarBooks: SimilarBooksResponse;
  searchExecuted: boolean;
}

const ResultsPanel: FC<ResultsPanelProps> = ({
  similarBooks,
  searchExecuted,
}) => {
  if (!searchExecuted || similarBooks.length === 0) return null;
  return (
    <motion.section
      key="results"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl"
    >
      {similarBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </motion.section>
  );
};

export default ResultsPanel;
