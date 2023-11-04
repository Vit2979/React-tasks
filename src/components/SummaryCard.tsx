import React from 'react';

interface SummaryCardProps {
  planet: {
    climate: string;
    rotation_period: number;
    orbital_period: number;
    name: string;
    terrain: string;
  };
}

const SummaryCard: React.FC<SummaryCardProps> = function SummaryCard({
  planet,
}) {
  return (
    <div className="search-card">
      <h3>{planet.name}</h3>
      <p>Climate: {planet.climate}</p>
      <p>Orbital period: {planet.orbital_period}</p>
      <p>Rotation period: {planet.rotation_period}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
};

export default SummaryCard;