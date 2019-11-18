import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentReminder.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';

class StuReminder extends Component {
  
  constructor() {
    super();

    this.state = {
        myReminders:[]
    }
  }

  addData(){
      const{myReminders}=this.state;
      myReminders.push({ id:'awexgbt' ,logo:require('../../../images/ssuet.png') , orgName:'SSUET' , address:'nipa , Gulshan , Karachi' , subject:'Seminar on AI' , description:'The Distant Future - Ai and robots are far behind computers but it’ll only be a matter of time before they become as regular as cell phones are in our everyday life. - Ray Kurzweil has used Moore’s law (which describes the relentless exponential improvement in digital technology with uncanny accuracy) to calculate that desktop computers will have the same processing power as human brains by the year 2029, and that by 2045 artificial intelligence will reach a point where it is able to improve itself at a rate that far exceeds anything conceivable in the past. - Several futurists and science fiction writers have predicted that human beings and machines will merge in the future into Cyborgs that are more capable and powerful than either. This idea, called trans-humanism.' , date:'12-7-19' , websiteLink : 'ssuet.edu.pk' , type:'Seminar' })
      myReminders.push({ id:'1we4hji' ,logo:require('../../../images/oracle.png')  , orgName:'App Bakers' , address:'near Expo Centre , Gulshan , Karachi' , subject:'Job Available for full stack Developer' , description:'We are looking for a highly skilled computer programmer who is comfortable with both front and back end programming. Full Stack Developers are responsible for developing and designing front end web architecture, ensuring the responsiveness of applications and working alongside graphic designers for web design features, among other duties. Full Stack Developers will be required to see out a project from conception to final product, requiring good organizational skills and attention to detail.' , date:'30-6-19' , websiteLink : 'www.AppBakers.com' , type:'Job' })
      myReminders.push({ id:'dfmk30f' ,logo:require('../../../images/decima.png')  , orgName:'Decima.AI' , address:'DHA phase 5 , Karachi' , subject:'Internships Available for full Software Engineer' , description:'We are looking for a  skilled computer programmer who is comfortable with java programming. Please Send your resume at Decima@gmail.com ' , date:'27-6-19' , websiteLink : 'www.DecimaAI.com' , type:'internship' })
  
    }


  render(){
      const {myReminders} = this.state;
      this.addData();
      return(
          <div>
           <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                    <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
          </Navbar>

              <div>
                  {
                    myReminders.length && 
                    myReminders.map((val , index ) => {
                        return(
                            <div className="row col-md-10 dyanmicDivR"  >
                               
                               <div className="col-md-2 ddiv2R">
                                   <img  className="mimageR" src={val.logo}/>
                                   <br/>
                                   <h6 className="orgnmeR">{val.orgName}</h6>
                               </div>
                               
                               <div className="col-md-8  ddiv3R">
                                <h6  className="text-center" style={{color:'rgb(20, 194, 224)'}} > {val.subject } </h6>
                                <p style={{fontSize:'13px' , textAlign:'center'}}> <b> Type : </b> {val.type} </p>
                                <hr/>
                                <p style={{fontSize:'13px'}}> <b> Description : </b> {val.description} </p>
                                <p style={{fontSize:'13px'}}> <b> Date : </b> {val.date} </p>
                                <p style={{fontSize:'13px'}}> <b> Address : </b> {val.address} </p>
                                <p style={{fontSize:'13px'}}> <b> Website Link : </b> {val.websiteLink} </p>
                                <Button text='Remove'  type='submit'/>
                                
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

export default StuReminder;