import React from 'react';
import Folder from './Folder.jsx';

export default class App extends React.Component {
	render() {
		return <Folder files={this.props.logins} />;
	};
}
