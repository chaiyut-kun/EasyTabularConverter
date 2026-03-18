export type DataFormat = 'CSV' | 'Excel' | 'JSON Array' | 'HTML Table' | 'Text' | 'SQL Insert';

export const convertData = (data: string, from: DataFormat, to: DataFormat): string => {
  if (!data.trim()) return '';

  try {
    let parsedData: Record<string, string>[] = [];
    let headers: string[] = [];

    // Simple parser (prototype level)
    if (from === 'CSV') {
      const lines = data.split('\n').filter(l => l.trim());
      if (lines.length === 0) return '';
      headers = lines[0].split(',').map(h => h.trim());
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
      if (parsedData.length > 0) {
        headers = Object.keys(parsedData[0]);
      }
    } else if (from === 'Text') {
      const lines = data.split('\n').filter(l => l.trim());
      if (lines.length === 0) return '';
      const rows = lines.map(line => line.trim().split(/\s+/));
      headers = rows[0];
      parsedData = rows.slice(1).map(row => {
        const obj: Record<string, string> = {};
        // Use provided headers for known columns
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        // Handle extra columns if any (for prototype, we can use generic names or just store them)
        if (row.length > headers.length) {
          for (let i = headers.length; i < row.length; i++) {
            obj[`__extra_${i}`] = row[i];
          }
        }
        return obj;
      });
    } else {
      // For others in prototype, just return a mock or the original for now
      return `[Mock] Conversion from ${from} to ${to} not fully implemented in prototype.`;
    }

    // Simple formatter (prototype level)
    if (to === 'JSON Array') {
      return JSON.stringify(parsedData, null, 2);
    } else if (to === 'CSV') {
      if (parsedData.length === 0) return headers.join(',');
      
      const csvLines = [
        headers.join(','),
        ...parsedData.map(row => {
          // Join all values in the row record, including extras
          // We need to ensure they are in order: first the ones matching headers, then extras
          const lineValues = headers.map(h => row[h]);
          const extras = Object.keys(row)
            .filter(k => k.startsWith('__extra_'))
            .sort((a, b) => parseInt(a.split('_')[2]) - parseInt(b.split('_')[2]))
            .map(k => row[k]);
          return [...lineValues, ...extras].join(',');
        })
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
    } else if (to === 'Text') {
      if (parsedData.length === 0) return headers.join('\t');
      const textLines = [
        headers.join('\t'),
        ...parsedData.map(row => {
          const lineValues = headers.map(h => row[h]);
          const extras = Object.keys(row)
            .filter(k => k.startsWith('__extra_'))
            .sort((a, b) => parseInt(a.split('_')[2]) - parseInt(b.split('_')[2]))
            .map(k => row[k]);
          return [...lineValues, ...extras].join('\t');
        })
      ];
      return textLines.join('\n');
    } else if (to === 'SQL Insert') {
      // TODO: Implement actual SQL Insert formatting logic (prototype)
      return `-- [Mock] SQL Insert Script is coming soon!\n-- Format: INSERT INTO table_name (cols) VALUES (vals);`;
    } else {
      return `[Mock] Output format ${to} not fully implemented.`;
    }
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};
