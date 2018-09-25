export class ImageEditing {
    bookingOrderId: string;
    bookingStatus: number;
    mobileNumber: number;
    name: string;
    imageDescription: string;
    quantityDescription: string;
    imageRequirements: string;
    location: string;
    constructor(
        name: string,
        mobileNumber: number,
        location: string,
        imageDescription: string,
        quantityDescription: string,
        imageRequirements: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.location = location;
        this.imageDescription = imageDescription;
        this.quantityDescription = quantityDescription;
        this.imageRequirements = imageRequirements;

    }
}
