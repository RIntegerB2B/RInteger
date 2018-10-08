export class RegistrationStatus {
    _id: Number;
    mobileNumber: Number;
    bookingId: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    documentsRequired: Number;
    accountCreation: Number;
    brandRegistration: Number;
    account_brandVerification: Number;
    accountActivation: Number;
    detailsForwarding: Number;
    payment: Number;
    constructor(
        mobileNumber: Number,
        bookingId: Number,
        bookingDate: String,
        order: Boolean,
        documentsRequired: Number,
        accountCreation: Number,
        brandRegistration: Number,
        account_brandVerification: Number,
        accountActivation: Number,
        detailsForwarding: Number,
        payment: Number,
    ) {
        this.mobileNumber = mobileNumber;
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.order = order;
        this.documentsRequired = documentsRequired;
        this.accountCreation = accountCreation;
        this.brandRegistration = brandRegistration;
        this.account_brandVerification = account_brandVerification;
        this.accountActivation = accountActivation;
        this.detailsForwarding = detailsForwarding;
        this.payment = payment;
    }
}
