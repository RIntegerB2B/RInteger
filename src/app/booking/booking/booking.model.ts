export class Booking {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    location: string;
    emailId: string;
    productDescription: string;
    quantityDescription: string;
    shootType: string;
    modelType: string;
    productType: string;
    constructor(
        name: string,
        mobileNumber: number ,
        location: string,
        emailId: string,
        productDescription: string,
        quantityDescription: string,
        shootType: string,
        modelType: string,
        productType: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.location = location;
        this.emailId = emailId;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
        this.shootType = shootType;
        this.modelType = modelType;
        this.productType = productType;

    }
}
