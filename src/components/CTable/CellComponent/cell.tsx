import React from 'react';
import './cell.css';
import Player from '../../../Interface/Player.tsx';
import { v4 as uuidv4 } from 'uuid';

interface TableCellProps {
  value: string | number | boolean | string[];
  onChange: (value: string | number | boolean) => void;
  isDead?: boolean;
  type?: 'text' | 'number' | 'checkbox';
  options?: { [key: string]: string[] }; // Опции для чекбоксов
  player?: Player; // Игрок для чекбоксов
  onEditCell?: (playerId: string, field: keyof Player, value: any) => void; // Функция для обработки изменений
}

const TableCell: React.FC<TableCellProps> = ({
  value,
  onChange,
  isDead,
  type = 'text',
  options,
  player,
  onEditCell,
}) => {
  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (player && onEditCell) {
      const checkboxId = `${key}_${player.id}`;
      const prevStates = player.states;

      if (event.target.checked) {
        // Добавляем новый чекбокс в состояния
        const updatedStates = Array.from(new Set([...prevStates, checkboxId]));
        onEditCell(player.id, 'states', updatedStates);
      } else {
        // Удаляем чекбокс из состояний
        const filteredStates = prevStates.filter((state) => state !== checkboxId);
        onEditCell(player.id, 'states', filteredStates);
      }
    }
  };

  // Проверяем, выбран ли чекбокс
  const isCheckboxChecked = (key: string): boolean => {
    return player ? player.states.includes(`${key}_${player.id}`) : false;
  };

  // Рендерим чекбоксы, если тип 'checkbox' и есть опции
  const renderCheckboxes = () => {
    if (!options || !player) return null;

    return (
      <ul className="checkbox-list">
        {Object.keys(options).map((key) => (
          <div key={`${key}_div`}>
            <li>
              <input
                id={`${key}_${player.id}`}
                type="checkbox"
                className="checkbox"
                onChange={(e) => handleCheckboxChange(e, key)}
                checked={isCheckboxChecked(key)}
              />
              <label htmlFor={`${key}_${player.id}`} className="tooltip">
                {key}
                <span className="popup">
                  {options[key].map((option) => (
                    <p key={uuidv4()}>{option}</p>
                  ))}
                </span>
              </label>
            </li>
          </div>
        ))}
      </ul>
    );
  };

  // Рендерим текстовое поле
  const renderTextInput = () => (
    <>
      <input
        className="text"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {isDead && <span>💀</span>}
    </>
  );

  // Рендерим числовое поле
  const renderNumberInput = () => (
    <input
      className="number"
      value={Number(value) || 0}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      type={type}
    />
  );

  return (
    <td className={`table-cell ${type}`}>
      {type === 'checkbox' && options ? renderCheckboxes() : null}
      {type === 'text' && typeof value === 'string' ? renderTextInput() : null}
      {type === 'number' && typeof value === 'number' ? renderNumberInput() : null}
    </td>
  );
};

export default TableCell;