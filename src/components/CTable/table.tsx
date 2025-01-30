import React from 'react';

interface Player {
  id: number;
  name: string;
  initiative: number;
  armorClass: number;
  maxHP: number;
  damageTaken: number;
}

interface CTableProps {
  data: Player[];
  onEditCell: (id: number, field: keyof Player, value: string | number) => void;
  onDelete: (id: number) => void;
}

const CTable: React.FC<CTableProps> = ({ data, onEditCell, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Инициатива</th>
          <th>Класс Брони</th>
          <th>Макс. Здоровье</th>
          <th>Получено Урона</th>
          <th>Опции</th>
        </tr>
      </thead>
      <tbody>
        {data.map(player => (
          <tr key={player.id}>
            <td>
              <input
                type="text"
                value={player.name}
                onChange={(e) => onEditCell(player.id, 'name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={player.initiative}
                onChange={(e) => onEditCell(player.id, 'initiative', Number(e.target.value) || '')}
              />
            </td>
            <td>
              <input
                type="number"
                value={player.armorClass}
                onChange={(e) => onEditCell(player.id, 'armorClass', Number(e.target.value) || '')}
              />
            </td>
            <td>
              <input
                type="number"
                value={player.maxHP}
                onChange={(e) => onEditCell(player.id, 'maxHP', Number(e.target.value) || '')}
              />
            </td>
            <td>
              <input
                type="number"
                value={player.damageTaken}
                onChange={(e) => onEditCell(player.id, 'damageTaken', Number(e.target.value) || '')}
              />
            </td>
            <td>
              <button
                onClick={() => onDelete(player.id) }
                style={{backgroundColor: 'pink', border: '0px', borderRadius: '5px', cursor: "pointer"}}
              >Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CTable;