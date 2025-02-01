import React from 'react';
import TableCell from './cell.tsx';


interface Player {
  id: number;
  name: string;
  initiative: number;
  armorClass: number;
  maxHP: number;
  damageTaken: number;
}

interface CTableProps {
  characters: Player[];
  onEditCell: (id: number, field: keyof Player, value: string | number) => void;
  onDelete: (id: number) => void;
}

const CTable: React.FC<CTableProps> = ({ characters, onEditCell, onDelete }) => {
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
        {characters.map(player =>{ 
        const isDead = Boolean(player.maxHP) && ( player.maxHP <= player.damageTaken )

        return  (
          <tr 
            key={player.id}
            className={isDead ? 'dead' : ''}
            >
            <TableCell 
                value={player.name}
                onChange={(value) => onEditCell(player.id, 'name', value)}
                isDead={isDead}
            />
            <TableCell 
                value={player.initiative}
                onChange={(value) => onEditCell(player.id, 'initiative', value)}
            />
            <TableCell 
                value={player.armorClass}
                onChange={(value) => onEditCell(player.id, 'armorClass', value)}
            />
            <TableCell 
                value={player.maxHP}
                onChange={(value) => onEditCell(player.id, 'maxHP', value)}
            />
            <TableCell 
                value={player.damageTaken}
                onChange={(value) => onEditCell(player.id, 'damageTaken', value)}
            />
            <td>
              <button
                onClick={() => onDelete(player.id) }
                style={{backgroundColor: 'pink', border: '0px', borderRadius: '5px', cursor: "pointer"}}
              >Удалить</button>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
  );
};

export default CTable;