import { Routes } from '@angular/router';

export const mainWindowRoutes: Routes = [
  {path: '', children: [
      {path: 'personal', loadComponent: () => import('./personal/personal.component').then((mod) => mod.PersonalComponent), loadChildren: () =>
          import('./personal/personal.routes').then(
            (mod) => mod.personalRoutes
          )
      },
      {path: 'network', loadComponent: () => import('./network/network.component').then((mod) => mod.NetworkComponent), loadChildren: () =>
          import('./network/network.routes').then(
            (mod) => mod.networkRoutes
          )
      },
      {path: 'market', loadComponent: () => import('./market/market.component').then((mod) => mod.MarketComponent), loadChildren: () =>
          import('./market/market.routes').then(
            (mod) => mod.marketRoutes
          )
      },
      {path: 'exchange', loadComponent: () => import('./exchange/exchange.component').then((mod) => mod.ExchangeComponent), loadChildren: () =>
          import('./exchange/exchange.routes').then(
            (mod) => mod.exchangeRoutes
          )
      },
      {path: 'shelter', loadComponent: () => import('./shelter/shelter.component').then((mod) => mod.ShelterComponent), loadChildren: () =>
          import('./shelter/shelter.routes').then(
            (mod) => mod.shelterRoutes
          )
      }
    ]}
];
