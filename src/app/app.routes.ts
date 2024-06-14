import { Routes } from '@angular/router';
import {MainAppComponent} from "./main-app/main-app.component";
import {AuthComponent} from "./auth/auth.component";
import {MainContentWindowComponent} from "./main-app/main-content-window/main-content-window.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'home', component: MainAppComponent, children: [
  {
    path: 'window',

    loadComponent: () => import('./main-app/main-content-window/main-content-window.component').
    then(mod => mod.MainContentWindowComponent),

    loadChildren: () =>
      import('./main-app/main-content-window/main-window.routes').then(
        (mod) => mod.mainWindowRoutes
        )
      }
    ]
  },
  {path: 'auth', component: AuthComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'register'},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]}
];
