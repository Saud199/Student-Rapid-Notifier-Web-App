import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './AdminComplain.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar} from 'react-bootstrap';
import firebase from '../../../config/firebase.js'
class AdminComplain extends Component {
  
  constructor() {
    super();

    this.state = {
        complain:[] , 
        from : 'Student',
        ndiv1 : true ,
        ndiv2 : false 
    }
  }


  addData(e){
      const{complain , from}=this.state;
      this.setState({from : e.target.value})
      while(complain.length > 0) {
        complain.splice(0,1);
        this.setState({complain}) 
       }

    if(e.target.value == 'Student'){  
      firebase.database().ref(`/StudentComplain`).on("value", (snapshot)=> {  
          if(snapshot.exists()){       
        snapshot.forEach((childSnapshot)=> {
            var obj = {
                name : childSnapshot.val().name ,
                email : childSnapshot.val().email ,
                rollNo : childSnapshot.val().rollNo ,
                department : childSnapshot.val().department ,
                subject : childSnapshot.val().subject ,
                message : childSnapshot.val().details ,
                date : childSnapshot.val().date
             }
            complain.push(obj);
            this.setState({complain})
          
        })
       }else {
        Swal.fire('Oops' , 'No Complain Found' , 'error')
       }
    })
  }else if(e.target.value == 'Teacher'){
    firebase.database().ref(`/TeacherComplain`).on("value", (snapshot)=> {         
        if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=> {
            var obj = {
                name : childSnapshot.val().name ,
                email : childSnapshot.val().email ,
                empID : childSnapshot.val().empID ,
                department : childSnapshot.val().department ,
                subject : childSnapshot.val().subject ,
                message : childSnapshot.val().details ,
                date : childSnapshot.val().date
             }
            complain.push(obj);
            this.setState({complain})
          
        })
      }
      else if(e.target.value == 'Organization'){
        firebase.database().ref(`/Messages`).on("value", (snapshot)=> {         
            if(snapshot.exists()){
            snapshot.forEach((childSnapshot1)=> {
                childSnapshot1.forEach((childSnapshot)=> {
                var obj = {
                    name : childSnapshot.val().name ,
                    email : childSnapshot.val().email ,
                    subject : childSnapshot.val().subject ,
                    message : childSnapshot.val().details ,
                    date : childSnapshot.val().date
                 }
                complain.push(obj);
                this.setState({complain})
                })
            })
            }
          })
        }
      
    
      else{
          Swal.fire('Oops' , 'No Complain Found' , 'error')
      }
    })
  }
}


  render(){
      const {complain , from , ndiv1 , ndiv2} = this.state;
      return(
          <div className="mainNotiDiv">

            <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>     
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
                    <img  style={{height:'70px' , width:'110px'  }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
            </Navbar>  

        {ndiv1 &&
            <div>
            <div style={{ textAlign:'center' }}>
            <div className="form-group mx-1" style={{width:'70%' , display:'inline-block'}}>
                <label style={{fontSize:'18px'}}>Account Type</label>
                 <select style={{fontSize:'15px'}} className="form-control" onChange={(e)=>this.addData(e)} >
                    <option style={{fontSize:'15px'}} value="Student">Student</option>
                    <option style={{fontSize:'15px'}} value="Teacher">Teacher</option>
                    <option style={{fontSize:'15px'}} value="Organization">Organization</option>
                 </select>
             </div>
             </div>


              <div style={{textAlign:'center'}}>
                {
                     complain.map((val , ind)=>{
                         return(
                            <div className="notiDiv">
                               <p style={{textAlign:'center' , fontSize:'10px'}}> <img style={{width:'30px' , height:'30px' }} src={require('../../../images/stuuser.png')}/> <b>Student Complain</b> </p>
                                <hr/>
                                <p style={{fontSize:'12px'}}> 
                                <b> Name : </b>  {val.name} <br/> 
                                <b> Email : </b>  {val.email}  <br/>
            {from=='Student' && <b> Roll No :  {val.rollNo}  <br/></b>}
            {from =='Teacher' && <b> Emp ID :  {val.empID}  <br/> </b>}
                                <b> Department : </b> {val.department}  <br/>
                                <b> Subject : </b>  {val.subject}  <br/>
                                <b> Messaage : </b>  {val.message}  <br/> 
                                <b> Date : </b>  {val.date}  <br/>
                                </p>
                            </div>
                        )
                     })
             
                }
                </div>
                </div>
              }
              <div>
              {ndiv2 && 
               <div>
                    {
                     complain.map((val , ind)=>{
                         return(
                            <div className="notiDiv">
                               <p style={{textAlign:'center' , fontSize:'10px'}}> <img style={{width:'30px' , height:'30px' }} src={require('../../../images/stuuser.png')}/> <b>Student Complain</b> </p>
                                <hr/>
                                <p style={{fontSize:'12px'}}> 
                                <b> Name : </b>  {val.name} <br/> 
                                <b> Email : </b>  {val.email}  <br/>
                                <b> Subject : </b>  {val.subject}  <br/>
                                <b> Messaage : </b>  {val.message}  <br/> 
                                <b> Date : </b>  {val.date}  <br/>
                                </p>
                            </div>
                        )
                     })
             
                }

               </div>
              }
              </div>  


            </div>
      )
  }

}

export default AdminComplain;