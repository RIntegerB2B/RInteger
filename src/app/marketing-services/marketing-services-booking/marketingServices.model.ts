export class MarketingServicesBooking {
    mobileNumber: number;
    name: string;
    location: string;
    emailId: string;
    marketingMedium: Array<string>;
    constructor(
        mobileNumber: number,
        name: string,
        location: string,
        emailId: string
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.emailId = emailId;
        this.location = location;
    }
}
