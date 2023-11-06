// interface
interface User {
  readonly _id: number;
  email: string;
  userID?: number;
  // creating a method type
  showData: () => number;
  // another way of creating a method type
  showEmail(): string;
  //passing parameters in method type
  getHike(name: string, percentage: number): number;
}

let userData: User = {
  _id: 2342,
  email: "testDummy@test.com",
  userID: 12,
  showData: () => {
    return 1;
  },
  showEmail: () => {
    return "Email";
  },
  /*

  getHike: (name: "annual", percentage: "ten") => {
    // throws an error because the percentage type is number but we provided string
    return 0;
  }, 
  
  */
  getHike: (name: "annual", percentage: 10) => {
    return 0;
  },
};

userData._id = 32; // this throws an error because '_id' is read only.
userData.email = "dummyTest@dummy.com";
export {};

//2:34:00
