import { useState, useEffect } from 'react';
import './TabView.css';

interface CsvDataType {
  data: string[][];
  headers: string[];
  fileName: string;
  source: string;
}

const TabView = () => {
  const [activeTab, setActiveTab] = useState<string>('react');
  const [reactCsvData, setReactCsvData] = useState<CsvDataType | null>(null);
  const [angularCsvData, setAngularCsvData] = useState<CsvDataType | null>(null);
  const [pollingCount, setPollingCount] = useState<number>(0);

  useEffect(() => {
    // Poll for data from remote apps
    const interval = setInterval(() => {
      // Check for React data
      try {
        // @ts-ignore - This is for Module Federation communication
        if (window.reactCsvData) {
          // @ts-ignore
          setReactCsvData(window.reactCsvData);
        }
      } catch (error) {
        console.error('Error accessing React CSV data:', error);
      }
      
      // Check for Angular data
      try {
        // @ts-ignore - This is for Module Federation communication
        if (window.angularCsvData) {
          // @ts-ignore
          setAngularCsvData(window.angularCsvData);
        }
      } catch (error) {
        console.error('Error accessing Angular CSV data:', error);
      }

      setPollingCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderCsvTable = (csvData: CsvDataType | null) => {
    if (!csvData) {
      return (
        <div className="no-data-message">
          <p>No data available. Please upload a CSV file in the remote app.</p>
          <p className="polling-info">Polling for data... ({pollingCount})</p>
        </div>
      );
    }

    return (
      <div className="csv-table-container">
        <h3>{csvData.fileName}</h3>
        <table className="csv-table">
          <thead>
            <tr>
              {csvData.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="tab-view">
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === 'react' ? 'active' : ''}`}
          onClick={() => setActiveTab('react')}
        >
          React CSV Data {reactCsvData?.fileName ? `(${reactCsvData.fileName})` : ''}
        </button>
        <button
          className={`tab-button ${activeTab === 'angular' ? 'active' : ''}`}
          onClick={() => setActiveTab('angular')}
        >
          Angular CSV Data {angularCsvData?.fileName ? `(${angularCsvData.fileName})` : ''}
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'react' && renderCsvTable(reactCsvData)}
        {activeTab === 'angular' && renderCsvTable(angularCsvData)}
      </div>
    </div>
  );
};

export default TabView;