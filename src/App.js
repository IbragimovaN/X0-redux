import styles from "./App.module.css";
import { winnerFunc } from "./utills";
import { STATUS, PLAYER, PLAYER_SIGN, PLAYER_NAME } from "./constants";
import { legacy_createStore as createStore } from "redux";
import { appReduser } from "./reduser";
import { useDispatch } from "react-redux";
import {
	setCurrentPlayer,
	setField,
	setPlayerAction,
	setStatus,
} from "./actions";

import { useSelector } from "react-redux";

export const store = createStore(appReduser);

export const App = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.status);
	const field = useSelector((state) => state.field);
	const currentPlayer = useSelector((state) => state.currentPlayer);
	const playerAction = useSelector((state) => state.playerAction);

	const onCellClick = (index) => {
		if (status !== STATUS.WIN) {
			if (field[index] === PLAYER.NOBODY) {
				const newField = [...field];
				newField[index] = currentPlayer;

				store.dispatch(
					setCurrentPlayer(
						currentPlayer === PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS,
					),
				);

				store.dispatch(setField(newField));

				if (winnerFunc(newField, currentPlayer)) {
					dispatch(setStatus(STATUS.WIN));
					dispatch(setPlayerAction("победил"));
					dispatch(
						setCurrentPlayer(PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS),
					);
				} else if (newField.every((item) => item !== PLAYER.NOBODY)) {
					dispatch(setPlayerAction("ничья"));
					dispatch(setCurrentPlayer(PLAYER.NOBODY));
					dispatch(setStatus(STATUS.WIN));
				}
			}
		}
	};

	const onClickStartGame = () => {
		dispatch(setCurrentPlayer(PLAYER.CROSS));
		dispatch(setStatus(STATUS.TURN));
		const newField = new Array(9).fill(PLAYER.NOBODY);
		dispatch(setField(newField));
		dispatch(setPlayerAction("ходит"));
	};

	return (
		<div className={styles.app}>
			<div>{`${playerAction}  ${PLAYER_NAME[currentPlayer]}`}</div>
			<div className={styles.field}>
				{field.map((item, index) => (
					<button key={index} onClick={() => onCellClick(index)}>
						{PLAYER_SIGN[item]}
					</button>
				))}
			</div>
			{status === STATUS.WIN ? (
				<button onClick={onClickStartGame}>начать игру заново</button>
			) : (
				""
			)}
		</div>
	);
};
