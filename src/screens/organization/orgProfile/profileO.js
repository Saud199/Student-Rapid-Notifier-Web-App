import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './profileO.css';
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import firebase from '../../../config/firebase.js'
import {Button} from '../../../components/button/button.js'
import {OrganizationDetail} from '../../../store/action/action.js';
import '../../Loader/loader.css'


class Orgprofile extends Component {

constructor(){
  super();
  this.state = {
    progress1 : false ,
  } 
}

  componentDidMount(){
    this.validation()
    this.getPersonalInfo();
  }


  validation(){
    var data = this.props.accounttype;
   if(data.includes('Organization')){

   }else{
    Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
    this.props.history.push("/");
   }
  }

  getPersonalInfo(){
    var data = this.props.details;

    firebase.database().ref("/Users/"+data.id).on("value", (snapshot)=> {
     document.getElementById('email').innerHTML = snapshot.val().email;
     document.getElementById('vpimage').src = snapshot.val().imgURL;
     document.getElementById('number').value = snapshot.val().ph_no;
     document.getElementById('webLink').value = snapshot.val().webLink;
     document.getElementById('detail').value = snapshot.val().detail;
     document.getElementById('address').value = snapshot.val().address;
  
    })  
  }

  // updatState(){
  //   var data = this.props.details;
  //   firebase.database().ref("/Users/"+data.id).on("value", (snapshot1)=> {
  //     snapshot1.forEach((snapshot)=> {
    
  //     var orgObj = {
  //     name : snapshot.name ,
  //     address : snapshot.address ,
  //     email : snapshot.email ,
  //     id : snapshot.id ,
  //     imgURL : snapshot.imgURL ,
  //     accountType : snapshot.accountType ,
  //     number : snapshot.ph_no ,
  //     webLink : snapshot.webLink
  //    }
  //    this.props.organizationInfo(orgObj);
  //   }) 
  //   console.log(this.props.details) 
  // })  
  // }


  
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
        Swal.fire('Done' ,'Profile Image Updated Successfully')
    })
   }
  }

  updateAddress1(){
    var add = document.getElementById('address').value;
    if(add=='undefined' || add.length<3){
      Swal.fire('Oops...', 'Please Write Your Correct Address', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({address:add});
      Swal.fire('Done' ,'Address Updated Successfully')
    }
  }

  updateDetail(){
    var add = document.getElementById('detail').value;
    if(add=='undefined' || add.length<10){
      Swal.fire('Oops...', 'Please Write Your Detail Correctly', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({detail:add});
      Swal.fire('Done'  , 'Details Updated Successfully')
    }
  }

  updateLink(){
    var add = document.getElementById('webLink').value;
    if(add=='undefined' || add.length<3){
      Swal.fire('Oops...', 'Please Write Correct Website Link', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({webLink:add});
      Swal.fire('Done' ,'Link Updated Successfully');
    }
  }
   
  updateNumber2(){
    var add = document.getElementById('number').value;
    if(add.length<5){
      Swal.fire('Oops...', 'Please Write Your Correct Number', 'error')
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
    
        firebase.auth().signInWithEmailAndPassword( data.email , p1)
            .then(function(user) {
    
                firebase.auth().currentUser.updatePassword(p2).then(function(){
                    firebase.database().ref("Users/"+data.id).update({pass:p2});
                   
                    document.getElementById('pass1').value="";
                    document.getElementById('pass2').value=""; 
                    document.getElementById('pass3').value="";
                   
                    Swal.fire ('Done' , 'Password Updated Successfully');
                
                }).catch(function(err){
                  Swal.fire('Oops' ,''+err , 'error');
                 });
        
            }).catch(function(err){
              Swal.fire('Oops' ,''+err , 'error');
            });
      }
  }



 render(){
   const {progress1} = this.state;
  return(
    <div> 

        <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
        <Navbar.Brand>
            <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
            <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
        </Navbar.Brand>
        </Navbar>  


            <div className="col-md row" id='div2' style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , margin:'30px auto'}} >
           
            <div className=" col-md-2  div1OP">
            <br/>
            <h6 style={{color:'rgb(20, 194, 224)'}}>"PROFILE"</h6>
                <div className="col-md-4" style={{textAlign:'center' , margin:'10px auto'}}>
                  <img  className="OPimg" src={require('../../../images/stuuser.png')} id="vpimage" />
                  <br/>
                 </div>
                
                 <hr/>
                 <input style={{fontSize:'12px' , height:'30px'}}  type="file"  id="pimg" text="Upload new Picture" />
                 {!progress1 && <button className="btnSgnOP btn btn-success" onClick={()=>{this.updatePicture1()}} ><b> Update </b></button> }
                       
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
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>@</div>
                      </div>
                      <p style={{height:'30px' , fontSize:'12px'}}  className="form-control" id="email" > </p>
                
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                              <div className="col-12">
                                  <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                      <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/phone.png')} width="15px" height="15px" /></div>
                                    </div>
                                    <input style={{height:'30px' , fontSize:'12px'}} type="number" className="form-control" id="number" placeholder="Contact Number"/>
                                    <Button text='Update'   onClick={()=>this.updateNumber2()} />
                                  </div>
                              </div>
                          </div>
          
                   <br />

            <div style={{border:'solid 1px rgb(20, 194, 224)' , margin:'10px' , padding:'20px 1px' , borderRadius:'10px'}}>       

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" id="pass1" className="form-control" placeholder="Enter Current Password"/>
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" id="pass2" className="form-control"  placeholder="Enter New Password"/>
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" id="pass3" className="form-control" placeholder="Re-Enter New Password"/>
                      <Button text='Update'   onClick={()=>this.updatePassword2()}/>
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
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>W</div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="webLink" placeholder="Website Link"/>
                      <Button text='Update'   onClick={()=>this.updateLink()}/>
                    </div>
                </div>
            </div>

           
            <br />


            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>A</div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="address" placeholder="Update Address here !"/>
                      <Button text='Update'  onClick={()=>this.updateAddress1()} />
                    </div>
                </div>
            </div>

            <br />

          <div className="form-row align-items-center mx-1" >
              <div className="col-12">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text" style={{width:'40px'}}>D</div>
                    </div>
                    <textarea style={{ fontSize:'12px'}}  type="text" className="form-control" id="detail" placeholder="Details"/>
                    <Button text='Update'  onClick={()=>{this.updateDetail()}} />
                  </div>
              </div>
          </div>


           </div>
        </div>
 
   </div>
  )}
}

function mapStateToProp(state) {
  return ({
    details: state.root.organizationInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    organizationInfo :(info3)=>{ dispatch(OrganizationDetail(info3))} ,
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(Orgprofile);
