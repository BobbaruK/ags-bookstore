import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { StockAlert } from "@/components/stock-alert";
import { getBookBySlug } from "@/features/books/data/get-book";
import { formatCurrency } from "@/lib/format-currency";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    bookSlug: string;
  }>;
}

const BookPage = async ({ params }: Props) => {
  const { bookSlug } = await params;

  const book = await getBookBySlug(bookSlug);

  if (!book) notFound();

  const bookAuthor = `${book.author?.firstName} ${book.author?.lastName}`;

  return (
    <PageStructure>
      <PageTtle
        label={book.title}
        backBtnHref={`/books`}
        editBtnHref={`/books/${book.slug}/edit`}
      />

      <section>
        <p className="text-heading4">
          by{" "}
          {book.author?.firstName && book.author?.lastName
            ? bookAuthor
            : "Unknown Author"}
        </p>
        <p>Price: {formatCurrency(book.price)}</p>
        <p className="flex items-center gap-2">
          Stock: {book.stock}
          <StockAlert stock={book.stock} />
        </p>
      </section>
    </PageStructure>
  );
};

export default BookPage;
