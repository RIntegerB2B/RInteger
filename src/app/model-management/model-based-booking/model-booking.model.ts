export class ModelBooking {
    mobileNumber: number;
    name: string;
    productDescription: string;
    quantityDescription: string;
    modelId: string;
    modelsName: string;
    location: string;
    constructor(
        name: string,
        mobileNumber: number ,
        location: string,
        productDescription: string,
        quantityDescription: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
        this.location = location;

    }
}
