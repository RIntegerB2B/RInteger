export class RegistrationBooking {
    mobileNumber: number;
    name: string;
    location: string;
    b2bNational: Array<string>;
    b2bInterNational: Array<string>;
    b2cNational: Array<string>;
    b2cInterNational: Array<string>;
    socialMedia: Array<string>;
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
