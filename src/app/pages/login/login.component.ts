import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { ControlsOf } from '@login/models';
import { ToastService } from '@shared/services';
import { invoke } from '@tauri-apps/api';
import { from } from 'rxjs';

interface Login {
  name: string;
  pass: string;
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
  is_loading: boolean;

  constructor(
    private service: UserService,
    private router: Router,
    private toast: ToastService,
  ) {
    this.user_form = new FormGroup<ControlsOf<Login>>({
      name: new FormControl('', { validators: Validators.required, nonNullable: true }),
      pass: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });
    this.is_loading = false;
    // from(invoke('create_user', { document: { name: "joshua", pass: "123", roles: ['r', 'w', 'x'] } })).subscribe({
    //   next: (test) => {
    //     console.log(test);
    //   }
    // });
  }

  ngOnInit(): void {
  }

  get validForm(): boolean {
    return !!this.user_form.get('name')?.valid && !!this.user_form.get('pass')?.valid;
  }

  onSubmit(): void {
    if (!this.validForm) return;
    this.is_loading = true;
    const params = this.user_form.getRawValue();
    this.service.login(params).subscribe({
      next: (data) => {
        console.log(data);

        this.service.setToken(data._id);
        this.service.update(data);
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.error(e);
        this.toast.show('Login', 'danger');
      }
    }).add(() => {
      this.is_loading = false;
    });
  }
}
