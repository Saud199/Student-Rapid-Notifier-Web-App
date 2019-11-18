import React, {Component} from 'react';
import '../../css/bootstrap.min.css';
import './Login.css';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import firebase from '../../config/firebase.js'
import '../Loader/loader.css'
import {Link} from 'react-router-dom';
import {Button} from '../../components/button/button.js'
import Modal from 'react-responsive-modal';
import {StudentDetail , TeacherDetail , AdminDetail , OrganizationDetail} from '../../store/action/action';
import axios from 'axios'


class Login extends Component {

 constructor(){
   super()
   this.state={
    progress : false ,
    open: false,
    femail:'' ,
    fques : '' ,
    fans : '' ,
    fpass : ''
   }
  this.getDetail = this.getDetail.bind(this);
 }

 onOpenModal() {
  this.setState({ open: true });
  };

 onCloseModal = () => {
  this.setState({ open: false });
  };

  getQuestion(){
  const { femail , fques , fans , fpass } = this.state;
  var  email = document.getElementById('secemail').value.toLowerCase();
    if(email.length<4){
      Swal.fire('Oops' , 'Enter Correct Email Address' , 'error')
    }else{
      firebase.database().ref("/Users").orderByChild("email").equalTo(""+email).on("value", (snapshot)=> {
        if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=> {
         var data = childSnapshot.val();
         console.log(data)
         document.getElementById('secques').innerHTML=data.secQuestion;
         this.setState({
           femail : data.email ,
           fques : data.secQuestion ,
           fans : data.secAns ,
           fpass : data.pass
         })
        })
      }
        else{
          Swal.fire('Oops...', 'The email is not found in database', 'error')
        }
      })
    }
  }

 getAnswer(){
  const { femail , fques , fans , fpass } = this.state;
  var from = "admin@stutech.com"
  var to = ""+femail;
  var subject = "Forget Password Request!"
  var message = "Your Stutech Account Password is :"+fpass;
  var ans = document.getElementById('secans').value;
   console.log(ans , fans )
  if(fans.toLowerCase()==ans.toLowerCase()){
    axios.post('https://stutech2019.herokuapp.com/send', {
      from , to , subject , message
    }).then((res) => {
      console.log(res.statusText);
      Swal.fire('Done' , 'Your Paasword has been sent to your email' )
    });
  }
  else{
    Swal.fire('Oops' , 'Your Answer was incorrect' , 'error')
  }

 }

 checkLogin(){

   const {progress} = this.state;

    var  loginemail = document.getElementById('email').value.toLowerCase();
    var  loginpassword = document.getElementById('pass').value;

        // veification  of user input locally
        if (loginemail.length < 4) {
          Swal.fire('Oops...', 'Please Enter Valid Email Address ', 'error')
          }
          else if (loginpassword.length < 6) {
            Swal.fire('Oops...', 'Password Should Contain 6 or more Character', 'error')
          }
          else{
          // verification of user input on firebase database
          this.setState({progress:true})
          firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword) 
          .then((userResponse)=> {
             this.getDetail();
          }) 
          // catch error if any error occur in firebase verification
          .catch((error)=> {
            this.setState({progress:false})
            Swal.fire('Oops...', ''+error.message, 'error')
          });
        }
      }

  getDetail(){
    const {progress , } = this.state ;
    var  loginemail = document.getElementById('email').value.toLowerCase();

     firebase.database().ref("/Users").orderByChild("email").equalTo(""+loginemail).on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
        
        var accType = childSnapshot.val().accountType;
        var data = childSnapshot.val();
        console.log('data' , data)

        if(data.accountStatus=='Approved')
        {
        if(accType=='Student'){

           var stuObj = {
            name : data.name ,
            DOB : data.DOB ,
            department : data.department ,
            accountType : data.accountType ,
            email : data.email ,
            gender : data.gender ,
            id : data.id ,
            imgURL : data.imgURL ,
            number : data.ph_no ,
            rollNo : data.rollNo ,
            section : data.section ,
            batch : data.batch  
           }
           
           this.setState({progress:false})
           this.props.studentInfo(stuObj);
          
             var obj = {
               name : data.name ,
               email : data.email ,
               ph_no : data.ph_no ,
               gender : data.gender ,
               image : data.imgURL ,
               batch : data.batch ,
               department : data.department , 
             }
            firebase.database().ref(`Student/${data.rollNo}/StudentInfo`).update(obj);
           
            this.props.history.push("/stuAfterLogin");


        }
        else if(accType=='Teacher'){

          var techObj = {
            name : data.name ,
            DOB : data.DOB ,
            department : data.department ,
            designation : data.designation ,
            accountType : data.accountType ,
            email : data.email ,
            empID : data.empID ,
            gender : data.gender ,
            id : data.id ,
            imgURL : data.imgURL ,
            number : data.ph_no ,
            qualification : data.qualification
           }

           this.setState({progress:false})
           this.props.teacherInfo(techObj);
           this.props.history.push("/techAfterLogin");
          
          }
          else if(accType=='Organization'){
          
            var orgObj = {
              name : data.name ,
              address : data.address ,
              email : data.email ,
              id : data.id ,
              imgURL : data.imgURL ,
              accountType : data.accountType ,
              number : data.ph_no ,
              webLink : data.webLink
             }

             this.setState({progress:false})
             this.props.organizationInfo(orgObj);
             this.props.history.push("/orgAfterLogin");

         }

         else if(accType=='Admin'){
          
          var AdmObj = {
            id : data.id,
            name : data.name ,
            email : data.email,
            number : data.ph_no ,
            pass : data.pass ,
            accountType : 'Admin' ,
           }

           this.setState({progress:false})
           this.props. adminInfo(AdmObj);
           this.props.history.push("/adminAfterLogin");

       }


      } else if (data.accountStatus=='Block')
      {
        this.setState({progress:false})
        Swal.fire('Oops' , 'Your Account has been Blocked' , 'error')
      }
      else if (data.accountStatus=='Not Approved')
      {
        this.setState({progress:false})
        Swal.fire('Oops' , 'Your Account is not Approved By admin ' , 'error')
      }else{
        this.setState({progress:false})
        Swal.fire('Oops' , 'Something Went Wrong ' , 'error')
      }

      })
    })
  }

  
 render(){
   const {progress , open , fques , femail , fans} = this.state;
  return(   
    <div className="row">

      <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h4 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Forgot Password </b> </h4>
          <p style={{textAlign:'center'}}>  <b>" After Entering an Email Address , User Should Provide the Answer of Security Question in order to get Password on Provided Email Address."  </b> </p>
          <hr/>
           
        
           <input className="form-control" style={{marginBottom:'5px'}} id="secemail"  placeholder="Write Your Email Address Here" />
           <p style={{textAlign:'center'}}> <Button  style={{margin:'2px auto'}} type="submit" text="Submit" onClick={()=>this.getQuestion()} /> </p>
          
           <hr/>
           <p id="secques" className="form-control"> </p>
           <input className="form-control" style={{marginBottom:'5px'}} id="secans" placeholder="Write Your Answer Here" />
           
            <Button  style={{margin:'2px auto'}} type="submit" text="Submit" onClick={()=>this.getAnswer()} />
          </div>
        </Modal>

              
              <div className="col-md" style={{ paddingTop:'200px' , backgroundColor:'rgb(20, 194, 224)' , height:'100vh'}} >

                <div style={{textAlign:'center'}}> <img style={{width:'320px' , height:'280px'}} src={require('../../images/stutech_logo_new.png')} /> </div>

              </div>

              <div className="col-md" style={{float:'right',paddingTop:'100px'}} id="div2" >
                  <h3 className="text-center">Login</h3>

                  <br />
                  <br />

                  <div className="col-auto">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>@</div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="email" placeholder="Enter your email"/>
                    </div>
                  </div>
  
                  <br />
  
                  <div className="col-auto">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass" placeholder="Enter your password"/>
                    </div>
                  </div>
  
                  <br />

                  {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

                  {!progress && <div align="center"><button className="LgBtn btn btn-success" onClick={()=>this.checkLogin()}>  Login  </button></div>}
                  
{/*                   
                  <div align="center"><Link to="/stuAfterLogin">  <Button text='Stu Login'  type='submit' onClick={() =>Swal.fire('Congratulations!','You Logged in Sucessfully !')}/> </Link> </div>
                  <div align="center"><Link to="/techAfterLogin">  <Button text='Tech Login'  type='submit' onClick={() =>Swal.fire('Congratulations!','You Logged in Sucessfully !')}/> </Link> </div>
                  <div align="center"><Link to="/adminAfterLogin">  <Button text='Adm Login'  type='submit' onClick={() =>Swal.fire('Congratulations!','You Logged in Sucessfully !')}/> </Link> </div>
                  <div align="center"><Link to="/orgAfterLogin">  <Button text='Org Login'  type='submit' onClick={() =>Swal.fire('Congratulations!','You Logged in Sucessfully !')}/> </Link> </div>
                        <br />  */}
                        <br/>
                  <div align="center">Don't have an account ? <a> <Link to="/signup1"> Create Accout </Link></a> </div>
                  <div align="center"> <a style={{color:'rgb(47, 143, 233)'}} onClick={()=>this.onOpenModal()}>  Forget Password </a> </div>
          
              </div>  
                
           </div> 
  )}
}

function mapStateToProp(state) {
  return ({
    http_request: state.root.emailLink 
  })
}

function mapDispatchToProp(dispatch) {
  return ({
       studentInfo : (info)=>{ dispatch(StudentDetail(info))} ,
       teacherInfo : (info2)=>{ dispatch(TeacherDetail(info2))} ,
       organizationInfo :(info3)=>{ dispatch(OrganizationDetail(info3))} ,
       adminInfo : (info4)=>{ dispatch(AdminDetail(info4))} 
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);