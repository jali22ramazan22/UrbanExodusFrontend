import { Routes } from '@angular/router';

export const networkRoutes: Routes = [
  {path: 'anonymous', loadComponent: () => import('./anonymous/anonymous.component').then(mod => mod.AnonymousComponent)},
  {path: 'news', loadComponent: () => import('./news/news.component').then(mod => mod.NewsComponent)},
]
