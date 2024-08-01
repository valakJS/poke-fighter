import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FightComponent } from './fight/fight.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'figth',
    pathMatch: 'full'
  },
  {
    path: 'figth',
    component: FightComponent,
  }
];

@NgModule({
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class AppRoutingModule { }
