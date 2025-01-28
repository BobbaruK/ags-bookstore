import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { AuthorEditForm } from "@/features/authors/components/form/author-edit";
import { getAuthorBySlug } from "@/features/authors/data/get-author";
import { redirectUser } from "@/lib/redirect-user";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    authorSlug: string;
  }>;
}

const EditAuthorPage = async ({ params }: Props) => {
  const { authorSlug } = await params;

  const authorHref = `/authors/${authorSlug}`;

  await redirectUser(authorHref);

  const author = await getAuthorBySlug(authorSlug);

  if (!author) notFound();

  return (
    <PageStructure>
      <PageTtle
        label={`Edit "${author.firstName} ${author.lastName}"`}
        backBtnHref={authorHref}
      />

      <AuthorEditForm author={author} />
    </PageStructure>
  );
};

export default EditAuthorPage;
