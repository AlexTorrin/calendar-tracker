import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './cell.component.less'
})
export class CellComponent implements OnInit {
	@Input() weight: number = 0;
	@Input() @HostBinding('class.level-disabled') inFuture: boolean = false;

	@HostBinding('class.level-zero') levelZero: boolean = true;
	@HostBinding('class.level-one') levelOne: boolean = false;
	@HostBinding('class.level-two') levelTwo: boolean = false;
	@HostBinding('class.level-three') levelThree: boolean = false;
	@HostBinding('class.level-four') levelFour: boolean = false;

	ngOnInit(): void {
		this.levelZero = this.weight === 0;
		this.levelOne = this.weight >= 1;
		this.levelTwo = this.weight >= 2;
		this.levelThree = this.weight >= 3;
		this.levelFour = this.weight >= 5;
	}
}
