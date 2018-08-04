export class BookingDetails {
    mobileNumber: number;
    name: string;
    bookingOrderId: string;
    productDescription: string;
    quantityDescription: string;
    shootType: string;
    modelType: string;
    productType: string;
    constructor(
        name: string,
        mobileNumber: number ,
        productDescription: string,
        quantityDescription: string,
        shootType: string,
        modelType: string,
        productType: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
        this.shootType = shootType;
        this.modelType = modelType;
        this.productType = productType;

    }
}
