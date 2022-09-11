import React, { useEffect, useState } from 'react';
import { Bottle } from './components/Bottle/Bottle';
import { Counter } from './components/Counter/Counter';
import { Players } from './components/Players/Players';
import { getPlayerIndexById } from './utils/getPlayerIndexById';
import { BASE_DIRECTORY, DURATIONS, GamePhase } from './config';
import { KissScene } from './components/KissScene/KissScene';
import { Countdown } from './components/Countdown/Countdown';
import './App.css';

const PLAYERS = [
  { id: 1, avatar: `${BASE_DIRECTORY}/avatars/avatar1.jpg` },
  { id: 2, avatar: `${BASE_DIRECTORY}/avatars/avatar2.jpg` },
  { id: 3, avatar: `${BASE_DIRECTORY}/avatars/avatar3.jpg` },
  { id: 4, avatar: `${BASE_DIRECTORY}/avatars/avatar4.jpg` },
  { id: 5, avatar: `${BASE_DIRECTORY}/avatars/avatar5.jpg` },
  { id: 6, avatar: `${BASE_DIRECTORY}/avatars/avatar6.jpg` },
  { id: 7, avatar: `${BASE_DIRECTORY}/avatars/avatar7.jpg` },
  { id: 8, avatar: `${BASE_DIRECTORY}/avatars/avatar8.jpg` },
  { id: 9, avatar: `${BASE_DIRECTORY}/avatars/avatar9.jpg` },
  { id: 10, avatar: `${BASE_DIRECTORY}/avatars/avatar10.jpg` },
]

export const App = () => {
  const [counter, setCounter] = useState(0);
  const [gamePhase, setGamePhase] = useState(GamePhase.COUNTDOWN);
  const [currentPlayerId, setCurrentPlayerId] = useState(1);
  const [targetPlayerId, setTargetPlayerId] = useState(null);
  const [enhanceKissingPlayers, setEnhanceKissingPlayers] = useState(false);

  useEffect(() => {
    if (gamePhase === GamePhase.NEXT_PLAYER) {
      setCurrentPlayerId(-1);
      setTimeout(() => {
        setCurrentPlayerId(targetPlayerId);
      }, DURATIONS.SET_CURRENT_PLAYER);
      setTimeout(() => {
        setGamePhase(GamePhase.COUNTDOWN);
      }, DURATIONS.END_CURRENT_PLAYER_CHANGE);
    } else if (gamePhase === GamePhase.COUNTDOWN) {
      setTimeout(() => {
        setGamePhase(GamePhase.SPINNING);
      }, DURATIONS.COUNTDOWN);
    } else if (gamePhase === GamePhase.SPINNING) {
      const possibleTargetIds = PLAYERS.reduce((acc, player) => {
        if (player.id !== currentPlayerId) {
          acc.push(player.id);
        }
        return acc;
      }, []);
      const randomIndex = Math.floor(Math.random() * possibleTargetIds.length);
      const randomTargetId = possibleTargetIds[randomIndex];
      setTargetPlayerId(randomTargetId);
      setTimeout(() => {
        setGamePhase(GamePhase.KISSING);
        setEnhanceKissingPlayers(true);
      }, DURATIONS.BOTTLE_SPIN);
    } else if (gamePhase === GamePhase.KISSING) {
      setTimeout(() => {
        setGamePhase(GamePhase.COUNTER_UPDATE);
      }, DURATIONS.KISSING_PHASE);
    } else if (gamePhase === GamePhase.COUNTER_UPDATE) {
      setCounter(counter + 1);
      setEnhanceKissingPlayers(false);
      setTimeout(() => {
        setGamePhase(GamePhase.NEXT_PLAYER);
      }, DURATIONS.COUNTER_UPDATE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase]);

  const targetPlayerIndex = getPlayerIndexById(PLAYERS, targetPlayerId);

  const kissingSceneNode = gamePhase === GamePhase.KISSING || gamePhase === GamePhase.AFTER_KISSING
    ? (
      <KissScene
        players={PLAYERS}
        currentPlayer={PLAYERS.find(player => player.id === currentPlayerId)}
        targetPlayer={PLAYERS.find(player => player.id === targetPlayerId)}
      />
    )
    : null;

  return (
    <div className='app__wrapper'>
      <Countdown visible={gamePhase === GamePhase.COUNTDOWN} />
      <Counter
        value={counter}
        isAnimated={gamePhase === GamePhase.COUNTER_UPDATE}
      />
      <div className='app__main'>
        {kissingSceneNode}
        <Bottle
          isSpinning={gamePhase === GamePhase.SPINNING}
          targetPlayerIndex={targetPlayerIndex}
          playersCount={PLAYERS.length}
        />
        <Players
          players={PLAYERS}
          currentPlayerId={currentPlayerId}
          targetPlayerId={targetPlayerId}
          enhanceKissingPlayers={enhanceKissingPlayers}
          isKissingPhase={gamePhase === GamePhase.KISSING}
        />
      </div>
    </div>
  );
}
