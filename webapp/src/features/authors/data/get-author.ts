import db from "@/lib/db";

/**
 * {@linkcode getAuthorBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getAuthorBySlug = async (slug: string) => {
  try {
    const license = await db.authors.findUnique({
      where: {
        slug,
      },
      include: {
        books: {
          include: {
            createdBy: {
              select: {
                id: true,
              },
            },
            author: {
              select: {
                firstName: true,
                lastName: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    return license;
  } catch {
    return null;
  }
};
