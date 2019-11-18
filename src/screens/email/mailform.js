import React, {Component} from 'react';
import '../../css/bootstrap.min.css';
import {Link , Redirect} from 'react-router-dom';
import {Button} from '../../components/button/button.js'



class mail extends Component {


	render(){
		return(
		<form  onSubmit = {()=><Redirect to='https://faizan963.000webhostapp.com/' />}>
		<input type="text" name="email" id="email" placeholder="email"/>
		<input type="text" name="subject" id="subject" placeholder="subject"/>
		<input type="text" name="message" id="message" placeholder="message"/>
		<input type="submit" name="submit" id="submit"/>
	    </form>
		)
	}
} 
export default mail;