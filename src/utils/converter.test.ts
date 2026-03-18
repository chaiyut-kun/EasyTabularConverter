import { describe, it, expect } from 'vitest';
import { convertData } from './converter';

describe('convertData', () => {
  it('should convert CSV to JSON Array', () => {
    const csv = 'name,age\nChai,19\nMe,20';
    const result = convertData(csv, 'CSV', 'JSON Array');
    const parsed = JSON.parse(result);
    expect(parsed).toEqual([
      { name: 'Chai', age: '19' },
      { name: 'Me', age: '20' }
    ]);
  });

  it('should convert JSON Array to CSV', () => {
    const json = JSON.stringify([
      { name: 'Chai', age: '19' },
      { name: 'Me', age: '20' }
    ]);
    const result = convertData(json, 'JSON Array', 'CSV');
    expect(result).toBe('name,age\nChai,19\nMe,20');
  });

  it('should convert CSV to HTML Table', () => {
    const csv = 'name,age\nChai,19';
    const result = convertData(csv, 'CSV', 'HTML Table');
    expect(result).toContain('<table>');
    expect(result).toContain('<th>name</th>');
    expect(result).toContain('<td>Chai</td>');
  });

  it('should return empty string for empty input', () => {
    expect(convertData('', 'CSV', 'JSON Array')).toBe('');
  });

  it('should handle invalid JSON', () => {
    const result = convertData('{ invalid }', 'JSON Array', 'CSV');
    expect(result).toContain('Error:');
  });

  it('should convert Text (whitespace delimited) to CSV', () => {
    const text = 'Name\tTitle\nRoss Gellar\tPaleontologist\nMonica Gellar\tChef\nPhoebe Buffay\tMusician';
    const result = convertData(text, 'Text', 'CSV');
    // Based on GEMINI.md example:
    // Name,Title
    // Ross,Gellar,Paleontologist
    // Monica,Gellar,Chef
    // Phoebe,Buffay,Musician
    expect(result).toBe('Name,Title\nRoss,Gellar,Paleontologist\nMonica,Gellar,Chef\nPhoebe,Buffay,Musician');
  });

  it('should convert CSV to Text (whitespace delimited)', () => {
    const csv = 'Name,Title\nRoss,Paleontologist';
    const result = convertData(csv, 'CSV', 'Text');
    expect(result).toBe('Name\tTitle\nRoss\tPaleontologist');
  });

  it('should convert CSV to SQL Insert Script', () => {
    const csv = 'Name,Title\nRoss,Paleontologist';
    const result = convertData(csv, 'CSV', 'SQL Insert');
    expect(result).toBe("INSERT INTO `User` (`Name`,`Title`) VALUES\n('Ross','Paleontologist');");
  });
});
