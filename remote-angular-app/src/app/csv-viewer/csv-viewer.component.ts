import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class CsvViewerComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  csvData: CsvData | null = null;
  fileName: string = '';

  constructor() {}

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
        // Extract headers from the first row
        const headers = result.data[0] as string[];
        // Remove the header row from the data
        const data = result.data.slice(1) as string[][];
        
        this.csvData = { data, headers };
        
        // Send the CSV data to the parent window
        window.parent.postMessage({
          type: 'csvData',
          payload: {
            data: this.csvData.data,
            headers: this.csvData.headers,
            fileName: this.fileName,
            source: 'angular'
          }
        }, '*');  // In production, replace '*' with your parent window's origin
      },
      header: false,
    });
  }
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