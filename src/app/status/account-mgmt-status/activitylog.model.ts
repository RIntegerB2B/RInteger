import { MonthlyPlan } from './monthplan.model';
import {WeeklyPlan} from './weeklyplan.model';
import {DailyPlan} from './dailyplan.model';

export class DigitalMgmtStatus {
    bookingOrderId: string;
   monthName: string;
   year: string;
   monthlyPlan: [MonthlyPlan];
   weeklyPlan: [WeeklyPlan];
   dailyPlan: [DailyPlan];
}
