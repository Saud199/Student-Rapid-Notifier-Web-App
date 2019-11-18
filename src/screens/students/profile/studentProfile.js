import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentprofile.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar} from 'react-bootstrap';
import {StudentDetail} from '../../../store/action/action.js';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase.js'



class Studentprofile extends Component {
  
  constructor() {
    super();

    this.state = {
      Email:'' ,
      Num : '' ,
      Dob :'' ,
      sdiv1 : true ,
      sdiv2 : false ,
      sdiv3 : false ,
      sdiv4 : false ,
      progress1 : false ,
      education:[],
      myskills:[] ,
      skills:[ 'C' , 'C++' , 'C#' , 'CSS' ,'DB2' , 'Firebase' ,'HTML' , 'HTML5' , 'Java' , 
               'java script' , 'Jscript.net', 'J Query' , 'Kotlin' , 'Matlab' , 'Machine code' , 'Mongo DB'  ,'MySql' , 'Maya' , 'Oracle' , 'PostgreSQL' , 
               'PHP' , 'Power shell' , 'python' , 'Ruby' , 'Rust' , 'Script.net' , 'SQL Server' ,
                'SQL' , 'Sybase' , 'Swift' , 'Type Script' ,'Xml'
             ],
           }
        }

  componentDidMount(){
    this.getPersonalInfo();
    this.validation()
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

  getPersonalInfo(){
    const {Email , Num , Dob} = this.state;

    var file = document.getElementById('pimg').files[0];
    var data = this.props.details;

    firebase.database().ref("/Users/"+data.id).on("value", (snapshot)=> {
     document.getElementById('name').value = snapshot.val().name;
     document.getElementById('batch').value = snapshot.val().batch;
     document.getElementById('rollno').value = snapshot.val().rollNo;
     document.getElementById('section').value = snapshot.val().section;
     document.getElementById('depart').value = snapshot.val().department;
     document.getElementById('nation').value = snapshot.val().nationality;
     document.getElementById('address').value = snapshot.val().address;
     document.getElementById('vpimg').src = snapshot.val().imgURL;
    
     this.setState({
       Email:snapshot.val().email , 
       Num : snapshot.val().ph_no ,
       Dob : snapshot.val().DOB
      })
    })  
  }

  Sdiv1(){
    
    document.getElementById('maindiv1').style.display='block'
    document.getElementById('maindiv2').style.display='none'
    document.getElementById('maindiv3').style.display='none'
    document.getElementById('maindiv4').style.display='none'
 
    }   

  Sdiv2(){
    const {Email , Num , Dob} = this.state;

    document.getElementById('maindiv1').style.display='none'
    document.getElementById('maindiv2').style.display='block'
    document.getElementById('maindiv3').style.display='none'
    document.getElementById('maindiv4').style.display='none'
 
    document.getElementById('email2').innerHTML = Email;
    document.getElementById('number2').value = Num;
    document.getElementById('dob2').value = Dob;    
  
  }
  
  Sdiv3(){
    
    document.getElementById('maindiv1').style.display='none'
    document.getElementById('maindiv2').style.display='none'
    document.getElementById('maindiv3').style.display='block'
    document.getElementById('maindiv4').style.display='none'

    var data = this.props.details;

    firebase.database().ref(`Student/${data.rollNo}`).on("value", (snapshot)=> {

      if(snapshot.exists()){

      if(snapshot.hasChild("aboutYourSelf")){
        document.getElementById('yourself3').value = snapshot.val().aboutYourSelf.detail;
      }
      if(snapshot.hasChild("Matric")){
        document.getElementById('matric3').value = snapshot.val().Matric.detail;
      }
      if(snapshot.hasChild("Inter")){
        document.getElementById('inter3').value = snapshot.val().Inter.detail;    
      }

     }
    }) 
  }   

  Sdiv4(){

     const {myskills} = this.state;

      var data = this.props.details;
    
      document.getElementById('maindiv1').style.display='none'
      document.getElementById('maindiv2').style.display='none'
      document.getElementById('maindiv3').style.display='none'
      document.getElementById('maindiv4').style.display='block'

      while(myskills.length > 0) {
        myskills.splice(0,1); 
       }

      firebase.database().ref(`Student/${data.rollNo}`).on("value", (snapshot)=> {

        if(snapshot.exists()){
  
        if(snapshot.hasChild("Skills")){
          var p = snapshot.val().Skills.detail;
          var res = p.split(',');
          res.pop();
          
          for(var i=0; i<res.length; i++ ){
            myskills.push(res[i]);
          }
          this.setState({})
        }
      
     }  
  })
} 
  


  addEducation(){
    this.setState({education:[...this.state.education , ""]})
  }

  handleChange(e ,index){
    this.state.education[index] = e.target.value;
    this.setState({education:this.state.education})
  }

  handleRemove(index){
    this.state.education.splice(index , 1);
    // update the state
    this.setState({education:this.state.education})
  }

  handleSubmit(e){
    console.log(this.state.education , 'edu')
  }

  showSkills(){
    this.setState({skills:this.state.skills})
  }

  onselectSkills(e , index){
    var a = document.getElementById('check'+index).checked;
    console.log(a);
    if(a==true){
      if(this.state.myskills.length<16){
      this.state.myskills.push(e.target.value);
      this.setState({})
      }else{
        Swal.fire('Oops !','You are unable to select more skills beacause you already select your 15 skills ')
      }
    }
  }

  removeSkills(index){
    this.state.myskills.splice(index , 1);
    // update the state
    this.setState({myskills:this.state.myskills})
    console.log(this.state.myskills)
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
        Swal.fire('Done' , 'Profile Image Updated Successfully')
    })
   }
  }
 
  updateNationality1(){
    var nat = document.getElementById('nation').value;
    if(nat=='undefined' || nat.length<3){
      Swal.fire('Oops...', 'Please Write Your Correct Nationality', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({nationality:nat});
      Swal.fire('Done' , 'Nationality Updated Successfully')
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
      Swal.fire('Done' , 'Address Updated Successfully')
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

  updateEmail2(){
    var add = document.getElementById('email2').value;
    if(add=='undefined' || add.length<4 || !add.includes('@') || !add.includes('.')){
      Swal.fire('Oops...', 'Please Write Your Correct Email Address', 'error')
    }
    else{
      var data = this.props.details;
      firebase.database().ref("Users/"+data.id).update({email:add});
      Swal.fire('Done' , 'Email Updated Successfully')
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

 addYourSelf3(){
  var add = document.getElementById('yourself3').value;
  if(add=='undefined' || add.length<20){
    Swal.fire('Oops...', 'Please Write Your Detail with more than 20 character', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Student/${data.rollNo}/aboutYourSelf`).set({detail : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }



 addMatric3(){
  var add = document.getElementById('matric3').value;
  if(add=='undefined' || add.length<10){
    Swal.fire('Oops...', 'Please Write Your Detail with more than 10 character', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Student/${data.rollNo}/Matric`).set({detail : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }

 addInter3(){
  var add = document.getElementById('inter3').value;
  if(add=='undefined' || add.length<10){
    Swal.fire('Oops...', 'Please Write Your Detail with more than 10 character', 'error')
  }
  else{
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Student/${data.rollNo}/Inter`).set({detail : add});
    Swal.fire('Done' ,'Data Added Successfully ')
  }
 }

 addSkill4(){
   const {myskills} = this.state;
   var mydata = '';
   if(myskills.length<1){
    Swal.fire('Oops...', 'Please Select Your Skills', 'error')
   }
   else{
    for (var i=0 ; i<myskills.length ; i++)
    {
      mydata = mydata+myskills[i]+',';
    }
    var data = this.props.details;
    var database = firebase.database().ref();       
    var skey =firebase.database().ref(`Student/${data.rollNo}/Skills`).set({detail : mydata});
    Swal.fire('Done' ,'Data Added Successfully ')
    while(myskills.length > 0) {
      myskills.splice(0,1); 
     }
 
   }
  }

 render(){
   const {sdiv1 , sdiv2 , sdiv3 , sdiv4 , education , progress1  , Email , Num , Dob} = this.state;
    return(
       <div>
              <div style={{backgroundColor:'white'}}>

               <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>     
                  <Navbar.Brand>
                      <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
                      <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                  </Navbar.Brand>
                </Navbar> 
 
                   
                   <div style={{backgroundColor: 'rgb(233, 233, 233)' , margin:'0px' }}>
                   <div  className="row  navbarSP">
                   <p className="navitemSP" onClick={()=>this.Sdiv1()} >ABOUT</p>
                   <p className="navitemSP" onClick={()=>this.Sdiv2()}>SECURITY</p> 
                   <p className="navitemSP" onClick={()=>this.Sdiv3()}>EDUCATION</p>
                   <p className="navitemSP" onClick={()=>this.Sdiv4()}>SKILLS</p>
                   </div>
                   </div>

                  {/* ------------------- Div 1 ----------------------------- */}
                 <div id="maindiv1" className="row" style={{backgroundColor:'whitesmoke' , paddingTop:'20px'}}>
    
                    <div className="col-md-8" style={{textAlign:'center' , margin:'20px auto'}}>
                    <img  className="userimgSP" id="vpimg" className="pimg1" src={require('../../../images/stuuser.png')} />
                    <br/>
                    <br/>
                        <div className="custom-file mx-1">
                            <div className="input-group mb-2"></div>
                             <input style={{height:'30px' , fontSize:'10px'}} type="file" className="custom-file-input"  id="pimg" required/>
                            <label className="custom-file-label" >Upload new Profile Picture</label>
                           {!progress1 && <button className="btnSgnSP btn btn-success" onClick={()=>{this.updatePicture1()}} ><b> Update </b></button> }
                        </div>

                        {progress1 && <div class='loaddiv'>
                          <div class="loader"></div>
                          <p><b>Loading please wait</b></p>
                        </div> }


                    </div>
                    
                    <div className="col-md-8" style={{margin:'20px auto'}}>

                    <div className="form-row align-items-center mx-1" >
                        <div className="col-12">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div  className="input-group-text" style={{width:'40px'}}>N</div>
                              </div>
                              <input style={{fontSize:'12px'}} type="text" className="form-control" id="name" placeholder="Name"/>
                              </div>
                        </div>
                    </div>
    
                    <br />
    
                    <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px'}}>B</div>
                          </div>
                          <input style={{fontSize:'12px'}} type="number" className="form-control" id="batch" placeholder="Batch"/>
                        </div>
                    </div>
                   </div>

                <br />


                <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}>R</div>
                      </div>
                      <input style={{fontSize:'12px'}} type="text" className="form-control" id="rollno" placeholder="Roll no"/>
                    </div>
                  </div>
                </div>

               <br />
    
                <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}>S</div>
                      </div>
                      <input style={{fontSize:'12px'}} type="text" className="form-control" id="section" placeholder="Section"/>
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
                    <input  style={{fontSize:'12px'}} type="text" className="form-control" id="depart" placeholder="Department"/>
                  </div>
              </div>
             </div>

              <br />

              <div className="form-row align-items-center mx-1" >
                  <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}><img src={require('../../../images/nationality.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{fontSize:'12px'}} type="text" className="form-control" id="nation" placeholder="Nationality"/>
                      <Button text='Update'  type='submit' onClick={()=>{this.updateNationality1()}} />
                      </div>
                  </div>
                </div>
    
               <br />


              <div className="form-row align-items-center mx-1" >
              <div className="col-12">
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text" style={{width:'40px'}}>A</div>
                    </div>
                    <input style={{fontSize:'12px'}} type="text" className="form-control" id="address" placeholder="Address"/>
                    <Button text='Update'  type='submit' onClick={()=>{this.updateAddress1()}}/>
                  </div>
                 </div>
                </div>
              </div> 

           </div> 
            {/* -------------------End of  Div 1 ----------------------------- */}


          {/* ------------------- Div 2 ----------------------------- */}
            <div className="row" id='maindiv2' style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , margin:'0px auto' , display:'none'}} >
           
            {/* <div className="ndiv2 col-md-3">
            <br/>
            <h6 className="text-center" style={{color:'rgb(20, 194, 224)'}}>"SECURITY ALERT"</h6>
            <ul className="text-center">
              <br/>
              <li style={{fontSize:'12px'}}>Please must logout your account after using Application so anyone will not able to view or changed your personal Information. </li>
               <br/>
              <li style={{fontSize:'12px'}}> It's good to change your Account Password after some time. </li>
              <br/>
              <li style={{fontSize:'12px'}}> You just need to select require field and re-write your information and click on update button to update your Information. </li>
            </ul>
            </div> */}

            
          <div className="col-md-8" style={{margin:'0px auto'}}>
              
                <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}>@</div>
                      </div>
                      <p style={{fontSize:'12px'}} className="form-control" id="email2" ></p>
                      {/* <Button text='Update'  type='submit' onClick={()=>{this.updateEmail2()}}/> */}
                    </div>
                </div>
            </div>

            <br />

            <div className="form-row align-items-center mx-1" >
                              <div className="col-12">
                                  <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                      <div className="input-group-text" style={{width:'40px'}}><img src={require('../../../images/phone.png')} width="15px" height="15px" /></div>
                                    </div>
                                    <input style={{fontSize:'12px'}} type="number" className="form-control" id="number2" placeholder="Contact Number"/>
                                    <Button text='Update'  type='submit' onClick={()=>{this.updateNumber2()}} />
                                  </div>
                              </div>
                          </div>
          
                   <br />

            <div style={{border:'solid 1px rgb(20, 194, 224)' , margin:'10px' , padding:'20px 1px' , borderRadius:'10px'}}>       

            <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px'}}><img src={require('../../../images/pass.png')} width="15px" height="15px" /></div>
                      </div>
                      <input style={{fontSize:'12px'}} type="password" className="form-control" id="pass1" placeholder="Enter Current Password"/>
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
                      <input style={{fontSize:'12px'}} type="password" className="form-control" id="pass2" placeholder="Enter New Password"/>
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
                      <input style={{fontSize:'12px'}} type="password" className="form-control" id="pass3" placeholder="Re-Enter New Password"/>
                      <Button text='Update'  type='submit' onClick={()=>{this.updatePassword2()}} />
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
         </div>
        </div>
        {/* -------------------End of Div 2 ----------------------------- */}

         {/* ------------------- Div 3 ----------------------------- */}
        <div id="maindiv3" style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , textAlign:'center' , display:'none'}}>
          
          <div className="col-md-8" style={{ display:'inline-block'  , margin:'10px auto'}}>
            <h6 style={{color:'rgb(20, 194, 224)'}}><b> "ABOUT YOUR SELF" </b> </h6>
            <textarea style={{fontSize:'12px'}} id="yourself3" className="col-md-8 txtareaSP" placeholder="Write an attractive educational , working Experience and skillfull paragraph about your self "></textarea>
            <br/>
            <Button text='Submit'  type='submit'  onClick={()=>{this.addYourSelf3()}}/>
            <br/> 
            <br/>          
            {/* <h6 style={{color:'rgb(20, 194, 224)'}}> "FUTURE PLAN" </h6>           
            <textarea style={{fontSize:'12px'}} className="col-md-8 txtareaSP" placeholder="Write something about your future planning regarding your studies , jobs e.t.c. "></textarea>
            <br/>
            <Button text='Submit'  type='submit' /> */}
             <h6 style={{color:'rgb(20, 194, 224)'}}> <b> "ADD YOUR EDUCATION HERE" </b> </h6>
              <hr/>
              <input style={{fontSize:'12px'}} id="matric3" className="col-md-8 form-control" style={{display:"inline-block"}} placeholder="Matriculation" />
              <Button text='Add'  type='submit'  onClick={()=>this.addMatric3()} />
              <br/> <br/>
              <input style={{fontSize:'12px'}} id="inter3" className="col-md-8 form-control" style={{display:"inline-block"}} placeholder="Intermediate" />
              <Button text='Add'  type='submit' onClick={()=>this.addInter3()} />
              {/* {
                this.state.education.map((educ , index)=>{
                  return(
                    <div key={index}>
                      <br/>
                      <input style={{fontSize:'12px'}} className="col-md-8 form-control" style={{display:"inline-block"}} onChange={(e)=>this.handleChange(e , index)} value={educ}  />
                       <Button text='Remove'  type='submit' />
                    </div>
                  )
                })
              }
              <br/>
              <Button  text='+ Education'  type='submit' onClick={(e)=>{this.addEducation(e)}}/>
              <hr/>
              <Button text='Submit'  type='submit' onClick={(e)=>{this.handleSubmit(e)}}/> */}
          </div>
            
          {/* <div className="col-md-5" style={{border:'solid 1px black' , display:'inline-block' , margin:'10px auto'}}>
              <h6 style={{color:'rgb(20, 194, 224)'}}> "ADD YOUR EDUCATION HERE" </h6>
              <hr/>
              {
                this.state.education.map((educ , index)=>{
                  return(
                    <div key={index}>
                      <br/>
                      <input style={{fontSize:'12px'}} className="col-md-8 form-control" style={{display:"inline-block"}} onChange={(e)=>this.handleChange(e , index)} value={educ}  />
                      <Button text='Remove'  type='submit' />
                    </div>
                  )
                })
              }
              <br/>
              <Button  text='+ Education'  type='submit' onClick={(e)=>{this.addEducation(e)}}/>
              <hr/>
              <Button text='Submit'  type='submit' onClick={(e)=>{this.handleSubmit(e)}}/>
          </div> */}

        </div>
         {/* -------------------End of Div 3 ----------------------------- */}


        {/* -------------------  Div 4 ----------------------------- onClick={()=>this.Sdiv4()} */}
        <div id="maindiv4" style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , textAlign:'center' , display:'none'}} > 
      
          <h6 style={{color:'rgb(20, 194, 224)'}}> "SELECT YOUR SKILLS" </h6>
              <hr/>
              
             <div className="row">
             <div className="col-md-8" >
             <p style={{fontSize:'12px'}}> <b style={{color:'rgb(20, 194, 224)'}}> You can only select 15 or less skills </b> </p>
              {
                this.state.skills.map((skill , index)=>{
                  return(
                    <div  className="col-md-3" style={{display:'inline-block' , textAlign:'left'}} key={index}>
                      <br/>
                      <div class="checkbox" style={{color:'rgb(20, 194, 224)'}} >
                        <label style={{fontSize:'12px'}}><input type="checkbox" id={'check'+index} value={skill} onChange={(e)=>this.onselectSkills(e , index)}/>{ " "+skill}</label>
                       </div>
                        <br/>
                    </div>
                  )
                })
              }
              </div>

              <div className="col-md-3" style={{border:'solid 2px rgb(20, 194, 224)' , margin:'10px' , borderRadius:'10px'}}>
              <p style={{fontSize:'12px'}} > 
              <b style={{color:'rgb(20, 194, 224)'}}> Update or Remove skills here.  </b><br/>
              <Button text='Add to Profile'  type='submit' onClick={()=>this.addSkill4()}/>
              </p>
             
              { 
                this.state.myskills.map((skill , index)=>{
                  console.log(this.state.myskills.length)
                  return(
                    <div  className="col-md-12" key={index}>
                      <p style={{fontSize:'12px' , color:'rgb(20, 194, 224)' , display:'inline-block'}}>{skill}</p>
                       &nbsp;
                      <img src={require('../../../images/del.png')} style={{width:'25px' , height:'25px'}} onClick={(e)=>{this.removeSkills(index)}}/>
                    </div>
                     
                  )
                })
              }
              </div>

              </div>
      
      </div>
       {/* -------------------End of Div 4 ----------------------------- */}



   </div>
</div>
  )}
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

export default connect(mapStateToProp, mapDispatchToProp)(Studentprofile);
