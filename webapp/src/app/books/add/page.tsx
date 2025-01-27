import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { BookAddForm } from "@/features/books/components/form/book-add";
import { redirectUser } from "@/lib/redirect-user";

const AddBookPage = async () => {
  await redirectUser("/books");

  return (
    <PageStructure>
      <PageTtle label={"Add Book"} backBtnHref={`/books`} />
      <BookAddForm />
    </PageStructure>
  );
};

export default AddBookPage;
