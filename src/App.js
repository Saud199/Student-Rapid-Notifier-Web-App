import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux';
import {store , persistor} from './store';
import ReactGA from 'react-ga';
import './App.css';

// import mail from './screens/email/mailform.js'
// import sms from './screens/sms/index.js'

import Afterlogin from './screens/students/afterlogin/studentAfterlogin.js'
import Login from './screens/login/Login.js'
import N4 from './screens/N404.js'
import Signup1 from './screens/signup/signup1.js'
import Signup2 from './screens/signup/signup2.js'
import OrgSignup from './screens/signup/signuporg/org_signup.js'
import Messenger from './screens/chatMessenger/ChatMessenger.js'

import StuAfterLogin from './screens/students/afterlogin/studentAfterlogin.js'
import StuProfile from './screens/students/profile/studentProfile.js'
import StuComplain from './screens/students/complain/studentSendComplain.js'
import StuReminder from './screens/students/reminder/studentReminder.js'
import StuNewsFeed from './screens/students/newsfeed/StudentViewNewsfeed.js'
import StuFavourite from './screens/students/favourite/studentAddFavourite.js'
import StuViewOrganization from './screens/students/view organization/studentViewOrganization.js'
import StuShareAchievments from './screens/students/my achievements/studentShareAchievements.js'
import StuViewNotification from './screens/students/notification/studentViewNotification.js'
import StuViewProfile  from './screens/students/viewProfile/stuViewProfile.js'
import StuDynamicProfile  from './screens/students/DynamicProfile/DynamicProf.js'
import StudentViewAchievements from './screens/students/view achievements/Student ViewAchievements.js'

import OrgAfterLogin from './screens/organization/orgAfterLogin/AfterLoginOrg.js'
import OrgAddJob from './screens/organization/orgAddJob/addJobO.js'
import org_signup from './screens/signup/signuporg/org_signup.js';
import OrgProfile from './screens/organization/orgProfile/profileO.js'
import OrgViewAchievements from './screens/organization/orgViewAchieve/ViewAchievementsO.js'


import TechAfterLogin from './screens/teacher/techAfterLogin/afterLoginT.js'
import TechAddJob from './screens/teacher/techAddJob/AddJobT.js'
import TechViewNewsFeed from './screens/teacher/techViewNewsFeed/ViewNewsFeedT.js'
import TechAddFavourite from './screens/teacher/techfavourite/AddFavouriteT.js'
import TechComplain from './screens/teacher/techComplain/ComplainT.js'
import TechProfile from './screens/teacher/techProfile/teacherProfileT.js'
import TechViewAchievements from './screens/teacher/techViewAchieve/ViewAchievementsT.js'
import TechViewNotification from './screens/teacher/techNotification/ViewNotificationT.js'
import TechViewOrganization from './screens/teacher/techViewOrg/ViewOrgT.js'
import TechViewProfile from './screens/teacher/techViewProfile/ViewProfileT.js'

import AdminDashboard from './screens/admin/AdminAfterLogin/AdminAfterLogin.js'
import AdminProfile from './screens/admin/AdminProfile/AdmProfile.js'
import AdminMessage from './screens/admin/AdminMessage/adminMessage.js'
import AdminGraph from './screens/admin/AdminGraph/adminGraph.js'
import AdminComplain from './screens/admin/AdminComplain/AdminComplain.js'

import {BrowserRouter as Router , Switch , Route , Redirect} from 'react-router-dom'; 

import N404 from './screens/N404.js';


function initialAnalytics(){
  ReactGA.initialize('UA-151953691-1');
  ReactGA.pageview('/')
  ReactGA.pageview('/HomePage');
  ReactGA.pageview('/stuAfterLogin');
  ReactGA.pageview('/stuNewsFeed');
  ReactGA.pageview('/chatMe')
  ReactGA.pageview('/stuProfile')
  ReactGA.pageview('/stuSendComplain')
  ReactGA.pageview('/stuFavourite')
  ReactGA.pageview('/stuDynamicProfile')
  ReactGA.pageview('/studentAchievements')
  ReactGA.pageview('/orgAfterLogin')
  ReactGA.pageview('/orgAddJob')
  ReactGA.pageview('/orgViewAchievements')
  ReactGA.pageview('/techAddJob')
  ReactGA.pageview('/techAfterLogin')
  ReactGA.pageview('/techViewNewsFeed')
  ReactGA.pageview('/adminAfterLogin')
  ReactGA.pageview('/adminGraph')
  ReactGA.pageview('/adminProfile')
}

class App extends Component {
  render() {
    initialAnalytics();
    return (
      <Provider store={store}> 
       <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Switch> 
          <Route exact path="/" component={Login}/>

          {/* <Route exact path="/mail" component={mail}/>
          <Route exact path="/sms" component={sms}/> */}


          <Route exact path="/signup1" component={Signup1}/>
          <Route exact path="/signup2" component={Signup2}/>
          <Route exact path="/signuporg" component={OrgSignup}/>
          <Route exact path="/chatMes" component={Messenger}/>
         
          <Route exact path="/stuAfterLogin" component={StuAfterLogin}/>
          <Route exact path="/stuProfile" component={StuProfile}/>
          <Route exact path="/stuSendComplain" component={StuComplain}/>
          <Route exact path="/stuReminder" component={StuReminder}/>
          <Route exact path="/stuNewsFeed" component={StuNewsFeed}/>
          <Route exact path="/stuFavourite" component={StuFavourite}/>
          <Route exact path="/stuViewOrg" component={StuViewOrganization}/>
          <Route exact path="/stuAchievements" component={StuShareAchievments}/>
          <Route exact path="/stuNotification" component={StuViewNotification}/>
          <Route exact path="/stuViewProfile" component={StuViewProfile}/>
          <Route exact path="/stuDynamicProfile" component={StuDynamicProfile}/>
          <Route exact path="/studentAchievements" component={StudentViewAchievements}/>
         
          <Route exact path="/orgAfterLogin" component={OrgAfterLogin}/>
          <Route exact path="/orgAddJob" component={OrgAddJob}/>
          <Route exact path="/orgProfile" component={OrgProfile}/>
          <Route exact path="/orgViewAchievements" component={OrgViewAchievements}/>

          <Route exact path="/techAfterLogin" component={TechAfterLogin}/>
          <Route exact path="/techAddJob" component={TechAddJob}/>
          <Route exact path="/techViewNewsFeed" component={TechViewNewsFeed}/>
          <Route exact path="/techAddFavourite" component={TechAddFavourite}/>
          <Route exact path="/techComplain" component={TechComplain}/>
          <Route exact path="/techProfile" component={TechProfile}/>
          <Route exact path="/techViewAchievements" component={TechViewAchievements}/>
          <Route exact path="/techViewNotification" component={TechViewNotification}/>
          <Route exact path="/techViewOrganization" component={TechViewOrganization}/>
          <Route exact path="/techViewProfile" component={TechViewProfile}/>

          <Route exact path="/adminAfterLogin" component={AdminDashboard}/>
          <Route exact path="/adminProfile" component={AdminProfile}/>
          <Route exact path="/adminMessage" component={AdminMessage}/>
          <Route exact path="/adminGraph" component={AdminGraph}/>
          <Route exact path="/adminComplain" component={AdminComplain}/>
          
          <Route exact path="/404" component={N4}/>
          <Redirect to="/404" />
        
        </Switch>
      </Router>
      </PersistGate>
      </Provider>
    );
  }
}

export default App;
