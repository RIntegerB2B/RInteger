export class Creative {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    emailId: string;
    productDescription: string;
    quantityDescription: string;
    location: string;
    shootPurpose: string;
    isVideoShoot: string;
    shootType: Array<string>;
    constructor(
        name: string,
        mobileNumber: number ,
        location: string,
        emailId: string,
        productDescription: string,
        quantityDescription: string,
        shootPurpose: string,
        isVideoShoot: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
       this.shootPurpose = shootPurpose;
       this.isVideoShoot = isVideoShoot;
    }
}
