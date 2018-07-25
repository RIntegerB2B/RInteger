export class Booking {
    mobileNumber: number;
    name: string;
    productDescription: string;
    quantityDescription: string;
    shootType: string;
    modelType: string;
    constructor(
        name: string,
        mobileNumber: number ,
        productDescription: string,
        quantityDescription: string,
        shootType: string,
        modelType: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
        this.shootType = shootType;
        this.modelType = modelType;

    }
}
