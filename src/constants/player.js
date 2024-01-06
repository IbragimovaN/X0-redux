export const PLAYER = {
	CROSS: 0,
	NOUGHT: 1,
	NOBODY: 2,
};

export const PLAYER_SIGN = {
	[PLAYER.CROSS]: "X",
	[PLAYER.NOUGHT]: "0",
	[PLAYER.NOBODY]: "",
};

export const PLAYER_NAME = {
	[PLAYER.CROSS]: "крестик",
	[PLAYER.NOUGHT]: "нолик",
	[PLAYER.NOBODY]: "",
};

export const STATUS = {
	TURN: 0,
	WIN: 1,
	DRAW: 2,
};
