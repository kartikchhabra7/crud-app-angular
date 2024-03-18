import { Routes } from '@angular/router';

import { ShowDataComponent } from './components/show-data/show-data.component';
import { CreateDataComponent } from './components/create-data/create-data.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditDataComponent } from './components/edit-data/edit-data.component';

export const routes: Routes = [
  { path: '', component: CreateDataComponent },
  { path: 'show-data', component: ShowDataComponent },
  {
    path: 'edit/:id',
    component: EditDataComponent,
  },

  { path: 'edit', redirectTo: 'show-data', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
