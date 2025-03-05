import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import styles from './CsvViewer.module.css';

interface CsvData {
  data: string[][];
  headers: string[];
}

const CsvViewer = () => {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      complete: (result) => {
        // Extract headers from the first row
        const headers = result.data[0] as string[];
        // Remove the header row from the data
        const data = result.data.slice(1) as string[][];
        
        setCsvData({ data, headers });
      },
      header: false,
    });
  };

  // Expose the CSV data to the parent application
  useEffect(() => {
    if (csvData) {
      // @ts-ignore - This is for Module Federation communication
      window.reactCsvData = {
        data: csvData.data,
        headers: csvData.headers,
        fileName: fileName,
        source: 'react'
      };
    }
  }, [csvData, fileName]);

  return (
    <div className={styles.csvViewer}>
      <h2 className={styles.title}>React CSV Viewer</h2>
      <div className={styles.fileUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button 
          className={styles.uploadButton}
          onClick={() => fileInputRef.current?.click()}
        >
          Select CSV File
        </button>
        {fileName && <span className={styles.fileName}>{fileName}</span>}
      </div>

      {csvData && (
        <div className={styles.csvPreview}>
          <h3 className={styles.previewTitle}>Preview:</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                {csvData.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.data.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {csvData.data.length > 5 && (
            <p className={styles.rowCount}>
              Showing 5 of {csvData.data.length} rows
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CsvViewer;