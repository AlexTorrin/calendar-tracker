import { Component } from '@angular/core';
import { DaysService } from './days.service';
import { CommonModule, NgStyle } from '@angular/common';
import { CellComponent } from "./cell/cell.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { Day } from './day';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [MatTooltipModule, CommonModule, CellComponent, NgStyle]
})
export class AppComponent {
    calendar = this.daysService.getDays();
    firstDay = this.daysService.getFirstDay().pipe(
      map((days) => ({ height: (days - 1) * 14 + 'px' }))
    );

    constructor(private daysService: DaysService) {}

    trackById(_: number, item: Day) {
      return item.date.getTime() + item.weight;
    }

    addOnDay(event: Event, date: Date) {
      event.preventDefault();
      this.daysService.add(date); 
    }

    substrOnDay(event: Event, date: Date) {
      event.preventDefault();
      this.daysService.substr(date);
    }
}
