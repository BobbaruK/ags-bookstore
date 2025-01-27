import db from "@/lib/db";

/**
 * {@linkcode getAuthors}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getAuthors = async () => {
  try {
    const authors = await db.authors.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
    });

    return authors;
  } catch {
    return null;
  }
};
