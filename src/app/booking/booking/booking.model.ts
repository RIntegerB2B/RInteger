export class BookIn {
   
    phoneNumber: number;
    name: string;
    productDescription:string;
    qualityDescription:string;
    constructor(
        name: string,
        phoneNumber: number) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}
