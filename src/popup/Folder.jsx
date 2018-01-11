import React from 'react';
import File from './File.jsx';

export default class Folder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"root": this.props.root,
			"files": this.props.files,
		};
	}
	render() {
		let list = this.state.files.map((folder) => {
			if(folder.type === 'file') {
				return <File
					key={this.state.root+'.'+folder.name}
					root={this.state.root}
					{...folder}
				/>;
			} else if(folder.type === 'folder') {
				let root = this.state.root + '/' + folder.name;
				return <div key={root} className={folder.type}>
					<span className="root">{root}</span>
					<Folder root={root} files={folder.files} />
				</div>;
			}
		});
		return list;
	}
}
