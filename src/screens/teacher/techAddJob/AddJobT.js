import React, { Component } from 'react';
import '../../../css/bootstrap.min.css';
import './AddJobT.css';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar} from 'react-bootstrap';
import {TeacherDetail} from '../../../store/action/action';
import '../../Loader/loader.css'
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';


class TeacherAddJob extends Component {

    constructor() {
        super();
        this.state = {
            myPost:[] ,
            dataIndex : null ,
            progress : false ,
            progress1 : true ,
            jobType : 'none' ,
            workType : 'none' ,
            category : 'none'
        }
      }


      componentDidMount(){

        this.validation();
         this.addData();
       }

       
  validation(){
    var data = this.props.accounttype;
   if(data.includes('Teacher')){

   }else{
    Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
    this.props.history.push("/");
   }
  }



  addData(){
    const{myAchievements , progress , myPost}=this.state;
  
    var data = this.props.details;
  
  firebase.database().ref("Jobs").orderByChild("cemail").equalTo(""+data.email).on("value", (snapshot)=> {
    if(snapshot.exists()){
      this.setState({progress1:false})
      snapshot.forEach((childSnapshot) => {
      var rdata = childSnapshot.val();
       var obj = {
        id : rdata.id ,
        image : rdata.image ,
        subject : rdata.subject ,
        detail : rdata.detail ,
        category : rdata.category ,
        date : rdata.date ,
        type : rdata.jobType ,
        workexperience : rdata.workType ,
       }
      myPost.push(obj);
      this.setState({myPost})
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

        const { special ,type  , progress , category , workType , jobType , myPost } = this.state;
        
        var a1 = document.getElementById('subject').value;
        var b1 = document.getElementById('detail').value;
        var c1 = document.getElementById('date').value;
        var file = document.getElementById('file').files[0];
        
        
        if(a1.length<1){
          Swal.fire('Oops' , 'Please Fill Out Subject Field Correctly' , 'error')
        }
        else if(b1.length<10){
          Swal.fire('Oops' , 'Please Write Description Correctly' , 'error')
        }
        else if(c1.length<1){
          Swal.fire('Oops' , 'Please Write Last Date' , 'error')
        }
        else if(workType.includes('none')){
          Swal.fire('Oops' , 'Please Select Work Type' , 'error')
        }
        else if(category.includes('none')){
          Swal.fire('Oops' , 'Please Select Category' , 'error')
        }
        else if(jobType.includes('none')){
          Swal.fire('Oops' , 'Please Select Job Type Correctly' , 'error')
        }
        else if (file==undefined){
          Swal.fire('Oops' , 'Please Select Your Image' , 'error')
        }
        else{
        
            this.setState({progress:true})
          
            while(myPost.length > 0) {
              myPost.splice(0,1); 
             }
         
          
            var storageref = firebase.storage().ref("storage");
                var uploadtask= storageref.child(''+(new Date()).getTime()+file.name).put(file).then((snapshot)=>{
                return snapshot.ref.getDownloadURL();
                }).then(downloadURL => {
                var data = this.props.details;
                 
                var database = firebase.database().ref();
                
                  var skey =firebase.database().ref('Jobs').push();
                
                  var jobObj = {
                    cid : data.id ,
                    clogo : data.imgURL ,
                    cemail : data.email ,
                    cname : data.name ,
                    id : skey.key,
                    subject : a1 ,
                    detail : b1 ,
                    date : c1 ,
                    image :  downloadURL ,
                    workType : workType ,
                    jobType : jobType ,
                    category : category,
                    from : 'Teacher'
                  }
        
                  skey.set(jobObj); 
                  this.setState({progress:false})
                  Swal.fire('Congratulation', 'Your Job Post  Added Successfully')

                   document.getElementById('subject').value = '';
                   document.getElementById('detail').value = '';
                   document.getElementById('date').value = '';
            }) 
        }
        }


                    
            delete(id){
                const { myPost } = this.state;
                // Swal.fire('Done', 'Data Deleted Successfully')
                
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    firebase.database().ref(`Jobs/${id}`).set({});
                    Swal.fire(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                    )
                window.location.reload()
                }
                })
                }







render(){

    const {myPost , dataIndex , progress , progress1 , jobType , workType , category} = this.state;
    return(
        <div className="mh-100" style={{backgroundColor:'whitesmoke'}}>
            
        <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>
        <Navbar.Brand>
            <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
            <img  style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
        </Navbar.Brand>
        </Navbar>  


          <div class="row">
             
               <div className="col-md-5 halfdivTAJ" >

                 <h6 style={{textAlign:'center' , color:'rgb(20, 194, 224)'}} className="text-center" >  YOUR INFORMATION  </h6>
                 
                 <hr/>

                 <div>
                     <label  style={{display:'block' , textAlign:'left' , fontSize:'13px'}}><b style={{color:'rgb(20, 194, 224)'}}>Name</b></label>
                     <p style={{ height:'30px' , fontSize:'13px' }}  className="col-sm-12 form-control">{this.props.details.name} </p>
                 </div>


                 <div>
                     <label  style={{display:'block' , textAlign:'left' , fontSize:'13px'}}><b style={{color:'rgb(20, 194, 224)'}}>Email</b></label>
                     <p style={{ height:'30px' , fontSize:'13px' }}  className="col-sm-12 form-control">{this.props.details.email} </p>
                 </div>


                 <div>
                     <label  style={{display:'block' , textAlign:'left' , fontSize:'13px'}}><b style={{color:'rgb(20, 194, 224)'}}>Department</b></label>
                     <p style={{ height:'30px' , fontSize:'13px' }}  className="col-sm-12 form-control">{this.props.details.department} </p>
                 </div>

                 <div>
                     <label  style={{display:'block' , textAlign:'left' , fontSize:'13px'}}><b style={{color:'rgb(20, 194, 224)'}}>Designation</b></label>
                     <p style={{ height:'30px' , fontSize:'13px' }}  className="col-sm-12 form-control">{this.props.details.designation} </p>
                 </div>
             
                 </div>  

                
                


                
                <div id="adata" className="col-lg halfdivTAJ" style={{textAlign:'center' , margin:'10px' }}>
                
                <h6 style={{textAlign:'center' , color:'rgb(20, 194, 224)'}} className="text-center" >  Add New Job   </h6>
                 
                <hr/>

                <div>
               <label  style={{display:'block' , textAlign:'left' , fontSize:'14px'}}><b style={{color:'rgb(20, 194, 224)'}}>Subject </b></label>
               <input className="col-md-12 form-control" id="subject"></input>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left' , fontSize:'14px'}}><b style={{color:'rgb(20, 194, 224)'}}>Details</b></label>
               <textarea className="col-md-12 form-control" id='detail'></textarea>
               <br/>
               </div>

               <div>
               <label  style={{display:'block' , textAlign:'left' , fontSize:'14px'}}><b style={{color:'rgb(20, 194, 224)'}}>Last Date</b></label>
               <input type='Date' className="col-md-12 form-control" id='date'></input>
               <br/>
               </div>

                   <div className="form-group mx-1">
                            <label  style={{fontSize:'14px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Type</b></label>
                            <select style={{fontSize:'14px'}} className="form-control" onChange={(e)=>this.setState({jobType : e.target.value})} >
                              <option value="Job">Job</option>
                              <option value="Internship">Internship</option>
                              <option value="Seminar">Seminar</option>
                              <option value="Scholarship">Scholarship</option>
                              <option value="Other">Other</option>
                            </select>
                       </div>


                       <div className="form-group mx-1">
                            <label  style={{fontSize:'14px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Work Experienced</b></label>
                            <select style={{fontSize:'14px'}} className="form-control" onChange={(e)=>this.setState({workType : e.target.value})} >
                              <option value="Fresh">Fresh</option>
                              <option value="3 to 6 months">3 to 6 months</option>
                              <option value="6 to 12 months">6 to 12 months</option>
                            </select>
                        </div>

                        <div className="form-group mx-1">
                            <label  style={{fontSize:'14px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Category</b></label>
                            <select style={{fontSize:'14px'}} className="form-control" onChange={(e)=>this.setState({category : e.target.value})} >
                            <option value="Web , Mobile and Software developer">Web , Mobile and Software developer</option>
                            <option value="Ecommerce Development">Ecommerce Development</option>
                            <option value="Game Development">Game Development</option>
                            <option value="Android App Development">Android App Development</option>
                            <option value="QA and Testing">QA and Testing</option>
                            <option value="Database Specialist">Database Specialist</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Web Designing">Web Designing</option>
                            <option value="IOS Development">IOS Development</option>
                            <option value="All IT and Networking">All IT and Networking</option>
                            <option value="Other">Other</option>
                            </select>
                        </div>


               <div>
               <label  style={{display:'block' , textAlign:'left' , fontSize:'14px'}}><b style={{color:'rgb(20, 194, 224)'}}>Attachment</b></label>
               <input type="file" id='file' className="col-md-12 form-control"/>
               <br/>
               </div>

               <br/>
               {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }


            {!progress && <div align="center"><Button text='Submit'  type='submit' onClick={()=>this.shareAchieve()}/> </div> }

            </div>
        </div>
    </div>
    )
}

}

function mapStateToProp(state) {
    return ({
      details: state.root.teacherInfo ,
      accounttype : state.root.accountType
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
       teacherInfo :(info3)=>{ dispatch(TeacherDetail(info3))} ,
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(TeacherAddJob);