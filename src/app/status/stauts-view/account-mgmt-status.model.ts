import { MonthlyPlan } from './monthlyplan.model';
import {WeeklyPlan} from './weeklyplan.model';
import {DailyPlan} from './dailplan.model';

export class DigitalMgmtStatus {
    bookingOrderId: string;
   monthName: string;
   year: string;
   monthlyPlan: [MonthlyPlan];
   weeklyPlan: [WeeklyPlan];
   dailyPlan: [DailyPlan];
}
