import React, { useState } from 'react';
import './SvgNumber.css';
// @ts-ignore
import { ReactComponent as HeartIcon } from '../images/heart.svg';
// @ts-ignore
import { ReactComponent as ShieldIcon } from '../images/shield.svg';
// @ts-ignore
import { ReactComponent as InitiativeIcon } from '../images/initiative.svg';
// @ts-ignore
import { ReactComponent as DiceIcon } from '../images/dice.svg';
import { species_svg } from '../types/species_svg';
import Unit from '../../../Interface/Unit';

interface SvgNumberProps {
  type: species_svg;
  unit: Unit;
  className?: string;
  style?: React.CSSProperties;
  setStat?: (e: React.ChangeEvent<HTMLInputElement>, uid: string, stat: "armorClass" | "initiative" | "maxHP") => void;
}

const map_species = {
    "maxHP"       : <HeartIcon 
      className="svg-image"/>,
    "armorClass"  : <ShieldIcon 
      className="svg-image" />,
    "initiative"  : <InitiativeIcon 
      className="svg-image"/>,
    "back-dice"   : <DiceIcon
      className="svg-image"
    />
}

const SvgNumber: React.FC<SvgNumberProps> = ({ 
  type, 
  unit, 
  className = '', 
  style,
  setStat
}) => {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    // Проверяем, что клик не на инпуте или его дочерних элементах
    if ((e.target as Element).closest('.prevent-flip')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-container ${isFlipped ? 'flipped' : ''} ${className}`}
      style={style}
      onClick={handleFlip}
    >
      <div className="flipper">
        {/* Передняя сторона */}
        <div className="front">
          <div className="svg-number-container">
            {map_species[type]}
            <div className="svg-number-value">
              <input
                className="prevent-flip"
                type="number"
                value={unit[type]}
                onChange={e => setStat && setStat(e, unit.uid, type)}
              />
            </div>
          </div>
        </div>

        {/* Задняя сторона */}
        <div className="back">
          <div className="svg-number-container">
            {map_species["back-dice"]}
            <div className="svg-number-value">
              <p color='#ffffff'>1D20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SvgNumber;