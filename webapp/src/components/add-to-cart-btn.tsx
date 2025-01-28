"use client";

import { revalidate } from "@/actions/reavalidate";
import { ACTION_MESSAGES } from "@/constants/messages";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { addCartItem } from "@/features/cart-item/actions/add-cart-item";
import { useTransition } from "react";
import { toast } from "sonner";
import { CustomButton } from "./custom-button";

interface Props {
  userId: string;
  bookId: string;
}

export const AddToCartBtn = ({ userId, bookId }: Props) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      addCartItem(user?.id || "", bookId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
          revalidate();
        })
        .catch(() => toast.error(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  return (
    <>
      <CustomButton
        buttonLabel="Add to cart"
        size={"sm"}
        variant={"outline"}
        onClick={onSubmit}
        disabled={isPending}
      />
    </>
  );
};
