import { winnerFunc } from "./utills";
import { STATUS, PLAYER, PLAYER_SIGN } from "./constants";
import { legacy_createStore as createStore } from "redux";
import { appReduser } from "./reduser";
import { Info } from "./components/info";
import { Component } from "react";

import {
	setCurrentPlayer,
	setField,
	setPlayerAction,
	setStatus,
} from "./actions";
import { connect } from "react-redux";
import { Button } from "./components/Button";

export const store = createStore(appReduser);

class AppContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dispatch: props.dispatch,
		};
		this.onCellClick = this.onCellClick.bind(this);
	}
	onCellClick(index) {
		if (this.props.status !== STATUS.WIN) {
			if (this.props.field[index] === PLAYER.NOBODY) {
				const newField = [...this.props.field];

				newField[index] = this.props.currentPlayer;

				this.state.dispatch(
					setCurrentPlayer(
						this.props.currentPlayer === PLAYER.CROSS
							? PLAYER.NOUGHT
							: PLAYER.CROSS,
					),
				);

				this.state.dispatch(setField(newField));

				if (winnerFunc(newField, this.props.currentPlayer)) {
					this.state.dispatch(setStatus(STATUS.WIN));
					this.state.dispatch(setPlayerAction("победил"));
					this.state.dispatch(
						setCurrentPlayer(PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS),
					);
				} else if (newField.every((item) => item !== PLAYER.NOBODY)) {
					this.state.dispatch(setPlayerAction("ничья"));
					this.state.dispatch(setCurrentPlayer(PLAYER.NOBODY));
					this.state.dispatch(setStatus(STATUS.WIN));
				}
			}
		}
	}

	render() {
		return (
			<div className="text-cyan-800 h-screen flex flex-col items-center text-lg font-medium pt-20">
				<Info />
				<div className="grid grid-cols-3 grid-rows-3 gap-px  size-80  shadow-xl mb-10 ">
					{this.props.field.map((item, index) => (
						<button
							className="bg-slate-200 hover:bg-blue-100 text-3xl "
							key={index}
							onClick={() => this.onCellClick(index)}
						>
							{PLAYER_SIGN[item]}
						</button>
					))}
				</div>
				{this.props.status === STATUS.WIN ? <Button /> : ""}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	status: state.status,
	field: state.field,
	currentPlayer: state.currentPlayer,
	playerAction: state.playerAction,
});

export const App = connect(mapStateToProps)(AppContainer);
