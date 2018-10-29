export class CustomerQuery {
    mobileNumber: number;
    name: string;
    message: string;
    emailId: string;
    isHandled: string;
    constructor(
        name: string,
        mobileNumber: number ,
        emailId: string,
        message: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.message = message;

    }
}
