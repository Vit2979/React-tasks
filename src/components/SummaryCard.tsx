import React from 'react';

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
  return (
    <div>
      <h3>{planet.name}</h3>
      <p>Climate: {planet.climate}</p>
      <p>Rotation Period: {planet.rotation_period}</p>
      <p>Orbital Period: {planet.orbital_period}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
};

export default SummaryCard;