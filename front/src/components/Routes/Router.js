import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import cookie from 'react-cookies';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Signup from '../Signup/Signup';
import BrowseResponsive from '../Browse/BrowseResponsive';
import MyProfile from '../Profile/MyProfile';
import MessagesIndex from '../MessagesIndex/MessagesIndex';
import Messages from '../Messages/Messages';
import Preferences from '../Preferences/Preferences';
import History from '../History/History';
import ProfileImages from '../ProfileImages/ProfileImages';
import EmailVerification from '../EmailVerification/EmailVerification';
import SendResetPassword from '../SendResetPassword/SendResetPassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import UserProfileDesktop from '../Profile/UserProfileDesktop';
// import UserProfile from '../Profile/UserProfile';

//TODO: query me to check token

const Router = () => (
	<BrowserRouter>
		<Switch>
			<PublicRoute exact path="/login" component={Login} />
			<PrivateRoute exact path="/logout" component={Logout} />
			<PublicRoute exact path="/signup" component={Signup} />
			<PrivateRoute exact path="/browseResponsive" component={BrowseResponsive}/>
			<PrivateRoute path="/browseResponsive/:username" component={(props) => { cookie.save('firstUsername', props.match.params.username, { path: '/' }); return <Redirect to="/browseResponsive"/> }}/>
			<PrivateRoute exact path="/profile" component={MyProfile} />
			<PrivateRoute path="/messages/:uid" component={Messages} />
			<PrivateRoute path="/UserProfileDesktop/:uid" component={UserProfileDesktop} />
			{/* <PrivateRoute path="/UserProfile/:uid" component={UserProfile} /> */}
			<PrivateRoute exact path="/messages" component={MessagesIndex} />
			<PrivateRoute exact path="/preferences" component={Preferences} />
			<PrivateRoute exact path="/history" component={History} />
			<PrivateRoute exact path="/profile/images" component={ProfileImages} />
			<PublicRoute path="/confirm/:confirmToken" component={EmailVerification} />
			<Route exact path="/reset" component={SendResetPassword} />
			<Route path="/reset/:resetToken" component={ResetPassword} />
			<PublicRoute exact path="/" component={Main} />

			<Redirect to="/browseResponsive" />
		</Switch>
	</BrowserRouter>
);

export default Router;
