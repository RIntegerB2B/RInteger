export class Notification {
    userSubscriptions: Object;
    mobileNumber: Number;
    constructor(
        userSubscriptions: Number,
        mobileNumber: Number
    ) {
        this.userSubscriptions = userSubscriptions;
        this.mobileNumber = mobileNumber;
    }
}
