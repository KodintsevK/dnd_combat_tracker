import React, { useState } from 'react';
import CTable from './components/CTable/table.tsx';


interface Player {
  id: number;
  name: string;
  initiative: number;
  armorClass: number;
  maxHP: number;
  damageTaken: number;
}

const App = () => {
  // Начальные данные для таблицы
  const [data, setData] = useState<Player[]>([]);

  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'id'>>({
    name: '',
    initiative: 0,
    armorClass: 0,
    maxHP: 0,
    damageTaken: 0,
  });

  const handleEditCell = (id: number, field: keyof Player, value: string | number) => {
    const updatedData = data.map(player => {
      if (player.id === id) {
        return { ...player, [field]: value };
      }
      return player;
    });
    updatedData.sort((a, b) => b.initiative - a.initiative);
    setData(updatedData);
  };

  const handleAddPlayer = () => {
      const updatedData = [
        ...data,
        {
          id: data.length + 1,
          ...newPlayer,
        },
      ];

      // Сортировка по инициативе (по возрастанию)
      updatedData.sort((a, b) => b.initiative - a.initiative);
      setData(updatedData);

  };

  const hadleDeletePlayer = (id : number) => {    
    const updatedData = data.filter(e=> e.id !== id)
    updatedData.sort((a, b) => b.initiative - a.initiative);
    setData(updatedData);
  }


  return (
    <div>
      <h1>Таблица игроков</h1>

      {
        <button onClick={handleAddPlayer} style={{cursor: "pointer", backgroundColor: "lightgreen", border: "0px", borderRadius: "5px"}}>+</button>
      }
      <CTable data={data} onEditCell={handleEditCell} onDelete={hadleDeletePlayer}/>
    </div>
  );
};

export default App;