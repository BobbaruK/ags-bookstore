import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/authors/components/table/columns";
import { getAuthors } from "@/features/authors/data/get-authors";

const AuthorsPage = async () => {
  const authors = await getAuthors();

  return (
    <PageStructure>
      <PageTtle label={"Authors"} addBtnHref={`authors/add`} />
      {!authors ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Authors").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={authors}
          columnVisibilityObj={{
            createdAt: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default AuthorsPage;
