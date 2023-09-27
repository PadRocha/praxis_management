import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormValidator } from '@shared/utils/FormValidator';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  action!: 'remover' | 'resetear' | 'eliminar' | 'actualizar' | 'guardar' | 'editar';
  confirm_word!: string;
  type!: string;
  confirm_form: FormControl<string>;

  constructor(
    private modal: NgbActiveModal,
  ) {
    this.confirm_form = new FormControl('', { validators: FormValidator.required, nonNullable: true })
  }

  ngOnInit(): void {
    this.confirm_form.addValidators(FormValidator.equals(this.confirm_word));
  }

  get disable() {
    return this.confirm_form.invalid;
  }

  get textButton() {
    return this.action + ' ' + this.type;
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.modal.dismiss('cancel');
  }

  close(): void {
    this.modal.dismiss('close');
  }

  cancel(): void {
    this.modal.dismiss('cancel');
  }

  onSubmit(): void {
    this.modal.close(true);
  }
}
