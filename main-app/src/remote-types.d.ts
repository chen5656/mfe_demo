// Type declarations for remote modules
declare module 'remote-react-app/CsvViewer' {
  const CsvViewer: React.ComponentType;
  export default CsvViewer;
}

// Global window extensions
interface Window {
  reactCsvData?: {
    data: string[][];
    headers: string[];
    fileName: string;
    source: string;
  };
  angularCsvData?: {
    data: string[][];
    headers: string[];
    fileName: string;
    source: string;
  };
}