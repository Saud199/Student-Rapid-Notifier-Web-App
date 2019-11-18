import React, { Component } from 'react';
import '../../../css/bootstrap.min.css';
import './afterLoginT.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom'; 
import '../../Loader/loader.css'
import {Button} from '../../../components/button/button.js'
// import { CustomErrorComponent } from 'custom-error';
import {TeacherDetail , DynamicData , ChatData , OrganizationDetail} from '../../../store/action/action.js';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


class TeacherAfterLogin extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          arr1:[] ,
          arr2:[] ,
          JobsNF:[] ,
          myjobs : [] ,
          progress : true
        }
        this.Recentjob = this.Recentjob.bind(this)
      }

      
      componentDidMount(){
        this.validation()
         this.addData();
         this.showmyjobs();
     }

     validation(){
      var data = this.props.accounttype;
     if(data.includes('Teacher')){
      this.props.history.index=0;
     }else{
      Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
      this.props.history.push("/");
     }
    }

   

    showmyjobs(){
        const { myjobs } = this.state;
        var data = this.props.details;
        firebase.database().ref(`/Jobs`).orderByChild("cid").equalTo(""+data.id).limitToLast(10).on("value", (snapshot)=> {
         
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
           subject : d.subject
          }
          myjobs.push(obj);
          this.setState({myjobs})
          })
        })
    }

    openMessenger(){
        this.props.chatinfo({});
        this.props.history.push('/chatMes')
      }

    addData(){
      const {JobsNF , progress} = this.state;
        
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

  signout(){

    firebase.auth().signOut();
    this.props.tInfo({})
    this.props.chatinfo({});
    this.props.dInfo({});
    this.props.oInfo({})
    this.props.history.push('/')
    Swal.fire('Done' , 'Signout Successfully');

    
  }

  addFav(i){
    const {JobsNF} = this.state;
    var data = this.props.details;

    if(data.id == JobsNF[i].cid){
        Swal.fire('Oops' , 'You Cannot Save Your Post as Favourite ' , 'error')
    }else{

    var skey = firebase.database().ref("Favourite/"+data.empID).push();
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
            from : JobsNF[i].from 
    }
 
  skey.set(obj);
  Swal.fire('Done' , 'Add Favourite Successfully')
 }
}


      viewProf(i){
        const {JobsNF} = this.state;
        localStorage.setItem('orgID' , JobsNF[i].cid);
        this.props.history.push('./techViewOrganization')
      }


    Recentjob(){
        document.getElementById('div3id').innerHTML = null;
        document.getElementById('div4id').innerHTML = null;
        this.setState({})
    }
      
      

  render() {
    const {arr1 , arr2 , JobsNF , myjobs , progress } = this.state;
    //this.data();
    return (
        
      <div style={{minWidth:'370px' , margin:'1px auto'}}>

        <div className="sidenavTAF">
            <p  className="TAFp" > <img  className="TAFuimg" src={this.props.details.imgURL} />  </p>
            <p style={{textAlign:'center'}}>
                <h6> {this.props.details.name} </h6>
                <p style={{fontSize:'12px'}}> {this.props.details.designation}  </p>
            </p>
            <hr/>
           <p style={{textAlign:'center' , fontSize:'12px'}}>  View  your profile Detail here !</p>
           <p style={{textAlign:'center'}}><Link to="/techViewProfile" > <Button text='View Profile' type='submit' /> </Link></p>
             
        </div>

    <div className="div2TAF" >      
            <div>
                <h6 style={{textAlign:'center' , color:'rgb(47, 174, 212)'}}><b>My Post</b></h6> 
            </div>
            
            <div  className="div4TAF ">
                 <div className="scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' , height:'75vh'}}> 
                    <div id="div4id">
                    {
                        myjobs.map((val , ind)=>{
                        return(
                           <div className="RemindDivTAF">
                              <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'100px' , height:'70px'}} src={val.Jimg}/> </p>
                              <hr/>
                              <p  style={{color:'gray' , fontSize:'11px'}}>   Subject : {val.subject} <br/> Category : {val.category} <br/> Experience : {val.experience} <br/>  Date : <b style={{color:'black'}}>{val.date} </b> </p>          
                           </div>
                            )
                         })
                    }
                    </div>
                 </div>
            </div>      
        </div>

          

        <div className="topnavTAF  div1AF sticky-top scrollbar square scrollbar-lady-lips thin">

               
                <img className="sidelogoTAF" style={{marginRight : '200px'}} src={require('../../../images/logo.png')}/> 
                {/* <input className="form-control searchinputTAF" type="text" placeholder="Search ... " name="search"/> */}

                <Link onClick={()=>this.openMessenger()} >
                  <figure>
                    <img src={require('../../../images/mess.jpg')}  style={{width:'23px' , height:'23px'}}/>
                    <figcaption ><b style={{color:'white' , fontSize:'10px'}}>Chats</b></figcaption>
                   </figure>
                  </Link>

                  <Link to='/techViewNotification' >
                  <figure>
                    <img src={require('../../../images/noti.png')}  style={{width:'23px' , height:'23px'}}/>
                    <figcaption ><b style={{color:'white' , fontSize:'10px'}}>Notification</b></figcaption>
                   </figure>
                  </Link>

                  <Link to='/techAddFavourite' >
                  <figure>
                    <img src={require('../../../images/fav.png')}  style={{width:'23px' , height:'23px'}}/>
                    <figcaption ><b style={{color:'white' , fontSize:'10px'}}>Favourite</b></figcaption>
                   </figure>
                  </Link>

                  <Link to="/techViewNewsFeed" >
                    <figure>
                            <img src={require('../../../images/nf.png')} style={{width:'23px' , height:'23px'}}/>
                            <figcaption><b style={{color:'white' , fontSize:'10px'}} > Categories </b> </figcaption>
                    </figure>
                    </Link>

                    <Link to="/techAddJob" >
                    <figure>
                        <img src={require('../../../images/addjob.png')} style={{width:'23px' , height:'23px'}} />
                        <figcaption><b style={{color:'white' , fontSize:'10px'}} > Add Job</b> </figcaption>
                    </figure>
                    </Link>

                    <Link to="/techComplain" >
                    <figure >
                    <img src={require('../../../images/comp.png')} style={{width:'23px' , height:'23px'}} />
                    <figcaption><b style={{color:'white' , fontSize:'10px'}} > Complain </b> </figcaption>
                    </figure>
                    </Link> 

                   <Link to="/techViewOrganization">
                    <figure >
                        <img src={require('../../../images/org.png')} style={{width:'23px' , height:'23px'}} />
                        <figcaption><b style={{color:'white' , fontSize:'10px'}} > Organization </b> </figcaption>
                    </figure> 
                    </Link>
                    
                    <Link to="/techViewAchievements">
                     <figure>
                            <img style={{width:'23px' , height:'23px'}} src={require('../../../images/award.png')} />
                            <figcaption><b style={{color:'white' , fontSize:'10px'}} > Achievements </b>  </figcaption>
                     </figure>
                     </Link>

                     <Link to="/techprofile"> 
                    <figure>
                    <img  style={{width:'23px' , height:'23px'}} src={require('../../../images/user.jpg')}/> 
                        <figcaption><b style={{color:'white' , fontSize:'10px'}}>Set Profile </b> </figcaption>
                    </figure>
                    </Link>

                    
                    <Link > 
                    <figure onClick={()=>this.signout()} >
                        <img src={require('../../../images/logoff.png')} style={{width:'23px' , height:'23px'}}/>
                        <br/>
                        <figcaption><b style={{color:'white' , fontSize:'10px'}}> Signout </b> </figcaption>
                    </figure>
                    </Link>
                    
        </div>

       
        {progress &&  <div class='loaddiv'> <br/><br/>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }

               <div  className="mainTAF">
               {
           
                      JobsNF.map((val , index ) => {
                       return(
                        <div className="row col-lg TAFdyanmicDiv"  >
                            <div className="col-md-5" style={{margin:'5px auto'}}>
                              <div style={{textAlign:'left' }}>
                                  {/* <img  className="SAFmimage" src={val.logo}/>
                                  <p className="SAForgnme">{val.orgName}</p> */}
                                  <figure>
                                     <img  style={{width:'50px' , height:'50px'}} src={val.logo}/> 
                                     <figcaption style={{fontSize:'12px'}}><b>{val.orgName}</b></figcaption>
                                </figure>
                              </div>
                               <h6 className="text-center" style={{color:'rgb(20, 194, 224)' , marginTop:'10px'}} > &nbsp; {val.subject } </h6>              
                               <hr/>
                               <div style={{border:'solid 1px rgb(20, 194, 224)',borderRadius:'3px' , minWidth:'230px'}}>
                                   <img style={{ minWidth:'225px', width:'100%' , height:'170px'}} src={val.Jimg}/>
                               </div>
                            </div>
 

                              <div className="col-md-4 TAFddiv3">
                              <p style={{fontSize:'13px'}}> 
                                  <b> Last Date : </b> {val.date} <br/> 
                                  <b> Category : </b> {val.category} <br/>
                                  <b> Event Type : </b> {val.type} <br/>
                                  <b> Work Experienced : </b> {val.experience}   
                                  <hr/>
                                </p>
                                

                               <p>
                               <p style={{fontSize:'12px'}}><b>Description</b></p>
                               <p className="TAFdesDiv">
                               <p  style={{height:'100px' , overflowY:'scroll' , fontSize:'12px'}} className="scrollbar square scrollbar-lady-lips thin" >{val.description} </p>
                               </p>   
                               {/* <b> Attachament Details </b> <br/>
                                    No any Attachment Available 
                               <hr/> */}
                               </p>
                             <div style={{textAlign:'center'}}>  
                             <hr/>

                             {/* <figure style={{display:'inline-block'}}>
                                <img style={{width:'25px' , height:'25px'}} src={require('../../../images/rem.jpg')} />
                                <figcaption style={{fontSize:'10px'}}><b> Reminder </b> </figcaption>
                            </figure> */}

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
    details: state.root.teacherInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    tInfo : (info)=>{ dispatch(TeacherDetail(info))},
    dInfo : (info4)=>{ dispatch(DynamicData(info4))} ,
    oInfo : (info4)=>{ dispatch(OrganizationDetail(info4))} ,
    chatinfo : (info1)=>{ dispatch(ChatData(info1))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(TeacherAfterLogin);
