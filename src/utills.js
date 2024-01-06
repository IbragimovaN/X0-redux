import { WIN_COMBS } from "./constants";

export const winnerFunc = (field, currentPlayer) => {
	return WIN_COMBS.some((item) =>
		item.every((comb) => field[comb] === currentPlayer),
	);
};
