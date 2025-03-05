import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';

interface CsvData {
  data: string[][];
  headers: string[];
}

@Component({
  selector: 'app-csv-viewer',
  templateUrl: './csv-viewer.component.html',
  styleUrls: ['./csv-viewer.component.scss']
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
        
        // Expose the CSV data to the parent application
        (window as any).angularCsvData = {
          data: this.csvData.data,
          headers: this.csvData.headers,
          fileName: this.fileName,
          source: 'angular'
        };
      },
      header: false,
    });
  }
}