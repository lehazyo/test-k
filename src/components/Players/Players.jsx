import React from 'react';
import { Player } from '../Player/Player';
import './Players.css';

export const Players = ({
  players,
  currentPlayerId,
  targetPlayerId,
  enhanceKissingPlayers,
  isKissingPhase,
}) => {
  const playerNodes = players.map((player, index) => {
    const { id, avatar } = player;
    const isCurrent = id === currentPlayerId;
    const isTarget = id === targetPlayerId;
    const isEnhanced = (isCurrent || isTarget) && enhanceKissingPlayers;
    const isHidden = isKissingPhase && (isCurrent || isTarget);

    return (
      <Player
        key={id}
        avatar={avatar}
        isCurrent={isCurrent}
        isEnhanced={isEnhanced}
        isHidden={isHidden}
        index={index}
        playersCount={players.length}
      />
    )
  });

  return (
    <div className='players__wrapper'>
      {playerNodes}
    </div>
  )
}
