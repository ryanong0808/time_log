import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
import Dashboard from './components/dashboard/dashboard';
import ViewProfile from './components/dashboard/profile/view-profile';
import EditProfile from './components/dashboard/profile/edit-profile';

// Import Timelog pages
import Timelog from './components/dashboard/timelog/timelog';
import TimeSheet from './components/dashboard/timelog/timesheet';
import ComposeTimelog from './components/dashboard/timelog/compose-timelog';
import EditTimelog from './components/dashboard/timelog/edit-timelog';

// Import User pages
import UserList from './components/admin/user/user-list';
import EditUser from './components/admin/user/edit-user';
import AddUser from './components/admin/user/add-user';
import User from './components/admin/user/user';
  
// Import admin pages
import AdminDashboard from './components/admin/dashboard';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />

    <Route path="profile">
      <IndexRoute component={RequireAuth(ViewProfile)} />
      <Route path="edit" component={RequireAuth(EditProfile)} />
    </Route>
    

    <Route path="admin">
      <IndexRoute component={RequireAuth(AdminDashboard)} />
      <Route path="user">
        <IndexRoute component={RequireAuth(UserList)} />
        <Route path="new" component={RequireAuth(AddUser)} />
        <Route path="edit/:userId" component={RequireAuth(EditUser)} />
        <Route path="view/:userId" component={RequireAuth(User)} />
      </Route>  
    </Route>

    <Route path="dashboard">
      <IndexRoute component={RequireAuth(Dashboard)} />
      <Route path="timelog" component={RequireAuth(TimeSheet)} />
      <Route path="timelog/new" component={RequireAuth(ComposeTimelog)} />
      <Route path="timelog/view/:timelogId" component={RequireAuth(Timelog)} />
      <Route path="timelog/edit/:timelogId" component={RequireAuth(EditTimelog)} />
    </Route>

    <Route path="*" component={NotFoundPage} />
  </Route>
);
