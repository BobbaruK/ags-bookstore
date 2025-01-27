import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/books/components/table/columns";
import { getBooks } from "@/features/books/data/get-books";

const BooksPage = async () => {
  const books = await getBooks();

  return (
    <div className="container space-y-6">
      <h1 className="text-heading1 border-b border-secondary pb-2">Books</h1>
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
    </div>
  );
};

export default BooksPage;
