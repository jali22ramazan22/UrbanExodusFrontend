import { Routes } from '@angular/router';

export const personalRoutes: Routes = [
  {path: '', redirectTo: 'quests', pathMatch: 'full'},
      {path: 'wallet', loadComponent: () =>
        import('./wallet/wallet.component').then(mod => mod.WalletComponent)
          },
      {path: 'skills', loadComponent: () =>
        import('./skills/skills.component').then(mod => mod.SkillsComponent)
      },
      {path: 'quests',
        loadComponent: () =>
          import('./quests/quests.component').then(mod => mod.QuestsComponent),
      },
      {path: 'profile', loadComponent: () =>
        import('./profile/profile.component').then(mod => mod.ProfileComponent)},
      {path: 'inventory', loadComponent: () =>
        import('./inventory/inventory.component').then(mod => mod.InventoryComponent)},

]
