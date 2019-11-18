import React, {Component} from 'react';
import '../../css/bootstrap.min.css';
import './signup1.css';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import {SignupDetail} from '../../store/action/action';
import Signup2 from './signup2.js'
import {Link} from 'react-router-dom'; 
import { Button} from '../../components/button/button.js'


class Signup1 extends Component {

 constructor(){
   super();

   this.state ={

    // fName:'',
    // lName:'',
    // email:'',
    // number:'',
    // gender:''

   }

 }

 setDetail(){
  
   var a = document.getElementById('fname').value; 
   var b = document.getElementById('lname').value; 
   var c = document.getElementById('email').value; 
   var d = document.getElementById('number').value;
   var e = document.getElementById('pass1').value;
   var f = document.getElementById('pass2').value; 
   var g  
   var g = document.getElementById("r2")

   
   
   if(a.length<2){
    Swal.fire('Oops...', 'Please Enter Your First name Correctly', 'error')
   }
   else if(b.length<2){
    Swal.fire('Oops...', 'Please Enter Your Last name Correctly', 'error')
   }
   else if(c.length<6 || !c.includes('@')  || !c.includes('.')){
    Swal.fire('Oops...', 'Please Enter A  Valid Email Address', 'error')
   }
   else if(e.length<6 ){
    Swal.fire('Oops...', 'Write Your Password Correctly. It must Contain 6 or more Characters', 'error')
   }
   else if(e!=f ){
    Swal.fire('Oops...', 'Please Check Your Re-type Password', 'error')
   }
   else if(d.length<12 || d.length>12){
    Swal.fire('Oops...', 'Please Must Write Your Number in this Format 923120000000', 'error')
   }
   else if(document.getElementById("r1").checked == false && document.getElementById("r2").checked == false){
    Swal.fire('Oops...', 'Please Select Your Gender', 'error')
   }
   else{
     
    if(document.getElementById("r1").checked)
     { g=document.getElementById("r1").value; console.log(g)}
    else
     { g=document.getElementById("r2").value; console.log(g)}

     var obj = {
          fname: a ,
          lname: b , 
          email : c ,
          number : d ,
          pass1 : e ,
          gender : g
     }

     this.props.getUserinfo(obj);
     console.log(obj);

     document.getElementById('pass1').value = "";
     document.getElementById('pass2').value = ""; 


     this.props.history.push("/signup2");

   }

 }
  
 render(){
  return(
   <div>
      <div className="row" style={{height:'100vh'}}>
              
          <div className="col-md" style={{ paddingTop:'200px' , backgroundColor:'rgb(20, 194, 224)'}} >

          <div style={{textAlign:'center'}}> <img style={{width:'320px' , height:'280px'}} src={require('../../images/stutech_logo_new.png')} /> </div>

        </div>

              <div className="col-lg-5" style={{float:'right',paddingTop:'100px'}} id="div2" >
                    <h3 className="text-center">Create Account</h3>
    
                    <br/>
    
                    <div align="center">Want to signup as an organization ? <a><Link to="/signuporg">Click Here</Link></a> </div>
    
                    <br/>
    
                    <div className="form-row align-items-center mx-1" >
    
                        <div className="col-6">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}}>FN</div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control"   id="fname" placeholder="First Name"/>
                            </div>
                        </div>
    
                        <div className="col-6">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}}>LN</div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control" id="lname" placeholder="Last Name"/>
                            </div>
                        </div>
    
                    </div>
    
                    <br />
    
                    <div className="form-row align-items-center mx-1" >
                        <div className="col-12">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}}>@</div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}} type="email" className="form-control" id="email"  placeholder="Email"/>
                            </div>
                        </div>
                    </div>
    
                    <br />
    
                    <div className="form-row align-items-center mx-1" >
                        <div className="col-12">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../images/pass.png')} width="15px" height="15px" /></div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}} type="password" className="form-control" id="pass1"  placeholder="Password"/>
                            </div>
                        </div>
                    </div>

                    <br />
    
                  <div className="form-row align-items-center mx-1" >
                      <div className="col-12">
                          <div className="input-group mb-2">
                            <div className="input-group-prepend">
                              <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../images/pass.png')} width="15px" height="15px" /></div>
                            </div>
                            <input style={{fontSize:'12px' , height:'30px'}} type="password" className="form-control"  id="pass2" placeholder="Re-type Password"/>
                          </div>
                      </div>
                  </div>
                  
                 <br />
    
                    <div className="form-row align-items-center mx-1" >
                        <div className="col-12">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../images/phone.png')} width="15px" height="15px" /></div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}} type="number" className="form-control"  id="number" placeholder="Contact Number"/>
                            </div>
                        </div>
                    </div>
    
                    <br />
    
                    <div className="row">
                        <legend style={{fontSize:'12px'}} className="col-form-label col-3 pt-0 mx-3">Gender : </legend>
                            <div className="col-8 form-row align-items-center" id="radio">
                              <div className="form-check" >
                                <input className="form-check-input" type="radio" name="r1" id="r1" value="male" />
                                <label style={{fontSize:'12px'}} className="form-check-label" value="Male">Male</label>
                              </div>
                              <div className="form-check ml-5">
                                <input className="form-check-input" type="radio" name="r1" id="r2" value="female"/>
                                <label style={{fontSize:'12px'}} className="form-check-label" value="Female">Female</label>
                              </div>
                            </div>
                    </div>
  
                  <br />
  
                  <div align="right"><Button text='Next' onClick={()=>{this.setDetail() }}  type='submit'/></div>
                  <br />
          
              </div>  
                
           </div>
   </div>

  )}
}

function mapStateToProp(state) {
  return ({
  })
}
function mapDispatchToProp(dispatch) {
  return ({
       getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Signup1);
