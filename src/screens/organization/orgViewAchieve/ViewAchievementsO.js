import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './ViewAchievementsO.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import firebase from '../../../config/firebase.js'
import '../../Loader/loader.css'
import { connect } from 'react-redux';
import {DynamicData} from '../../../store/action/action';



import {Button} from '../../../components/button/button.js'

class ViewAchievementsO extends Component {
  
  constructor() {
    super();

    this.state = {
        AchievementsArr:[],
        open:false ,
        progress : true  ,
        certificate : 'all' ,
        special : 'all'
    }
  }

componentDidMount(){
  this.validation();
  this.addData();

}

validation(){
  var data = this.props.accounttype;
 if(data.includes('Organization')){

 }else{
  Swal.fire('Some thing Went Wrong' , 'You need to login again to continue' , 'error');
  this.props.history.push("/");
 }
}


    onOpenModal = () => {
      this.setState({ open: true });
    };
   
    onCloseModal = () => {
      this.setState({ open: false });
    };

    viewProfile(i){
     const {AchievementsArr} = this.state;
    
    var obj = {
      rollNo :  AchievementsArr[i].rollNo ,
      id : AchievementsArr[i].userid ,
      name : AchievementsArr[i].name ,
      email : AchievementsArr[i].email ,
      image : AchievementsArr[i].myimg
    }
    this.props.dInfo(obj)
    this.props.history.push("/stuDynamicProfile")
  }

  filter(){
    this.setState({ open: false , progress:true });
    const{AchievementsArr, progress , special , certificate }=this.state;
    while(AchievementsArr.length > 0) {
      AchievementsArr.splice(0,1); 
     }
    
    
    var data = this.props.details;
  
    firebase.database().ref("Achievements").on("value", (snapshot)=> {
    if(snapshot.exists()){
      console.log('afasd')
      this.setState({progress:false})
      snapshot.forEach((childSnapshot) => {
      var rdata = childSnapshot.val();
 
      var obj = {
        id : rdata.id ,
        image : rdata.image ,
        orgName : rdata.orgName ,
        certificateType : rdata.certificateType ,
        certificateDetail : rdata.certificeDetail ,
        completeDate : rdata.completeDate ,
        webLink : rdata.orgLink ,
        skills : rdata.skills ,
        Speciality : rdata.speciality ,
        subject : rdata.subject ,
        rollNo : rdata.rollNo ,
        email : rdata.email ,
        userid : rdata.userID ,
        name : rdata.userName ,
        myimg : rdata.myimg 
        }
        console.log(special , certificate)
       if((special=='all' || rdata.speciality.includes(special)) && (certificate=='all' || rdata.certificateType.includes(certificate))){  
       AchievementsArr.push(obj);
       this.setState({AchievementsArr})
       }
    })
    this.setState({special:'all' , certificate:'all'})
  }else{
    this.setState({progress:false})
  }
   })
  
  }
   
  addData(){
   
   
      const{AchievementsArr, progress }=this.state;
    
      var data = this.props.details;
    
      firebase.database().ref("Achievements").on("value", (snapshot)=> {
      if(snapshot.exists()){
        this.setState({progress:false})
        snapshot.forEach((childSnapshot) => {
        var rdata = childSnapshot.val();
   
        var obj = {
          id : rdata.id ,
          image : rdata.image ,
          orgName : rdata.orgName ,
          certificateType : rdata.certificateType ,
          certificateDetail : rdata.certificeDetail ,
          completeDate : rdata.completeDate ,
          webLink : rdata.orgLink ,
          skills : rdata.skills ,
          Speciality : rdata.speciality ,
          subject : rdata.subject ,
          rollNo : rdata.rollNo ,
          email : rdata.email ,
          userid : rdata.userID ,
          name : rdata.userName ,
          myimg : rdata.myimg 
          }
         AchievementsArr.push(obj);
         this.setState({AchievementsArr})

      })
    }else{
      this.setState({progress:false})
    }
     })
    
    } 


  render(){
      const {AchievementsArr , progress , open , certificate , special} = this.state;
      return(
          <div>

          <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Filters </b> </h6>
          <hr/>
          
          <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Type</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.setState({certificate:e.target.value})} >
                <option style={{fontSize:'12px'}}  value="all">ALL</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Degree">Degree</option>
                </select>
            </div> 
                  
            <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Speciality</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={(e)=>this.setState({special:e.target.value})} >
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

            <div className="row">
            <Button style={{margin:'2px auto'}} type="submit" text="Apply"  onClick={()=>this.filter()}/>
            &nbsp;
            <Button  style={{margin:'2px auto'}} type="submit" text="Clear All" />
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
              {/* <Form inline style={{marginRight:'10%' , marginLeft:'10%' , textAlign:'center'}}>
                <FormControl style={{ width:'300px' , height:'30px' , fontSize:'12px' }}  type="text" placeholder="Search" className="mr-sm-2" />
              </Form> */}
              <img onClick={this.onOpenModal} data-toggle="modal" data-target="#exampleModal"  style={{width:'20px' , height:'20px' , float:'right'}} src={require('../../../images/filter.png')}  />
            </Navbar.Collapse>
          </Navbar>  



              <div style={{textAlign:'center'}}>
              {progress && <div class='loaddiv'> 
                            <br/> <br/>
                          <div class="loader"></div>
                          <p><b>Loading please wait</b></p>
                        </div> }
                {
                     AchievementsArr.map((val , ind)=>{
                         return(
                            <div className="DivVAO">
                              <div style={{overflowY:'scroll' , height:'290px'}} className="scrollbar square scrollbar-lady-lips thin" >
                                {/* <p style={{textAlign:'center'}}> <img style={{width:'60px' , height:'60px'}} src={val.image}/> </p> */}
                                 <p style={{textAlign:'left' , fontSize:'12px'}}>
                                 <p style={{textAlign:'center' , fontSize:'13px'}}> <b style={{ fontSize:'13px' }}> {val.name}</b> <b style={{ fontSize:'13px' }}> {"("+val.rollNo+")"}</b></p> 
                                   
                                    <hr/>
                                    <b style={{ fontSize:'12px' }}> OrgName : </b>  {val.orgName} <br/>
                                    <b style={{ fontSize:'12px' }}> Subject : </b>  {val.subject} <br/>
                                    <b style={{ fontSize:'12px' }}> Specialist In : </b> {val.Speciality}  <br/>
                                    <b style={{ fontSize:'12px' }}> Skills  : </b>  {val.skills} <br/>
                                    <b style={{ fontSize:'12px' }}> Certification Details : </b>  {val.certificateDetail} <br/>
                                    <b style={{ fontSize:'12px' }}> certificateType :   {val.certificateType} </b> <br/>
                                    <b style={{ fontSize:'12px' }}> Completion Date : </b>  {val.completeDate} <br/>
                                    <b style={{ fontSize:'12px' }}> Website Link : </b>  {val.webLink} <br/><br/>
                                    <p style={{textAlign:'center' , fontSize:'12px'}}> <b>Image of Certificate </b> <br/> <img  className="imgVAO" src={val.image} /> </p>
                                     <p style={{textAlign:'center'}}> <Button text="View Profile" type="text" onClick={(e)=>this.viewProfile(ind)} /> </p>
                                   
                                 </p>
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
    details: state.root.organizationInfo ,
    accounttype : state.root.accountType
  })
}

function mapDispatchToProp(dispatch) {
  return ({
       dInfo : (info4)=>{ dispatch(DynamicData(info4))} 
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(ViewAchievementsO);