import { CustomAlert } from "@/components/custom-alert";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getAuthors } from "@/features/authors/data/get-authors";
import { BookAddForm } from "@/features/books/components/form/book-add";
import { redirectUser } from "@/lib/redirect-user";

const AddBookPage = async () => {
  await redirectUser("/books");

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
      <PageTtle label={"Add Book"} backBtnHref={`/books`} />
      <BookAddForm authors={authors || []} />
    </PageStructure>
  );
};

export default AddBookPage;
