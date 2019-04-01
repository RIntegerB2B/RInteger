export class Customer {
    mobileNumber: Number;
    name: String;
    location: String;
    emailId: String;
    shootType: String;
    modelType: String;
    product: String;
    bookingType: String;
    constructor(
        mobileNumber: Number,
        name: String,
        location: String,
        emailId: String,
      /*   shootType: String,
        modelType: String,
        product: String */
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.location = location;
        this.emailId = emailId;
       /*  this.shootType = shootType;
        this.modelType = modelType;
        this.product = product; */
    }
}
