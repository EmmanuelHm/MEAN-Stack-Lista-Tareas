import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { ListTaskComponent } from './components/task/list-task/list-task.component';
// AuthGuard
import { AuthGuard } from "./guard/auth.guard";


const routes: Routes = [
  {
    path: '', 
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ListTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
