import React from 'react';
import TableCell from '../CellComponent/cell.tsx';
import "./table.css"
import Player from '../../../Interface/Player.tsx';


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
          <th className='nickname-column'>Имя</th>
          <th>Инициатива</th>
          <th>Класс Брони</th>
          <th>Макс. Здоровье</th>
          <th>Временные хиты</th>
          <th>Получено Урона</th>
          <th className='option-column'>Опции</th>
        </tr>
      </thead>
      <tbody>
        {characters.map(player =>{ 
        const isDead = Boolean(player.maxHP) && ( player.maxHP + player.timelessHp <= player.damageTaken )

        return  (
          <tr 
            key={player.id}
            className={isDead ? 'dead' : ''}
            >
            <TableCell 
                value={player.name}
                onChange={(value) => onEditCell(player.id, 'name', value)}
                isDead={isDead}
                type="text"
            />
            <TableCell 
                value={player.initiative}
                onChange={(value) => onEditCell(player.id, 'initiative', value)}
                type="number"
            />
            <TableCell 
                value={player.armorClass}
                onChange={(value) => onEditCell(player.id, 'armorClass', value)}
                type="number" 
            />
            <TableCell 
                value={player.maxHP}
                onChange={(value) => onEditCell(player.id, 'maxHP', value)}
                type="number" 
            />
            <TableCell 
                value={player.timelessHp}
                onChange={(value) => onEditCell(player.id, 'timelessHp', value)}
                type="number" 
            />
            <TableCell 
                value={player.damageTaken}
                onChange={(value) => onEditCell(player.id, 'damageTaken', value)}
                type="number" 
            />
            <td className='table-cell options'>
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