class User {
  email: string;
  userID: number;

  /*
    private property cannot be accessed outside class but can be accessed inside class.

    We can design a getter & setter methods so that if anyone wants to modify this private property 
    they can do that indirectly

    */
  private courseCount: number = 1;

  constructor(email: string, userID: number) {
    this.email = email;
    this.userID = userID;
  }

  get getMaskedEmail(): string {
    return `${this.email.split("@")[0]}@test.com`;
  }

  get getCourseCount(): number {
    return this.courseCount;
  }

  //   // setter cannot have return type annotation as well
  //   set setCourseCount(newCourseCount): number {
  //     return this.courseCount; // this throws an error because setter cannot have a return
  //   }

  set setCourseCount(newCourseCount: number) {
    this.courseCount = newCourseCount; // this throws an error because setter cannot have a return
  }
}

const user = new User("test@test.com", 1001);

export {};

//3:16:00
