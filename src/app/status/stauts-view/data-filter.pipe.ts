import { PipeTransform , Pipe} from '@angular/core';
import {BookingDetail} from './booking-detail.model';

@Pipe(
    { name: 'dataFilter' }
)

export  class DataFilter implements PipeTransform {
    transform(detail: BookingDetail[], searchText: string): BookingDetail[] {
        if (!detail || !searchText) {
return detail;
        }
  return detail.filter(data => data.bookingType.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

  }
}

