import { Injectable, ElementRef, Component, ComponentRef } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private overlay: Overlay) {}

  private createOverlayConfig(elementRef: ElementRef): OverlayConfig {
    // Configuration for the overlay component
    // Note that we want the overlay ref to be able to be closed
    // when backdrop is clicked, but we don't want it to be displayed
    // so we set hasBackdrop to true and backdrop class to transperant
    return {
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(elementRef)
        .withPositions([{ originX: 'end', originY: 'bottom', overlayX: 'center', overlayY: 'top' }])
    };
  }

  createOverlay<T>(
    elementRef: ElementRef<T>,
    component: ComponentType<T>
  ): {
    overlayRef: OverlayRef;
    componentRef: ComponentRef<T>;
  } {
    const overlayRef = this.overlay.create(this.createOverlayConfig(elementRef));

    const componentPortal = new ComponentPortal<T>(component);

    const componentRef: ComponentRef<T> = overlayRef.attach(componentPortal);

    // Dispose the overlay ref if the backdrop is clicked
    overlayRef.backdropClick().subscribe(click => {
      overlayRef.dispose();
    });

    // to subscribe to internal events
    // compRef.instance.someEvent.subscribe(event => {
    //   do something with the event
    //   overlayRef.dispose();
    // });

    return {
      overlayRef,
      componentRef
    };
  }
}
