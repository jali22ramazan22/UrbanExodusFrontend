import { Routes } from '@angular/router';
export const marketRoutes: Routes = [
  {path: '', redirectTo: 'buy', pathMatch: 'full'},
  {path: 'buy', loadComponent: () => import('./buy/buy.component').then(mod => mod.BuyComponent)},
  {path: 'sell', loadComponent: () => import('./sell/sell.component').then(mod => mod.SellComponent)},
]
