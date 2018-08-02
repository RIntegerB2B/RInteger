export class Send {
    mobileNumber: number;
    name: string;
    typeYourMessage: string;
    constructor(
        name: string,
        mobileNumber: number ,
        typeYourMessage: string
) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.typeYourMessage = typeYourMessage;

    }
}
