type TotalCoinsProps = {
  coins: number;
};

export function TotalCoins({ coins }: TotalCoinsProps) {
  return <p>Mynter: {coins}</p>;
}