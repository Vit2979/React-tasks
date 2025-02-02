import React, { Component } from 'react';
import './SummaryCard.css';

interface SummaryCardProps {
  planet: {
    climate: string;
    rotation_period: number;
    orbital_period: number;
    name: string;
    terrain: string;
  };
}

interface SummaryCardState {
  isClicked: boolean;
}

class SummaryCard extends Component<SummaryCardProps, SummaryCardState> {
  constructor(props: SummaryCardProps) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  handleClick = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  handleDuplicateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.setState({ isClicked: false });
  };

  render() {
    const { planet } = this.props;
    const { isClicked } = this.state;

    return (
      <div className="summary-card-container">
        <div
          className={`summary-card ${isClicked ? 'clicked' : ''}`}
          onClick={this.handleClick}
        >
          <h3>{planet.name}</h3>
          <p>Climate: {planet.climate}</p>
          <p>Orbital period: {planet.orbital_period}</p>
          <p>Rotation period: {planet.rotation_period}</p>
          <p>Terrain: {planet.terrain}</p>
        </div>
        {isClicked && (
          <>
            <div className="summary-card-overlay" onClick={this.handleDuplicateClick} />
            <div className="summary-card-duplicate" onClick={this.handleDuplicateClick}>
              <h3>{planet.name}</h3>
              <p>Climate: {planet.climate}</p>
              <p>Orbital period: {planet.orbital_period}</p>
              <p>Rotation period: {planet.rotation_period}</p>
              <p>Terrain: {planet.terrain}</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SummaryCard;
