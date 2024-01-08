import { STATUS, PLAYER } from "./constants";
import {
	SET_STATUS,
	SET_PLAYER_ACTION,
	SET_FIELD,
	SET_CURRENT_PLAYER,
} from "./constants/actions";

export const initialState = {
	field: Array(9).fill(PLAYER.NOBODY),
	currentPlayer: PLAYER.CROSS,
	status: STATUS.TURN,
	playerAction: "ходит",
};

export const appReduser = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_STATUS: {
			return {
				...state,
				status: payload,
			};
		}
		case SET_PLAYER_ACTION: {
			return {
				...state,
				playerAction: payload,
			};
		}
		case SET_FIELD: {
			return {
				...state,
				field: payload,
			};
		}

		case SET_CURRENT_PLAYER: {
			return {
				...state,
				currentPlayer: payload,
			};
		}
		default: {
			return state;
		}
	}
};
