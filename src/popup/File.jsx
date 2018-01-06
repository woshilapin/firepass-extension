import React from 'react';

export default class File extends React.Component {
	render() {
		return <div className="file">
			{this.props.name}
		</div>;
	}
}
