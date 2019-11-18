import React, { Component } from 'react';
import '../../../css/bootstrap.min.css';
import './AdminAfterLogin.css';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase.js'
import axios from 'axios'

import {AdminDetail , DynamicData , ChatData} from '../../../store/action/action.js';

class AdminAfterLogin extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          org : true ,
          stu : true ,
          tech : true ,
          rej : true ,
           orgMessage : [] ,
           student : [] ,
           teacher : [] ,
           organization : [] ,
           Reject : []
         }
      }
    
      componentDidMount(){
        this.validation(); 
        this.addData();
      }

      signout(){

        firebase.auth().signOut();
        this.props.aInfo({})
        this.props.chatinfo({});
        this.props.dInfo({});
        this.props.history.push('/')
        Swal.fire('Done' , 'Signout Successfully');
    
        
      }


      addData(){

        const { student , teacher , organization , Reject , stu , tech , org , rej } = this.state;

        firebase.database().ref("/Users").on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            var data = childSnapshot.val();

            if(data.accountStatus == 'Not Approved'){

            if(data.accountType=='Student'){

            var stuObj = {
              name : data.name ,
              email : data.email ,
              id : data.id ,
              number : data.ph_no ,
              websiteLink : data.webLink ,
              enrollNo : data.enrollNo ,
              rollNo : data.rollNo ,
              department : data.department ,
              batch : data.batch ,
              image : data.imgURL ,
              accountType : data.accountType
             }

             student.push(stuObj)
             this.setState({student , stu:false})

            }else if(data.accountType=='Teacher'){
              
              var teachObj = {
                name : data.name ,
                email : data.email ,
                id : data.id ,
                number : data.ph_no ,
                empID : data.empID ,
                image : data.imgURL ,
                accountType : data.accountType ,
                department : data.department
              }
              teacher.push(teachObj)
              this.setState({teachObj , tech:false})
              
            }else if(data.accountType=='Organization'){

              var orgObj = {
                name : data.name ,
                email : data.email ,
                orgType : data.orgType ,
                address : data.address ,
                id : data.id ,
                number : data.ph_no ,
                type : data.orgType ,
                websiteLink : data.webLink ,
                image : data.imgURL ,
                accountType : data.accountType
              }
              organization.push(orgObj)
              this.setState({organization , org:false})
            }
          }else if(data.accountStatus == 'Rejected'){
            var Obj = {
              name : data.name ,
              email : data.email ,
              id : data.id ,
              number : data.ph_no ,
              image : data.imgURL ,
              accountType : 'Rejected'
            }
            Reject.push(Obj)
            this.setState({Reject , rej:false})
          }
          })
        })    
      }

      validation(){
        var data = this.props.accounttype;
       if(data.includes('Admin')){
        this.props.history.index=0;
       }else{
        Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
        this.props.history.push("/");
       }
      }


     Approved(val){
       var from = 'admin@stutech.com';
       var to =  val.email;
       var subject = 'Your Account has been Approved'
       var message = 'Congratulation ! Your Account has been Approved by Admin'
             firebase.database().ref(`/Users/${val.id}`).update({accountStatus:'Approved'})
      axios.post('https://stutech2019.herokuapp.com/send', {
        from , to , subject , message
      }).then((res) => {
      });
      Swal.fire('Done' , 'Account Approved Successfully');
      this.setState({})
    } 

     Rejected(val){
      var from = 'admin@stutech.com';
      var to =  val.email;
      var subject = 'Your Account has been Rejected'
      var message = 'Due to Some Verification issues your account has been rejected by admin . Please Contact to admin'

      firebase.database().ref(`/Users/${val.id}`).update({accountStatus:'Rejected'})
      
    //   axios.post('https://stutech2019.herokuapp.com/send', {
    //   from , to , subject , message
    // }).then((res) => {
    // });
      Swal.fire('Done' , 'Account Rejected Successfully');
      this.setState({})
     }



     showDetails(val){
      if(val.accountType=='Student'){
      Swal.fire({
        title: `${val.name}`,
        text: `
        RollNo:${val.rollNo}, EnrollNo:${val.enrollNo}, Email:${val.email}, Department:${val.department}, 
        Batch:${val.batch}, Ph_No:${val.number}
        `,
        imageUrl: `${val.image}`,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      this.setState({})
     }
     else if(val.accountType=='Teacher'){
      Swal.fire({
        title: `${val.name}`,
        text: `
         EmpID : ${val.empID}, Email:${val.email}, Phno:${val.number}, Department:${val.department},`,
          imageUrl: `${val.image}`,
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: 'Custom image',
      })
    }else if(val.accountType=='Organization'){
      Swal.fire({
        title: `${val.name}`,
        text: `WebLink:${val. websiteLink}, Email:${val.email}, Phno:${val.number}, OrgType:${val.orgType}, Address:${val.address} `,
        imageUrl: `${val.image}`,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
  } 
     

   render(){
    
    const { chatList, student , teacher , organization , Reject , org , stu , tech , rej} = this.state;
    return(
    <div>
       
       {/*-------------- HEADER-------------------------- */}
       <div className="row" style={{backgroundColor:'rgb(20, 194, 224)'}}>
        <div className="col-md-4"> 
        <img className="sidelogoAdmAF" src={require('../../../images/logo.png')}/>
        {/* <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' , float:'right'}} src={require('../../../images/back.png')} /> */}
        </div>
      </div> 

        {/* ------------------------SIDEBAR ---------------------------*/}

        <div className="row" style={{height:'80vh' , padding:'5px' }}>

        <div  className="admDiv1">

        <div className="textAicon" style={{display:'none' , paddingLeft:'10px'}} >
            <p style={{height:'100px'}}>

            </p>
            <hr/>
            <Link to="/stuNewsFeed" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/nf.png')}/> &nbsp;&nbsp; Posts </Link> 
            <hr/>
            <Link to="/adminMessage" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/mess.png')}/> &nbsp;&nbsp; Messages </Link> 
            <hr/>
            <Link to="/studentAchievements" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/award.png')}/> &nbsp;&nbsp; Achievements </Link> 
            <hr/>
            <Link to="/adminProfile" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/user.jpg')}/> &nbsp;&nbsp; Profile </Link> 
            <hr/>
            <Link to="/adminGraph" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/addjob.png')}/> &nbsp;&nbsp; Report </Link> 
           <hr/>
           <Link to="/adminComplain" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/comp.png')}/> &nbsp;&nbsp; Complain </Link> 
           <hr/>
            <Link onClick={()=>this.signout()} className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/logoff.png')}/> &nbsp;&nbsp; Signout </Link> 
            <hr/>
            
            </div>
        
            <div className="Aicon" style={{textAlign:'center'}}>
            <p style={{height:'100px'}}>  </p>
            <hr/>
            <Link to="/stuNewsFeed" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/nf.png')}/></Link> 
            <hr/>
            <Link to="/studentAchievements" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/award.png')}/>  </Link> 
            <hr/> 
            <Link to="/adminMessage" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/mess.png')}/></Link> 
            <hr/>
            <Link to="/adminProfile" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/user.jpg')}/></Link> 
            <hr/>
            <Link to="/adminGraph" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/addjob.png')}/>  </Link> 
            <hr/>
            <Link to="/adminComplain" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/comp.png')}/> </Link> 
            <hr/>
            <Link to="/adminGraph" className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/addjob.png')}/></Link> 
            <hr/>
            <Link onClick={()=>this.signout()}  className="tAibtn"> <img style={{width:'25px' , height:'25px'}}  src={require('../../../images/logoff.png')}/></Link> 
            
            </div>
            
        </div>

        <div className="admDiv2">
            <div className="adm_min_div1 row">
            
            <div  className="adm_formDiv1OAF col-xl scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll'}} > 
                 <h6  className="sticky-top h4smdivORG"> <b> Approved Students </b> </h6>
                 <hr/>


                 {stu  && <div>
                    <br/>
                    <h4 style={{color:'rgb(27, 180, 207)'}}> No Data Found </h4>
                   </div> }

                 {
                   student.map((val , index ) => {
                    return(
                      <div className="row scrollbar square scrollbar-lady-lips thin" style={{border:'solid 2px rgb(27, 180, 207)' , padding:'5px' , margin:'15px' , height:'100px' , overflowY:'scroll' , overflowX:'hidden'}}>
                       
                       <div className="row">
                        {/* <img  style={{width:'40px' , height:'40px' , marginTop:'15px' , marginLeft:'10px'}} src={require('../../../images/user.png')}/> */}
                        <p  style={{marginLeft:'20px' , marginTop:'10px' , fontSize:'15px' }}>
                          <h6 style={{fontSize:'13px' , textAlign:'left'}} >
                          <b>Name :</b> {val.name} <br/>
                          <b> Roll no :</b> {val.rollNo} <br/>
                          <b> Enroll no :</b> {val.enrollNo} <br/>
                          <b> Department :</b> {val.department} <br/>
                          <b> Batch :</b> {val.batch} <br/>
                          <b> Email :</b> {val.email} <br/>
                          <b> ph_no :</b> {val.number} <br/>
                         </h6>
                        </p>
                        </div>
                        
                        <div style={{marginTop:'25px' ,  marginLeft:'10%'}} className="row">

                        <figure onClick={(e)=>{this.Rejected(val)}}>
                            <img style={{width:'auto' , height:'20px'}} src={require('../../../images/cross.png')} />
                            <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Delete </b> </figcaption>
                        </figure>
                        &nbsp; &nbsp; 
                        <figure onClick={(e)=>this.showDetails(val)}>
                            <img style={{width:'auto' , height:'20px'}} src={require('../../../images/project.png')} />
                            <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Details </b> </figcaption>
                        </figure>
                        &nbsp; &nbsp; 
                        <figure onClick={(e)=>{this.Approved(val)}}>
                            <img style={{width:'auto' , height:'20px'}} src={require('../../../images/tick.png')} />
                            <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Approved </b> </figcaption>
                        </figure>

                         </div>

                      </div>
                    )
                 })
                 }
              </div> 
       

              <div  className="c2 adm_formDiv1OAF col-xl scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' , display:'none'}} > 
                 <h6  className="sticky-top h4smdivORG"> <b> Approved Teachers </b> </h6>
                 <hr/>
                 {tech  && <div>
                    <br/>
                    <h4 style={{color:'rgb(27, 180, 207)'}}> No Data Found </h4>
                   </div> }
                 {
                   teacher.map((val , index ) => {
                    return(
                      <div className="row scrollbar square scrollbar-lady-lips thin" style={{border:'solid 2px rgb(27, 180, 207)' , padding:'5px' , margin:'15px' , height:'100px' , overflowY:'scroll' , overflowX:'hidden'}}>
                       
                      <div className="row">
                       {/* <img  style={{width:'40px' , height:'40px' , marginTop:'15px' , marginLeft:'10px'}} src={require('../../../images/user.png')}/> */}
                       <p  style={{marginLeft:'20px' , marginTop:'10px' , fontSize:'15px' }}>
                         <h6 style={{fontSize:'13px' , textAlign:'left'}} >
                         <b>Name :</b> {val.name} <br/>
                         <b> EmpID :</b> {val.empID} <br/>
                         <b> Department :</b> {val.department} <br/>
                         <b> Email :</b> {val.email} <br/>
                         <b> ph_no :</b> {val.number} <br/>
                        </h6>
                       </p>
                       </div>
                       
                       <div style={{marginTop:'25px' ,  marginLeft:'10%'}} className="row">

                       <figure onClick={(e)=>{this.Rejected(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/cross.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Delete </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>this.showDetails(val)}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/project.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Details </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>{this.Approved(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/tick.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Approved </b> </figcaption>
                       </figure>

                        </div>

                     </div>
                    )
                 })
                 }
              </div>

            </div>
            
            <hr/>
            
            <div className="adm_min_div2 row" >

            <div  className="adm_formDiv1OAF col-xl scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll'}} > 
                 <h6  className="sticky-top h4smdivORG"> <b> Approved Organization </b> </h6>
                 <hr/>
                 {org  && <div>
                    <br/>
                    <h4 style={{color:'rgb(27, 180, 207)'}}> No Data Found </h4>
                   </div> }
                 {
                   organization.map((val , index ) => {
                    return(
                      <div className="row scrollbar square scrollbar-lady-lips thin" style={{border:'solid 2px rgb(27, 180, 207)' , padding:'5px' , margin:'15px' , height:'100px' , overflowY:'scroll' , overflowX:'hidden'}}>
                       
                      <div className="row">
                       {/* <img  style={{width:'40px' , height:'40px' , marginTop:'15px' , marginLeft:'10px'}} src={require('../../../images/user.png')}/> */}
                       <p  style={{marginLeft:'20px' , marginTop:'10px' , fontSize:'15px' }}>
                         <h6 style={{fontSize:'13px' , textAlign:'left'}} >
                         <b>Name :</b> {val.name} <br/>
                         <b> Website Link :</b> {val.websiteLink} <br/>
                         <b> address :</b> {val.address} <br/>
                         <b> Email :</b> {val.email} <br/>
                         <b> ph_no :</b> {val.number} <br/>
                        </h6>
                       </p>
                       </div>
                       
                       <div style={{marginTop:'25px' ,  marginLeft:'10%'}} className="row">

                       <figure onClick={(e)=>{this.Rejected(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/cross.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Delete </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>this.showDetails(val)}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/project.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Details </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>{this.Approved(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/tick.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Approved </b> </figcaption>
                       </figure>

                        </div>

                     </div>
                    )
                 })
                 }
              </div> 
       

              <div  className="c2 adm_formDiv1OAF col-xl scrollbar square scrollbar-lady-lips thin" style={{overflowY:'scroll' ,  display:'none'}} > 
                 <h6  className="sticky-top h4smdivORG"> <b> Rejected Accounts </b> </h6>
                 <hr/>
                 {rej  && <div>
                    <br/>
                    <h4 style={{color:'rgb(27, 180, 207)'}}> No Data Found </h4>
                   </div> }
                 {
                   Reject.map((val , index ) => {
                    return(
                      <div className="row scrollbar square scrollbar-lady-lips thin" style={{border:'solid 2px rgb(27, 180, 207)' , padding:'5px' , margin:'15px' , height:'100px' , overflowY:'scroll' , overflowX:'hidden'}}>
                       
                      <div className="row">
                       {/* <img  style={{width:'40px' , height:'40px' , marginTop:'15px' , marginLeft:'10px'}} src={require('../../../images/user.png')}/> */}
                       <p  style={{marginLeft:'20px' , marginTop:'10px' , fontSize:'15px' }}>
                         <h6 style={{fontSize:'13px' , textAlign:'left'}} >
                          <b>Name :</b> {val.name} <br/>
                         <b> Email :</b> {val.email} <br/>
                         <b> number :</b> {val.number} <br/>
                        </h6>
                       </p>
                       </div>
                       
                       <div style={{marginTop:'25px' ,  marginLeft:'10%'}} className="row">

                       <figure onClick={(e)=>{this.Rejected(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/cross.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Delete </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>this.showDetails(val)}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/project.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Details </b> </figcaption>
                       </figure>
                       &nbsp; &nbsp; 
                       <figure onClick={(e)=>{this.Approved(val)}}>
                           <img style={{width:'auto' , height:'20px'}} src={require('../../../images/tick.png')} />
                           <figcaption><b style={{color: 'black' , fontSize:'11px'}} > Approved </b> </figcaption>
                       </figure>

                        </div>

                     </div>
                    )
                 })
                 }
              </div>
            
            </div>
        </div>        
    </div>
</div>
    )
}

}

function mapStateToProp(state) {
  return ({
    details: state.root.adminInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
  aInfo : (info)=>{ dispatch(AdminDetail(info))},
  dInfo : (info4)=>{ dispatch(DynamicData(info4))} ,
  chatinfo : (info1)=>{ dispatch(ChatData(info1))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdminAfterLogin);

    