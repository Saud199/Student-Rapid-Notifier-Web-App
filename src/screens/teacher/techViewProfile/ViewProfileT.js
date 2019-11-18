import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './ViewProfileT.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

class TeachViewProfile extends Component {
  
  constructor() {
    super();

    this.state = {
        skills:[] ,
        achievements:[],
        dataIndex : null

    }
  }

  componentDidMount(){
    this.validation()
  }

  validation(){
    var data = this.props.accounttype;
  if(data.includes('Teacher')){
    this.props.history.index=0;
  }else{
    Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
    this.props.history.push("/");
  }
  }

  // addData(){
  //     const{skills , achievements}=this.state;
  //      skills.push({ id:'awexgbt' , skill:'Java'})
  //      skills.push({ id:'awexgbt' , skill:'Java script'})
  //      skills.push({ id:'awexgbt' , skill:'React.js'})   

  //      achievements.push({id:'1' , achieve:'complete android course'})
  //      achievements.push({id:'1' , achieve:'complete python course'})
  //      achievements.push({id:'1' , achieve:'complete react course'})
  //   }


  // showFullData(e){
  //   const {dataIndex}  = this.state; 
  //  document.getElementById('adata').innerHTML = null
  //   this.setState({dataIndex:e})
  // }  


  render(){
      const {skills , achievements} = this.state;
      // this.addData();
      return(
          <div  style={{minHeight:'800px'}}>
            
            <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                    <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
          </Navbar>


          <div className="col-lg  div1TVP  row" >
             
             <div className="col-lg div2TVP">
                <p style={{textAlign:'center' , margin:'20px'}}> <img  className="img1TVP" src={this.props.details.imgURL}/> </p>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Personal Information </b> </h6>
                    <p>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.name} </b><br/><br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>PhoneNo&nbsp;&nbsp;&nbsp;: {this.props.details.number}</b>{}<br/><br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.email} </b>{}<br/><br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.gender} </b>{}<br/><br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>DOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.DOB} </b>{}<br/><br/>
            
                    </p>

             </div>

             <div className="col-lg div3TVP">
                    <br/>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Teacher Information  </b> </h6>
                    <p>
                        <br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%'  , fontSize:'14px'}}>Employee ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.empID} </b>{}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%'  , fontSize:'14px'}}>Designation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.designation}</b>{}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%'  , fontSize:'14px'}}>Department&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.details.department}</b>{}<br/>
                    </p>


                    <br/>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Qualifactions : </b> <b> {this.props.details.qualification} </b> </h6>
                    <p>
                     {/* {
                     achievements.map((val , index ) => {
                       return(
                         <ul style={{marginLeft:'10%' , fontSize:'14px'}}>
                            <li>   
                            <b style={{fontSize:'14px'}}>{ this.props.details.qualification }</b>
                            </li>
                         </ul>
                       )
                    })
                    }                        */}

                    </p>

                   

             </div>

          </div>

        </div>

       )}
    }

    function mapStateToProp(state) {
      return ({
        details: state.root.teacherInfo ,
        accounttype : state.root.accountType
      })
    }
    function mapDispatchToProp(dispatch) {
      return ({
        // teacherInfo :(info3)=>{ dispatch(TeacherDetail(info3))} ,
      })
    }
    
    export default connect(mapStateToProp, mapDispatchToProp)(TeachViewProfile);