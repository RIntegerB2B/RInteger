export class ModelBooking {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    productDescription: string;
    quantityDescription: string;
    emailId: string;
    modelId: string;
    modelsName: string;
    location: string;
    constructor(
        name: string,
        mobileNumber: number ,
        emailId: string,
        location: string,
        productDescription: string,
        quantityDescription: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.location = location;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
        this.location = location;

    }
}
