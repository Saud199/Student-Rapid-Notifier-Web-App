import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './stuViewProfile.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';

class StuViewProfile extends Component {
  
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
           achievements:[]
        
        }
      }
    
      componentDidMount(){
          this.addData();
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
    const { yourself  , matric  , inter , skills  , name  , phno  , image  , gender  , email  , department , batch , achievements} = this.state;
      const data = this.props.details;
      return(
          <div className="mainDivVO">
            
            <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                    <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
          </Navbar>


          <div className="col-lg  div1SVP  row" >
             
             <div className="col-lg div2SVP">
                <p style={{textAlign:'center' , margin:'20px'}}> <img  className="img1SVP" src={data.imgURL}/> </p>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Personal Information </b> </h6>
                    <p>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>{data.name}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>PhoneNo&nbsp;&nbsp;&nbsp;:</b>{data.number}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>{data.email}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>{data.gender}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>DOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>{data.DOB}<br/>
                        {/* <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Address&nbsp;&nbsp;&nbsp;&nbsp;:</b>{data.address}<br/> */}
                    </p>

                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Student Information  </b> </h6>
                    <p>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>RollNo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>{data.rollNo}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Batch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>{data.batch}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Depart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>{data.department}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Section&nbsp;&nbsp;&nbsp;&nbsp;:</b>{data.section}<br/>
                    </p>
             </div>
              
             <div className="col-lg div3SVP">
                    <br/>
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}> Academic Information</b> </h6>
                    <p>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Matirculation&nbsp;&nbsp;&nbsp;:</b>{matric}<br/>
                        <b style={{fontSize:'20px' , marginLeft:'10%' , fontSize:'14px'}}>Intermediate&nbsp;&nbsp;&nbsp;&nbsp;:</b>{inter}<br/>
                    </p>

                    <br/>

                    <h6> <b style={{color:'rgb(47, 174, 212)'}}>Skills</b> </h6>
                    <p style={{marginLeft:'10%'}}> {skills} </p>
                    
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
                    <h6> <b style={{color:'rgb(47, 174, 212)'}}>About Your Self</b> </h6>
                    <p>
                        <b style={{fontSize:'14px' , marginLeft:'10%'}}> {yourself} </b>
                    </p>

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
      
      export default connect(mapStateToProp, mapDispatchToProp)(StuViewProfile);
      