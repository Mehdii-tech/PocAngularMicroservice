import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService, AlertService } from '@app/_services'
import { User } from '@app/_dto';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-register.component.html'
})
export class AuthRegisterComponent implements OnInit {

  form:FormGroup;
  fieldTextType:Boolean;
  loading = false;
  submitted = false;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute, private router:Router, private authService:AuthService, private alertService:AlertService) {         if (this.authService.userValue) {
    this.router.navigate(['/']);
}}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
  });
  
  }

  get f() { return this.form.controls; }
  
  toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
  }
  

  onSubmit() {
    this.submitted = true;

    console.log(this.form.value, 'les valeurs')

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
  
    this.authService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                // if (res['token']){
                //     localStorage.setItem('token', res['token'])
                // }
                this.alertService.success('Welcome!', { keepAfterRouteChange: true });
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
                this.router.navigateByUrl(returnUrl);
            },
            error: (error: any) => {
                this.alertService.error(error);
                this.loading = false;
            }
        })
      

}
}