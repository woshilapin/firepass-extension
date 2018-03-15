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
				return renderFile(this.state.root, folder);
			} else if(folder.type === 'folder') {
				return renderFolder(this.state.root, folder);
			}
		});
		return <ul
			className="component-folder">
			{list}
		</ul>;
	}
}

let renderFile = (root, folder) => {
	let key = root + '.' + folder.name;
	return <li
		key={key}>
		<File
			root={root}
			{...folder}
		/>
	</li>;
}

let renderFolder = (root, folder) => {
	let key = root + '/' + folder.name;
	return <li
		key={key}
		className={folder.type}>
		<span className="name">{folder.name}/</span>
		<Folder root={key} files={folder.files} />
	</li>;
}
