export class ITServicesBooking {
    mobileNumber: number;
    name: string;
    location: string;
    emailId: string;
    services: Array<string>;
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
