import React, { Component } from 'react'
import './App.css'
import Posts from './components/Posts'
import PostCreate from './components/PostCreate'
import PostEdit from './components/PostEdit'
import PostDetail from './components/PostDetail'
import { Route, Switch, Redirect } from 'react-router-dom'
import { verifyUser } from './services/user'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import  dark  from "./images/half.png";
class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      mode: false
    }
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    this.setState((state) => {
      if (state.mode === true) {

        return {mode: false}
      } else {
     
        return { mode: true };
      }
    });
  }
  async componentDidMount() {
    const user = await verifyUser()
    if (user) {
      this.setState( user )
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render() {
    const { setUser, clearUser } = this
    const { user } = this.state
    if (this.state.mode) {
    return (
      <div className="darkMode">
        <img style={{width: 30}} src={dark} alt="half light dark circle" onClick={this.toggleDarkMode} className="lightSwitch"/>
        <Switch>
          <Route exact path="/posts" render={() => <Posts user={user} />} />
          <Route exact path="/" render={() => <Posts user={user} />} />
          <Route exact path="/sign-up" render={props => <SignUp setUser={setUser} history={props.history} />} />
          <Route exact path="/sign-in" render={props => <SignIn setUser={setUser} history={props.history} />} />
          <Route exact path="/sign-out" render={props => <SignOut user={user} clearUser={clearUser} history={props.history} />} />
          <Route exact path="/posts" render={() => <Posts user={user} />} />
          <Route exact path="/add-post" render={() => user ? <PostCreate user={user} /> : <Redirect to='/add-post' />} />
          <Route exact path="/posts/:id/edit" render={(props) => user ? <PostEdit {...props} user={user} /> : <Redirect to='/' />} />
          <Route exact path="/posts/:id" render={(props) => <PostDetail {...props} history={props.history} user={user} />} />
        </Switch>
       
      </div>
    )
    } else {
      return (
        <div className="lightMode">
          <img style={{width: 30}} src={dark} onClick={this.toggleDarkMode} className="lightSwitch" alt="half dark half white icon"  />
        <Switch>
          <Route exact path="/posts" render={() => <Posts user={user} />} />
          <Route exact path="/" render={() => <Posts user={user} />} />
          <Route exact path="/sign-up" render={props => <SignUp setUser={setUser} history={props.history} />} />
          <Route exact path="/sign-in" render={props => <SignIn setUser={setUser} history={props.history} />} />
          <Route exact path="/sign-out" render={props => <SignOut user={user} clearUser={clearUser} history={props.history} />} />
          <Route exact path="/posts" render={() => <Posts user={user} />} />
          <Route exact path="/add-post" render={() => user ? <PostCreate user={user} /> : <Redirect to='/add-post' />} />
          <Route exact path="/posts/:id/edit" render={(props) => user ? <PostEdit {...props} user={user} /> : <Redirect to='/' />} />
          <Route exact path="/posts/:id" render={(props) => <PostDetail {...props} history={props.history} user={user} />} />
        </Switch>
   
      </div>
)
    }
  }
}

export default App