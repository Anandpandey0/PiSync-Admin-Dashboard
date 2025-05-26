import React from 'react';

type TableProps = {
  title: string;
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
};

// Resuable Table Component :Input : Title , Headers and rows

const Table: React.FC<TableProps> = ({ title, headers, rows }) => {
  return (
    <div className="flex justify-center px-4">
      <div className="overflow-x-auto w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-800"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
