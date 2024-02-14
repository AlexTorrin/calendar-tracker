import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map, race } from 'rxjs';
import { Day } from './day';
import moment, { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DaysService {
	private update = new BehaviorSubject<boolean>(true);
	private _chosenYear = new BehaviorSubject(new Date().getFullYear());
	chosenYear = combineLatest([this._chosenYear, this.update]).pipe(map(([chosenYear]) => chosenYear));

	constructor() { }

	getDays(): Observable<Day[]> {
		return this.chosenYear.pipe(map((year) => this.mapYearToDays(year)));
	}

	getFirstDay(): Observable<number> {
		return this.chosenYear.pipe(map((year) => moment(`${year}0101`, 'YYYYMMDD').weekday()));
	}

	add() {
		this.weightOperation((v) => v + 1);
	}

	substr() {
		this.weightOperation((v) => v - 1);
	}

	private weightOperation(operation: (val: number) => number) {
		const data = JSON.parse(localStorage.getItem('data') as string) || {};
		const date = moment();
		const year = date.format('YYYY');
		const month = date.format('MM');
		const day = date.format('DD');
		const weight = data?.[year]?.[month]?.[day] || 0;
		if (!data?.[year]) {
			data[year] = {};
		}
		if (!data?.[year]?.[month]) {
			data[year][month] = {};
		}
		const result = operation(weight) < 0 ? 0 : operation(weight);
		data[year][month][day] = result;
		localStorage.setItem('data', JSON.stringify(data));
		this.update.next(true);
	}

	private mapYearToDays(year: number): Day[] {
		const now = moment();
		const startDate = moment(`${year}0101`, 'YYYYMMDD');
		const endDate = moment(`${year + 1}0101`, 'YYYYMMDD');
		const daysInThisYear = endDate.diff(startDate, 'days');
		const diff = now.diff(startDate, 'days');

		const result = new Array(daysInThisYear).fill(new Date()).map(
			(_, index) => {
				const date = moment(startDate).add(index, 'days');
				const weight = this.getWeight(date);
				return {
					date: date.toDate(),
					weight: weight, 
					inPast: index - 1 < diff,
					tooltip: `${date.format('YYYY.MM.DD')} - ${weight}`,
				}
			}
		);
		
		return result;
	}

	private getWeight(date: Moment): number {
		const year = date.format('YYYY');
		const month = date.format('MM');
		const day = date.format('DD');

		// localStorage.setItem('data', JSON.stringify(data));
		const data = JSON.parse(localStorage.getItem('data') as string);

		return data?.[year]?.[month]?.[day] || 0;
	}
}

// const data: any = {
// 	'2024': {
// 		'02': {
// 			'10': 5,
// 			'11': 2,
// 			'12': 2,
// 			'13': 3,
// 		}
// 	}
// }