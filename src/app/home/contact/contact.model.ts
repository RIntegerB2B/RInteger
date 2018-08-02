export class CustomerQuery {
    mobileNumber: number;
    name: string;
    message: string;
    constructor(
        name: string,
        mobileNumber: number ,
        message: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.message = message;

    }
}
