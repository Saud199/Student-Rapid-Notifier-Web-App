import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './AdmProfile.css';
import {Button} from '../../../components/button/button.js'
import Swal from 'sweetalert2'
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';



class AdmProfile extends Component {
  
constructor(){
  
  super();

  this.state={
    nfdiv1:true ,
    nfdiv2:false ,
    nfdiv3:false ,
    nfdiv4:false , 
    student : [] ,
    organization : [] ,
    teacher : [] ,
    number:'' ,
    tdepart : 'Computer Engineering' ,
    studentDepart : 'Computer Engineering' ,
    studentBatch : '2016' ,
    orgtype : 'softwarehouse' ,
  }
}

componentDidMount(){
  this.addData();
}


addData(){
  const {number} = this.state;
  var data = this.props.details;
  firebase.database().ref("Users/"+data.id).on("value", (snapshot)=> {
    if(snapshot.val().ph_no){
    this.setState({ number:snapshot.val().ph_no})
    }
  })
}

blockUser(id){
  firebase.database().ref(`/Users/${id}`).update({accountStatus:'Block'})
  Swal.fire('Done' , 'Account Blocked Successfully')
}

showSingleStudent(){
const {studentDepart , studentBatch , student} = this.state;

while(student.length > 0) {
  student.splice(0,1); 
 }

 var rollno = document.getElementById('rollno2').value.toUpperCase();

 if(rollno.length<11){
  Swal.fire('Oops' , 'Please Write Roll No in this Format (2016-SE-000)' , 'error')
 }else{
  firebase.database().ref("/Users").orderByChild("rollNo").equalTo(rollno).on("value", (snapshot)=> {
    snapshot.forEach((childSnapshot)=> {
      var obj = {
        id : childSnapshot.val().id ,
        name : childSnapshot.val().name,
        email : childSnapshot.val().email,
        number :  childSnapshot.val().ph_no,
        address : childSnapshot.val().address,
        rollNo : childSnapshot.val().rollNo,
        enrollNo : childSnapshot.val().enrollNo,
        image : childSnapshot.val().imgURL 
      }
      student.push(obj)
      this.setState({student})
    })
})
}
}

showMultipleStudent(){
  const {studentDepart , studentBatch , student} = this.state;

  while(student.length > 0) {
    student.splice(0,1); 
   }

  firebase.database().ref("/Users").orderByChild("accountType").equalTo('Student').on("value", (snapshot)=> {
    snapshot.forEach((childSnapshot)=> {

    var batch = childSnapshot.val().batch;
    var depart = childSnapshot.val().department;

    if(batch==studentBatch && studentDepart==depart){
      
      var obj = {
        id : childSnapshot.val().id ,
        name : childSnapshot.val().name,
        email : childSnapshot.val().email,
        number :  childSnapshot.val().ph_no,
        address : childSnapshot.val().address,
        rollNo : childSnapshot.val().rollNo,
        enrollNo : childSnapshot.val().enrollNo,
        image : childSnapshot.val().imgURL 
      }
      student.push(obj)
      this.setState({student})
    }
  })
 })
}




showSingleTeacher(){
  const {teacher } = this.state;
  var checker = 0;
  
  while(teacher.length > 0) {
    teacher.splice(0,1); 
   }
  
   var tname = document.getElementById('tname2').value.toUpperCase();
  
   if(tname.length<2){
    Swal.fire('Oops' , 'Please Write Correct Teacher Name' , 'error')
   }else{
    firebase.database().ref("/Users").orderByChild("accountType").equalTo('Teacher').on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
        
        var name = childSnapshot.val().name.toUpperCase();
        
        if(name.includes(tname)){
        checker=1;  
        var obj = {
          id : childSnapshot.val().id ,
          name : childSnapshot.val().name,
          email : childSnapshot.val().email,
          number :  childSnapshot.val().ph_no,
          empID : childSnapshot.val().empID,
          image : childSnapshot.val().imgURL 
        }
        teacher.push(obj)
        this.setState({teacher})
      }
      })
      if(checker==0){
        Swal.fire('Oops' , 'No teacher found with this name' , 'error') 
      }
    })
  }
  }

  showMultipleTeacher(){
    const {teacher , tdepart } = this.state;
    var checker = 0;
    
    while(teacher.length > 0) {
      teacher.splice(0,1); 
     }
    

      firebase.database().ref("/Users").orderByChild("accountType").equalTo('Teacher').on("value", (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
          
          var dname = childSnapshot.val().department
          
          if(dname==tdepart){
          checker=1;  
          var obj = {
            id : childSnapshot.val().id ,
            name : childSnapshot.val().name,
            email : childSnapshot.val().email,
            number :  childSnapshot.val().ph_no,
            empID : childSnapshot.val().empID,
            image : childSnapshot.val().imgURL 
          }
          teacher.push(obj)
          this.setState({teacher})
        }
        })
        if(checker==0){
          Swal.fire('Oops' , 'No teacher found in this Department' , 'error') 
        }
      })
    }
  
    showSingleOrg(){
      const {organization } = this.state;
      var checker = 0;
      
      while(organization.length > 0) {
        organization.splice(0,1); 
       }
      
       var tname = document.getElementById('oname2').value.toUpperCase();
      
       if(tname.length<2){
        Swal.fire('Oops' , 'Please Write Correct Teacher Name' , 'error')
       }else{
        firebase.database().ref("/Users").orderByChild("accountType").equalTo('Organization').on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            
            var name = childSnapshot.val().name.toUpperCase();
            
            if(name.includes(tname)){
            checker=1;  
            var obj = {
              id : childSnapshot.val().id ,
              name : childSnapshot.val().name,
              email : childSnapshot.val().email,
              number :  childSnapshot.val().ph_no,
              address : childSnapshot.val().address,
              webLink : childSnapshot.val().webLink,
              image : childSnapshot.val().imgURL 
            }
            organization.push(obj)
            this.setState({organization})
          }
          })
          if(checker==0){
            Swal.fire('Oops' , 'No Organization found with this name' , 'error') 
          }
        })
      }
      }
    
      showMultipleOrg(){
        const {organization , orgtype } = this.state;
        var checker = 0;
        
        while(organization.length > 0) {
          organization.splice(0,1); 
         }
        
    
          firebase.database().ref("/Users").orderByChild("accountType").equalTo('Organization').on("value", (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
              
              var dname = childSnapshot.val().orgType
              
              if(dname==orgtype){
              checker=1;  
              var obj = {
                id : childSnapshot.val().id ,
                name : childSnapshot.val().name,
                email : childSnapshot.val().email,
                number :  childSnapshot.val().ph_no,
                address : childSnapshot.val().address,
                webLink : childSnapshot.val().webLink,
                image : childSnapshot.val().imgURL 
              }
              organization.push(obj)
              this.setState({organization})
            }
            })
            if(checker==0){
              Swal.fire('Oops' , 'No Organization found in this Category' , 'error') 
            }
          })
        }
      
    


