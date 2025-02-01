import React from 'react';

interface TableCellProps {
    value: string | number;
    onChange: (value: string | number) => void;
    isDead?: boolean;
}

const TableCell: React.FC<TableCellProps> = ({ value, onChange, isDead }) => {
    return (
      <td>
        {typeof value === 'string' ? (
          <>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {isDead && <span>💀</span>}
          </>
        ) : (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value) || '')}
          />
        )}
      </td>
    );
  };

  export default TableCell;