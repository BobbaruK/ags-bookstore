"use client";

import { revalidate } from "@/actions/reavalidate";
import { ACTION_MESSAGES } from "@/constants/messages";
import { deleteCartItem as dci } from "@/features/cart-item/actions/delete-cart-item";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  id: string;
}

export const DeleteCartItem = ({ id }: Props) => {
  const deleteCartItems = async () => {
    await dci(id)
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
  };

  return (
    <Button
      size={"icon"}
      className="ms-auto flex size-8"
      variant={"danger"}
      onClick={deleteCartItems}
    >
      <MdDelete />
    </Button>
  );
};
