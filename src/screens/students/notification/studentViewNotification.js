import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentViewNotification.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar} from 'react-bootstrap';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';

class studentViewNotification extends Component {
  
  constructor() {
    super();

    this.state = {
        myNotifications:[]
    }
  }

  componentDidMount(){
    this.validation()
      this.addData()
  }

  validation(){
    var data = this.props.accounttype;
   if(data.includes('Student')){
    this.props.history.index=0;
   }else{
    Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
    this.props.history.push("/");
   }
  }
 

  addData(){
      const{myNotifications}=this.state;

      firebase.database().ref(`/Notification`).on("value", (snapshot)=> {         
        snapshot.forEach((childSnapshot)=> {
            if(childSnapshot.val().to == 'Student'){
            var obj = {
                message : childSnapshot.val().message ,
                date : childSnapshot.val().date
             }
            myNotifications.push(obj);
            this.setState({myNotifications})
          }
        })
    })


    //   myNotifications.push({ id:'awexgbt' ,logo:require('../../../images/stuuser.png') ,  orgName:'SSUET' , subject:'Seminar on AI' , date:'12-4-2018' , time:'1:00 pm' })
    //   myNotifications.push({ id:'1we4hji' ,logo:require('../../../images/stuuser.png') ,  orgName:'App Bakers'  , subject:'Job Available for full stack Developer' , date:'12-4-2018' , time:'10:00am'})
    //   myNotifications.push({ id:'dfmk30f' ,logo:require('../../../images/stuuser.png') ,  orgName:'Decima.AI'  , subject:'Internships Available for full Software Engineer' , date:'12-7-2018' , time:'11:30am'  })
    }


  render(){
      const {myNotifications} = this.state;
      return(
          <div className="mainNotiDiv">

            <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>     
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
                    <img  style={{height:'70px' , width:'110px'  }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
            </Navbar>  



              <div style={{textAlign:'center'}}>
                {
                     myNotifications.map((val , ind)=>{
                         return(
                            <div className="notiDiv">
                               <p style={{textAlign:'center' , fontSize:'10px'}}> <img style={{width:'30px' , height:'30px' }} src={require('../../../images/stuuser.png')}/> <b>Notification from Admin </b> </p>
                                <hr/>
                                <p style={{fontSize:'12px'}}> <b> Message : </b>  {val.message} <br/> 
                                <b> Date : </b>  {val.date} <br/> 
                                </p>
                               
                            </div>
                        )
                     })
             
                }
                </div>


            </div>
      )
  }

}

function mapStateToProp(state) {
    return ({
      details: state.root.studentInfo ,
      accounttype : state.root.accountType
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
        //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(studentViewNotification);
  