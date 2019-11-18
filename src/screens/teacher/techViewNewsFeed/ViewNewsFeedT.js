import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './ViewNewsFeedT.css';
import '../../../css/scrollbar.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';

class TeacherViewNewsFeed extends Component {
  
  constructor() {
    super();

    this.state = {
        // nfdiv1:true ,
        // nfdiv2:false,
        // nfdiv3:false,
        // nfdiv4:false,
        // nfdiv5:false,
        // JobsNF:[] , 
        // InternshipNF:[] ,
        // SeminarNF:[] ,
        // ScholarShipNF:[],
        // OtherNF:[],
        // open: false,
        progress:true,
        JobsNF:[] , 
        allNF:[] ,
        open: false,
      }
  }


        componentDidMount(){
          this.validation()
          this.addData();
          //  this.showchart();
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


    addFav(i){
      const {JobsNF} = this.state;
      var data = this.props.details;
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


  viewProf(i){
    const {JobsNF} = this.state;
    localStorage.setItem('orgID' , JobsNF[i].cid);
    this.props.history.push('./techViewOrganization')
   }
 




  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 


  // addData(){
  //   const{JobsNF}=this.state;
  //   JobsNF.push({ id:'awexgbt' ,logo:require('../../../images/ssuet.png') ,Jimg:require('../../../images/j1.jpg') , orgName:'SSUET' , address:'nipa , Gulshan , Karachi' , subject:'Seminar on AI' , description:'The Distant Future - Ai and robots are far behind computers but it’ll only be a matter of time before they become as regular as cell phones are in our everyday life. - Ray Kurzweil has used Moore’s law (which describes the relentless exponential improvement in digital technology with uncanny accuracy) to calculate that desktop computers will have the same processing power as human brains by the year 2029, and that by 2045 artificial intelligence will reach a point where it is able to improve itself at a rate that far exceeds anything conceivable in the past. - Several futurists and science fiction writers have predicted that human beings and machines will merge in the future into Cyborgs that are more capable and powerful than either. This idea, called trans-humanism.' , date:'12-7-19' , websiteLink : 'ssuet.edu.pk' , type:'Seminar' })
  //   JobsNF.push({ id:'1we4hji' ,logo:require('../../../images/oracle.png') ,Jimg:require('../../../images/j2.jpg')  , orgName:'App Bakers' , address:'near Expo Centre , Gulshan , Karachi' , subject:'Job Available for full stack Developer' , description:'We are looking for a highly skilled computer programmer who is comfortable with both front and back end programming. Full Stack Developers are responsible for developing and designing front end web architecture, ensuring the responsiveness of applications and working alongside graphic designers for web design features, among other duties. Full Stack Developers will be required to see out a project from conception to final product, requiring good organizational skills and attention to detail.' , date:'30-6-19' , websiteLink : 'www.AppBakers.com' , type:'Job' })
  //   JobsNF.push({ id:'dfmk30f' ,logo:require('../../../images/decima.png') ,Jimg:require('../../../images/j3.png')  , orgName:'Decima.AI' , address:'DHA phase 5 , Karachi' , subject:'Internships Available for full Software Engineer' , description:'We are looking for a  skilled computer programmer who is comfortable with java programming. Please Send your resume at Decima@gmail.com ' , date:'27-6-19' , websiteLink : 'www.DecimaAI.com' , type:'internship' })
  // }

  render(){

  
    //const {nfdiv1 , nfdiv2 , nfdiv3 , nfdiv4 , nfdiv5 , JobsNF , open} = this.state;
    const {nfdiv1 , nfdiv2 , nfdiv3 , nfdiv4 , nfdiv5 , JobsNF , open , progress} = this.state;
      return(
       <div >

          <Modal open={open} onClose={this.onCloseModal} center>
          <div  style={{borderRadius:'10px' , padding:'20px'}}>
          <h6 style={{color:'rgb(20, 194, 224)' , textAlign:'center'}} > <b> Filters </b> </h6>
          <hr/>
          <div className="form-group mx-1">
              <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Type</b></label>
              <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedAccountType} >
              <option style={{fontSize:'12px'}}  value="student">ALL</option>
              <option style={{fontSize:'12px'}}  value="student">Job</option>
              <option style={{fontSize:'12px'}} value="teacher">Internship</option>
              <option style={{fontSize:'12px'}} value="teacher">Seminar</option>
              <option style={{fontSize:'12px'}} value="teacher">Scholarship</option>
              <option style={{fontSize:'12px'}} value="teacher">Other</option>
              </select>
            </div> 

          <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Work Experienced</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedAccountType} >
                <option style={{fontSize:'12px'}}  value="student">ALL</option>
                <option value="student">Beginner</option>
                <option value="teacher">Intermediate</option>
                </select>
            </div> 
                  
            <div className="form-group mx-1">
                <label  style={{fontSize:'12px' , textAlign:'left' , display:'block'}} ><b style={{color:'rgb(20, 194, 224)'}}>Category</b></label>
                <select style={{fontSize:'12px'}} className="form-control" onChange={this.selectedAccountType} >
                <option style={{fontSize:'12px'}}  value="student">ALL</option>
                <option value="student">Web , Mobile and Software developer</option>
                <option value="teacher">Ecommerce Development</option>
                <option value="teacher">Game Development</option>
                <option value="teacher">Android App Development</option>
                <option value="teacher">QA and Testing</option>
                <option value="teacher">Database</option>
                <option value="teacher">Web Development</option>
                <option value="teacher">Web Designing</option>
                <option value="teacher">IOS Development</option>
                <option value="teacher">All IT and Networking</option>
                <option value="teacher">Other Development</option>
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

                {progress && <div class='loaddiv'>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }
                
               
                <div  className="col-md-12 newsDiv1NFT" >
                {  
                       JobsNF.map((val , index ) => {
                           console.log('chala')
                        return(
                            <div className="row  dyanmicDivNFT"  >
                               
                               <div className="ddiv2FV">
                                   <img  className="mimageNFT" src={val.logo}/>
                                   <br/>
                                   <h6 className="orgnmeNFT">{val.orgName}</h6>
                                   <h6  style={{color:'rgb(20, 194, 224)' , width:'200px'}} > {val.subject } </h6>
                                </div>

                                <div style={{margin:'10px auto'}}>   
                                <p style={{fontSize:'13px'}}> 
                                  <b> Last Date : </b> {val.date} <br/> 
                                  <b> Category : </b> {val.category} <br/>
                                  <b> Event Type : </b> {val.type} <br/>
                                  <b> Work Experienced : </b> {val.experience}   
                                </p>
                                
                                  <div style={{textAlign:'center'}}>                                        
                                      {/* <hr/>
                                      <figure style={{display:'inline-block'}}>
                                      <img style={{width:'20px' , height:'20px'}} src={require('../../../images/rem.jpg')} />
                                      <figcaption  style={{fontSize:'10px'}}><b> Reminder </b> </figcaption>
                                      </figure>

                                      &nbsp; &nbsp; */}
                                       <hr/>

                                       &nbsp; &nbsp;
                                      <figure style={{display:'inline-block'}} onClick={(e)=>this.addFav(index)}>
                                      <img src={require('../../../images/fav.png')}  style={{width:'25px' , height:'25px'}}/>
                                      <figcaption style={{fontSize:'10px'}}><b>Favourite</b></figcaption>
                                      </figure>

                                      &nbsp; &nbsp;
                                      {(val.from == 'Organization' || val.from == undefined)  && <figure style={{display:'inline-block'}} onClick={(e)=>this.viewProf(index)}>
                                        <img  style={{width:'25px' , height:'25px'}} src={require('../../../images/user.jpg')}/> 
                                        <figcaption style={{fontSize:'10px'}}><b> Profile</b></figcaption>
                                      </figure> }
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
                                <p className="desDivNFT"> {val.description} </p>
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
    details: state.root.teacherInfo ,
    accounttype : state.root.accountType
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(TeacherViewNewsFeed);
