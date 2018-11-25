import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
  ],
  declarations: [],
  exports: [
    NativeScriptCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
  ]
})
export class SharedModule {}
