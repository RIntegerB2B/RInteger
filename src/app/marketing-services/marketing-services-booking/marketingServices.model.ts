export class MarketingServicesBooking {
    mobileNumber: number;
    name: string;
    location: string;
    marketingMedium: Array<string>;
    constructor(
        mobileNumber: number,
        name: string,
        location: string,
    ) {
        this.mobileNumber = mobileNumber;
        this.name = name;
        this.location = location;
    }
}
