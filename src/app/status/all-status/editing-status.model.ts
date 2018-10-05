export class EditingStatus {
    _id: Number;
    mobileNumber: Number;
    bookingId: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    imageReceived: Number;
    editing: Number;
    imageDelivery: Number;
    payment: Number;
    constructor(
        mobileNumber: Number,
        bookingId: Number,
        bookingDate: String,
        order: Boolean,
        imageReceived: Number,
        editing: Number,
        imageDelivery: Number,
        payment: Number,
    ) {
        this.mobileNumber = mobileNumber;
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.order = order;
        this.imageReceived = imageReceived;
        this.editing = editing;
        this.imageDelivery = imageDelivery;
        this.payment = payment;
    }
}
