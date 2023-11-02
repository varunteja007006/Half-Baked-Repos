type CredCardNumber = {
  credCardNumber: number;
};

type CredCardDate = {
  credCardDate: string;
};

type CredCardDetails = CredCardNumber &
  CredCardDate & {
    credCardCVV: number;
  };

const cardOne: CredCardDetails = {
  credCardNumber: 546516165,
  credCardDate: "02/89",
  credCardCVV: 566,
};

export {};
