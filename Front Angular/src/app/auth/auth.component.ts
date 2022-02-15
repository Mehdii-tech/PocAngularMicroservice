import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@app/_services'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  form:FormGroup;
  isLogin:Boolean;
  fieldTextType:Boolean;
  loading = false;
  submitted = false;

  constructor(private formBuilder:FormBuilder, private route:ActivatedRoute, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
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
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.isLogin ?
    this.authService.login(this.f['email'].value , this.f['password'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                // if (res['token']){
                //     localStorage.setItem('token', res['token'])
                // }
                // console.log('98')
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: (error: any) => {
                // this.alertService.error(error);
                this.loading = false;
            }
        })
    :     
    this.authService.register(this.form.value)
    .pipe(first())
    .subscribe({
        next: () => {
            // if (res['token']){
            //     localStorage.setItem('token', res['token'])
            // }
            // console.log('98')
            // get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
            // this.alertService.error(error);
            this.loading = false;
        }
    }); 
}
}
