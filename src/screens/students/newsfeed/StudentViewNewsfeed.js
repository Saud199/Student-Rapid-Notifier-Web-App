import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './StudentViewNewsFeed.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import '../../Loader/loader.css'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import { transcode } from 'buffer';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import { program } from '@babel/types';
import Chart from 'chart.js';

class StudentViewNewsFeed extends Component {
  
  constructor() {
    super();

    this.state = {
        progress:true,
        JobsNF:[] , 
        allNF:[] ,
        rname : '' ,
        rsubject : '' ,
        rdate : '' ,
        rtime : '' ,
        open: false,
    }
  }

  componentDidMount(){
    this.validation()
     this.addData();
 }


 validation(){
   var data = this.props.accounttype;
  if(data.includes('Student') || data.includes('Admin')){
   this.props.history.index=0;
  }else{
   Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
   this.props.history.push("/");
  }
 }

  // onOpenModal = () => {
  //   this.setState({ open: true });
  // };
 
  // onCloseModal = () => {
  //   this.setState({ open: false });
  // };

  addData(){
    const {JobsNF , progress , allNF} = this.state;
      this.setState({progress : true})

      while(JobsNF.length > 0) {
        JobsNF.splice(0,1); 
       }

       while(allNF.length > 0) {
        allNF.splice(0,1); 
       }


    firebase.database().ref('Jobs').on("value", (snapshot)=> {
      
      snapshot.forEach((childSnapshot)=> {
       var d = childSnapshot.val();
      var obj = {
       id : d.id ,
       logo : d.clogo ,
       Jimg : d.image ,
       orgName : d.cemail ,
       description : d.detail ,
       date : d.date ,
       experience : d.workType,
       type : d.jobType ,
       cid : d.cid ,
       category : d.category ,
       subject : d.subject ,
       from : d.from
      }
      JobsNF.push(obj);
      allNF.push(obj)
      this.setState({JobsNF , allNF})
      })
      this.setState({progress : false})
    })
}  

showCategdata(val1){
  const {allNF , JobsNF} = this.state;

  while(JobsNF.length > 0) {
    JobsNF.splice(0,1); 
    console.log('deleted')
    this.setState({JobsNF})
   }

   allNF.map((val , ind)=>{
     
     if(val.type.includes(val1)){
      console.log(val.type , val1)
     
      var obj = {
        id : val.id ,
        logo : val.logo ,
        Jimg : val.Jimg ,
        orgName : val.orgName ,
        description : val.description ,
        date : val.date ,
        experience : val.experience,
        type : val.type ,
        cid : val.cid ,
        category : val.category ,
        subject : val.subject , 
        from : val.from
       }
       JobsNF.push(obj)
       this.setState({JobsNF})
     }
   })

}

onOpenModal(val) {
  const {rsubject , rname} = this.state;
  this.setState({ open: true  , rsubject:val.subject || '' , rname:val.orgName || ''});
};

onCloseModal = () => {
  this.setState({ open: false });
};

setReminder(){
  this.setState({open:true})   
  const {rname , rsubject , rdate , rtime , open} = this.state;
  var data = this.props.details;

  // var name = rname;
  // var subject = rsubject;
  // var date = rdate;
  // var time = rtime;


  if(rname.length<2){
      Swal.fire('Oops' , 'Please Write Name Correctly' , 'error')
  }else if (rsubject.length<2){
      Swal.fire('Oops' , 'Please Write Subject Correctly' , 'error')
  }
  else if(rdate.length<10 || rdate.length>10){
      Swal.fire('Oops' , 'Please Write date (DD-MM-YYYY) in this Format' , 'error')
  }else if(rtime.length<8 || rtime.length>8){
      Swal.fire('Oops' , 'Please Write time in 24 Hours (HH-MM-SS) in this Format' , 'error')
  }
  else {
      var skey = firebase.database().ref(`reminder/${data.id}`).push();
       var obj = {
          id : skey.key ,
          name : rname ,
          subject : rsubject ,
          date : rdate ,
          time : rtime 
       }
       skey.set(obj);

       var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText)
              })
       xhr.open('GET', `http://smartsms.pk/json?api_token=a3bec66f70ebfc9ec4d1ecbcfbdaa90bcb2d949b95503dfca0da4dd77791&api_secret=zubair123&to=${data.number}&from=Brand&date=${rdate}&time=${rtime}&message=You+set+a+reminder+for+${rsubject}+on+this+Date+${rdate}`)
       xhr.send()

       Swal.fire('Done' , 'Reminder Set Successfully')
      this.setState({open:false , rdate:'' , rtime:''  , rname:'' , rsubject:''})
  }
 } 

  
