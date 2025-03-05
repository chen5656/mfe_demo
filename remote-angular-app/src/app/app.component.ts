import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CsvViewerComponent } from './csv-viewer/csv-viewer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CsvViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'remote-angular-app';
}
