import { Component } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private darkTheme$: Observable<boolean>;

  constructor(private theme: ThemeService) {
    this.darkTheme$ = this.theme.darkTheme$;
  }
}
