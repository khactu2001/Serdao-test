
export interface Transaction {
  id: number;
  amount: number;
  account: {
    name: string;
    iban: string;
  };
}