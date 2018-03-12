import React from 'react';

export default class File extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"root": this.props.root,
			"name": this.props.name,
			"showRoot": this.props.showRoot || false,
		};
	}
	render() {
		let metadata = this.props.metadata;
		let root = undefined;
		if (this.state.showRoot) {
			root = <span className="base">{this.state.root}/</span>;
		}
		let key = <span className="name">{this.state.name}</span>;
		let path = <div className="path">{root}{key}</div>;
		let url = undefined;
		if (metadata && metadata.url) {
			url = <div className="login-url">{metadata.url}</div>
		}
		return <div className="component-file">
			{path}
			{url}
		</div>;
	}
}
