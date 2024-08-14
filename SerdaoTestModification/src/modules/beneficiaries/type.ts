
export interface Beneficiary {
  id: number;
  account: {
    firstName: string;
    lastName: string;
    iban: string;
  };
}