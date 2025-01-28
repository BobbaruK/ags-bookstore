import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { currentUser } from "@/features/auth/lib/auth";
import { getCartItemsByUserId } from "@/features/cart-item/data/get-cart-items";
import { formatCurrency } from "@/lib/format-currency";
import { CustomButton } from "./custom-button";
import { DeleteCartItem } from "./delete-cart-item";

export async function AppSidebar() {
  const user = await currentUser();

  const cartItems = user && user.id ? await getCartItemsByUserId(user?.id) : [];

  if (!cartItems) return null;

  const total = cartItems.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0,
  );

  return (
    <Sidebar>
      <SidebarHeader>Shopping cart</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction> */}
          <SidebarGroupContent className="flex flex-col gap-7">
            {/* <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
            {cartItems && cartItems.length > 0
              ? cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span>{item.product.title}</span>
                      <span>x {item.quantity}</span>
                      <DeleteCartItem id={item.id} />
                    </div>
                    <span>
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))
              : "Your cart is empty"}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-4">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <CustomButton buttonLabel="Submit" />
      </SidebarFooter>
    </Sidebar>
  );
}
