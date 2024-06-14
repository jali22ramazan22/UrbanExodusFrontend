import { Routes } from '@angular/router';


export const shelterRoutes: Routes = [
  {path: '', loadComponent: () => import('./shelter.component').
    then(mod => mod.ShelterComponent)},
]
