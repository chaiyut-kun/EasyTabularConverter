export type DataFormat = 'CSV' | 'Excel' | 'JSON Array' | 'HTML Table';

export const convertData = (data: string, from: DataFormat, to: DataFormat): string => {
  if (!data.trim()) return '';

  try {
    let parsedData: Record<string, string>[] = [];

    // Simple parser (prototype level)
    if (from === 'CSV') {
      const lines = data.split('\n').filter(l => l.trim());
      if (lines.length === 0) return '';
      const headers = lines[0].split(',').map(h => h.trim());
      parsedData = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || '';
        });
        return obj;
      });
    } else if (from === 'JSON Array') {
      parsedData = JSON.parse(data);
      if (!Array.isArray(parsedData)) {
        throw new Error('Not a JSON array');
      }
    } else {
      // For others in prototype, just return a mock or the original for now
      return `[Mock] Conversion from ${from} to ${to} not fully implemented in prototype.`;
    }

    // Simple formatter (prototype level)
    if (to === 'JSON Array') {
      return JSON.stringify(parsedData, null, 2);
    } else if (to === 'CSV') {
      if (parsedData.length === 0) return '';
      const headers = Object.keys(parsedData[0]);
      const csvLines = [
        headers.join(','),
        ...parsedData.map(row => headers.map(h => row[h]).join(','))
      ];
      return csvLines.join('\n');
    } else if (to === 'HTML Table') {
      if (parsedData.length === 0) return '<table></table>';
      const headers = Object.keys(parsedData[0]);
      const headerRow = `  <tr>\n${headers.map(h => `    <th>${h}</th>`).join('\n')}\n  </tr>`;
      const rows = parsedData.map(row => 
        `  <tr>\n${headers.map(h => `    <td>${row[h]}</td>`).join('\n')}\n  </tr>`
      ).join('\n');
      return `<table>\n${headerRow}\n${rows}\n</table>`;
    } else {
      return `[Mock] Output format ${to} not fully implemented.`;
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};
