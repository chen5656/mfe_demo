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

  useEffect(() => {
    // Listen for messages from Angular iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'csvData') {
        setAngularCsvData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    // Poll for React data
    const interval = setInterval(() => {
      // @ts-ignore - This is for Module Federation communication
      if (window.reactCsvData) {
        // @ts-ignore
        setReactCsvData(window.reactCsvData);
      }
    }, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  const renderCsvTable = (csvData: CsvDataType | null) => {
    if (!csvData) {
      return <p>No data available. Please upload a CSV file in the remote app.</p>;
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