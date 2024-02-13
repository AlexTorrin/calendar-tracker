import { Component } from '@angular/core';
import { DaysService } from './days.service';
import { CommonModule, NgStyle } from '@angular/common';
import { CellComponent } from "./cell/cell.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { Day } from './day';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    imports: [MatButtonModule, MatTooltipModule, CommonModule, CellComponent, NgStyle]
})
export class AppComponent {
    calendar = this.daysService.getDays();
    firstDay = this.daysService.getFirstDay().pipe(
      map((days) => ({ height: (days - 1) * 14 + 'px' }))
    );

    constructor(private daysService: DaysService) {}


    add() {
      this.daysService.add();
    }

    substr() {
      this.daysService.substr();
    }

    trackById(_: number, item: Day) {
      return item.date.getTime() + item.weight;
    }
}
