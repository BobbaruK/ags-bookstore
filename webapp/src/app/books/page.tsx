import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/books/components/table/columns";
import { getBooks } from "@/features/books/data/get-books";

const BooksPage = async () => {
  const books = await getBooks();

  return (
    <PageStructure>
      <PageTtle label={"Books"} addBtnHref={`books/add`} />
      {/* <pre>{JSON.stringify(books, null, 2)}</pre> */}
      {!books ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Books").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={books}
          columnVisibilityObj={{
            createdAt: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default BooksPage;
