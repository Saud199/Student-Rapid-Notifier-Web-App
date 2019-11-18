import React, { Component } from 'react';
import '../../../css/bootstrap.min.css';
import './studentAfterLogin.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom'; 
import {Button} from '../../../components/button/button.js'
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import '../../Loader/loader.css'
import Swal from 'sweetalert2'
import Modal from 'react-responsive-modal';
import {StudentDetail , DynamicData , ChatData} from '../../../store/action/action.js';
// import { CustomErrorComponent } from 'custom-error';



class studentAfterLogin extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          JobsNF:[],
          reminder:[] , 
          progress : true ,
          rname : '' ,
          rsubject : '' ,
          rdate : '' ,
          rtime : '' ,
          open: false,         
        }
        this.Recentjob = this.Recentjob.bind(this)
      }

      componentDidMount(){
         this.validation()
          this.addData();
          this.showReminder()
      }

      showReminder(){
          const { reminder } = this.state;
          var data = this.props.details;

          firebase.database().ref(`reminder/${data.id}`).on("value", (snapshot)=> {
            
            if(snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
                var obj = {
                    name : childSnapshot.val().name ,
                    subject : childSnapshot.val().subject ,
                    date : childSnapshot.val().date ,
                    time : childSnapshot.val().time
                }
                reminder.push(obj);
                this.setState({reminder})  
            })
          }
        })
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

      onOpenModal(val) {
        const {rsubject , rname} = this.state;
        this.setState({ open: true  , rsubject:val.subject || '' , rname:val.orgName || ''});
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
    

    addData(){
        const {JobsNF} = this.state;
  
          
        firebase.database().ref(`/Jobs`).limitToLast(10).on("value", (snapshot)=> {
         
          snapshot.forEach((childSnapshot)=> {
           var d = childSnapshot.val();
          var obj = {
           id : d.id ,
           logo : d.clogo ,
           Jimg : d.image ,
           orgName : d.cname ,
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
          this.setState({JobsNF , progress:false})
          })
        })
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
        if(JobsNF[i].from == 'Teacher'){
           Swal.fire('Oops' , 'You Cannot View Profile Teacher' , 'error')
        }
        else {
        localStorage.setItem('orgID' , JobsNF[i].cid);
        this.props.history.push('./stuViewOrg')
       }
    }

     
    Recentjob(){
        document.getElementById('div3id').innerHTML = null;
        document.getElementById('div4id').innerHTML = null;
        this.setState({})
    }
      
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
      
   signout(){

    firebase.auth().signOut();
    this.props.sInfo({})
    this.props.chatinfo({});
    this.props.dInfo({});
    this.props.history.push('/')
    Swal.fire('Done' , 'Signout Successfully');

    
  }

  render() {
    const {arr1 , arr2 , JobsNF , progress , open , rsubject , rname , rdate , rtime , reminder} = this.state;
    return (
        
      <div style={{minWidth:'370px' , margin:'1px auto'}}>


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

        <div className="sidenavAF">
            <p  className="SAFp" > <img  className="SAFuimg" src={this.props.details.imgURL}  />  </p>
            <p style={{textAlign:'center'}}>
                <h6> <b> {this.props.details.name} </b> </h6>
                <p style={{fontSize:'12px'}}> Sirsyed University </p>
            </p>
            <hr/>
           <p style={{textAlign:'center' , fontSize:'12px'}}>  Build up your profile to getting more oppurtunity !</p>
           <p style={{textAlign:'center'}}><Link to="/stuViewProfile" > <Button text='View Profile' type='submit' /> </Link></p>
             
        </div>

    <div className="div2AF" >      
            <div>
                <h6 style={{textAlign:'center' , color:'rgb(47, 174, 212)'}}><b>Reminder</b></h6> 
            </div>
            
            <div  className="div4AF ">
                 <div className="scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' , height:'75vh'}}> 
                    <div id="div4id">
                    {
                        reminder.map((val , ind)=>{
                        return(
                           <div className="RemindDivAF">
                              <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'40px' , height:'40px'}} src={require('../../../images/reminder1.png')}/></p>
                              <hr/>
                              <p  style={{color:'black' , fontSize:'13px'}}> <b> Name :  {val.name} </b> <br/> <b> Subject : {val.subject} </b>  <br/> <b> Date : {val.date} </b>  <br/> <b> Time :{val.time}  </b>  </p>         
                           </div>
                            )
                         })
                    }
                    </div>
                 </div>
            </div>      
        </div>

          

        <div className="topnavAF  sticky-top scrollbar square scrollbar-lady-lips thin">

                <img className="sidelogoAF" style={{marginRight:'200px'}} src={require('../../../images/logo.png')}/> 
                {/* <input className="form-control searchinputAF" type="text" placeholder="Search ... " name="search"/> */}

                <Link to='/chatMes' >
                 <figure>
                    <img src={require('../../../images/mess.jpg')}  style={{width:'23px' , height:'23px'}}/>
                    <figcaption><b style={{color:'white' , fontSize:'10px'}}>Chats</b></figcaption>
                   </figure>
                  </Link>

                  <Link to='/stuNotification' >
                  <figure>
                    <img src={require('../../../images/noti.png')}  style={{width:'auto' , height:'25px'}}/>
                    <figcaption><b style={{color:'white' , fontSize:'11px'}}>Notification</b></figcaption>
                   </figure>
                  </Link>

                  <Link to='/stuFavourite' >
                  <figure>
                    <img src={require('../../../images/fav.png')}  style={{width:'auto' , height:'25px'}}/>
                    <figcaption><b style={{color:'white' , fontSize:'11px'}}>Favourite</b></figcaption>
                   </figure>
                  </Link>

                  <Link to="/stuNewsFeed" >
                    <figure>
                            <img style={{width:'auto' , height:'25px'}} src={require('../../../images/nf.png')}/>
                            <figcaption><b style={{color: 'white' , fontSize:'11px'}} > Categories </b> </figcaption>
                    </figure>
                    </Link>

                    <Link to="/studentAchievements" >
                    <figure>
                        <img style={{width:'auto' , height:'25px'}} src={require('../../../images/award.png')} />
                        <figcaption><b style={{color: 'white' , fontSize:'11px'}} > Achievements </b> </figcaption>
                    </figure>
                    </Link>

                    <Link to="/stuSendComplain" >
                    <figure >
                    <img style={{width:'auto' , height:'25px'}} src={require('../../../images/comp.png')} />
                    <figcaption><b style={{color: 'white' , fontSize:'11px'}} > Complain </b> </figcaption>
                    </figure>
                    </Link> 

                   <Link to="/stuViewOrg">
                    <figure >
                        <img style={{width:'auto' , height:'25px'}} src={require('../../../images/org.png')} />
                        <figcaption><b style={{color: 'white' , fontSize:'11px'}} > Organization </b> </figcaption>
                    </figure> 
                    </Link>
                    
                    <Link to="/stuAchievements">
                     <figure>
                            <img style={{width:'auto' , height:'25px'}} src={require('../../../images/award.png')} />
                            <figcaption><b style={{color: 'white' , fontSize:'11px'}} > Achievements </b> </figcaption>
                     </figure>
                     </Link>

                     <Link to="/stuProfile"> 
                    <figure>
                     <img style={{width:'auto' , height:'25px'}} src={require('../../../images/user.jpg')}/> 
                        <figcaption> <b style={{color:'white' , fontSize:'11px'}}> Set Profile </b> </figcaption>
                    </figure>
                    </Link>

                    <Link  >
                    <figure onClick={()=>this.signout()}>
                        <img src={require('../../../images/logoff.png')}  style={{width:'auto' , height:'25px'}}/>
                        <br/>
                        <figcaption> <b style={{color:'white' , fontSize:'11px'}}> Signout </b> </figcaption>
                    </figure>
                    </Link>
        </div>

        {progress &&  <div class='loaddiv'> <br/><br/>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }
       

               <div  className="mainAF">
               {
           
                      JobsNF.map((val , index ) => {
                       return(
                        <div className="row col-lg SAFdyanmicDiv"  >
                            <div className="col-md-5" style={{margin:'5px auto'}}>
                              <div style={{textAlign:'left' }}>
                                  {/* <img  className="SAFmimage" src={val.logo}/>
                                  <p className="SAForgnme">{val.orgName}</p> */}
                                  <figure>
                                     <img  style={{width:'50px' , height:'50px'}} src={val.logo}/> 
                                     <figcaption style={{fontSize:'14px'}}><b>{val.orgName}</b></figcaption>
                                </figure>
                              </div>
                               <h6 className="text-center" style={{color:'rgb(20, 194, 224)' , marginTop:'10px'}} > &nbsp; {val.subject } </h6>              
                               <hr/>
                               <div style={{border:'solid 1px rgb(20, 194, 224)',borderRadius:'3px' , minWidth:'230px'}}>
                                   <img style={{ minWidth:'225px', width:'100%' , height:'170px'}} src={val.Jimg}/>
                               </div>
                            </div>
 

                              <div className="col-md-4 SAFddiv3">
                              <p style={{fontSize:'13px'}}> 
                              <b> Last Date : </b> {val.date} <br/> 
                              <b> Category : </b> {val.category} <br/>
                              <b> Event Type : </b> {val.type} <br/>
                              <b> Work Experienced : </b> {val.experience}   
                              <hr/>
                             </p>
                            

                               <p>
                               <p style={{fontSize:'12px'}}><b>Description</b></p>
                               <p className="SAFdesDiv">
                               <p  style={{height:'100px' , overflowY:'scroll' , fontSize:'12px'}} className="scrollbar square scrollbar-lady-lips thin" >{val.description} </p>
                               </p>   
                               {/* <b> Attachament Details </b> <br/>
                                    No any Attachment Available 
                               <hr/> */}
                               </p>
                             <div style={{textAlign:'center'}}>  
                             <hr/>

                             <figure style={{display:'inline-block'}} onClick={(e)=>this.onOpenModal(val)}>
                                <img style={{width:'25px' , height:'25px'}} src={require('../../../images/rem.jpg')} />
                                <figcaption style={{fontSize:'10px'}}><b> Reminder </b> </figcaption>
                            </figure>

                            &nbsp; &nbsp;
                           {(val.from == 'Organization' || val.from == undefined)  && <figure style={{display:'inline-block'}} onClick={(e)=>this.viewProf(index)}>
                                <img  style={{width:'25px' , height:'25px'}} src={require('../../../images/user.jpg')}/> 
                                <figcaption style={{fontSize:'10px'}}><b> Profile</b></figcaption>
                            </figure> }

                            &nbsp; &nbsp;
                            <figure style={{display:'inline-block'}} onClick={(e)=>this.addFav(index)}>
                            <img src={require('../../../images/fav.png')}  style={{width:'25px' , height:'25px'}}/>
                            <figcaption style={{fontSize:'10px'}}><b>Favourite</b></figcaption>
                            </figure>

                            {/* &nbsp; &nbsp;
                            <figure style={{display:'inline-block'}}>
                            <img src={require('../../../images/download.png')}  style={{width:'25px' , height:'25px'}}/>
                            <figcaption style={{fontSize:'10px'}}><b>Download</b></figcaption>
                            </figure> */}

                             </div>

                              </div>
                              

                           </div>
                       )
                   })
               }
           </div>
            {/* </div>      */}
        </div>
      
    );
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
    sInfo : (info)=>{ dispatch(StudentDetail(info))},
    dInfo : (info4)=>{ dispatch(DynamicData(info4))} ,
    chatinfo : (info1)=>{ dispatch(ChatData(info1))}
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(studentAfterLogin);
  