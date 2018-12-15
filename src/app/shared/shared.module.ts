import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    OverlayModule
  ],
  declarations: [],
  exports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    OverlayModule
  ]
})
export class SharedModule {}
