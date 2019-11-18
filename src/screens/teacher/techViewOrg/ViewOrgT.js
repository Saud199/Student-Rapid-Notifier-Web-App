import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './ViewOrgT.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import '../../Loader/loader.css'

class TechViewOrg extends Component {
  
  constructor() {
    super();

    this.state = {
        myOrganization:[] ,
        dataIndex : null,
        open: false,
        progress : true  ,
    }
  }


  
  componentDidMount(){
    this.validation()
    this.addData();
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

  addData(){
    const{myOrganization , progress}=this.state;
       
       var l = localStorage.getItem('orgID');
       console.log(l)
      
       if( l!=null){
        firebase.database().ref("/Users").orderByChild("id").equalTo(""+l).on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            var data = childSnapshot.val();
            var orgObj = {
              orgName : data.name ,
              address : data.address ,
              email : data.email ,
              id : data.id ,
              logo : data.imgURL ,
              type : data.orgType ,
              number : data.ph_no ,
              websiteLink : data.webLink,
              detail : data.detail || 'No Details Found'
             }
             myOrganization.push(orgObj)
             this.setState({myOrganization , progress:false})
             localStorage.clear();
          })
        })    
       }else {
        firebase.database().ref("/Users").orderByChild("accountType").equalTo("Organization").on("value", (snapshot)=> {
          snapshot.forEach((childSnapshot)=> {
            var data = childSnapshot.val();
            var orgObj = {
              orgName : data.name ,
              address : data.address ,
              email : data.email ,
              id : data.id ,
              logo : data.imgURL ,
              type : data.orgType ,
              number : data.ph_no ,
              websiteLink : data.webLink,
              detail : data.detail || 'No Details Found'
             }
             myOrganization.push(orgObj)
             this.setState({myOrganization , progress:false})

          })
        })    
       }

      }

      showFullData(e){
        const {dataIndex}  = this.state; 
       document.getElementById('adata').innerHTML = null
        this.setState({dataIndex:e})
      } 
      
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
    


  // addData(){
  //     const{myOrganization}=this.state;
  //      myOrganization.push({ id:'awexgbt' ,logo:require('../../../images/ssuet.png') , orgName:'SSUET' , address:'nipa , Gulshan , Karachi' , subject:'Seminar on AI' , description:'The Distant Future - Ai and robots are far behind computers but it’ll only be a matter of time before they become as regular as cell phones are in our everyday life. - Ray Kurzweil has used Moore’s law (which describes the relentless exponential improvement in digital technology with uncanny accuracy) to calculate that desktop computers will have the same processing power as human brains by the year 2029, and that by 2045 artificial intelligence will reach a point where it is able to improve itself at a rate that far exceeds anything conceivable in the past. - Several futurists and science fiction writers have predicted that human beings and machines will merge in the future into Cyborgs that are more capable and powerful than either. This idea, called trans-humanism.' , date:'12-7-19' , websiteLink : 'ssuet.edu.pk' , type:'Corperate' })
  //      myOrganization.push({ id:'1we4hji' ,logo:require('../../../images/oracle.png')  , orgName:'App Bakers' , address:'near Expo Centre , Gulshan , Karachi' , subject:'Job Available for full stack Developer' , description:'We are looking for a highly skilled computer programmer who is comfortable with both front and back end programming. Full Stack Developers are responsible for developing and designing front end web architecture, ensuring the responsiveness of applications and working alongside graphic designers for web design features, among other duties. Full Stack Developers will be required to see out a project from conception to final product, requiring good organizational skills and attention to detail.' , date:'30-6-19' , websiteLink : 'www.AppBakers.com' , type:'Educational' })
  //      myOrganization.push({ id:'dfmk30f' ,logo:require('../../../images/decima.png')  , orgName:'Decima.AI' , address:'DHA phase 5 , Karachi' , subject:'Internships Available for full Software Engineer' , description:'We are looking for a  skilled computer programmer who is comfortable with java programming. Please Send your resume at Decima@gmail.com ' , date:'27-6-19' , websiteLink : 'www.DecimaAI.com' , type:'Software house' })
  //   }


  render(){
      const {myOrganization , dataIndex , open , progress} = this.state;
      // this.addData();
      return(
          <div className="mainDivVOT" style={{minHeight:'800px'}}>

      <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Filters </b> </h6>
          <hr/>
          
          <div className="form-group mx-1">
            <label style={{fontSize:'12px'}} >Organization Type</label>
            <select style={{fontSize:'12px' , height:'30px'}}  className="form-control">
              <option style={{fontSize:'12px'}}  value="software_house">Software House</option>
              <option style={{fontSize:'12px'}}  value="corporate">Corporate</option>
              <option style={{fontSize:'12px'}}  value="insurance">Insurance</option>
              <option style={{fontSize:'12px'}}  value="networking">Networking</option>
              <option style={{fontSize:'12px'}}  value="other">Other</option>
            </select>
          </div>

            <div className="row">
              <Button style={{margin:'2px auto'}} type="submit" text="Apply" />
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
                    <FormControl style={{ width:'400px' , height:'8%' , fontSize:'10px' }}  type="text" placeholder="Search" className="mr-sm-2" />
                  </Form> */}
                  {/* <img onClick={this.onOpenModal} data-toggle="modal" data-target="#exampleModal"  style={{width:'20px' , height:'20px' , float:'right'}} src={require('../../../images/filter.png')}  /> */}
                </Navbar.Collapse>
          </Navbar>

          {progress && <div class='loaddiv'> 
                            <br/> <br/>
                          <div class="loader"></div>
                          <p><b>Loading please wait</b></p>
                        </div> }

              <div  className="col-md-14 row">

              <div id="sdata" className="col-md-3" style={{textAlign:'center' , margin:'10px' , minWidth:'400px'}}> 
              { dataIndex!=null &&

                    <div>
                        <div  className="dataDivVO">
                               <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'40px' , height:'40px'}} src={myOrganization[dataIndex].logo}/> <b> {myOrganization[dataIndex].orgName}</b> </p>
                               <hr/>
                               <p style={{fontSize:'12px'}}>
                                 <b> Website Link : </b>  {myOrganization[dataIndex].websiteLink}  <br/> 
                                 <b> Organization type :</b> {myOrganization[dataIndex].type}<br/> 
                                 <b> Contact Number :  </b> {myOrganization[dataIndex].number} <br/>
                                 <b> Email :  </b> {myOrganization[dataIndex].email} <br/> 
                                 <b> Address : </b>  {myOrganization[dataIndex].address} <br/><br/> 
                                 </p>

                                 <p style={{textAlign:'left' , fontSize:'12px'}}> <b> Description : {myOrganization[dataIndex].detail}  </b> </p>
                                 <p className="scrollbar square scrollbar-lady-lips thin" style={{fontSize:'12px' ,textAlign:'center' , padding:'10px' , height:'200px' , overflowY:'scroll'}}>
                                  {myOrganization[dataIndex].description} 
                                 </p>

                            </div> 
                    </div>

              }
              </div>
              
              <div id="adata" className="col-md-6" style={{textAlign:'center' , margin:'10px' }}>

                {
                     myOrganization.map((val , ind)=>{
                         return(
                            <div  className="viewDivVO">
                               <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'40px' , height:'40px'}} src={val.logo}/> <b> {val.orgName}</b> </p>
                               <hr/>
                               <p style={{height:'120px' , fontSize:'12px', overflow:'hidden'}}> <b> Website Link : </b>  {val.websiteLink}  <br/>  <b> Address : </b>  {val.address} <br/>  <b> Organization type : </b> {val.type} </p>
                               <button className="VOBtn"  onClick={()=>this.showFullData(ind)} >  more ...  </button>
                            </div>
                        )
                     })
             
                }
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
      //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(TechViewOrg);
