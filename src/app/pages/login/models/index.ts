import { FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T extends Record<any, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
  ? FormGroup<ControlsOf<T[K]>>
  : FormControl<T[K]>;
}

export interface Login {
  name: string;
  pass: string;
}

export type ILogin = ControlsOf<Login>;