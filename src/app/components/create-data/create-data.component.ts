import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-data.component.html',
  styleUrl: './create-data.component.scss',
})
export class CreateDataComponent {
  storeData: any = [];

  constructor(private service: HttpService, private toaster: ToastrService) {}

  userData = new FormGroup({
    name: new FormControl('', [
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

  postDataInApi() {
    const copyUserData = this.userData;
    copyUserData.markAllAsTouched();
    if (copyUserData.valid) {
      this.service.postData(copyUserData.value).subscribe((response) => {
        this.storeData.push(response);
        console.log(this.storeData);
      });
      this.toaster.success('Data Added !', 'Success', { timeOut: 2000 });
      copyUserData.reset();
    }
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
