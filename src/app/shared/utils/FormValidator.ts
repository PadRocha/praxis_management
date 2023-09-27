import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class FormValidator extends Validators {
  static includeIn<T>(array: T[], property: keyof T): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      return array.some((val) => val[property] === value)
        ? null
        : { include: true };
    }
  }

  static onlyInteger(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      return /^\d+$/.test(value)
        ? null
        : { isNumber: true };
    }
  }

  static onlyFloats(): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors => {
      if (!/^(?:\d*\.\d{1,2}|\d+)$/.test(value)) {
        return { float: true }
      }
      return this.nullValidator;
    }
  }

  static validRange(minor_name: string, mayor_name: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minor = control.get(minor_name);
      const mayor = control.get(mayor_name);
      if (minor?.valid && mayor?.valid && minor.value >= mayor.value) {
        mayor.setErrors({ validRange: true });
        return { validRange: true };
      } else {
        return null;
      }
    }
  }

  static equals(test: string): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      return value === test ? null : { isEqual: true };
    }
  }
}
