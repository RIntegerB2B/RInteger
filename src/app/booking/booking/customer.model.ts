export class Customer {
    mobileNumber: Number;
    name: String;
    location: String;
    shootType: String;
    modelType: String;
    product: String;
    constructor(
        mobileNumber: Number,
        name: String,
        location: String,
        shootType: String,
        modelType: String,
        product: String
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.location = location;
        this.shootType = shootType;
        this.modelType = modelType;
        this.product = product;
    }
}
