import db from "@/lib/db";

/**
 * {@linkcode getCartItemsByUserId}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getCartItemsByUserId = async (id: string) => {
  try {
    const cartItems = await db.cart_item.findMany({
      where: {
        userId: id,
      },
      include: {
        product: {
          select: {
            title: true,
            slug: true,
            price: true,
            stock: true,
          },
        },
      },
    });

    return cartItems;
  } catch {
    return null;
  }
};
