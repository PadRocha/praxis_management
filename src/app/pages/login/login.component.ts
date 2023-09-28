import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { ControlsOf } from '@login/models';
import { ToastService } from '@shared/services';

interface Login {
  nickname: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'd-flex flex-column-reverse flex-md-row',
  },
})
export class LoginComponent implements OnInit {
  user_form: FormGroup<ControlsOf<Login>>

  constructor(
    private service: UserService,
    // private toast: ToastService,
  ) {
    this.user_form = new FormGroup<ControlsOf<Login>>({
      nickname: new FormControl('', { validators: Validators.required, nonNullable: true }),
      password: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });
  }

  ngOnInit(): void {
  }

  get validForm(): boolean {
    return !!this.user_form.get('nickname')?.valid && !!this.user_form.get('password')?.valid;
  }

  onSubmit(): void {
    if (!this.validForm) return;
    const params = this.user_form.getRawValue();
    this.service.login(params).subscribe({
      next: (any) => {
        console.log(any);
      },
      error: (err) => {
        console.log("algo pasó");
      }
    }).add(() => {
      console.log("Finalizó");
    });
    // this.service.login(params).subscribe({
    //   next: ({ token }) => {
    //     this.service.setToken(token);
    //     this.service.update();
    //     // this.router.navigate(['/home']);
    //   },
    //   error: () => {
    //     this.toast.show('Login', 'danger');
    //   }
    // });
  }
}