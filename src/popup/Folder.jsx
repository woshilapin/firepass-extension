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
				return <div key={this.state.root+'.'+folder.name} className="folderWrapper">
					<File
						root={this.state.root}
						{...folder}
					/>
				</div>;
			} else if(folder.type === 'folder') {
				let root = this.state.root + '/' + folder.name;
				return <div key={root} className="folderWrapper">
					<div className={folder.type}>
						<span className="root">{folder.name}/</span>
					</div>
					<Folder root={root} files={folder.files} />
				</div>;
			}
		});
		return list;
	}
}
