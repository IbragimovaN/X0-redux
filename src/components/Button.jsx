import { connect } from "react-redux";
import { Component } from "react";
import {
	setCurrentPlayer,
	setStatus,
	setField,
	setPlayerAction,
} from "../actions";
import { PLAYER, STATUS } from "../constants";

class ButtonContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dispatch: props.dispatch,
		};
	}

	render() {
		return (
			<button
				className="rounded-md bg-white px-2.5 h-8 text-sm  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				onClick={this.onClickStartGame}
			>
				начать игру заново
			</button>
		);
	}
	onClickStartGame = () => {
		this.state.dispatch(setCurrentPlayer(PLAYER.CROSS));
		this.state.dispatch(setStatus(STATUS.TURN));
		const newField = new Array(9).fill(PLAYER.NOBODY);
		this.state.dispatch(setField(newField));
		this.state.dispatch(setPlayerAction("ходит"));
	};
}

export const Button = connect()(ButtonContainer);
