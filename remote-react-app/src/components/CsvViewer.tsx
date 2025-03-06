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
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add event listener for row selection
  useEffect(() => {
    const handleRowSelected = (event: CustomEvent) => {
      const { rowIndex, target } = event.detail;
      if (target === 'react') {
        setSelectedRow(rowIndex);
      }
    };

    window.addEventListener('rowSelected', handleRowSelected as EventListener);
    return () => {
      window.removeEventListener('rowSelected', handleRowSelected as EventListener);
    };
  }, []);

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
      window.dispatchEvent(new CustomEvent('csvData', { 
        detail: {
          data: csvData.data,
          headers: csvData.headers,
          fileName: fileName,
          source: 'react'
        }
      }));
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
          {csvData.data.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  {csvData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.data.map((row, index) => (
                  <tr 
                    key={index}
                    style={{ 
                      backgroundColor: selectedRow === index ? '#e6f3ff' : undefined 
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedRow !== null && csvData.data[selectedRow] && (
            <p>Selected {selectedRow + 1} row, values are: {csvData.data[selectedRow].join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CsvViewer;