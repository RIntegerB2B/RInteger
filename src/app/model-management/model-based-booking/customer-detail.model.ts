export class CustomerDetail {
    mobileNumber: Number;
    name: String;
    location: String;
    product: String;
    constructor(
        mobileNumber: Number,
        name: String,
        location: String,
        product: String
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.location = location;
        this.product = product;
    }
}