updateNumber2(){
  const {number} = this.state;
  // var add = document.getElementById('number2').value;
  if(number=='undefined'  || number.length<12 || number.length>12){
    Swal.fire('Oops...', 'Please Write Your Correct Number in 923000000000', 'error')
  }
  else{
    var data = this.props.details;
    firebase.database().ref("Users/"+data.id).update({ph_no:number});
    Swal.fire('Done' ,'Number Updated Successfully')
  }
}


updatePassword2(){
  var data = this.props.details;

  var p1 = document.getElementById('pass11').value;
  var p2 = document.getElementById('pass22').value; 
  var p3 = document.getElementById('pass33').value;
  
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
                 
                  document.getElementById('pass11').value="";
                  document.getElementById('pass22').value=""; 
                  document.getElementById('pass33').value="";
                 
                  Swal.fire ('Done' , 'Password Updated Successfully');
              
              }).catch(function(err){
                Swal.fire('Oops' ,''+err , 'error');
               });
      
          }).catch(function(err){
            Swal.fire('Oops' ,''+err , 'error');
          });
    }
}

async addNewAdmin(){
  var data = this.props.details.pass;

  const { value: password } = await Swal.fire({
    title: 'Please Write your password',
    input: 'password',
    inputPlaceholder: 'Enter your password',
    inputAttributes: {
      maxlength: 10,
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })
  
  if (password == data) {

    console.log('p1'+password , 'p2'+data);

    var b = document.getElementById('name').value; 
    var c = document.getElementById('email').value; 
    var d = document.getElementById('number').value;
    var e = document.getElementById('pass1').value;
    var f = document.getElementById('pass2').value; 

     if(b.length<2 ){
      Swal.fire('Oops...', 'Write Your Name correctly', 'error')
     }
     else if(c.length<6 || !c.includes('@')  || !c.includes('.')){
      Swal.fire('Oops...', 'Please Enter A  Valid Email Address', 'error')
     }
     else if(d.length<12 || d.length>12){
      Swal.fire('Oops...', 'Please Must Write Your Number in this Format 923120000000', 'error')
     }
     else if(e.length<6 ){
      Swal.fire('Oops...', 'Write Your Password Correctly. It must Contain 6 or more Characters', 'error')
     }
     else if(e!=f ){
      Swal.fire('Oops...', 'Please Check Your Re-type Password', 'error')
     }
     else{

      firebase.auth().createUserWithEmailAndPassword(c, e).then((success)=>{
        var skey =firebase.database().ref('Users/').push();
        var obj = {
            id : skey.key,
            name : b ,
            email : c,
            ph_no : d ,
            pass : e ,
            accountType : 'Admin' ,
            accountStatus : 'Approved'
        }
        Swal.fire('Done' , 'Account Created Successfully')
        skey.set(obj)
      }).catch(err=>{
        Swal.fire('Oops' , 'Error Occured' + err , 'error')
      })

     }
  }
 }


 render(){
   const {nfdiv1 , nfdiv2 , nfdiv3 , nfdiv4 , student , organization , teacher , number , studentDepart , studentBatch , orgtype , tdepart} = this.state; 
  return(
    <div> 

        <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
        <Navbar.Brand>
            <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
            <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
        </Navbar.Brand>
        </Navbar>  

              <div style={{backgroundColor: 'rgb(233, 233, 233)' , margin:'0px 0px 10px 0px' }}>
                   <div  className="row navbarAP"  >
                   <p className="navitemAP" onClick={()=>{this.setState({nfdiv1:true , nfdiv2:false , nfdiv3:false , nfdiv4:false })}} >ADMIN</p>
                   <p className="navitemAP" onClick={()=>{this.setState({nfdiv1:false , nfdiv2:true , nfdiv3:false , nfdiv4:false })}}>STUDENTS</p> 
                   <p className="navitemAP" onClick={()=>{this.setState({nfdiv1:false , nfdiv2:false , nfdiv3:true , nfdiv4:false })}}>TEACHERS</p>
                   <p className="navitemAP" onClick={()=>{this.setState({nfdiv1:false , nfdiv2:false , nfdiv3:false , nfdiv4:true })}}>ORGANIZATIONS</p>
                   </div>
                </div>


           { nfdiv1 && <div className="col-md row" id='div2' style={{backgroundColor:'whitesmoke' , paddingTop:'20px' , margin:'30px auto !important'}} >
           
            <div className="col-md-5" style={{ minWidth:'400px' , border:'solid 1px rgb(20, 194, 224)' , margin:'10px auto' , padding:'10px'}}>
            <br/>
            <h6 className="text-center" style={{color:'rgb(20, 194, 224)'}}><b> Add New Admin </b> </h6>
                
                 <hr/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="text" id="name"  placeholder="Enter Your Name" />
                 <br/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="Email" id="email"  placeholder="Add Email Address" />
                 <br/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="number" id="number" placeholder="Add Phone number " />
                 <br/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="Password" id="pass1"  placeholder="Write Password" />
                 <br/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="Password" id="pass2"  placeholder="Enter Password again" />
                 <br/>
                 <p style={{textAlign:'center'}}>  <button className="btnSgnAdmP btn btn-success" onClick={()=>{this.addNewAdmin()}}><b> Submit </b></button>  </p>
                 
                 <div  id="securityDetail" hidden>
                 <hr/>
                 <p className="form-control" style={{fontSize:'12px' , height:'30px'}}   >Wait For Security Question</p>
                 <br/>
                 <input className="form-control" style={{fontSize:'12px' , height:'30px'}}  type="Text"  placeholder="Write your answer" />
                 <br/>
                 <button className="btnSgnAdmP btn btn-success"  ><b> Submit </b></button>  
                 </div>

                 <br/>
                 <br/>

             </div>

         
          
           <div  className="col-md-5" style={{ minWidth:'400px', border:'solid 1px rgb(20, 194, 224)' , margin:'10px auto' , padding:'10px'}}>

            
           <h6 className="text-center" style={{color:'rgb(20, 194, 224)'}}> <b> Change Credientals Here </b> </h6>
           <hr/>
                

                <div className="form-row align-items-center mx-1" >
                <div className="col-12">
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text" style={{width:'40px' , height:'30px'}}>@</div>
                      </div>
                      <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="inlineFormInputGroup" placeholder="Email"/>
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
                                    <input style={{height:'30px' , fontSize:'12px'}} type="number" className="form-control" value={number} onChange={(e)=>this.setState({number:e.target.value})} placeholder="Contact Number"/>
                                    <Button text='Update'  type='submit'  onClick={()=>this.updateNumber2()}/>
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
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass11" placeholder="Enter Current Password"/>
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
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass22" placeholder="Enter New Password"/>
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
                      <input style={{height:'30px' , fontSize:'12px'}} type="password" className="form-control" id="pass33" placeholder="Re-Enter New Password"/>
                      <Button text='Update'  type='submit' onClick={()=>this.updatePassword2()}/>
                    </div>
                </div>
            </div>

            </div>
            <div>   
          </div>
        </div>
      </div> 
    }


    { nfdiv2 && 
       <div className="col-8" style={{margin:'20px auto'}}>
           <h4 className="text-center" style={{color:'rgb(20, 194, 224)'}}> <b> View Student Details </b> </h4>
            <p className="text-center" > <b> Filter Student BY Batch and Department </b> </p>
             <hr/>

             <div className="form-group mx-1">
                    <label style={{fontSize:'12px'}} >Batch</label>
                    <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.setState({studentBatch:e.target.value})} >
                        <option style={{fontSize:'12px'}} value="teacher">2016</option>
                        <option style={{fontSize:'12px'}} value="teacher">2017</option>
                        <option style={{fontSize:'12px'}} value="teacher">2018</option>
                        <option style={{fontSize:'12px'}} value="teacher">2019</option>
                        <option style={{fontSize:'12px'}} value="student">2020</option>
                    </select>
              </div>

              <div className="form-group mx-1">
              <label style={{fontSize:'12px'}}>Department</label>
              <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.setState({studentDepart:e.target.value})} >
              <option style={{fontSize:'12px'}} value="">Select</option>
                <option style={{fontSize:'12px'}} value="Computer Engineering">Computer Engineering</option>
                <option style={{fontSize:'12px'}} value="Software Engineering">Software Engineering</option>
                <option style={{fontSize:'12px'}} value="Computer Science">Computer Science</option>
                <option style={{fontSize:'12px'}} value="Information Technology">Information Technology</option>
              </select>
             </div>
            
             <Button text='Find'  type='submit' onClick={(e)=>this.showMultipleStudent()} />

              <br/>
              <br/>

              <p className="text-center"> <b> Find Student using Roll no </b> </p>
              <hr/>

              <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="rollno2" placeholder="Write Roll no here (2016-SE-001)"/>
              <Button text='Find'  type='submit' onClick={()=>this.showSingleStudent()} />

              <br/>
              <br/>
              
               {student.map((val , ind)=>{
                return(

              <div style={{padding:'20px' , border:'solid 1px rgb(20, 194, 224)' , margin:'20px' , borderRadius:'10px' , display:'inline-block' , width:'300px', height:'470px' , overflow:'hidden'}}>
        
                <p style={{textAlign:'center'}}>
                    <img src={val.image}  style={{width:'200px' , height:'200px' , marginRight:'auto' , border:'solid 1px rgb(27, 129, 160)' , padding:'7px' , borderRadius:'10px'}} />
                </p>
                <hr/>
                <p style={{textAlign:'center' , fontSize:'12px'}}>
                  <b> Name : {val.name} </b> <br/>
                  <b> Email : {val.email} </b> <br/>
                  <b> Number : {val.number} </b> <br/>
                  <b> Address : {val.address} </b> <br/>
                  <b> Roll No : {val.rollNo} </b><br/>   
                  <b> Enroll No : {val.enrollNo} </b>
                  <hr/>
                  <p style={{textAlign:'center'}}> <Button text="Block User" type="submit" onClick={(i)=>this.blockUser(val.id)} />   </p>                
                  </p>
                  {/* {teacher && <p><b> Emp id : {} </b></p>} 
                  {organization && <p><b> Web Link : {} </b> </p>} */}

                
         
            </div>
          )
        })

        }

       </div>
    }

    { nfdiv3 &&  
      <div className="col-8" style={{margin:'20px auto'}}>
           <h4 className="text-center" style={{color:'rgb(20, 194, 224)'}}> <b> View Teacher Details </b> </h4>
            <p className="text-center" > <b> Filter Teacher By Department </b> </p>
             <hr/>

              <div className="form-group mx-1">
                            <label style={{fontSize:'12px'}}>Department</label>
                            <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.setState({tdepart : e.target.value})} >
                            <option style={{fontSize:'12px'}} value="">Select</option>
                              <option style={{fontSize:'12px'}} value="Computer Engineering">Computer Engineering</option>
                              <option style={{fontSize:'12px'}} value="Software Engineering">Software Engineering</option>
                              <option style={{fontSize:'12px'}} value="Computer Science">Computer Science</option>
                              <option style={{fontSize:'12px'}} value="Information Technology">Information Technology</option>
                            </select>
                           </div>

              <Button text='Find' type='submit' onClick={()=>this.showMultipleTeacher()} />

              <br/>
              <br/>

              <p className="text-center"> <b> Find Teacher by Name </b> </p>
              <hr/>

              <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="tname2"  placeholder="Write name here"/>
              <Button text='Find'  type='submit' onClick={()=>this.showSingleTeacher()} />

              <br/>

              {teacher.map((val , ind)=>{
                return(

              <div style={{padding:'20px' , border:'solid 1px rgb(20, 194, 224)' , margin:'20px' , borderRadius:'10px' , display:'inline-block' , width:'300px', height:'470px' , overflow:'hidden'}}>
        
                <p style={{textAlign:'center'}}>
                    <img src={val.image}  style={{width:'200px' , height:'200px' , marginRight:'auto' , border:'solid 1px rgb(27, 129, 160)' , padding:'7px' , borderRadius:'10px'}} />
                </p>
                <hr/>
                <p style={{textAlign:'center' , fontSize:'12px'}}>
                  <b> Name : {val.name} </b> <br/>
                  <b> Email : {val.email} </b> <br/>
                  <b> Number : {val.number} </b> <br/>
                  <b> Emp id : {val.empID} </b>
                  <hr/>
                  <p style={{textAlign:'center'}}> <Button text="Block User" type="submit" onClick={(i)=>this.blockUser(val.id)} />   </p>                
                  </p>
                  {/* {teacher && <p><b> Emp id : {} </b></p>} 
                  {organization && <p><b> Web Link : {} </b> </p>} */}

                
         
            </div>
          )
        })

        }


       </div>
    }

    { nfdiv4 && 
       <div className="col-8" style={{margin:'20px auto'}}>
           <h4 className="text-center" style={{color:'rgb(20, 194, 224)'}}> <b> View Organization Details </b> </h4>
            <p className="text-center" > <b> Filter Orgnaization By Type </b> </p>
             <hr/>

             <div className="form-group mx-1">
             <label style={{fontSize:'12px'}} >Organization Type</label>
             <select style={{fontSize:'12px'}}  className="form-control" onChange={(e)=>this.setState({orgtype : e.target.value})}>
               <option style={{fontSize:'12px'}}  value="softwarehouse">Software House</option>
               <option style={{fontSize:'12px'}}  value="corporate">Corporate</option>
               <option style={{fontSize:'12px'}}  value="insurance">Insurance</option>
               <option style={{fontSize:'12px'}}  value="networking">Networking</option>
               <option style={{fontSize:'12px'}}  value="other">Other</option>
             </select>
     </div>


              <Button text='Find'  type='submit' onClick={()=>this.showMultipleOrg()}/>

              <br/>
              <br/>

              <p className="text-center"> <b> Find Organization by Name </b> </p>
              <hr/>

              <input style={{height:'30px' , fontSize:'12px'}} type="text" className="form-control" id="oname2"  placeholder="Write name here"/>
              <Button text='Find'  type='submit' onClick={()=>this.showSingleOrg()}/>

              <br/>


              {organization.map((val , ind)=>{
                return(

              <div style={{padding:'20px' , border:'solid 1px rgb(20, 194, 224)' , margin:'20px' , borderRadius:'10px' , display:'inline-block' , width:'300px', height:'470px' , overflow:'hidden'}}>
        
                <p style={{textAlign:'center'}}>
                    <img src={val.image}  style={{width:'200px' , height:'200px' , marginRight:'auto' , border:'solid 1px rgb(27, 129, 160)' , padding:'7px' , borderRadius:'10px'}} />
                </p>
                <hr/>
                <p style={{textAlign:'center' , fontSize:'12px'}}>
                  <b> Name : {val.name} </b> <br/>
                  <b> Email : {val.email} </b> <br/>
                  <b> Number : {val.number} </b> <br/>
                  <b> Address : {val.address} </b> <br/>
                  <b> Web Link : {val.webLink} </b>
                  <hr/>
                  <p style={{textAlign:'center'}}> <Button text="Block User" type="submit" onClick={(i)=>this.blockUser(val.id)} />   </p>                
                  </p>
                  {/* {teacher && <p><b> Emp id : {} </b></p>} 
                  {organization && <p><b> Web Link : {} </b> </p>} */}

                
         
            </div>
          )
        })

        }

       </div>
    }

       

   </div>
  )}
}

function mapStateToProp(state) {
  return ({
    details: state.root.adminInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdmProfile);
