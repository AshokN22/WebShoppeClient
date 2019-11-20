import { NgModule } from '@angular/core';

import {
  MatButtonModule, 
  MatToolbarModule, 
  MatSidenavModule,
  MatBadgeModule,
  MatIconModule,
  MatGridListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

import {
  MatTableModule
} from '@angular/material/table';

var MatModule =[
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatBadgeModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule,
  MatDialogModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [
    MatModule
  ],
  exports:[
    MatModule
  ]
})
export class MaterialModule { }
