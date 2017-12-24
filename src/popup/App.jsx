import React from 'react';

	function getLeaf(path) {
		let keys = Object.keys(path);
		let results = [];
		if(keys.length > 0) {
			for(let key of keys) {
				let result = getLeaf(path[key]);
				if(result.length > 0) {
					for(let r of result) {
						results.push(`${key}.${r}`);
					}
				} else {
					results.push(key);
				}
			}
		}
		return results;
	};
export default class App extends React.Component {
	render() {
		let keys = getLeaf(this.props.keys);
		let list = keys.map((k) => <li key={k}>{k}</li>);
		return <ul>{list}</ul>;
	};
}
