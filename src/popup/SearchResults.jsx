import React from 'react';

let search = (pattern, root, files) => {
	let results = [];
	for(let file of files) {
		let path = root + '/' + file.name;
		if(file.type === 'file' && path.match(new RegExp(pattern))) {
			results.push({
				root,
				"file": file.name,
			});
		} else if(file.type === 'folder') {
			results = results.concat(search(pattern, path, file.files));
		}
	}
	return results;
}

export default class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"files": this.props.files,
			"pattern": this.props.pattern,
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState(
			Object.assign(this.state, {
				"files": nextProps.files,
				"pattern": nextProps.pattern,
			})
		);
	}
	render() {
		let searchResults = search(this.state.pattern, '', this.state.files);
		let searchList = searchResults.map(({root, file}) => {
			return <div key={root+'.'+file} className="file">
				<span className='root'>{root}/</span><span className="key">{file}</span>
			</div>;
		});
		return <div>{searchList}</div>;
	}
}
