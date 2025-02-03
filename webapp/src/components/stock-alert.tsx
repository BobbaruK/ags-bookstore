interface Props {
  stock: number;
}

export const StockAlert = ({ stock }: Props) => {
  if (stock > 10)
    return (
      <span className="grid size-6 place-items-center rounded-full bg-success text-success-foreground">
        {stock}
      </span>
    );

  if (stock > 5)
    return (
      <span className="grid size-6 place-items-center rounded-full bg-warning text-warning-foreground">
        {stock}
      </span>
    );

  return (
    <span className="grid size-6 place-items-center rounded-full bg-danger text-danger-foreground">
      {stock}
    </span>
  );
};
