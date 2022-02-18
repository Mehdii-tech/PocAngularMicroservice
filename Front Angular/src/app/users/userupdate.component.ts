import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService,AlertService } from '@app/_services';
import { first } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './userupdate.component.html',

})
export class UserUpdateComponent implements OnInit {
    form: FormGroup;
    id: string;
    loading = false;
    submitted = false;
     users: any;
  
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AuthService,
        private alertService: AlertService
    ) {}
  
    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      console.log(this.id, '9')
      // this.isAddMode = !this.id;
      
      // values not required in edit mode
      // if (this.isAddMode) {
      //     Validator.push(Validators.required);
      // }
  
      this.form = this.formBuilder.group({
          firstname: ['' ,Validators.minLength(3)],
          lastname: ['', Validators.minLength(2)],
          email: ['', [Validators.minLength(6), Validators.email]],
          password: ['',Validators.minLength(6)],
          role: ['',Validators.minLength(4)],
      });

  
      // if (!this.isAddMode) {
          this.accountService.getById(this.id)
              .pipe(first())
              .subscribe((user:any )=>{this.form.patchValue([user]),
                  this.users=Object.keys(user).map(function(personNamedIndex){
                      let yes = user[personNamedIndex];
                      return yes 
              })},err=>{
                  console.log(err)
              })
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  onSubmit() {
      this.submitted = true;
  
      // reset alerts on submit
      this.alertService.clear();
  
      // stop here if form is invalid
      if (this.form.invalid) {
        console.log('pasbueno')
          return;
      }
      console.log(this.form.value, this.id)
      this.loading = true;
      this.accountService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Update successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  console.log(error)
                  this.loading = false;
              }
          });
  
    }
  
  }
  
