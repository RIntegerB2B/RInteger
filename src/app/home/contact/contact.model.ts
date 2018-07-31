export class Send {
    mobileNumber: number;
    name: string;
    productDescription: string;
    constructor(
        name: string,
        mobileNumber: number ,
        productDescription: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.productDescription = productDescription;

    }
}
