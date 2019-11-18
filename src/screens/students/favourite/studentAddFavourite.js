import React, {Component} from 'react';
import '../../../css/bootstrap.min.css';
import './studentAddFavourite.css';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'
import {Button} from '../../../components/button/button.js'
import firebase from '../../../config/firebase.js'
import { connect } from 'react-redux';
import '../../Loader/loader.css'


import { Navbar} from 'react-bootstrap';


class StudentAddFavourite extends Component {
  
  constructor() {
    super();

    this.state = {
        myFav:[] ,
        progress : true 
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
  const {myFav} = this.state;
  var data = this.props.details;  
  firebase.database().ref(`Favourite/${data.rollNo}`).on("value", (snapshot)=> {
   if(snapshot.exists()){
    snapshot.forEach((childSnapshot)=> {
     var d = childSnapshot.val();
    var obj = {
     id : d.id ,
     logo : d.logo ,
     Jimg : d.Jimg ,
     orgName : d.orgName ,
     description : d.description ,
     date : d.date ,
     experience : d.experience,
     type : d.type ,
     cid : d.cid ,
     category : d.category ,
     subject : d.subject ,
     from : d.from
    }
    myFav.push(obj);
    this.setState({myFav , progress:false})
    })
   }
  })
}  

deleteFav(i){
    const {myFav} = this.state;
    var data = this.props.details;  
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          firebase.database().ref(`Favourite/${data.rollNo}/${myFav[i].id}`).set({});
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          )
        }
      }) 
}

viewProf(i){
    const {myFav} = this.state;
    if(myFav[i].from == 'Teacher'){
       Swal.fire('Oops' , 'You Cannot View Profile Teacher' , 'error')
    }
    else {
    localStorage.setItem('orgID' , myFav[i].cid);
    this.props.history.push('./stuViewOrg')
   }
}
 


  render(){

    const {myFav , progress} = this.state;
   
      return(
          <div>

            <Navbar  expand="md"  style={{ marginLeft:'0px' ,  height:'auto' , width:'100%' , background:'rgb(20, 194, 224)'}}>     
                <Navbar.Brand>
                    <img  onClick={()=>this.props.history.goBack()}  style={{width:'30px' , height:'30px' }} src={require('../../../images/back.png')} />
                    <img  style={{height:'70px' , width:'110px' }} src={require('../../../images/logo.png')}/> 
                </Navbar.Brand>
            </Navbar> 

            {progress &&   <div class='loaddiv'> <br/><br/>
                    <div class="loader"></div>
                    <p><b>Loading please wait</b></p>
                  </div> }
 
               
                  <div  className="col-md-12 newsDiv1FV" >
                      {  
                             myFav.map((val , index ) => {
                                 console.log('chala')
                              return(
                                  <div className="row  dyanmicDivFV"  >
                                     
                                     <div className="ddiv2FV">
                                         <img  className="mimageFV" src={val.logo}/>
                                         <br/>
                                         <h6 className="orgnmeFV">{val.orgName}</h6>
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
                                            <hr/>
                                            {(val.from == 'Organization' || val.from == undefined)  && <figure style={{display:'inline-block'}} onClick={(e)=>this.viewProf(index)}>
                                            <img  style={{width:'25px' , height:'25px'}} src={require('../../../images/user.jpg')}/> 
                                            <figcaption style={{fontSize:'10px'}}><b> Profile</b></figcaption>
                                           </figure> }
            
                                             &nbsp; &nbsp;

                                            <figure style={{display:'inline-block'}} onClick={(e)=>this.deleteFav(index)}>
                                            <img src={require('../../../images/delete.png')}  style={{width:'23px' , height:'23px'}}/>
                                            <figcaption style={{fontSize:'10px'}} ><b>Delete</b></figcaption>
                                            </figure>

                                            <hr/> 
                                        </div>
                                      </div>

                                      <div style={{ margin:'10px auto', border:'solid 1px black' , width:'200px' , height:'130px'}}  >
                                      <img src={val.Jimg} style={{width:'195px' , height:'125px'}}  />
                                      </div>   
   

                                      <div style={{margin:'10px auto' , textAlign:'center' , padding:'10px' ,  border:'solid 1px rgb(20, 194, 224)' , borderRadius:'5px'}}>
                                      <p><b>Description</b></p>
                                      <p className="desDivFVT scrollbar square scrollbar-lady-lips thin"> {val.description} </p>
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
      details: state.root.studentInfo ,
      accounttype : state.root.accountType
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
        //  getUserinfo : (info)=>{ dispatch(SignupDetail(info))}
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(StudentAddFavourite);