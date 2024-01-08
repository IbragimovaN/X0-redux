import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { winnerFunc } from "./utills";
import { STATUS, PLAYER, PLAYER_SIGN, PLAYER_NAME } from "./constants";
import { createStore } from "redux";
import { appReduser } from "./reduser";
import { initialState } from "./reduser";
import {
	SET_STATUS,
	SET_PLAYER_ACTION,
	SET_FIELD,
	SET_CURRENT_PLAYER,
} from "./constants/actions";

const store = createStore(appReduser, initialState);

export const App = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setState(store.getState());
		});

		return () => unsubscribe();
	}, [state]);

	const onCellClick = (index) => {
		if (state.status !== STATUS.WIN) {
			if (state.field[index] === PLAYER.NOBODY) {
				const newField = [...state.field];
				newField[index] = state.currentPlayer;

				store.dispatch({
					type: SET_CURRENT_PLAYER,
					payload:
						state.currentPlayer === PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS,
				});

				store.dispatch({ type: SET_FIELD, payload: newField });

				if (winnerFunc(newField, state.currentPlayer)) {
					store.dispatch({ type: SET_STATUS, payload: STATUS.WIN });
					store.dispatch({ type: SET_PLAYER_ACTION, payload: "победил" });
					store.dispatch({
						type: SET_CURRENT_PLAYER,
						payload: PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS,
					});
				} else if (newField.every((item) => item !== PLAYER.NOBODY)) {
					store.dispatch({ type: SET_PLAYER_ACTION, payload: "ничья" });
					store.dispatch({
						type: SET_CURRENT_PLAYER,
						payload: PLAYER.NOBODY,
					});
					store.dispatch({ type: SET_STATUS, payload: STATUS.WIN });
				}
			}
		}
	};

	const onClickStartGame = () => {
		store.dispatch({ type: SET_CURRENT_PLAYER, payload: PLAYER.CROSS });
		store.dispatch({ type: SET_STATUS, payload: STATUS.TURN });
		const newField = new Array(9).fill(PLAYER.NOBODY);
		store.dispatch({ type: SET_FIELD, payload: newField });
		store.dispatch({ type: SET_PLAYER_ACTION, payload: "ходит" });
	};

	return (
		<div className={styles.app}>
			<div>{`${state.playerAction}  ${PLAYER_NAME[state.currentPlayer]}`}</div>
			<div className={styles.field}>
				{state.field.map((item, index) => (
					<button key={index} onClick={() => onCellClick(index)}>
						{PLAYER_SIGN[item]}
					</button>
				))}
			</div>
			{state.status === STATUS.WIN ? (
				<button onClick={onClickStartGame}>начать игру заново</button>
			) : (
				""
			)}
		</div>
	);
};
