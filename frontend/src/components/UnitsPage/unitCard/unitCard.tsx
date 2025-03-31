import React, { useState } from 'react';
import Unit from '../../../Interface/Unit.tsx';
import "./unitCard.css"
import SvgNumber from '../unitStat/unitStat.tsx';

interface UnitCardProps {
    unit?: Unit; // Принимаем объект unit целиком
    key: string;
    addDefaultCard?: () => void;
    setName?: (e: React.ChangeEvent<HTMLInputElement>, uid: string) => void;
    setStat?: (e: React.ChangeEvent<HTMLInputElement>, uid: string, stat: "armorClass" | "initiative" | "maxHP") => void;
    createUnit?: (unit: Unit) => void;
    addToTable?: (unit: Unit) => void;
}


const UnitCard : React.FC<UnitCardProps> = ({ 
    unit, 
    addDefaultCard, 
    setName, 
    setStat, 
    createUnit,
    addToTable
}) => {
    if (unit && setName && setStat && createUnit && addToTable) {
        return (
            <div className="unit-card" >
                <div className="name-block">
                    <input 
                        type="text" 
                        className='name-input' 
                        value={unit?.name}
                        onChange={(e)=> setName(e, unit.uid)}
                    />
                    <hr/>
                </div>
                <div className="stat-block">
                    <SvgNumber 
                        type="maxHP"
                        key={"maxHP"}
                        unit={unit}
                        className="custom-style"
                        style={{ width: '80px', height: '80px' }}
                        setStat={setStat}
                    />
                    <SvgNumber 
                        type="armorClass"
                        key={"armorClass"}
                        unit={unit}
                        className="custom-style"
                        style={{ width: '80px', height: '80px' }}
                        setStat={setStat}
                    />
                    <SvgNumber 
                        type="initiative"
                        key={"initiative"}
                        unit={unit}
                        className="custom-style"
                        style={{ width: '80px', height: '80px' }}
                        setStat={setStat}
                    />
                </div>
                <div className='button_block'>
                    <button onClick={()=> addToTable(unit)}>Добавить в таблицу</button>
                    {
                        unit.isNew && <button onClick={() => createUnit(unit)}>Сохранить</button>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="unit-card" >
            <div className='unit-card__wrapper'>
                <button className='unit-card__add-button' onClick={addDefaultCard}>+</button>
            </div>
        </div>
    )
}

export default UnitCard;