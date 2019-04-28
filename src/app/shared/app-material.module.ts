import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatTooltipModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatSelectModule
  // MatIconRegistry
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
// import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSlideToggleModule,
    MatSelectModule
  ]
})
export class AppMaterialModule {
  // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon(
  //     'thumbs-up',
  //     sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg')
  //   );
  // }
}
