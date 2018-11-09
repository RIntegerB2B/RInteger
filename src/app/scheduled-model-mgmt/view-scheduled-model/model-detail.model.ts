export class Model {
    _id: string;
    userName: string;
    description: string;
    availability: boolean;
    mobileNumber: Number;
    emailId: string;
    faceBook: string;
    whatsapp: string;
    primeImage: string;
    ecommerceImageName: [string];
    productImageName: [string];
    portraitImageName: [string];
    porFolioImageName: [string];
    serviceProviderId: string;
    serviceProviderName: string;
    serviceProviderCompanyName: string;
    modelType: string;
    categoryType: string;
    height: string;
    bust: string;
    chest: string;
    waist: string;
    hips: string;
    hair: string;
    eyes: string;
    shoulder: string;
    shoeSize: string;
    topsize: string;
    bottomsize: string;
    isScheduledBooking: boolean;
    scheduledDate: string;
    constructor(
        userName: string,
        description: string,
        availability: boolean,
        mobileNumber: Number,
        emailId: string,
        faceBook: string,
        whatsapp: string,
        modelType: string,
        categoryType: string,
       ) {
        this.userName = userName;
        this.description = description;
        this.availability = availability;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.faceBook = faceBook;
        this.whatsapp = whatsapp;
        this.modelType = modelType;
        this.categoryType = categoryType;
    }
}
