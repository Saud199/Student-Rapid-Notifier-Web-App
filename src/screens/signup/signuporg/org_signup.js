import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './org_signup.css';
import Login from '../../login/Login.js';
import {Link} from 'react-router-dom'; 
import {Button} from '../../../components/button/button.js'
import Swal from 'sweetalert2'
import firebase from '../../../config/firebase.js'
import '../../Loader/loader.css'


class Orgsignup extends Component {

constructor(){
  super();
  
  this.state={
   oType:'softwarehouse' ,
   secQues : 'Favourite Teacher Name' ,
   progress : false 
  }

}

selectedType = (event) => { 
  const { oType  } = this.state;
  this.setState({oType : event.target.value})
  }
        
  createAccount(){
  const {oType , progress , secQues} = this.state;

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var pass1 = document.getElementById('pass1').value;
        var pass2 = document.getElementById('pass2').value;
        var ph_no = document.getElementById('number').value;
        var address = document.getElementById('address').value;
        var webLink = document.getElementById('weblink').value;
        var secAns = document.getElementById('secans').value;
        var file = document.getElementById('file').files[0]
        
        
        if(name.length<2){
          Swal.fire('Oops...', 'Please Enter Your name Correctly', 'error')
         }
         else if(email.length<6 || !email.includes('@')  || !email.includes('.')){
          Swal.fire('Oops...', 'Please Enter A Valid Email Address', 'error')
         }
         else if(pass1.length<6 ){
          Swal.fire('Oops...', 'Write Your Password Correctly. It must Contain 6 or more Characters', 'error')
         }
         else if(pass1 != pass2 ){
          Swal.fire('Oops...', 'Please Check Your Re-type Password Field', 'error')
         }
         else if(ph_no.length<6){
          Swal.fire('Oops...', 'Please Enter Your Organization Number', 'error')
         }
         else if(address.length<6){
          Swal.fire('Oops...', 'Please Enter Valid Address', 'error')
         }
         else if(webLink.length<6){
          Swal.fire('Oops...', 'Please Enter Valid Website Link', 'error')
         }
         else if(secAns.length<2){
          Swal.fire('Oops...', 'Please Enter Security Answer Correctly', 'error')
         }
         else if(file==undefined){
          Swal.fire('Oops...', 'Please Select Your Profile Picture', 'error')
         }
         else if(oType.length<2){
          Swal.fire('Oops...', 'Please Select the Type of Your Organization', 'error')
         }
         else{

          this.setState({progress:true})

          var data = this.props.details;

          firebase.auth().createUserWithEmailAndPassword(email, pass1).then((success)=>{
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
            
              var orgObj = {
                id : skey.key,
                name : name ,
                email : email.toLowerCase(),
                ph_no : ph_no ,
                accountType : "Organization" ,
                orgType : oType ,
                address : address ,
                webLink : webLink ,
                secQuestion : secQues ,
                secAns : secAns ,
                accountStatus : 'Not Approved' ,
                imgURL : downloadURL,
                
              }
        
              skey.set(orgObj); 
              this.setState({progress:false})


              document.getElementById('name').value="";
              document.getElementById('email').value="";
              document.getElementById('pass1').value="";
              document.getElementById('pass2').value="";
              document.getElementById('number').value="";
              document.getElementById('address').value="";
              document.getElementById('weblink').value="";
              
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

}


  
 render(){
   const {progress , secQues} = this.state;
  return(
   <div>
      <div className="row">
              
          <div className="col-md" style={{ paddingTop:'200px' , backgroundColor:'rgb(20, 194, 224)'}} >
          <div style={{textAlign:'center'}}> <img style={{width:'320px' , height:'280px'}} src={require('../../../images/stutech_logo_new.png')} /> </div>
          </div>

              <div className="col-lg-5" style={{float:'right',paddingTop:'50px'}} id="div2" >
                    <h3 className="text-center">Create Organization Account</h3>

                <br />

                <div align="center">Want to signup as a student or a teacher ? <Link to="/signup1"> <a href="signup.html">Click Here</a></Link> </div>

                <br />

                <div className="form-row align-items-center mx-1" >

                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' , height:'30px'}}>N</div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="text" className="form-control" id="name" placeholder="Organization Name"/>
                        </div>
                    </div>

                </div>

                <br />

                <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' ,height:'30px'}}>@</div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="email" className="form-control" id="email" placeholder="Email"/>
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
                          <input style={{fontSize:'12px' , height:'30px'}}  type="password" className="form-control" id="pass1" placeholder="Password"/>
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
                          <input style={{fontSize:'12px' , height:'30px'}}  type="password" className="form-control" id="pass2" placeholder="Re-Type Password"/>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/phone.png')} width="15px" height="15px" /></div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="number" className="form-control" id="number" placeholder="Contact Number "/>
                        </div>
                    </div>
                </div>

                <br />


                <div className="form-row align-items-center mx-1" >
                    <div className="col-12">
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text" style={{width:'40px' , height:'30px'}}><img src={require('../../../images/house.png')} width="15px" height="15px" /></div>
                          </div>
                          <input style={{fontSize:'12px' , height:'30px'}}  type="text" className="form-control" id="address" placeholder="Address"/>
                        </div>
                    </div>
                </div>

                <br />

                <div className="form-row align-items-center mx-1" >
                        <div className="col-12">
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text" style={{width:'40px' , height:'30px'}} ><img src={require('../../../images/web.png')} width="15px" height="15px" /></div>
                              </div>
                              <input style={{fontSize:'12px' , height:'30px'}}  type="text" className="form-control" id="weblink" placeholder="Website Link"/>
                            </div>
                        </div>
                </div>

                <br />

                <div className="custom-file mx-1">

                    <div className="input-group mb-2"></div>
                    <input style={{fontSize:'12px' , height:'30px'}}  type="file" className="custom-file-input" id="file" required/>
                    <label style={{fontSize:'12px'}}  className="custom-file-label"  >Upload Organization Logo</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                </div>

                
                <br />
                <br />


                <div className="form-group mx-1">
                        <label style={{fontSize:'12px'}} >Organization Type</label>
                        <select style={{fontSize:'12px'}}  className="form-control" onChange={this.selectedType}>
                          <option style={{fontSize:'12px'}}  value="softwarehouse">Software House</option>
                          <option style={{fontSize:'12px'}}  value="corporate">Corporate</option>
                          <option style={{fontSize:'12px'}}  value="insurance">Insurance</option>
                          <option style={{fontSize:'12px'}}  value="networking">Networking</option>
                          <option style={{fontSize:'12px'}}  value="other">Other</option>
                        </select>
                </div>

                <div className="form-group mx-1">
                        <label style={{fontSize:'12px'}} >Security Question</label>
                        <select style={{fontSize:'12px'}}  className="form-control" onChange={(e)=>this.setState({secQues : e.target.value})}>
                          <option style={{fontSize:'12px'}}  value="Favourite Teacher Name">Favourite Teacher Name</option>
                          <option style={{fontSize:'12px'}}  value="What is your oldest cousin's first and last name">What is your oldest cousin's first and last name</option>
                          <option style={{fontSize:'12px'}}  value="What was your favorite place to visit as a child?">What was your favorite place to visit as a child?</option>
                        </select>
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


                {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

                <br />

  {!progress && <div align="center"><Button text='Submit'  type='submit' onClick={() =>this.createAccount()}/></div> }
                  
                <br />
              </div>  
                
           </div>
   </div>
  )}
}

export default Orgsignup;
