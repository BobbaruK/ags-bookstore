import db from "@/lib/db";

/**
 * {@linkcode getBookBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBookBySlug = async (slug: string) => {
  try {
    const license = await db.books.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            slug: true,
          },
        },
      },
    });

    return license;
  } catch {
    return null;
  }
};
