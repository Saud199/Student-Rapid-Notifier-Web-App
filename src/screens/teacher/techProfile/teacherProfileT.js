import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './teacherprofileT.css';
import {Link} from 'react-router-dom';
import {Button} from '../../../components/button/button.js'
import { Navbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase.js'
import Swal from 'sweetalert2'


class Teacherprofile extends Component {

  constructor() {
    super();

    this.state = {
      Email:'' ,
      Num : '' ,
      Dob :'' ,
      progress1 : false 
          }
    }

    componentDidMount(){
      this.validation();
      this.getPersonalInfo();
    
    }

    getPersonalInfo(){
      const {Email , Num , Dob} = this.state;
  
      var file = document.getElementById('pimg').files[0];
      var data = this.props.details;
  
      firebase.database().ref("/Users/"+data.id).on("value", (snapshot)=> {
       document.getElementById('email2').innerHTML = snapshot.val().email;
       document.getElementById('department').value = snapshot.val().department;
       document.getElementById('designation').value = snapshot.val().designation;
       document.getElementById('number2').value = snapshot.val().ph_no;
       document.getElementById('pimg2').src = snapshot.val().imgURL;
       document.getElementById('qualification').value = snapshot.val().qualification;
       document.getElementById('dob2').value = snapshot.val().DOB;
      

       this.setState({
         Email:snapshot.val().email , 
         Num : snapshot.val().ph_no ,
         Dob : snapshot.val().DOB
        })
      })  
    }
  

    validation(){
      var data = this.props.accounttype;
     if(data.includes('Teacher')){
    
     }else{
      Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
      this.props.history.push("/");
     }
    }


  updatePicture1(){
    var file = document.getElementById('pimg').files[0];
    var data = this.props.details;
    if(file == undefined){
      Swal.fire('Oops...', 'Select your profile Picture', 'error')
    }else{
      this.setState({progress1:true})
      var storageref = firebase.storage().ref("storage");
      var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
      return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
        firebase.database().ref("Users/"+data.id).update({imgURL:downloadURL});
        this.setState({progress1:false})
        Swal.fire( 'Done' ,'Profile Image Updated Successfully')
    })
   }
  }

  updateNumber2(){
    var add = document.getElementById('number2').value;
    if(add=='undefined'  || add.length<12 || add.length>12){
      Swal.fire('Oops...', 'Please Write Your Correct Number in 923000000000', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({ph_no:add});
      Swal.fire('Done' ,'Number Updated Successfully')
    }
  }



  updatePassword2(){
    var data = this.props.details;

    var p1 = document.getElementById('pass1').value;
    var p2 = document.getElementById('pass2').value; 
    var p3 = document.getElementById('pass3').value;
    
    if(p1.length<6 || p2.length<6 || p3.length<6){
        Swal.fire('Oops' , 'Password must contain atleast 6 character' , 'error');
    }
    else if(p1==p2 || p1==p3){
      Swal.fire('Oops' , 'Old and New Password are Same ' , 'error');
    }
    else if(p2!=p3){
      Swal.fire('Oops' ,'Both Password Are not Match' , 'error');
    }
    else{
    
        firebase.auth().signInWithEmailAndPassword(data.email , p1)
            .then(function(user) {
    
                firebase.auth().currentUser.updatePassword(p2).then(function(){
                    firebase.database().ref("Users/"+data.id).update({pass:p2});
                   
                    // document.getElementById('pass1').value=" ";
                    // document.getElementById('pass2').value=" " ; 
                    // document.getElementById('pass3').value=" ";
                   
                    Swal.fire ('Done' , 'Password Updated Successfully');
                
                }).catch(function(err){
                  Swal.fire('Oops' ,''+err , 'error');
                 });
        
            }).catch(function(err){
              Swal.fire('Oops' ,''+err , 'error');
            });
      }
  }


  updateDOB2(){
    var add = document.getElementById('dob2').value;
    if(add=='undefined' || add.length<10 || add.length>10){
      Swal.fire('Oops...', 'Please Write Your Correct Date of Birth in this format (DD-MM-YYYY)', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({DOB:add});
      Swal.fire('Done' ,'Date of Birth Updated Successfully')
    }
  }


  
 department(){
  var add = document.getElementById('department').value;
  if(add=='undefined' || add.length<1){
    Swal.fire('Oops...', 'Please Write Your dreparment name properly', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Users/${data.id}`).update({department : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }


 
 addQualification(){
  var add = document.getElementById('qualification').value;
  if(add=='undefined' || add.length<5){
    Swal.fire('Oops...', 'Please Write Your Detail with more than 5 character', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Users/${data.id}`).update({qualification : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }

 
 designation(){
  var add = document.getElementById('designation').value;
  if(add=='undefined' || add.length<5){
    Swal.fire('Oops...', 'Please Write Your Detail with more than 5 character', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Users/${data.id}`).update({designation : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }
  
   

 render(){
   const {progress1}=this.state;
  return(
    <div> 

      <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
        <Navbar.Brand>
            <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
            <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
        </Navbar.Brand>
        </Navbar>  


            <div className="col-md-12 row" id='div2' style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , margin:'30px auto'}} >
           
            <div className=" col-md-1  div1TSP">
            <br/>
            <h6 style={{color:'rgb(20, 194, 224)'}}>PROFILE</h6>
                <div className="col-md-4" style={{textAlign:'center' , margin:'10px auto'}}>
                  <img  id="pimg2" style={{width:'100px' , height:'100px' , borderRadius:'200px'}} className="Pimg" src={require('../../../images/stuuser.png')} />
                  <br/>
                 </div>
                 <hr/>
                 <input id="pimg" type="file"  text="Upload new Picture" />
                 <button className="btnSgnTSP btn btn-success" onClick={()=>{this.updatePicture1()}}> Update </button>  
                 <hr/>


                 {progress1 && <div class='loaddiv'>
                          <div class="loader"></div>
                          <p><b>Loading please wait</b></p>
                        </div> }


            </div>


           
            

            <br/>
            <br/>
  
          
          <div className="col-md-6" style={{minWidth:'500px'}}>
               
                <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}>@</div>
                      </div>
                      <p style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="email2"  placeholder="Email"></p>
                      {/* <Button text='Update'  type='submit' /> */}
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                              <div className="col-12">
                                  <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                      <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}><img src={require('../../../images/phone.png')} width="15px" height="15px" /></div>
                                    </div>
                                    <input style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="number" className="form-control" id="number2" placeholder="Contact Number"/>
                                    <Button text='Update'  type='submit' onClick={()=>{this.updateNumber2()}}/>
                                  </div>
                              </div>
                          </div>
          
                   <br />

            <div style={{border:'solid 2px rgb(20, 194, 224)' , margin:'10px' , padding:'20px 1px' , borderRadius:'10px'}}>       

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{ height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass1" placeholder="Enter Current Password"/>
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{ height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass2" placeholder="Enter New Password"/>
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass3" placeholder="Re-Enter New Password"/>
                      <Button text='Update'  type='submit' onClick={()=>{this.updatePassword2()}}/>
                    </div>
                </div>
            </div>

            <br />

            </div>

            <br/>

            <div className="form-row align-items-center mx-1" >  
              <div className="col-12">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text" style={{width:'40px'}}>D</div>
                    </div>
                    <input style={{fontSize:'12px'}} type="text" className="form-control" id="dob2" placeholder="Date of Birth"/>
                    <Button text='Update'  type='submit' onClick={()=>{this.updateDOB2()}}/>
                  </div>
              </div>
          </div>

              <br/>

              <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}>D</div>
                      </div>
                      <input style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="department" placeholder="Department"/>
                      <Button onClick={()=>this.department()} text='Update'  type='submit' />
                    </div>
                </div>
            </div>

            <br />


            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}>D</div>
                      </div>
                      <input style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="designation" placeholder="Designation"/>
                      <Button onClick={()=>this.designation()} text='Update'  type='submit' />
                    </div>
                </div>
            </div>

            <br />


            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px' , marginTop:'6px'}}>Q</div>
                      </div>
                      <input style={{marginTop:'6px' , height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="qualification" placeholder="Add Qualification Details one by one "/>
                      <Button onClick={()=>this.addQualification()} text='Update'  type='submit' />
                    </div>
                </div>
            </div>

            <br />

           </div>
        </div>
 
   </div>
  )}
}
function mapStateToProp(state) {
  return ({
    details: state.root. teacherInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(Teacherprofile);
