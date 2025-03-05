import { Component, ElementRef, ViewChild, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Papa from 'papaparse';
import { createApplication } from '@angular/platform-browser';
import 'zone.js';

interface CsvData {
  data: string[][];
  headers: string[];
}

@Component({
  selector: 'app-csv-viewer',
  templateUrl: './csv-viewer.component.html',
  styleUrls: ['./csv-viewer.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CsvViewerComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  csvData: CsvData | null = null;
  fileName: string = '';

  constructor(private ngZone: NgZone) {}

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    this.fileName = file.name;

    Papa.parse(file, {
      complete: (result) => {
        this.ngZone.run(() => {
          const headers = result.data[0] as string[];
          const data = result.data.slice(1) as string[][];
          
          this.csvData = { data, headers };
          
          window.dispatchEvent(new CustomEvent('csvData', { 
            detail: {
              data: this.csvData.data,
              headers: this.csvData.headers,
              fileName: this.fileName,
              source: 'angular'
            }
          }));
        });
      },
      header: false,
    });
  }

  selectedRow: number | null = null;

  ngOnInit() {
    window.addEventListener('rowSelected', this.handleRowSelected as EventListener);
  }

  ngOnDestroy() {
    window.removeEventListener('rowSelected', this.handleRowSelected as EventListener);
  }

  private handleRowSelected = (event: CustomEvent) => {
    const { rowIndex, target } = event.detail;
    if (target === 'angular') {
      this.ngZone.run(() => {
        this.selectedRow = rowIndex;
      });
    }
  };
}

// Add static mount method for Module Federation
export const mount = async (element: HTMLElement) => {
  const app = await createApplication({
    providers: []
  });
  
  const componentRef = app.bootstrap(CsvViewerComponent, element);
  
  return () => {
    componentRef.destroy();
    app.destroy();
  };
};

export default { mount };