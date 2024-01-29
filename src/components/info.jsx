import { Component } from "react";
import { PLAYER_NAME } from "../constants";
import { connect } from "react-redux";

class InfoContainer extends Component {
	render() {
		return (
			<div className="h-8 mb-10">{`${this.props.playerAction}  ${
				PLAYER_NAME[this.props.currentPlayer]
			}`}</div>
		);
	}
}

const mapStateToProps = (state) => ({
	status: state.status,
	field: state.field,
	currentPlayer: state.currentPlayer,
	playerAction: state.playerAction,
});

export const Info = connect(mapStateToProps)(InfoContainer);
