import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService,AlertService } from '@app/_services';
import { first } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

})
export class UsersComponent implements OnInit {
  users=null;
  loading = false;
  constructor(private authService:AuthService, private alertService:AlertService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getAll()
    .pipe(first())
    .subscribe((user) => {
        this.users=user

    console.log(this.users,'8')
    },err=>{
        console.log(err)
    })
    
  }
  logout() {
    this.authService.logout();
  }
  deleteUser(id: string) {
    this.alertService.clear();
    this.loading = true;
    const p = this.users?._embedded.utilisateurs.find(x => x.id === id);
    p.isDeleting = true;
    // console.log('87')
    this.authService.delete(id)
        .pipe(first())
        .subscribe({
            next: () => {
                this.users?._embedded.utilisateurs.filter(x => x.id !== id)
                this.alertService.success('Delete successful', { keepAfterRouteChange: true });
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}
}
