import { CustomAlert } from "@/components/custom-alert";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getAuthors } from "@/features/authors/data/get-authors";
import { BookEditForm } from "@/features/books/components/form/book-edit";
import { getBookBySlug } from "@/features/books/data/get-book";
import { redirectUser } from "@/lib/redirect-user";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    bookSlug: string;
  }>;
}

const EditBookPage = async ({ params }: Props) => {
  const { bookSlug } = await params;

  const brandHref = `/books/${bookSlug}`;

  await redirectUser(brandHref);

  const book = await getBookBySlug(bookSlug);

  if (!book) notFound();

  const authors = await getAuthors();

  if (!authors)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Authors").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageTtle label={`Edit "${book.title}"`} backBtnHref={brandHref} />
      <BookEditForm book={book} authors={authors} />
    </PageStructure>
  );
};

export default EditBookPage;
