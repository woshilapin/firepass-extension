import React from 'react';

export default class File extends React.Component {
	render() {
		return <div className={this.props.type}>
			<span className='root'>{this.props.root}/</span><span className="key">{this.props.name}</span>
		</div>;
	}
}
