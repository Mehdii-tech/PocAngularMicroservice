import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthLoginComponent } from './auth/auth-login.component';
import { AuthRegisterComponent } from './auth/auth-register.component';
import { UsersComponent } from './users/users.component';
import { UserUpdateComponent } from './users/userupdate.component';
import { AuthGuard } from './_helpers.ts/auth.guard';


const routes: Routes = [

        { path: 'auth/login', component: AuthLoginComponent },
        { path: 'auth/register', component:AuthRegisterComponent},
  { path: '', component: UsersComponent, canActivate:[AuthGuard],
    },
        { path: 'edit/:id', component: UserUpdateComponent,canActivate:[AuthGuard] },
        // { path: 'add', component: AddComponent},
    
 
  
  // otherwise redirect to home
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
