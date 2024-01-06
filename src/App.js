import styles from "./App.module.css";
import { useState } from "react";
import { winnerFunc } from "./utills";
import { STATUS, PLAYER, PLAYER_SIGN, PLAYER_NAME } from "./constants";

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER.CROSS);
	const [field, setField] = useState(new Array(9).fill(PLAYER.NOBODY));
	const [status, setStatus] = useState(STATUS.TURN);
	const [playerAction, setPlayerAction] = useState("ходит");

	const onCellClick = (index) => {
		if (status !== STATUS.WIN) {
			if (field[index] === PLAYER.NOBODY) {
				const newField = [...field];
				newField[index] = currentPlayer;
				setCurrentPlayer(
					currentPlayer === PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS,
				);
				setField(newField);

				if (winnerFunc(newField, currentPlayer)) {
					setStatus(STATUS.WIN);
					setPlayerAction("победил");
					setCurrentPlayer((prevState) =>
						prevState === PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS,
					);
				} else if (newField.every((item) => item !== PLAYER.NOBODY)) {
					setPlayerAction("ничья");
					setCurrentPlayer(PLAYER.NOBODY);
					setStatus(STATUS.WIN);
				}
			}
		}
	};

	const onClickStartGame = () => {
		setCurrentPlayer(PLAYER.CROSS);
		setStatus(STATUS.TURN);
		const newField = new Array(9).fill(PLAYER.NOBODY);
		setField(newField);
		setPlayerAction("ходит");
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
