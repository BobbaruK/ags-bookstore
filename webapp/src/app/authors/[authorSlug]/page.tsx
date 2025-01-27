import { DataTable } from "@/components/data-table";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getAuthorBySlug } from "@/features/authors/data/get-author";
import { columns } from "@/features/books/components/table/columns";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    authorSlug: string;
  }>;
}

const BrandPage = async ({ params }: Props) => {
  const { authorSlug } = await params;

  const author = await getAuthorBySlug(authorSlug);

  if (!author) notFound();

  return (
    <PageStructure>
      <PageTtle
        label={author.firstName + " " + author.lastName}
        backBtnHref={`/authors`}
        editBtnHref={`/authors/${author.slug}/edit`}
      />

      <section>
        <h2 className="text-heading4">Books</h2>
        <DataTable
          columns={columns}
          data={author.books}
          columnVisibilityObj={{
            createdAt: false,
            author: false,
          }}
          // legendItems={<LandingPageLegend />}
        />
      </section>
    </PageStructure>
  );
};

export default BrandPage;
