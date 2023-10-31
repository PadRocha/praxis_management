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
    // const document = {
    //   key: 'VW2301-KPAYMANT',
    //   client: 'VOLKSWAGEN',
    //   und: 'UND1'
    // };
    // const document = {
    //   name: 'Std 2016',
    //   price: 800,
    //   kind: 'visio',
    // }
    const document = {
      equipment: '202302948',
      project_key: 'VW2301-KPAYMANT',
      manager: 'Ana Laura Rodríguez Gómez',
      id_resource: 'LOGW',
      resource_name: 'Areanne Nayeli López Guerra',
      permissions: true,
      delivery_date: new Date().toUTCString(),
      delivery_location: 'CDMX',
      status: 'activo',
      company_name: 'HAYKUN SISTEMAS, S.A. DE C.V.',
      envoy: false,
      device: {
        gadget: 'laptop',
        modified_by: 'GZMJ',
        so: '6541351ceb38b216f4ff6f7e',
        ram: 16,
        hard_drive: '512 GB SSD',
        processor: 'Ryzen 7',
        brand: 'Lenovo',
        model: 'V14 G2',
        serial_number: 'PF3L475K',
        programs: [
          {
            // Office 365 E3
            software: '65413be3fb1af984c6aff760',
            unit: 1,
            monthly: true
          },
          {
            // Bitdefender
            software: '65413cf59a14ddc2fc1287c8',
            unit: 1,
            monthly: false
          },
          {
            // Project Std 2016
            software: '65413d099a14ddc2fc1287c9',
            unit: 1,
            monthly: true
          },
          {
            // Visio Std 2016
            software: '65413d9e3e37e44fb2abc4e1',
            unit: 1,
            monthly: true
          },
        ]
      }
    };
    from(invoke('create_responsive_letter', { document })).subscribe({
      next: (test) => {
        console.log(test);
      }
    });
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
