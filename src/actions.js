export const SET_STATUS = "SET_STATUS";
export const SET_PLAYER_ACTION = "SET_PLAYER_ACTION";
export const SET_FIELD = "SET_FIELD";
export const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";

export const setStatus = (data) => ({
	type: SET_STATUS,
	payload: data,
});

export const setPlayerAction = (data) => ({
	type: SET_PLAYER_ACTION,
	payload: data,
});

export const setField = (data) => ({
	type: SET_FIELD,
	payload: data,
});

export const setCurrentPlayer = (data) => ({
	type: SET_CURRENT_PLAYER,
	payload: data,
});
