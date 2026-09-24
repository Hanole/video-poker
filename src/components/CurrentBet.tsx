type CurrentBetProps = {
  betAmount: number;
};

export function CurrentBet({ betAmount }: CurrentBetProps) {
  return <p>Innsats: {betAmount}</p>;
}