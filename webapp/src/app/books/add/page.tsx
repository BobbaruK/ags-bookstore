import { BookAddForm } from "@/features/books/components/form/book-add";
import { redirectUser } from "@/lib/redirect-user";

const AddBookPage = async () => {
  await redirectUser("/books");

  return (
    <div className="container space-y-6">
      <h1 className="text-heading1 border-b border-secondary pb-2">Add book</h1>
      <BookAddForm />
    </div>
  );
};

export default AddBookPage;
