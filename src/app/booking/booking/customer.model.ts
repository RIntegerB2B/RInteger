export class Customer {
    mobileNumber: Number;
    name: String;
    location: String;
    shootType: String;
    modelType: String;
    constructor(
        mobileNumber: Number,
        name: String,
        location: String,
        shootType: String,
        modelType: String
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.location = location;
        this.shootType = shootType;
        this.modelType = modelType;
    }
}
