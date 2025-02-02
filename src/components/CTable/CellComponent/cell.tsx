import React from 'react';
import './cell.css'

interface TableCellProps {
    value: string | number;
    onChange: (value: string | number) => void;
    isDead?: boolean;
    type?: 'text' | 'number';
}

const TableCell: React.FC<TableCellProps> = ({ value, onChange, isDead, type = 'text' }) => {
    return (
      <td className={`table-cell ${type}`}>
        {typeof value === 'string' ? (
          <>
            <input
              className="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              type={type}
            />
            {isDead && <span>💀</span>}
          </>
        ) : (
          <input
            className="number"
            value={Number(value) || 0}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            type={type}
          />
        )}
      </td>
    );
  };

  export default TableCell;