addFav(i){
    const {JobsNF} = this.state;
    var data = this.props.details;
    var skey = firebase.database().ref("Favourite/"+data.rollNo).push();
    var obj = {
            id:skey.key,
            logo : JobsNF[i].logo ,
            Jimg : JobsNF[i].Jimg ,
            orgName : JobsNF[i].orgName ,
            description : JobsNF[i].description ,
            date : JobsNF[i].date ,
            experience : JobsNF[i].experience,
            type : JobsNF[i].type ,
            cid : JobsNF[i].cid ,
            category : JobsNF[i].category ,
            subject : JobsNF[i].subject ,
            from : JobsNF[i].from || 'undefined'
          }
 
  skey.set(obj);
  Swal.fire('Done' , 'Add Favourite Successfully')
}

  viewProf(i){
    const {JobsNF} = this.state;
    localStorage.setItem('orgID' , JobsNF[i].cid);
    this.props.history.push('./stuViewOrg')
   }
 

  render(){

  
    const {nfdiv1 , nfdiv2 , nfdiv3 , nfdiv4 , nfdiv5 , JobsNF , open , progress , rname , rdate , rtime , rsubject} = this.state;
      return(
       <div >

     <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> SET YOUR REMINDER </b> </h6>
          <hr/>

          <p> Name :  <input className="form-control" value={rname} onChange={(e)=>this.setState({rname : e.target.value}) }  /> </p> 
          <p> Subject : <input className="form-control" value={rsubject} onChange={(e)=>this.setState({rsubject : e.target.value}) }  /> </p>
          <p> Date : <input className="form-control"   placeholder="Write date (DD-MM-YYYY)" value={rdate} onChange={(e)=>this.setState({rdate : e.target.value}) } /> </p>
          <p> Time :  <input className="form-control"   placeholder="Time in 24 Hours (HH-MM-SS)" value={rtime} onChange={(e)=>this.setState({rtime : e.target.value}) } />  </p>  

            <div className="row">
              <Button style={{margin:'2px auto'}} onClick={()=>{this.setReminder()}} type="submit" text="Set Reminder" />
            </div>

          </div>
        </Modal>

        

          <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
            <Navbar.Brand>
                <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              </Nav> 
              {/* <Form inline style={{marginRight:'7%' , marginLeft:'7%' , textAlign:'center'}}>
                <FormControl style={{ width:'400px' , height:'8%' , fontSize:'10px' }}  type="text" placeholder="Search" className="mr-sm-2" />
                 <Button text="Search" /> 
              </Form>
              <Nav.Link> 
                   <img onClick={this.onOpenModal} data-toggle="modal" data-target="#exampleModal"  style={{width:'20px' , height:'20px' , float:'right'}} src={require('../../../images/filter.png')}  />
              </Nav.Link> */}
            </Navbar.Collapse>
          </Navbar>

                <div style={{backgroundColor: 'rgb(233, 233, 233)' , margin:'0px 0px 10px 0px' }}>
                   <div  className="row navbarN"  >
                   <p className="navitemN" onClick={()=>this.addData()} >All_Post</p>
                   <p className="navitemN" onClick={(e)=>this.showCategdata('Job')} >JOBS</p>
                   <p className="navitemN" onClick={(e)=>this.showCategdata('Internship')}>INTERNSHIPS</p> 
                   <p className="navitemN"  onClick={(e)=>this.showCategdata('Seminar')}>SEMINARS</p>
                   <p className="navitemN" onClick={(e)=>this.showCategdata('Scholarship')} >SCHOLARSHIPS</p>
                   <p className="navitemN" onClick={(e)=>this.showCategdata('Other')} >OTHERS</p>
                   </div>
                </div>

                {/* <canvas id="myChart"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas> */}
         
                {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }
                
               
                <div  className="col-md-12 newsDiv1NF" >
                { JobsNF.length>0 &&
                       JobsNF.map((val , index ) => {
                           console.log('chala')
                        return(
                            <div className="row  dyanmicDivNF"  >
                               
                               <div className="ddiv2FV">
                                   <img  className="mimageNF" src={val.logo}/>
                                   <br/>
                                   <h6 className="orgnmeNF">{val.orgName}</h6>
                                   <h6  style={{color:'rgb(20, 194, 224)' , width:'200px'}} > {val.subject } </h6>
                                </div>

                                <div style={{margin:'10px auto'}}>   
                                <p style={{fontSize:'13px'}}> 
                                  <b> Last Date : </b> {val.date} <br/> 
                                  <b> Category : </b> {val.category} <br/>
                                  <b>Post Type : </b> {val.type} <br/>
                                  <b> Work Experience : </b> {val.experience}   
                                </p>
                                  <div style={{textAlign:'center'}}>                                        
                                      <hr/>
                                      <figure style={{display:'inline-block'}} onClick={(e)=>this.onOpenModal(val)}>
                                      <img style={{width:'20px' , height:'20px'}} src={require('../../../images/rem.jpg')} />
                                      <figcaption  style={{fontSize:'10px'}}><b> Reminder </b> </figcaption>
                                      </figure>

                                      &nbsp; &nbsp;
                                      {(val.from == 'Organization' || val.from == undefined)  && <figure style={{display:'inline-block'}} onClick={(e)=>this.viewProf(index)}>
                                        <img  style={{width:'25px' , height:'25px'}} src={require('../../../images/user.jpg')}/> 
                                        <figcaption style={{fontSize:'10px'}}><b> Profile</b></figcaption>
                                    </figure> }


                                      &nbsp; &nbsp;
                                      <figure style={{display:'inline-block'}} onClick={(i)=>this.addFav(index)}>
                                      <img src={require('../../../images/fav.png')}  style={{width:'20px' , height:'20px'}}/>
                                      <figcaption  style={{fontSize:'10px'}}><b>Favourite</b></figcaption>
                                      </figure>

                                      {/* &nbsp; &nbsp;
                                      <figure style={{display:'inline-block'}}>
                                      <img src={require('../../../images/download.png')}  style={{width:'20px' , height:'20px'}}/>
                                      <figcaption style={{fontSize:'10px'}}><b>Download</b></figcaption>
                                      </figure> */}
                                      <hr/> 
                                  </div>
                                </div>

                                <div style={{ margin:'10px auto', border:'solid 1px black' , width:'220px' , height:'150px'}}  >
                               <img src={val.Jimg} style={{width:'215px' , height:'145px'}}  />
                               </div>

                               <div style={{margin:'1px auto' , textAlign:'center'}}>
                                <p style={{fontSize:'13px'}}><b>Description</b></p>
                                <p className="desDivNF"> {val.description} </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            </div>
      )
  }

}

function mapStateToProp(state) {
  return ({
    details: state.root.studentInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(StudentViewNewsFeed);
