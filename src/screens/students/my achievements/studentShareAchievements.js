import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentShareAchivement.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import firebase from '../../../config/firebase.js'
import {Button} from '../../../components/button/button.js'
import '../../Loader/loader.css'

import { Navbar} from 'react-bootstrap';


class studentShareAchivement extends Component {
  
  constructor() {
    super();
    this.state = {
        myAchievements:[] ,
        dataIndex : null ,
        special : 'all' ,
        type : 'all' ,
        progress : false ,
        progress1 : true
    }
  }

  componentDidMount(){
    this.addData()
  }

   selectSpecial = (event) => { 
    const { special } = this.state;
     this.setState({special : event.target.value})
    }
  
    selectType = (event) => { 
      const { type } = this.state;
      this.setState({type : event.target.value})
      } 
  

  addData(){
      const{myAchievements , progress}=this.state;

      var data = this.props.details;

    firebase.database().ref("Achievements").orderByChild("email").equalTo(""+data.email).on("value", (snapshot)=> {
      if(snapshot.exists()){
        this.setState({progress1:false})
        snapshot.forEach((childSnapshot) => {
        var rdata = childSnapshot.val();
         var obj = {
          id : rdata.id ,
          logo : rdata.image ,
          orgName : rdata.orgName ,
          cerDetails : rdata.certificeDetail ,
          gettingSkills : rdata.skills ,
          CompletionDate : rdata.completeDate ,
          orgLink : rdata.orgLink ,
          speciality:rdata.speciality ,
          type : rdata.certificateType ,
          subject : rdata.subject
         }
        myAchievements.push(obj);
        this.setState({myAchievements})
      })
    }else{
      this.setState({progress1:false})
    }
     })
    
  }

  showFullData(e){
    const {dataIndex}  = this.state; 
   document.getElementById('adata').innerHTML = null
    this.setState({dataIndex:e})
  }  

  shareAchieve(){

   const { special ,type  , myAchievements , progress} = this.state;

    var a1 = document.getElementById('subject').value;
    var b1 = document.getElementById('Org_name').value;
    var c1 = document.getElementById('Org_Website').value;
    var d1 = document.getElementById('Cert_details').value;
    var e1 = document.getElementById('Ach_skills').value;
    var f1 = document.getElementById('comp_date').value;
    var file = document.getElementById('img_of_cert').files[0];

   
    if(a1.length<1){
      Swal.fire('Oops' , 'Please Fill Out Subject Field Correctly' , 'error')
    }
    else if(b1.length<1){
      Swal.fire('Oops' , 'Please Write Out Organization Name Correctly' , 'error')
    }
    else if(c1.length<1){
      Swal.fire('Oops' , 'Please Write Organization Website Link Correctly' , 'error')
    }
    else if(d1.length<1){
      Swal.fire('Oops' , 'Please Fill Out certification Field Correctly' , 'error')
    }
    else if(e1.length<1){
      Swal.fire('Oops' , 'Please Fill Your Achieved Skills Correctly' , 'error')
    }
    else if(f1.length<1){
      Swal.fire('Oops' , 'Please Write Completion date  Correctly' , 'error')
    }
    else if (file==undefined){
      Swal.fire('Oops' , 'Please Select Your Image' , 'error')
    }
   else if(type.includes('all')){
      Swal.fire('Oops' , 'Please Select Degree Type ' , 'error')
    }
    else if (special.includes('all')){
      Swal.fire('Oops' , 'Please Select Youe Certificate Speciality' , 'error')
    }
    else{

        this.setState({progress:true})
      
        while(myAchievements.length > 0) {
          myAchievements.splice(0,1); 
         }
     
      
        var storageref = firebase.storage().ref("storage");
            var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
            var data = this.props.details;
             
            var database = firebase.database().ref();
            
              var skey =firebase.database().ref('Achievements').push();
            
              var certificateObj = {
                userID : data.id ,
                rollNo : data.rollNo ,
                email : data.email ,
                id : skey.key,
                subject : a1 ,
                orgName : b1,
                orgLink : c1 ,
                certificeDetail : d1 ,
                skills : e1 ,
                completeDate : f1 ,
                certificateType : type , 
                speciality : special ,
                image :  downloadURL ,
                userName : data.name ,
                myimg : data.imgURL
              }
              skey.set(certificateObj); 

              firebase.database().ref(`Student/${data.rollNo}/Achievements`).push().set({subject : a1});

              this.setState({progress:false})
              Swal.fire('Congratulation', 'Your Achievement Added Successfully')
        }) 
    }
}

