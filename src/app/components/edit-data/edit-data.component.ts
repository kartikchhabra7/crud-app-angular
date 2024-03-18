import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-edit-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-data.component.html',
  styleUrl: './edit-data.component.scss',
})
export class EditDataComponent {
  item: any = [];

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.service.getById(itemId).subscribe((data: any) => {
        this.item = data;

        this.userData.patchValue({
          id: this.item.id,
          name: this.item.name,
          email: this.item.email,
          contactNumber: this.item.contactNumber,
          password: this.item.password,
          profile: this.item.profile,
        });
      });
    }
  }

  storeData: any = [];

  constructor(
    private service: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  userData = new FormGroup({
    id: new FormControl(),
    name: new FormControl(this.item, [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,15}$'
      ),
    ]),
    profile: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  updatedData(data: any) {
    const id = data.id;
    const copyUserData = this.userData;
    copyUserData.markAllAsTouched();
    if (copyUserData.valid) {
      this.service.updateById(id, data).subscribe((response) => {
        
      });
      // copyUserData.reset();
      this.toaster.info('Data Updated!', 'Success', { timeOut: 1500 });
    }
  }

  goToBackPath() {
    this.router.navigate(['/show-data']);
  }
  getErrorMessage(
    controlName: string,
    requiredErrorMessage?: string,
    minLength?: number,
    maxLength?: number
  ) {
    const control = this.userData.get(controlName);

    if (control?.invalid && control?.touched) {
      if (control?.hasError('required')) {
        return requiredErrorMessage;
      }
      if (control?.hasError('minlength')) {
        return `Minimum length is ${minLength} characters`;
      }
      if (control?.hasError('maxlength')) {
        return `Maximum Length is ${maxLength} characters`;
      }
      if (control?.hasError('pattern')) {
        return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 5 and 15 characters long';
      }
      if (control?.hasError('email')) {
        return 'Please Enter a Valid Email Format';
      }
    }
    return '';
  }
}
