import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { convertData, DataFormat } from './utils/converter';

const formats: DataFormat[] = ['CSV', 'Excel', 'JSON Array', 'HTML Table', 'Text', 'SQL Insert', 'Markdown Table'];

export default function App() {
  const [inputData, setInputData] = useState<string>('');
  const [inputFormat, setInputFormat] = useState<DataFormat>('CSV');
  const [outputFormat, setOutputFormat] = useState<DataFormat>('JSON Array');
  const [showInputSelection, setShowInputSelection] = useState<boolean>(false);
  const [showOutputSelection, setShowOutputSelection] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const outputData = convertData(inputData, inputFormat, outputFormat);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputData);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([outputData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-data.${outputFormat.toLowerCase().replace(' ', '-')}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setInputData(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFromWeb = () => {
    const url = prompt('Enter URL to extract data from (mocked):');
    if (url) {
      alert(`Extracting data from ${url} is not fully implemented in prototype.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2338] text-white flex flex-col items-center py-10">
      <h1 className="text-[36px] font-normal mb-10">Table Format Converter (Prototype)</h1>

      {/* SOURCE SECTION */}
      <div className="w-[1120px] bg-[#2e2f2f] rounded-[10px] p-[20px] mb-[28px] relative h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-[20px]">
          <div className="relative">
            <button 
              onClick={() => setShowInputSelection(!showInputSelection)}
              className="flex items-center gap-[10px] text-[#2e5eaa] text-[32px] font-bold cursor-pointer h-[92px] px-[16px] bg-[#2e2f2f] rounded-[10px]"
            >
              Select your data source <ChevronDown size={45} />
            </button>
            {showInputSelection && (
              <div className="absolute top-full left-0 mt-2 w-[341px] bg-[#2e2f2f] border border-[#3b3b3b] rounded-[10px] shadow-2xl z-20 overflow-hidden">
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setInputFormat(f); setShowInputSelection(false); }}
                    className="w-full text-left px-6 py-4 hover:bg-[#3b3b3b] text-[#2e5eaa] text-[24px] border-b border-[#3b3b3b] transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
            <div className="text-[#2e5eaa] text-[20px] font-bold ml-4">
              Current: {inputFormat}
            </div>
          </div>

          <div className="flex gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
            <button 
              onClick={triggerFileUpload}
              className="w-[183px] h-[70px] border-3 border-[#2e5eaa] rounded-[10px] text-[#2e5eaa] text-[28px] font-bold hover:bg-[#2e5eaa] hover:text-white transition-all flex items-center justify-center"
            >
              Upload File
            </button>
            <button 
              onClick={handleFromWeb}
              className="w-[183px] h-[70px] border-3 border-[#2e5eaa] rounded-[10px] text-[#2e5eaa] text-[28px] font-bold hover:bg-[#2e5eaa] hover:text-white transition-all flex items-center justify-center"
            >
              From web
            </button>
          </div>
        </div>

        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Paste your data here..."
          className="w-[1036px] h-[275px] bg-[#3b3b3b] rounded-[16px] p-6 text-white text-[18px] outline-none resize-none mx-auto"
        />
      </div>

      {/* OUTPUT SECTION */}
      <div className="w-[1120px] bg-[#2e2f2f] rounded-[10px] p-[20px] relative h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-[20px]">
          <div className="relative">
            <button 
              onClick={() => setShowOutputSelection(!showOutputSelection)}
              className="flex items-center gap-[10px] text-[#2e5eaa] text-[32px] font-bold cursor-pointer h-[92px] px-[16px] bg-[#2e2f2f] rounded-[10px]"
            >
              Select your output source <ChevronDown size={45} />
            </button>
            {showOutputSelection && (
              <div className="absolute top-full left-0 mt-2 w-[341px] bg-[#2e2f2f] border border-[#3b3b3b] rounded-[10px] shadow-2xl z-20 overflow-hidden">
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setOutputFormat(f); setShowOutputSelection(false); }}
                    className="w-full text-left px-6 py-4 hover:bg-[#3b3b3b] text-[#2e5eaa] text-[24px] border-b border-[#3b3b3b] transition-colors"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
            <div className="text-[#2e5eaa] text-[20px] font-bold ml-4">
              Current: {outputFormat}
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className="w-[180px] h-[70px] border-3 border-[#2e5eaa] rounded-[10px] text-[#2e5eaa] text-[28px] font-bold hover:bg-[#2e5eaa] hover:text-white transition-all flex items-center justify-center"
            >
              Copy
            </button>
            <button 
              onClick={handleDownload}
              className="w-[180px] h-[70px] border-3 border-[#2e5eaa] rounded-[10px] text-[#2e5eaa] text-[28px] font-bold hover:bg-[#2e5eaa] hover:text-white transition-all flex items-center justify-center"
            >
              Download
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={outputData}
          className="w-[1036px] h-[275px] bg-[#3b3b3b] rounded-[16px] p-6 text-white text-[18px] outline-none resize-none mx-auto"
        />
      </div>
    </div>
  );
}