delete(id){

// Swal.fire('Done', 'Data Deleted Successfully')

Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    firebase.database().ref(`Achievements/${id}`).set({});
    Swal.fire(
      'Deleted!',
      'Your data has been deleted.',
      'success'
    )
  }
})

}

  render(){
      const {myAchievements , dataIndex , progress , progress1} = this.state; 
      return(
          <div className="mainDivAH">

          <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
            <Navbar.Brand>
                <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
                <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
            </Navbar.Brand>
           </Navbar>  

              <div  className="col-md-14 row">

              <div id="sdata" className="col-lg scrollbar square scrollbar-lady-lips thin" style={{ height:'750px' , overflowY:'scroll' , textAlign:'center' , margin:'20px'}}> 
              <h6 className="pagination-centered" style={{color:'rgb(20, 194, 224)'}}> Shared Achievements </h6>
                <hr/>
                {myAchievements.length<1 && <h5> No Achievements Found </h5>}
                {progress1 && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

              { 
                  myAchievements.map((val , ind)=>{
                        return(
                           <div  className="viewDivAH" id='div11'>
                              {console.log('data' , myAchievements)}
                              <p style={{textAlign:'center'}}> <img style={{width:'200px' , height:'150px'}} src={val.logo}/> </p>
                              <hr/>
                              <p  style={{width:'500px'}} > 
                               <p style={{textAlign:'center'}}><b> "{val.subject}"  </b></p><br/>
                              {/* <b> Completion Date: </b> {val.CompletionDate} <br/> */}
                              <b> Organization Name : </b>  {val.orgName} <br/>
                              <b> Organization Web : </b> {val.orgLink} <br/>  
                              <b> Certification Details : </b> {val.cerDetails} <br/> 
                              <b> Achievied Skills: </b> {val.gettingSkills} <br/>
                              <b> Completion Date: </b> {val.CompletionDate} <br/>
                              <b> Speciality: </b> {val.speciality} <br/>
                              <b> Degree Type: </b> {val.type} <br/>
                              </p>
                              <div align="right"> <Button text='Delete'  type='submit' onClick={(e)=>{this.delete(val.id)}} /> </div>
                           </div>
                       )
                    })
              }
              </div>
              
              <div id="adata" className="col-lg" style={{textAlign:'center' , margin:'10px' , fontSize:'12px'}}>
                
                <h6 style={{textAlign:'center' , color:'rgb(20, 194, 224)'}} className="text-center" >  Add New Achievement   </h6>
                 
                <hr/>

                <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Subject </b></label>
               <input style={{height:'30px'}} className="col-md-12 form-control" id="subject"></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Organization Name</b></label>
               <input style={{height:'30px'}} className="col-md-12 form-control" id="Org_name"></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Organization Website Link</b></label>
               <input style={{height:'30px'}} className="col-md-12 form-control" id="Org_Website"></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Certification Details</b></label>
               <textarea  className="col-md-12 form-control" id="Cert_details"></textarea>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Achieved Skills</b></label>
               <input style={{height:'30px'}} className="col-md-12 form-control" id="Ach_skills" ></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left'}}><b style={{color:'rgb(20, 194, 224)'}}>Completion Date </b></label>
               <input style={{height:'30px' , fontSize:'12px'}} type="Date" className="col-md-12 form-control" id="comp_date"/>
               <br/>
               </div>

              

               <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Type</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.selectType(e)} >
                <option style={{fontSize:'12px'}}  value="all">ALL</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                </select>
            </div> 
                  
            <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Speciality</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.selectSpecial(e)} >
                <option style={{fontSize:'12px'}}  value="all">ALL</option>
                <option value="Web , Mobile and Software developer">Web , Mobile and Software developer</option>
                <option value="Ecommerce Development">Ecommerce Development</option>
                <option value="Game Development">Game Development</option>
                <option value="Android App Development">Android App Development</option>
                <option value="QA and Testing">QA and Testing</option>
                <option value="Database">Database</option>
                <option value="Web Development">Web Development</option>
                <option value="Web Designing">Web Designing</option>
                <option value="IOS Development">IOS Development</option>
                <option value="All IT and Networking">All IT and Networking</option>
                <option value="Other">Other</option>
                </select>
              </div>

               <br/>

               <div>
               <label  style={{display:'block' , textAlign:'left' , fontSize:'12px'}}><b style={{color:'rgb(20, 194, 224)'}}>Image of Certificate  </b></label>
               <input type="file" style={{fontSize:'12px'}} className="col-md-12 form-control" id="img_of_cert"/>
               <br/>
               </div>

               {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }


                  {!progress &&  <div align="center"><Button text='Submit'  type='submit'  onClick={()=>{this.shareAchieve()}}/> </div>}

            </div>

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

export default connect(mapStateToProp, mapDispatchToProp)(studentShareAchivement);