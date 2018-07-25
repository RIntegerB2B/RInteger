export class Status {
    _id: Number;
    mobileNumber: Number;
    bookingId: Number;
    bookingDate: String;
    order: Boolean;
    materialPickedUp: Boolean;
    shootCompleted: Boolean;
    imageEditing: Boolean;
    delivery: Boolean;
    payment: Boolean;
    materialReturn: Boolean;
    constructor(
        _id: Number,
        mobileNumber: Number,
        bookingId: Number,
        bookingDate: String,
        order: Boolean,
        materialPickedUp: Boolean,
        shootCompleted: Boolean,
        imageEditing: Boolean,
        delivery: Boolean,
        payment: Boolean,
        materialReturn: Boolean
    ) {
        this._id = _id;
        this.mobileNumber = mobileNumber;
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.order = order;
        this.materialPickedUp = materialPickedUp;
        this.shootCompleted = shootCompleted;
        this.imageEditing = imageEditing;
        this.delivery = delivery;
        this.payment = payment;
        this.materialReturn = materialReturn;
    }
}
