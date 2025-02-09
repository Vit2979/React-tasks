import React, { useState } from 'react';
import './SummaryCard.css';

interface Planet {
  climate: string;
  rotation_period: number;
  orbital_period: number;
  name: string;
  terrain: string;
}

interface SummaryCardProps {
  planet: Planet;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ planet }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="summary-card-container">
      <div className={`summary-card ${isClicked ? 'clicked' : ''}`} onClick={() => setIsClicked(!isClicked)}>
        <h3>{planet.name}</h3>
        <p>Climate: {planet.climate}</p>
        <p>Orbital period: {planet.orbital_period}</p>      
      </div>
      {isClicked && (
        <div className="summary-card-duplicate" onClick={() => setIsClicked(false)}>
          <h3>{planet.name}</h3>
          <p>Climate: {planet.climate}</p>
          <p>Orbital period: {planet.orbital_period}</p>
          <p>Rotation period: {planet.rotation_period}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
