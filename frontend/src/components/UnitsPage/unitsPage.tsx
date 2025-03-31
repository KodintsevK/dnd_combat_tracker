import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/userContext.ts";
import Unit from '../../Interface/Unit.tsx';
import UnitCard from './unitCard/unitCard.tsx';
import "./UnitPage.css"
import { v4 as uuidv4 } from 'uuid';
import { species_svg } from './types/species_svg.tsx';
import Player from '../../Interface/Player.tsx';

const UnitsPage : React.FC = () => {
    const { user, }  = useContext(UserContext);

    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [needToReload, setNeedToReload] = useState(true)
  
    const defaultUnit = {
      uid: uuidv4(),
      name: "Имя",
      initiative: 10,
      armorClass: 10,
      maxHP: 10,
      isNew: true,
      needToSave: true
    }

    // const IP = "localhost"
    const IP = "89.111.170.26"

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://${IP}:5000/api/unit/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${user?.token || ""}`
                },
                credentials: 'include'
            });

            const data = await response.json();
            setUnits(data);
          } catch (err) {
            console.log(err);
            
            // setError(err.message);
          } finally {
            setLoading(false);
            setNeedToReload(false);
          }
        };
    
        fetchData();
    }, [needToReload]);


    const [characters, setCharacters] = useState<Player[]>(()=> {
        const savedCharacters = localStorage.getItem('characters');
        return savedCharacters ? JSON.parse(savedCharacters) : [];
    });
  
    useEffect(() => {
        localStorage.setItem('characters', JSON.stringify(characters));
    }, [characters]);

    const addDefaultCard = ()=>{
      setUnits([...units, defaultUnit])
    }

    const setName = (e: React.ChangeEvent<HTMLInputElement>, uid: string) => {
      const newName = e.target.value;
  
      setUnits(prevUnits => 
        prevUnits.map(unit => 
          unit.uid === uid 
            ? { ...unit, name: newName, needToSave: true } 
            : unit
        )
      );
    }

    const setStat = (
        e: React.ChangeEvent<HTMLInputElement>,
        uid: string,
        stat: "armorClass" | "initiative" | "maxHP"
      ) => {
        let newValue = e.target.value;
        const v = parseInt(newValue);
        if (v < 0) newValue = "0";
        if (v > 50) newValue = "50";
        setUnits(prevUnits =>
          prevUnits.map(unit => 
            unit.uid === uid 
              ? { ...unit, [stat]: newValue, needToSave: true } 
              : unit
            )
        );
    }

    const createUnit = async (unit: Unit) => {
      try {      
        const response = await fetch(`http://${IP}:5000/api/unit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user?.token || ""}`
          },
          body: JSON.stringify(unit),
          credentials: 'include'
        });
  
        const data = await response.json();
        console.log(data);
        alert(data)
        setNeedToReload(true);
      } catch (error) {
        alert(error);
      }
    } 

    const addToTable = async (unit: Unit) => {
      setCharacters([...characters, {
        id: uuidv4(),
        name: unit.name,
        initiative: unit.initiative,
        armorClass: unit.armorClass,
        maxHP: unit.maxHP,
        damageTaken: 0,
        timelessHp: 0,
        states:[]
      }])
      alert("Добавлен!")
      
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Ваши юниты</h1>
            <div className='units_block'>
              {
                  units.length && units.map(unit => {                  
                      return (
                          <UnitCard 
                              key={unit.uid} 
                              unit={unit}
                              setName={setName}
                              setStat={setStat}
                              createUnit={createUnit}
                              addToTable={addToTable}
                          />
                      )
                  })
              }
              <UnitCard
                key={uuidv4()}
                addDefaultCard={addDefaultCard}
              />
            </div>
        </div>
    )
}
export default UnitsPage;