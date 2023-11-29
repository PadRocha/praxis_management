import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgStyle, NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.scss'],
    host: {
        class: 'input-group input-group-sm position-relative w-auto dropup',
    },
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, NgStyle, NgIf, NgFor]
})
export class InputSelectComponent {
  _form!: FormControl<any>;
  input_number_on: boolean;
  @Input()
  set form(form: FormControl<any> | null) {
    this._form = !!form ? form : new FormControl();
  }
  @Input()
  list!: (string | number)[];
  @Input()
  type: string;
  @Input()
  width: string;
  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  constructor() {
    this.input_number_on = false;
    this.type = 'text';
    this.width = '11.0625';
  }

  get class() {
    return {
      'rounded-top-0': this.input_number_on,
    };
  }

  @HostListener('mouseleave')
  inputOff(): void {
    this.input_number_on = false;
  }

  toggle(): void {
    this.input_number_on = !this.input_number_on;
  }

  set value(value: string | number) {
    this._form.setValue(value);
  }

  blur() {
    this.input.nativeElement.blur();
  }
}
