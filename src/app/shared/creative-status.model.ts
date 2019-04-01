export class CreativeStatus {
    _id: Number;
    mobileNumber: Number;
    bookingOrderId: String;
    bookingDate: String;
    order: Boolean;
    materialPickedUp: Number;
    shootPlanning: Number;
    shootCompleted: Number;
    postProductionWork: Number;
    payment: Number;
    materialReturn: Number;
    constructor(
        mobileNumber: Number,
        bookingDate: String,
        order: Boolean,
        materialPickedUp: Number,
        shootPlanning: Number,
        shootCompleted: Number,
        postProductionWork: Number,
        payment: Number,
        materialReturn: Number

    ) {
        this.mobileNumber = mobileNumber;
        this.bookingDate = bookingDate;
        this.order = order;
        this.materialPickedUp = materialPickedUp;
        this.shootPlanning = shootPlanning;
        this.shootCompleted = shootCompleted;
        this.postProductionWork = postProductionWork;
        this.payment = payment;
        this.materialReturn = materialReturn;
    }
}
