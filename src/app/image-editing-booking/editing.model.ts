export class ImageEditing {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    emailId: string;
    imageDescription: string;
    quantityDescription: string;
    imageRequirements: string;
    location: string;
    constructor(
        name: string,
        mobileNumber: number,
        location: string,
        emailId: string,
        imageDescription: string,
        quantityDescription: string,
        imageRequirements: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.location = location;
        this.emailId = emailId;
        this.imageDescription = imageDescription;
        this.quantityDescription = quantityDescription;
        this.imageRequirements = imageRequirements;

    }
}
