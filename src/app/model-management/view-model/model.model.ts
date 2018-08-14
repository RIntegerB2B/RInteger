export class Model {
    userName: string;
    description: string;
    availability: boolean;
    mobileNumber: Number;
    emailId: string;
    faceBook: string;
    whatsapp: string;
    portfolioImageName: string;
    catalogImageName: string;
    serviceProviderId: string;
    serviceProviderName: string;
    serviceProviderCompanyName: string;
    modelType: string;
    categoryType: string;
    height: string;
    measurements: string;
    shoulder: string;
    shoeSize: string;
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
        height: string,
        measurements: string,
        shoulder: string,
        shoeSize: string) {
        this.userName = userName;
        this.description = description;
        this.availability = availability;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.faceBook = faceBook;
        this.whatsapp = whatsapp;
        this.modelType = modelType;
        this.categoryType = categoryType;
        this.height = height;
        this.measurements = measurements;
        this.shoulder = shoulder;
        this.shoeSize = shoeSize;
    }
}
