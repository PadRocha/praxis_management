import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services';
import { ILogin } from '@login/models';
import { ToastService } from '@shared/services';
import { invoke } from '@tauri-apps/api';
import { from } from 'rxjs';

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
  user_form: FormGroup<ILogin>
  is_loading: boolean;

  constructor(
    private service: UserService,
    private router: Router,
    private toast: ToastService,
  ) {
    this.user_form = new FormGroup<ILogin>({
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
    // const document = {
    //   name: 'Rayzen 7',
    //   price: 2700.00,
    //   year: 2023,
    //   kind: 'laptop'
    // };
    // const document = {
    //   name: '4GB',
    //   price: 0,
    //   kind: 'ram',
    //   visible: true
    // }
    const document = {
      name: '512GB',
      price: 180.00,
      kind: 'ssd',
      visible: true
    }
    // const document = {
    //   equipment: '202302948',
    //   project_key: '65412f920948081e0ccde46b',
    //   manager: 'Ana Laura Rodríguez Gómez',
    //   id_resource: 'LOGW',
    //   resource_name: 'Areanne Nayeli López Guerra',
    //   permissions: true,
    //   delivery_date: '2023-11-09',
    //   delivery_location: 'CDMX',
    //   status: 'activo',
    //   company_name: 'HAYKUN SISTEMAS, S.A. DE C.V.',
    //   envoy: false,
    //   device: {
    //     hardware: '65455cddf8816e7ca3b2b210',
    //     // gadget: 'laptop',
    //     modified_by: 'GZMJ',
    //     so: '6541351ceb38b216f4ff6f7e',
    //     ram: [
    //       {
    //         id: '654d2980992c41509284316d',
    //         unit: 2
    //       },
    //       {
    //         id: '654d2a85111b81f4090f8077',
    //         unit: 1
    //       }
    //     ],
    //     hard_drive: '512 GB SSD',
    //     // processor: 'Ryzen 7',
    //     brand: 'Lenovo',
    //     model: 'V14 G2',
    //     serial_number: 'PF3L475K',
    //     programs: [
    //       {
    //         // Office 365 E3
    //         software: '65413be3fb1af984c6aff760',
    //         unit: 1,
    //         monthly: true
    //       },
    //       {
    //         // Bitdefender
    //         software: '65413cf59a14ddc2fc1287c8',
    //         unit: 1,
    //         monthly: false
    //       },
    //       {
    //         // Project Std 2016
    //         software: '65413d099a14ddc2fc1287c9',
    //         unit: 1,
    //         monthly: true
    //       },
    //       {
    //         // Visio Std 2016
    //         software: '65413d9e3e37e44fb2abc4e1',
    //         unit: 1,
    //         monthly: true
    //       },
    //     ]
    //   }
    // };
    from(invoke('create_hardware', { document })).subscribe({
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
