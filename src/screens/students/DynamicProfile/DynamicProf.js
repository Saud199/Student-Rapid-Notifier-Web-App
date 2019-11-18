import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './DynamicProf.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import studentProfile from '../profile/studentProfile';
import { connect } from 'react-redux';
import firebase from '../../../config/firebase.js'
import {ChatData} from '../../../store/action/action';
import Modal from 'react-responsive-modal';
import axios from 'axios'


class StuDynamicProfile extends Component {
  
  constructor() {
    super();

    this.state = {
       yourself : 'No data found' ,
       matric : 'No data found' ,
       inter : 'No data found' ,
       skills : 'No data found' ,
       name : '' ,
       phno : '' ,
       image : '' ,
       gender : '' ,
       email : '' ,
       department : '' ,
       batch : '' , 
       achievements:[] ,
       open: false,
       subject : '' ,
       message : '' 
    
    }
  }

  componentDidMount(){
      this.addData();
  }

  StartChat(){

   var data = this.props.details;

   var obj = {
    rollNo :  data.rollNo,
    id : data.id ,
    name : data.name ,
    email : data.email ,
    image : data.image 
  }

  this.props.chatinfo(obj)
  this.props.history.push("/chatMes")

  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

 sendEmail(){
  const { email , subject , message } = this.state;
  var to = email;
  var from;
  
  if(this.props.mydetails1.email != undefined ){
   from = this.props.mydetails1.email;
  }else if(this.props.mydetails2.email != undefined ){
   from = this.props.mydetails2.email;
  }
  else {
    from = 'admin@stutechgmail.com'
  }

  if(subject.length<5){
    Swal.fire('Oops' , 'Please Write Your Subject Correctly' , 'error')
  }else if(message.length<10){
    Swal.fire('Oops' , 'Please Write Your Message Correctly' , 'error')
  }else{
    axios.post('https://stutech2019.herokuapp.com/send', {
      from , to , subject , message
    }).then((res) => {
      console.log(res.statusText);
      Swal.fire('Done' , 'Your  Email has been sent' )
    }).catch(err=>{
      Swal.fire('Oops' , err , 'error' )
    })
  }
 }


  addData(){
    const {  yourself  , matric  , inter , skills  , name  , phno  , image  , gender  , email  , department , batch , achievements} = this.state;  
    var data = this.props.details;

    firebase.database().ref(`Student/${data.rollNo}`).on("value", (snapshot)=> {

      if(snapshot.exists()){
       console.log('sasa')   

      if(snapshot.hasChild("aboutYourSelf")){
        this.setState({  yourself : snapshot.val().aboutYourSelf.detail })
      }

      if(snapshot.hasChild("Matric")){
        this.setState({  matric : snapshot.val().Matric.detail })
      }

      if(snapshot.hasChild("Inter")){
        this.setState({  inter : snapshot.val().Inter.detail })   
      }

      if(snapshot.hasChild("Skills")){
        this.setState({  skills : snapshot.val().Skills.detail })    
      }

      if(snapshot.hasChild("StudentInfo")){
     this.setState({ batch : snapshot.val().StudentInfo.batch }) 
     this.setState({ department : snapshot.val().StudentInfo.department}) 
     this.setState({ email :snapshot.val().StudentInfo.email}) 
     this.setState({ gender :snapshot.val().StudentInfo.gender})
     this.setState({ image :snapshot.val().StudentInfo.image})  
     this.setState({ name : snapshot.val().StudentInfo.name}) 
     this.setState({ phno : snapshot.val().StudentInfo.ph_no})     
      }

      if(snapshot.hasChild("Achievements")){
        while(achievements.length > 0) {
              achievements.splice(0,1); 
           }
        firebase.database().ref(`Student/${data.rollNo}/Achievements`).on("value", (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
               achievements.push({detail : childSnapshot.val().subject})
               this.setState({achievements})
            })
        })
      }

       this.setState({})
      }
    })
   }


  showFullData(e){
    const {dataIndex}  = this.state; 
   document.getElementById('adata').innerHTML = null
    this.setState({dataIndex:e})
  }  


  render(){
    const { message , subject , open , yourself  , matric  , inter , skills  , name  , phno  , image  , gender  , email  , department , batch , achievements} = this.state;
    var email1 = this.props.mydetails1.email ;
    var email2 = this.props.mydetails2.email;
    
      return(
          <div>

      <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Send Email </b> </h6>
          <hr/>
      {email1!=undefined &&  <p> From :  <input className="form-control" value={email1} /></p> }
      {email2!=undefined &&   <p> From :  <input className="form-control" value={email2} /></p> }
            <p> To :  <input className="form-control" value={email} /></p>
            <p> Subject :  <input className="form-control" value={subject} onChange={(e)=>this.setState({ subject:e.target.value })} /></p>
            <p> Message :  <input className="form-control" value={message}  onChange={(e)=>this.setState({ message:e.target.value })}/></p>
              <Button  style={{margin:'2px auto'}} type="submit" text="Send" onClick={()=>this.sendEmail()} />

          </div>
        </Modal>
            
            <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                    <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
          </Navbar>   
             <div className="col-sm-8 div1SDP">
                <p style={{textAlign:'center' , margin:'20px'}}> <img  className="img1SDP"  src={image}/> </p>
                 <h6> <b style={{color:'rgb(47, 174, 212)'}}>About Student</b> </h6>
                    <p style={{fontSize:'14px' , marginLeft:'10%'}}>
                      <b> Name : </b> {name} <br/>
                      <b> Email : </b> {email} <br/>
                      <b> Phone : </b> {phno} <br/>
                      <b> Gender : </b> {gender} <br/>
                      <b> Batch : </b> {batch} <br/>
                      <b> Department : </b> {department} <br/>
                    </p>
                   
                    <br/>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Academic Information</b> </h6>
                    <p style={{fontSize:'14px'}} >
                        <b style={{fontSize:'14px' , marginLeft:'10%'}}>Matirculation&nbsp;&nbsp;&nbsp;: </b> {matric}<br/>
                        <b style={{fontSize:'14px' , marginLeft:'10%'}}>Intermediate&nbsp;&nbsp;&nbsp;&nbsp;: </b> {inter}<br/>
                    </p>

                    <br/>

                    <h6> <b style={{color:'rgb(47, 174, 212)'}}>Skills</b> </h6>
                    <p style={{marginLeft:'10%' , fontSize:'14px'}}>{skills}</p>
                    
                    <br/>

                    <h6> <b style={{color:'rgb(47, 174, 212)'}}>About</b> </h6>
                    <p style={{marginLeft:'10%' , fontSize:'14px'}}>{yourself}</p>
                    
                    <br/>
                    
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Achievemants</b> </h6>
                    <p>
                     {
                     achievements.map((val , index ) => {
                       return(
                         <ul style={{marginLeft:'10%'}}>
                            <li>   
                            <b style={{fontSize:'14px'}}>{ val.detail }</b>
                            </li>
                         </ul>
                       )
                    })
                    }                       
                    </p>

                    <br/>
                   

                  <p style={{textAlign:'center'}}>  
                  <Button text="Chat" onClick={()=>this.StartChat()}/>
                  <Button text="Email"  onClick={()=>this.onOpenModal()} /> 
                  </p>

             </div>

          </div>

  

       )}
    }

    function mapStateToProp(state) {
        return ({
          details: state.root.dynamicInfo ,
          accounttype : state.root.accountType ,
          mydetails1 : state.root.teacherInfo ,
          mydetails2: state.root.organizationInfo
        })
      }
      function mapDispatchToProp(dispatch) {
        return ({
              chatinfo : (info)=>{ dispatch(ChatData(info))}
        })
      }
      
      export default connect(mapStateToProp, mapDispatchToProp)(StuDynamicProfile);
      