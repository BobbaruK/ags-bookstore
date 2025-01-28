import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { AuthorAddForm } from "@/features/authors/components/form/author-add";
import { redirectUser } from "@/lib/redirect-user";

const AddBookPage = async () => {
  await redirectUser("/books");

  return (
    <PageStructure>
      <PageTtle label={"Add Author"} backBtnHref={`/authors`} />
      <AuthorAddForm />
    </PageStructure>
  );
};

export default AddBookPage;
