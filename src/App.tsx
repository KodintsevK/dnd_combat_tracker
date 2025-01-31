import React, { useState, useEffect  } from 'react';
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
  const [characters, setCharacters] = useState<Player[]>(()=> {
    const savedCharacters = localStorage.getItem('characters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
}, [characters]);


  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'id'>>({
    name: '',
    initiative: 0,
    armorClass: 0,
    maxHP: 0,
    damageTaken: 0,
  });

  const handleEditCell = (id: number, field: keyof Player, value: string | number) => {
    const updatedData = characters.map(player => {
      if (player.id === id) {
        return { ...player, [field]: value };
      }
      return player;
    });
    updatedData.sort((a, b) => b.initiative - a.initiative);
    setCharacters(updatedData);
  };

  const handleAddPlayer = () => {
      const updatedData = [
        ...characters,
        {
          id: characters.length + 1,
          ...newPlayer,
        },
      ];

      // Сортировка по инициативе (по возрастанию)
      updatedData.sort((a, b) => b.initiative - a.initiative);
      setCharacters(updatedData);

  };

  const hadleDeletePlayer = (id : number) => {    
    const updatedData = characters.filter(e=> e.id !== id)
    updatedData.sort((a, b) => b.initiative - a.initiative);
    setCharacters(updatedData);
  }


  return (
    <div>
      <h1>Таблица игроков</h1>

      {
        <button onClick={handleAddPlayer} style={{cursor: "pointer", backgroundColor: "lightgreen", border: "0px", borderRadius: "5px"}}>+</button>
      }
      <CTable characters={characters} onEditCell={handleEditCell} onDelete={hadleDeletePlayer}/>
    </div>
  );
};

export default App;