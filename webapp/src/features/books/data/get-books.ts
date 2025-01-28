import db from "@/lib/db";

/**
 * {@linkcode getBooks}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getBooks = async () => {
  try {
    const books = await db.books.findMany({
      orderBy: {
        createdAt: "desc",
      },
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
    });

    return books;
  } catch {
    return null;
  }
};
