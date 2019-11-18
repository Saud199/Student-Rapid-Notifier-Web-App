import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './adminGraph.css';
import '../../../css/scrollbar.css';
import Swal from 'sweetalert2'
import '../../Loader/loader.css'
import {Button} from '../../../components/button/button.js'
import { Navbar , Nav , NavDropdown , Form , FormControl } from 'react-bootstrap';
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import Chart from 'chart.js';

class adminGraph extends Component {
  
  constructor() {
    super();

    this.state = {
    }
  }

  componentDidMount(){
     this.showchart();
     this.Users();
     this.Posts();
     this.Achievements()
     this.Complain();
 }

 Complain(){
     var stuComp=0 , techComp=0 , orgComp=0;

     firebase.database().ref().child("StudentComplain").on("value", function(snapshot3) {
        stuComp = snapshot3.numChildren()
  
    //   firebase.database().ref().child("Achievements").on("value", function(snapshot4) {
    //     techComp = snapshot4.numChildren()
  
  
    //   firebase.database().ref().child("StudentComplain").on("value", function(snapshot5) {
    //       orgComp = snapshot5.numChildren()
          
  
      var ctx = document.getElementById('myComplain');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Student Complain', 'Teacher Complain', 'Organization Detail'],
            datasets: [{
                label: '# of Complains',
                data: [stuComp , techComp , orgComp],
                backgroundColor: [
                    
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                   
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {scales: { yAxes: [{ ticks: { beginAtZero: true } }] } } });
       })
    //   })
    //   }) 

 }

 showchart(){

    var users=0 , post=0 , chat=0 , achievements=0 , complain=0;

     firebase.database().ref().child("Users").on("value", function(snapshot1) { 
        users = snapshot1.numChildren()
  
    firebase.database().ref().child("Jobs").on("value", function(snapshot2) {
        post = snapshot2.numChildren()

    firebase.database().ref().child("chating").on("value", function(snapshot3) {
      chat = snapshot3.numChildren()

    firebase.database().ref().child("Achievements").on("value", function(snapshot4) {
      achievements = snapshot4.numChildren()


    firebase.database().ref().child("StudentComplain").on("value", function(snapshot5) {
        complain = snapshot5.numChildren()
        

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Users', 'Posts', 'Chats', 'Achievements', 'Complain'],
          datasets: [{
              label: '# of nodes',
              data: [users, post, chat, achievements, complain],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {scales: { yAxes: [{ ticks: { beginAtZero: true } }] } } });
     })
    })
    }) 
   }) 
  })
 }


Users(){
    var stu=0 , teacher=0 , org=0;
    firebase.database().ref("/Users").on("value", (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
         if(childSnapshot.val().accountType=='Student'){stu=stu+1}
         if(childSnapshot.val().accountType=='Teacher'){teacher=teacher+1}
         if(childSnapshot.val().accountType=='Organization'){org=org+1}
        })

        var ctx = document.getElementById('myUsers');
         var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Students' , 'Teachers' , 'Organization'],
             datasets: [{
              label: '# of Users',
              data: [stu , teacher , org],
              backgroundColor: [
                  
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {scales: { yAxes: [{ ticks: { beginAtZero: true } }] } } });
     })
}

Posts(){
    var jobs=0 , intrships=0 , seminars=0, scholarhips=0, other=0;
    firebase.database().ref("/Jobs").on("value", (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
         if(childSnapshot.val().jobType=='Job'){jobs=jobs+1}
         if(childSnapshot.val().jobType=='Internship'){intrships=intrships+1}
         if(childSnapshot.val().jobType=='Seminar'){seminars=seminars+1}
         if(childSnapshot.val().jobType=='Scholarship'){scholarhips=scholarhips+1}
         if(childSnapshot.val().jobType=='Other'){other=other+1}
        })

        var ctx = document.getElementById('myPosts');
         var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jobs' , 'Internships' , 'Seminars', 'Scholarships', 'Others'],
             datasets: [{
              label: '# of Posts',
              data: [jobs , intrships , seminars, scholarhips, other],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {scales: { yAxes: [{ ticks: { beginAtZero: true } }] } } });
     })
}


Achievements(){
    var certificate=0 , degree=0 , diploma=0;
    firebase.database().ref("/Achievements").on("value", (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
         if(childSnapshot.val().certificateType=='Certificate'){certificate=certificate+1}
         if(childSnapshot.val().certificateType=='Diploma'){diploma=diploma+1}
         if(childSnapshot.val().certificateType=='Degree'){degree=degree+1}
        })

        var ctx = document.getElementById('myAchievements');
         var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Certificate' , 'Diploma' , 'Degree', ],
             datasets: [{
              label: '# of Achievements',
              data: [certificate , diploma , degree],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {scales: { yAxes: [{ ticks: { beginAtZero: true } }] } } });
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

 
  render(){

  
    const {nfdiv1 , nfdiv2 , nfdiv3 , nfdiv4 , nfdiv5 , JobsNF , open , progress} = this.state;
      return(
       <div >

      

          <Navbar  expand="lg"  style={{height:'auto' , width:'100%' ,  marginLeft:'0px' , background:'rgb(20, 194, 224)'}}>
            <Navbar.Brand>
                <img  onClick={()=>this.props.history.goBack()} style={{width:'30px' , height:'30px' }}  src={require('../../../images/back.png')} />
                <img style={{height:'70px' , width:'110px' ,marginTop:'10px' , padding:'5px' }} src={require('../../../images/logo.png')}/> 
                
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              </Nav> 
              <Form inline style={{marginRight:'7%' , marginLeft:'7%' , textAlign:'center'}}>
                <FormControl style={{ width:'400px' , height:'8%' , fontSize:'10px' }}  type="text" placeholder="Search" className="mr-sm-2" />
                {/* <Button text="Search" /> */}
              </Form>
              <Nav.Link> 
                   <img onClick={this.onOpenModal} data-toggle="modal" data-target="#exampleModal"  style={{width:'20px' , height:'20px' , float:'right'}} src={require('../../../images/filter.png')}  />
              </Nav.Link>
            </Navbar.Collapse>
          </Navbar>

             
                <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of System </h3>
                <canvas id="myChart"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div>

                <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of Users </h3>
                <canvas id="myUsers"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div>

                <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of Posts </h3>
                <canvas id="myPosts"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div>

                {/* <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of Chats </h3>
                <canvas id="myChats"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div> */}

                <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of Achievements </h3>
                <canvas id="myAchievements"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div>

                <div style={{ border:'solid 2px black' , padding:'20px' , margin:'10px'}}>
                <h3> Over All Representation of Complaints </h3>
                <canvas id="myComplain"  width="400" height="100" aria-label="Hello ARIA World" role="img"></canvas>
                </div>
        </div>
      )
  }

}

export default adminGraph;