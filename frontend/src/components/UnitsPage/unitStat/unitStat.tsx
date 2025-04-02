import React from 'react';
import './SvgNumber.css';
// @ts-ignore
import { ReactComponent as HeartIcon } from '../images/heart.svg';
// @ts-ignore
import { ReactComponent as ShieldIcon } from '../images/shield.svg';
// @ts-ignore
import { ReactComponent as InitiativeIcon } from '../images/initiative.svg';
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
      className="svg-image"/>
}

const SvgNumber: React.FC<SvgNumberProps> = ({ 
  type, 
  unit, 
  className = '', 
  style,
  setStat
}) => {

  return (
    <div 
      className={`svg-number-container ${className}`} 
      style={style}
    >
      {
        map_species[type]
      }
      <div 
        className="svg-number-value"
      >
        <input 
          type="number"
          value={unit[type]} 
          onChange={e => setStat && setStat(e, unit.uid, type)}
        />
      </div>
    </div>
  );
};

export default SvgNumber;