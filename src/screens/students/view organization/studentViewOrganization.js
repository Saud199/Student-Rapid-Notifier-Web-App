import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentViewOrganization.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import '../../Loader/loader.css'

class StuViewOrg extends Component {
  
  constructor() {
    super();

    this.state = {
        myOrganization:[] ,
        dataIndex : null,
        open: false,
        fdata : 'softwarehouse',
        progress:true
        
    }
  }

  componentDidMount(){
    this.addData();
    this.validation()
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


  addData(){
    const{myOrganization}=this.state;
       
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
              websiteLink : data.webLink ,
              detail : data.detail
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
              websiteLink : data.webLink ,
              detail : data.detail
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

  filter(){
  const {fdata , myOrganization} = this.state;
  this.setState({progress:true})

  while(myOrganization.length>0){
    myOrganization.splice(0,1);
    this.setState({ myOrganization })
  } 


    
  firebase.database().ref("/Users").orderByChild("accountType").equalTo("Organization").on("value", (snapshot)=> {
   
   if(snapshot.exists()){
      snapshot.forEach((childSnapshot)=> {
      var data = childSnapshot.val();
      if(data.orgType == fdata)
      console.log(data.orgType , fdata)
      var orgObj = {
        orgName : data.name ,
        address : data.address ,
        email : data.email ,
        id : data.id ,
        logo : data.imgURL ,
        type : data.orgType ,
        number : data.ph_no ,
        websiteLink : data.webLink ,
        detail : data.detail
       }
       myOrganization.push(orgObj)
       this.setState({myOrganization , progress:false})
    })
  }else{
    Swal.fire('Oops' , `No ${fdata} Organization Found` , 'error')
  }
  })    
  }


  render(){
      const {myOrganization , dataIndex , open , progress} = this.state;
      return(
          <div className="mainDivVOT" style={{minHeight:'800px'}}>

      <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Filters </b> </h6>
          <hr/>
          
          <div className="form-group mx-1">
            <label style={{fontSize:'12px'}} >Organization Type</label>
            <select style={{fontSize:'12px' , height:'30px'}}  className="form-control"  onChange={(e)=>this.setState({fdata:e.target.value})} >
            <option style={{fontSize:'12px'}}  value="softwarehouse">Software House</option>
            <option style={{fontSize:'12px'}}  value="corporate">Corporate</option>
            <option style={{fontSize:'12px'}}  value="insurance">Insurance</option>
            <option style={{fontSize:'12px'}}  value="networking">Networking</option>
            <option style={{fontSize:'12px'}}  value="other">Other</option>
            </select>
          </div>

            <div className="row">
              <Button style={{margin:'2px auto'}} onClick={()=>{this.filter()}} type="submit" text="Apply" />
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
                  {/* <img onClick={this.onOpenModal} data-toggle="modal" data-target="#exampleModal"  style={{width:'20px' , height:'20px' , float:'right'}} src={require('../../../images/filter.png')}  />
              */}  </Navbar.Collapse> 
          </Navbar>


          {progress &&   <div class='loaddiv'> <br/><br/>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }
 

              <div  className="col-md-14 row">

              <div id="sdata" className="col-md-3" style={{textAlign:'center' , margin:'10px' , minWidth:'400px'}}> 
              { dataIndex!=null &&

                    <div>
                        <div  className="dataDivVOT">
                               <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'40px' , height:'40px'}} src={myOrganization[dataIndex].logo}/> <b> {myOrganization[dataIndex].orgName}</b> </p>
                               <hr/>
                               <p style={{fontSize:'12px'}}>
                                 <b> Website Link : </b>  {myOrganization[dataIndex].websiteLink}  <br/> 
                                 <b> Organization type :</b> {myOrganization[dataIndex].type}<br/> 
                                 <b> Contact Number :  </b> +92-315-2378451 <br/>
                                 <b> Email :  </b> Organization@gmail.com <br/> 
                                 <b> Address : </b>  {myOrganization[dataIndex].address} <br/><br/> 
                                 </p>

                                 <p style={{textAlign:'left' , fontSize:'12px'}}> <b> Description :  </b> </p>
                                 <p className="scrollbar square scrollbar-lady-lips thin" style={{fontSize:'12px' ,textAlign:'center' , padding:'10px' , height:'200px' , overflowY:'scroll'}}>
                                  {myOrganization[dataIndex].detail} 
                                 </p>

                            </div> 
                    </div>

              }
              </div>
              
              <div id="adata" className="col-md-6" style={{textAlign:'center' , margin:'10px' }}>

                {
                    myOrganization.length>0 &&  myOrganization.map((val , ind)=>{
                         return(
                            <div  className="viewDivVOT">
                               <p style={{textAlign:'center' , fontSize:'12px'}}> <img style={{width:'40px' , height:'40px'}} src={val.logo}/> <b> {val.orgName}</b> </p>
                               <hr/>
                               <p style={{height:'120px' , fontSize:'12px', overflow:'hidden'}}> <b> Website Link : </b>  {val.websiteLink}  <br/>  <b> Address : </b>  {val.address} <br/>  <b> Organization type : </b> {val.type} </p>
                               <button className="VOTBtn"  onClick={()=>this.showFullData(ind)} >  more ...  </button>
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
      details: state.root.studentInfo ,
      accounttype : state.root.accountType
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
        //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(StuViewOrg);