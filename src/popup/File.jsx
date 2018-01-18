import React from 'react';

export default class File extends React.Component {
	render() {
		let metadata = this.props.metadata;
		let url = undefined;
		if (metadata && metadata.url) {
			url = <span className='login'>{metadata.url}</span>
		}
		return <div className={this.props.type}>
			<span className='root'>{this.props.root}/</span><span className="key">{this.props.name}</span>
			{url}
		</div>;
	}
}
