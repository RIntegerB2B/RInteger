export class CatalogBooking {
    mobileNumber: number;
    name: string;
    location: string;
    emailId: string;
    productDescription: string;
    quantityDescription: string;
    b2bNational: Array<string>;
    b2bInterNational: Array<string>;
    b2cNational: Array<string>;
    b2cInterNational: Array<string>;
    socialMedia: Array<string>;
    constructor(
        mobileNumber: number,
        name: string,
        location: string,
        emailId: string,
        productDescription: string,
        quantityDescription: string

    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.emailId = emailId;
        this.location = location;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
    }
}
