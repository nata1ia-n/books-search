import { Book } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <Card
      key={book.id}
      className="shadow-md hover:shadow-lg transition-shadow h-full"
    >
      <CardHeader>
        <CardTitle className="text-lg">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{book.authors}</p>
      </CardHeader>
      <CardContent className="text-sm flex-1 max-h-48 overflow-y-auto">
        <p className="mb-2 text-muted-foreground italic">{book.category}</p>
        <p>{book.description}</p>
      </CardContent>
    </Card>
  );
};

export default BookCard;
