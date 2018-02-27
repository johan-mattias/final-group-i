import React, { Component } from 'react'
import Select from 'react-select';
import {ReactDOM, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";

import '../Style/Select.css';

class SelectCourse extends Component {
	constructor(props) {
    super(props);
  }

	
	state = { 
		options: [],
		// options: [
		// 	{ value: 10, label: 'Ten' },
		// 	{ value: 11, label: 'Eleven' },
		// 	{ value: 12, label: 'Twelve' },
		// 	{ value: 23, label: 'Twenty-three' },
		// 	{ value: 24, label: 'Twenty-four' }
		// ],
		matchPos: 'any',
		matchValue: true,
		matchLabel: true,
		value: null,
		multi: false
	  }

	componentWillMount = () => {
    this.setState({
      value: this.props.value,
      options: this.props.options
    })
  }
  

	onChange(value) {
		this.setState({ value })
			
    this.props.onChangeCB(value, () =>{

    })
		
		console.log('Numeric Select value changed to', value);
	}
	onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	}
	render () {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return (
			<div className="select-container">
				<Select
					matchPos={'any'}
					matchProp={'label'}
					multi={false}
					onChange={this.onChange.bind(this)}
					options={this.state.options}
					simpleValue
					value={this.state.value}
					/>
			</div>
		);
	}
}

export default withRouter(SelectCourse);