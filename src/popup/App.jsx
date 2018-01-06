import React from 'react';

class File extends React.Component {
	render() {
		return <div className="file">
			{this.props.name}
		</div>;
	}
}
class Folder extends React.Component {
	render() {
		let list = this.props.files.map((file) => {
			if(file.type === 'file') {
				return <li key={file.name}>
					<File {...file} />
				</li>;
			} else if(file.type === 'folder') {
				return <li key={file.name}>
					<div className="folder">
						{file.name}
						<Folder files={file.files} />
					</div>
				</li>;
			}
		});
		return <ul>{list}</ul>;
	}
}
export default class App extends React.Component {
	render() {
		return <Folder files={this.props.logins} />;
	};
}
