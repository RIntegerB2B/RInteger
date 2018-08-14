export class ServiceProviders {
    Id: string;
    userName: string;
    password: string;
    companyName: string;
    emailId: string;
    mobileNumber: Number;
    website: string;
    location: string;
    isActive: Boolean;
    constructor(
        userName: string,
    companyName: string,
    emailId: string,
    mobileNumber: Number,
    website: string,
    location: string,
    password: string) {
        this.userName = userName;
        this.companyName = companyName;
        this.emailId = emailId;
        this.mobileNumber = mobileNumber;
        this.website = website;
        this.location = location;
        this.password = password;
    }
}
