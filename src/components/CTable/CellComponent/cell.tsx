import React from 'react';
import './cell.css'
import Player from '../../../Interface/Player.tsx';
import { v4 as uuidv4 } from 'uuid';

interface TableCellProps {
  value: string | number | boolean | string[];
  onChange: (value: string | number | boolean) => void;
  isDead?: boolean;
  type?: 'text' | 'number' | 'checkbox';
  options?: { [key: string]: string[] }; // Добавляем опции для чекбоксов
  player?: Player; // Добавляем игрока для чекбоксов
  onEditCell?: (playerId: string, field: keyof Player, value: any) => void; // Добавляем функцию для обработки изменений
}

const TableCell: React.FC<TableCellProps> = ({ value, onChange, isDead, type = 'text', options, player, onEditCell }) => {
    
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    debugger;
      if (player && onEditCell) {
          const prevStates = player.states;
          const checkboxId = `${key}_${player.id}`;

          if (event.target.checked) {
              const set = new Set([...prevStates, checkboxId]);
              const arr = Array.from(set);
              onEditCell(player.id, 'states', arr);
          } else {
              const filteredArr = prevStates.filter(e => e !== checkboxId);
              onEditCell(player.id, 'states', filteredArr);
          }
      }
  };

  const getChecked = (key: string): boolean => {     
    return player ? player.states.includes(`${key}_${player.id}`) : false;
  };

  return (
      <td className={`table-cell ${type}`}>
          {type === 'checkbox' && options ? (
              <ul className="checkbox-list">
                  {Object.keys(options).map(key => (
                      <div key={`${key}_div`}>
                          <li>
                              <input
                                  id={`${key}_${player?.id}`}
                                  type="checkbox"
                                  className='checkbox'
                                  onChange={(e) => handleCheckboxChange(e, key)}
                                  checked={getChecked(key)}
                              />
                              <label htmlFor={`${key}_${player?.id}`} className="tooltip">
                                  {key}
                                  <span className="popup">
                                      {options[key].map((e: string) => (
                                          <p key={uuidv4()}>{e}</p>
                                      ))}
                                  </span>
                              </label>
                          </li>
                      </div>
                  ))}
              </ul>
          ) : typeof value === 'string' ? (
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