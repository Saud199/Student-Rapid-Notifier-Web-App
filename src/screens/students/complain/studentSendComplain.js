import React, { Component } from 'react';
import '../../../css/bootstrap.min.css';
import './studentSendComplain.css';
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav} from 'react-bootstrap';
import Swal from 'sweetalert2'
import {StudentDetail} from '../../../store/action/action.js';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase.js'
import '../../Loader/loader.css'
import Modal from 'react-responsive-modal';


class studentSendComplain extends Component {
   
    constructor(props){
        super(props);
        this.state = {
          progress : false ,
          myComp : [] ,
          open: false,
        }
      }

componentDidMount(){ 

    if(this.props.accounttype=='Student'){
    }
   else{
    Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
    this.props.history.push("/");
   }

    var data = this.props.details;
     
     document.getElementById('name').innerHTML=data.name;
     document.getElementById('email').innerHTML=data.email;
     document.getElementById('phone').innerHTML=data.number;
     document.getElementById('rollno').innerHTML=data.rollNo;
     document.getElementById('section').innerHTML=data.section;
     document.getElementById('department').innerHTML=data.department;
   
} 

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 

MyComplain(){
    const {myComp} = this.state;

    while(myComp.length > 0) {
         myComp.splice(0,1); 
        }
    
    var data = this.props.details;
    console.log(''+data.email)
    firebase.database().ref("StudentComplain").orderByChild("email").equalTo(""+data.email).on("value", (snapshot)=> {
        snapshot.forEach((childSnapshot)=> { 
            var s1 = childSnapshot.val().subject;
            var s2 = childSnapshot.val().details;
            var s3 = childSnapshot.val().step;
            var s4 = childSnapshot.val().date;

            var complain = {
                s1 , s2 , s3 , s4
            }
            myComp.push(complain);
        }) 
        this.onOpenModal();
    })
}

SendComplain(){
    const {progress} = this.state;
    
     var sub =  document.getElementById('subject').value;
     var det =  document.getElementById('detail').value;
     var step =  document.getElementById('step').value;
     var date =  document.getElementById('date').value;

     if(sub.length<3){
        Swal.fire('Oops...', 'Please ! Write Subject Correctly ', 'error')
     }else if(det.length<3){
        Swal.fire('Oops...', 'Please ! Write Details Correctly ', 'error')
     }else if(step.length<3){
        Swal.fire('Oops...', 'Please ! Write Steps Correctly ', 'error')
     }else if(date.length<2){
        Swal.fire('Oops...', 'Please ! Select Date Correctly ', 'error')
     }else{
        this.setState({progress:true})

        var database = firebase.database().ref();
        
        var skey =firebase.database().ref('StudentComplain/').push();

        var data = this.props.details;
      
        var stuObj = {
          id : skey.key ,
          senderId : data.id ,
          name : data.name ,
          email : data.email ,
          rollNo : data.rollNo ,
          section : data.section ,
          department : data.department ,
          batch : data.batch,
          subject : sub ,
          date : date ,
          step : step ,
          details : det
        }
  
        skey.set(stuObj); 
        this.setState({progress:false})

         document.getElementById('subject').value=""
         document.getElementById('step').value=""
         document.getElementById('detail').value=""
         
        Swal.fire('Congratulation', 'Your Complain has been Sent')
        
    }
}    

render(){
    const {progress , myComp , open} = this.state;
    return(
    <div>

   <Modal open={open} onClose={this.onCloseModal} center>
        <div className="form-control">
        <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> My Complains </b> </h6>
        <hr/>
        { myComp.length<1 && <h4> No Complain Found </h4>  }

        { myComp.map((val , index ) => {                  
        return(
        <div style={{borderRadius:'2px' , padding:'20px' , border:'solid 1px black' , margin:'10px' ,}} >    
        <p> <b>Subject : </b> {val.s1} <br/> 
            <b>Details : </b> {val.s2} <br/>
            <b>Step Taken : </b> {val.s3} <br/>
            <b>Date : </b> {val.s4} </p>
        </div>
        )})
      }
        </div>
      </Modal>    

    <div className="mh-100" style={{backgroundColor:'whitesmoke'  , minHeight:'100vh'}}>        
        <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
        <Navbar.Brand>
            <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
            <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
        </Navbar.Brand>
        <Nav.Link><Button  text="My Complains" onClick={()=>this.MyComplain()} /></Nav.Link>
        </Navbar>  


          <div class="row">
             
               <div className="col-md-5 halfdivC" >

                 <h6 style={{textAlign:'center' , color:'rgb(20, 194, 224)'}} className="text-center" >   STUDENT INFORMATION  </h6>
                 
                 <hr/>

                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Name</b></label>
                     <p style={{ height:'30px' }} id="name"  className="col-sm-12 form-control"> </p>
                 </div>


                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Email</b></label>
                     <p style={{ height:'30px' }} id="email"  className="col-sm-12 form-control"> </p>
                 </div>


                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Phone</b></label>
                     <p style={{ height:'30px' }} id="phone"  className="col-sm-12 form-control"> </p>
                 </div>

                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Roll No</b></label>
                     <p style={{ height:'30px' }} id="rollno"  className="col-sm-12 form-control"> </p>
                 </div>

                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Section</b></label>
                     <p style={{ height:'30px' }} id="section"  className="col-sm-12 form-control"> </p>
                 </div>
                 

                 <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Department</b></label>
                     <p style={{ height:'30px' }} id="department"  className="col-sm-12 form-control"> </p>
                 </div>

                 {/* <div>
                     <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Batch</b></label>
                     <p style={{ height:'30px' }} id="batch"  className="col-sm-12 form-control"> </p>
                 </div> */}
             
                 </div>  


               <div className="col-md-6  halfdivC" >

               <h6 style={{textAlign:'center' , color:'rgb(20, 194, 224)'}} className="text-center" >   COMPLAINT INFORMATION  </h6>
                 
                <hr/>

                <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Subject </b></label>
               <input className="col-sm-12 form-control" id="subject"></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Complaint Details</b></label>
               <textarea className="col-sm-12 form-control" id="detail"></textarea>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>What step should be considerd to avoiding a repeatition of  problem </b></label>
               <textarea className="col-sm-12 form-control" id="step"></textarea>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Date </b></label>
               <input style={{fontSize:'12px'}} type="Date" id="date" className="col-sm-12 form-control"/>
               <br/>
               </div>

               {/* <div className="form-group mx-1">
                    <label style={{fontSize:'12px'}} >Complaint Type</label>
                    <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedAccountType} >
                        <option style={{fontSize:'12px'}} value="student">Non-Anonymous</option>
                        <option style={{fontSize:'12px'}} value="teacher">Anonymous</option>
                    </select>
                </div> */}

                    {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

                <br/>
               {!progress && <div align="center"><Button text='Submit'  type='submit' onClick={() =>this.SendComplain()}/></div> }
        

             </div>
        </div>
    </div>

   </div> 
    )
}

}

function mapStateToProp(state) {
    return ({
      details: state.root. studentInfo ,
      accounttype : state.root.accountType
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
        //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
    })
  }
  
  
  export default connect(mapStateToProp, mapDispatchToProp)(studentSendComplain);
  
    