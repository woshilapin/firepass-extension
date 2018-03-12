import React from 'react';
import Folder from './Folder.jsx';
import SearchResults from './SearchResults.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"logins": this.props.logins,
			"value": '',
		}
		this.onChange = this.onChange.bind(this);
	}
	onChange(event) {
		this.setState(
			Object.assign(this.state, {
				"value": event.target.value,
			})
		);
	}
	render() {
		let logins = <Folder root="" files={this.state.logins} />;
		let classNames = ['list', 'folder'];
		if (this.state.value) {
			logins = <SearchResults pattern={this.state.value} files={this.state.logins} />;
			classNames = ['list', 'search'];
		}
		return <div id="component-app">
			<input
				id="search"
				type="search"
				name="search"
				placeholder="search..."
				onChange={this.onChange}
				value={this.state.value}
			/>
			<div className={classNames.join(' ')}>
				{logins}
			</div>
		</div>;
	};
}
