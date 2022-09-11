export const getPlayerIndexById = (players, playerId) =>
  players.findIndex(player => player.id === playerId);
