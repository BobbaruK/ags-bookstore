interface Props {
  stock: number;
}

export const StockAlert = ({ stock }: Props) => {
  if (stock > 10)
    return <span className="block size-6 rounded-full bg-success"></span>;

  if (stock > 5)
    return <span className="block size-6 rounded-full bg-warning"></span>;

  return <span className="block size-6 rounded-full bg-danger"></span>;
};
