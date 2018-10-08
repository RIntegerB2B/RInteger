export class Aplus {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    productDescription: string;
    quantityDescription: string;
    location: string;
    isVideoShoot: string;
    isPhotoShoot: string;
    constructor(
        name: string,
        mobileNumber: number ,
        location: string,
        productDescription: string,
        quantityDescription: string,
        isPhotoShoot: string,
        isVideoShoot: string,
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.productDescription = productDescription;
        this.quantityDescription = quantityDescription;
       this.isVideoShoot = isVideoShoot;
       this.isPhotoShoot =  isPhotoShoot;
    }
}
