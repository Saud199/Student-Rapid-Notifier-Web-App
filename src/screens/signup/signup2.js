import React, {Component} from 'react';
import '../../css/bootstrap.min.css';
import './signup2.css';
import {Button} from '../../components/button/button.js'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import {SignupDetail} from '../../store/action/action';
import firebase from '../../config/firebase.js'
import '../Loader/loader.css'


class Signup2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      accType : 'student' ,
      secQues : 'Favourite Teacher Name' ,
      sDepart : '' ,
      tDepart : '' ,
      progress : false 
    }
  }

  selectedAccountType = (event) => { 
   const { accType } = this.state;
    // var accType=""+sel.options[sel.selectedIndex].value;
    var accType1=event.target.value;
  
    if ( accType1 == "student") {
      document.getElementById('studentForm').style.display='block';
      document.getElementById('teacherForm').style.display='none';
      this.setState({ accType:accType1 })
    }
  
    else if ( accType1 == "teacher" ) {
      document.getElementById('studentForm').style.display='none';
      document.getElementById('teacherForm').style.display='block';
      this.setState({ accType:accType1 })
    }
  
  }

  selectedSDepart = (event) => { 
  const { sDepart } = this.state;
   this.setState({sDepart : event.target.value})
  }

  selectTDepart = (event) => { 
    const { tDepart , oType } = this.state;
    this.setState({tDepart : event.target.value})
    } 


  CreateAccount(){
    const {accType  , tDepart , sDepart , progress , secQues} = this.state;
    
    if(accType == "student"){

        var rno = document.getElementById('rollno').value.toUpperCase();;
        var sec = document.getElementById('section').value.toUpperCase();;
        var Sdob = document.getElementById('SDOB').value;
        var file = document.getElementById('image').files[0]
        var secAns = document.getElementById('secans').value;
        var batch = document.getElementById('batch').value;
        var enrollNo = document.getElementById('enroll').value;
        var ques = document.getElementById('secques').value;
        
        
        if(file == undefined){
          Swal.fire('Oops...', 'Select your profile Picture', 'error')
        }
        else if(rno.length<11 || rno.length>11){
          Swal.fire('Oops...', 'Please ! Must write Your Roll no in this format (20XX-XX-000)', 'error')
        }
        else if(sec.length<1  || sec.length>1 ){
          Swal.fire('Oops...', 'Please Write Your Section Correctly. It only Contain one Character', 'error')
        }
       
        else if(Sdob.length<10 || Sdob.length>10){
          Swal.fire('Oops...', 'Please ! Must Write Your DOB in This Format (DD-MM-YYYY) ', 'error')
        }
        else if(sDepart.length<1){
          Swal.fire('Oops...', 'Please Select Your Department', 'error')
        }
        else if(batch.length<4 || batch.length>4){
          Swal.fire('Oops...', 'Please Write Your Batch Correctly', 'error')
        }
         else if(secAns.length<2){
          Swal.fire('Oops...', 'Please Write Correct Security Answer', 'error')
         }
         else if(enrollNo.length<6){
          Swal.fire('Oops...', 'Please Write Enroll Number Correctly', 'error')
         }
         else if(ques.length<6){
          Swal.fire('Oops...', 'Please Write Your Security Question Completely', 'error')
         }
        else{
          this.setState({progress:true})

          var data = this.props.details;

          var name = data.fname + ' ' + data.lname;
          var email = data.email.toLowerCase();;
          var ph_no = data.number;
          var pass = data.pass1;
          var gender = data.gender.toLowerCase();

          firebase.database().ref("/Users").orderByChild("rollNo").equalTo(""+rno).on("value", (snapshot)=> {

            if(snapshot.exists()){
             Swal.fire('Oops' , 'Account Already Exist with this Roll No' , 'error')
             this.setState({progress:false})
            }

            else{

          firebase.auth().createUserWithEmailAndPassword(email, pass).then((success)=>{
            // varible to create refrence of firebase storage
            var storageref = firebase.storage().ref("storage");
            // function for uploading file in firebase database
            var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
            // returns the download url to download image from storage
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
            // pushing data  and image url object into firebase database
              var database = firebase.database().ref();
            
              var skey =firebase.database().ref('Users/').push();
            
              var studentObj = {
                id : skey.key,
                name : name ,
                email : email,
                ph_no : ph_no ,
                pass : pass ,
                gender : gender ,
                rollNo : rno ,
                section : sec , 
                DOB : Sdob ,
                enrollNo : enrollNo ,
                accountType : "Student" ,
                imgURL : downloadURL,
                department : sDepart ,
                secQuestion : ques ,
                accountStatus : 'Not Approved' ,
                secAns : secAns ,
                batch : batch 
              }
        
              skey.set(studentObj); 
              this.setState({progress:false})


               document.getElementById('rollno').value=""
               document.getElementById('section').value=""
               document.getElementById('SDOB').value=""

              Swal.fire('Congratulation', 'Your Account has been Created Successfully')
              
            }).catch((error)=> {
              this.setState({progress:false})
              Swal.fire('Oops...', ''+error.message, 'error')
             });
           }).catch((error)=> {
            this.setState({progress:false})
            Swal.fire('Oops...', ''+error.message, 'error')
        })
       }
      })
     }
    }

    else if(accType == "teacher"){
      var empID = document.getElementById('empID').value;
      var desig = document.getElementById('designation').value;
      var Tdob = document.getElementById('TDOB').value;
      var file = document.getElementById('image').files[0]
      var secAns = document.getElementById('secans').value;
      var ques = document.getElementById('secques').value;

      var data = this.props.details;
      var name = data.fname + data.lname;
      var email = data.email.toLowerCase();
      var ph_no = data.number;
      var pass = data.pass1;
      var gender = data.gender;

      if(file == undefined){
        Swal.fire('Oops...', 'Please ! Select your profile Picture', 'error')
      }
      else if(empID.length<6 || empID.length>6){
        Swal.fire('Oops...', 'Employe ID Contain should only Contain 6 Characters', 'error')
      }
      else if(desig.length<3 ){
        Swal.fire('Oops...', 'Please Write Your Designation Correctly', 'error')
      }
      else if(Tdob.length<10 || Tdob.length>10){
        Swal.fire('Oops...', 'Please ! Must  Write Your DOB in This Format (DD-MM-YYYY) ', 'error')
      }
      else if(tDepart.length<1){
        Swal.fire('Oops...', 'Please ! Select Your Department', 'error')
      }
      else if(ques.length<6){
        Swal.fire('Oops...', 'Please Write Your Security Question Completely', 'error')
       } else if(secAns.length<2){
        Swal.fire('Oops...', 'Please Write Correct Security Answer', 'error')
       }
       
      else{

        firebase.database().ref("/Users").orderByChild("empID").equalTo(""+empID).on("value", (snapshot)=> {

          if(snapshot.exists()){
           Swal.fire('Oops' , 'Employe ID already Exist' , 'error')
           this.setState({progress:false})
          }
 
          else{

        this.setState({progress:true})  

       firebase.auth().createUserWithEmailAndPassword(email, pass).then((success)=>{
        // varible to create refrence of firebase storage
        var storageref = firebase.storage().ref("storage");
        // function for uploading file in firebase database
        var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
        // returns the download url to download image from storage
        return snapshot.ref.getDownloadURL();
        }).then(downloadURL => {
        // pushing data  and image url object into firebase database
          var database = firebase.database().ref();
        
          var skey =firebase.database().ref('Users/').push();
        
          var teacherObj = {
            id : skey.key,
            name : name ,
            email : email,
            ph_no : ph_no ,
            pass : pass ,
            gender : gender ,
            empID : empID ,
            designation : desig , 
            DOB : Tdob ,
            accountType : "Teacher" ,
            imgURL : downloadURL,
            department : tDepart ,
            secQuestion : ques ,
            accountStatus : 'Not Approved' ,
            secAns : secAns ,
          }
    
          skey.set(teacherObj); 
          this.setState({progress:false})

           document.getElementById('empID').value=""
           document.getElementById('designation').value=""
           document.getElementById('TDOB').value=""
           
          Swal.fire('Congratulation', 'Your Account has been Created Successfully')
          
        }).catch((error)=> {
          this.setState({progress:false})
          Swal.fire('Oops...', ''+error.message, 'error')  
        });
      }).catch((error)=> {
        this.setState({progress:false})
        Swal.fire('Oops...', ''+error.message, 'error')
       });
    }   
    })
  }
 }
}

  
 render(){
   const {progress , secQues} = this.state;
  return(
   <div>
      <div className="row" style={{height:'130vh'}}>
              
          <div className="col-md" style={{ paddingTop:'200px' , backgroundColor:'rgb(20, 194, 224)'}} >
          <div style={{textAlign:'center'}}> <img style={{width:'320px' , height:'280px'}} src={require('../../images/stutech_logo_new.png')} /> </div>
        </div>


              <div className="col-lg-5" style={{float:'right',paddingTop:'100px'}} id="div2" >
                    <h1 className="text-center" style={{fontSize:'19px'}}>Hi User, Welcome to Stutech !</h1>
                    <br />
                    <br />
    
                       <div className="custom-file mx-1">
                            <div className="input-group mb-2"></div>
                            <input  type="file" className="custom-file-input" id="image" required/>
                            <label style={{fontSize:'12px'}} className="custom-file-label" >Upload Profile Picture</label>
                        </div>
        
                        <br />
                        <br />

        
                        <div className="form-group mx-1">
                            <label style={{fontSize:'12px'}}>Account Type</label>
                            <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedAccountType} >
                              <option style={{fontSize:'12px'}} value="student">Student</option>
                              <option style={{fontSize:'12px'}} value="teacher">Teacher</option>
                            </select>
                        </div>
        
                        <br />
        
                        <div className="mx-1" id="studentForm" style={{display:'block'}}> 
        
                            <div className="form-row align-items-center" >
                                <div className="col-12">
                                    <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>R</div>
                                      </div>
                                      <input style={{fontSize:'12px' , height:'30px'}} type='text' className="form-control"  id="rollno" placeholder="Roll Number"/>
                                    </div>
                                </div>
                            </div>
        
                            <br />
        
                            <div className="form-row align-items-center" >
                                <div className="col-12">
                                    <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>S</div>
                                      </div>
                                      <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control" id="section" placeholder="Section"/>
                                    </div>
                                </div>
                            </div>

                            <br />
        
                      <div className="form-row align-items-center" >
                          <div className="col-12">
                              <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div className="input-group-text" style={{width:'40px' , height:'30px'}}>E</div>
                                </div>
                                <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control" id="enroll" placeholder="Enrolment No"/>
                              </div>
                          </div>
                      </div>
        
                            <br />

                            <div className="form-row align-items-center" >
                            <div className="col-12">
                                <div className="input-group mb-2">
                                  <div className="input-group-prepend">
                                    <div className="input-group-text" style={{width:'40px' , height:'30px'}}>D</div>
                                  </div>
                                  <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control" id="SDOB"  placeholder="DD-MM-YYYY"/>
                                </div>
                            </div>
                          </div>

                            <br />  
        
                            <div className="form-group mx-1">
                            <label style={{fontSize:'12px'}}>Department</label>
                            <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedSDepart} >
                            <option style={{fontSize:'12px'}} value="">Select</option>
                              <option style={{fontSize:'12px'}} value="Computer Engineering">Computer Engineering</option>
                              <option style={{fontSize:'12px'}} value="Software Engineering">Software Engineering</option>
                              <option style={{fontSize:'12px'}} value="Computer Science">Computer Science</option>
                              <option style={{fontSize:'12px'}} value="Information Technology">Information Technology</option>
                            </select>
                           </div>
                           <br />

                            <div className="form-row align-items-center" >
                            <div className="col-12">
                                <div className="input-group mb-2">
                                  <div className="input-group-prepend">
                                    <div className="input-group-text" style={{width:'40px' , height:'30px'}}>B</div>
                                  </div>
                                  <input style={{fontSize:'12px' , height:'30px'}} type="number" className="form-control" id="batch"  placeholder="Batch"/>
                                </div>
                            </div>
                            </div>        
                        </div>

                        <div className="mx-1" id="teacherForm" style={{display:'none'}}> 
        
                            <div className="form-row align-items-center" >
                                <div className="col-12">
                                    <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>ID</div>
                                      </div>
                                      <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control"  id="empID"  placeholder="Employee ID"/>
                                    </div>
                                </div>
                            </div>
        
                            <br />
        
                            <div className="form-row align-items-center" >
                                <div className="col-12">
                                    <div className="input-group mb-2">
                                      <div className="input-group-prepend">
                                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>DS</div>
                                      </div>
                                      <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control"  id="designation" placeholder="Designation"/>
                                    </div>
                                </div>
                            </div>
        
                            <br />

                            <br />

                              <div className="form-row align-items-center" >
                              <div className="col-12">
                                  <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                      <div className="input-group-text" style={{width:'40px' , height:'30px'}}>D</div>
                                    </div>
                                    <input style={{fontSize:'12px' , height:'30px'}} type="text" className="form-control" id="TDOB"  placeholder="DD-MM-YYYY"/>
                                  </div>
                              </div>
                              </div>
        
                            <div className="form-group mx-1">
                            <label style={{fontSize:'12px'}}>Department</label>
                            <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectTDepart} >
                            <option style={{fontSize:'12px'}} value="">Select</option>
                              <option style={{fontSize:'12px'}} value="Computer Engineering">Computer Engineering</option>
                              <option style={{fontSize:'12px'}} value="Software Engineering">Software Engineering</option>
                              <option style={{fontSize:'12px'}} value="Computer Science">Computer Science</option>
                              <option style={{fontSize:'12px'}} value="Information Technology">Information Technology</option>
                            </select>
                           </div>
        
                        </div>
                        
                     <br />

                     {/* <div className="form-group mx-1">
                        <label style={{fontSize:'12px'}} >Security Question</label>
                        <select style={{fontSize:'12px'}}  className="form-control" onChange={(e)=>this.setState({secQues : e.target.value})}>
                          <option style={{fontSize:'12px'}}  value="Favourite Teacher Name">Favourite Teacher Name</option>
                          <option style={{fontSize:'12px'}}  value="What is your oldest cousin's first and last name">What is your oldest cousin's first and last name</option>
                          <option style={{fontSize:'12px'}}  value="What was your favorite place to visit as a child?">What was your favorite place to visit as a child?</option>
                        </select>
                </div> */}

            <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' ,height:'30px'}}>Q</div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="text" className="form-control" id="secques" placeholder="Security Question"/>
                        </div>
                    </div>
                </div>



                <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' ,height:'30px'}}>A</div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="text" className="form-control" id="secans" placeholder="Security answer"/>
                        </div>
                    </div>
                </div>

        
                    {!progress && <div align="center"><Button text='Submit'  type='submit' onClick={() =>{this.CreateAccount()}}/></div>}
        
                   {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

                    
          
              </div>  
                
           </div>
   </div>
  )}
}

function mapStateToProp(state) {
  return ({
    details: state.root. signupInfo
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}


export default connect(mapStateToProp, mapDispatchToProp)(Signup2);
