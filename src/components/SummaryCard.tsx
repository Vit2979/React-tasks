import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './SummaryCard.css';

export interface Planet {
  climate: string;
  name: string;
  terrain: string;
}

interface SummaryCardProps {
  planet: Planet;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ planet }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleDuplicateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  return (
    <div className={`summary-card-container ${theme}`}>
      <div
        className={`summary-card ${isClicked ? 'clicked' : ''} ${theme}`}
        onClick={handleClick}
      >
        <h3>{planet.name}</h3>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
      </div>
      {isClicked && (
        <>
          <div
            className={`summary-card-overlay ${theme}`}
            onClick={handleDuplicateClick}
          />
          <div
            className={`summary-card-duplicate ${theme}`}
            onClick={handleDuplicateClick}
          >
            <h3>{planet.name}</h3>
            <p>Climate: {planet.climate}</p>
            <p>Terrain: {planet.terrain}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryCard;
