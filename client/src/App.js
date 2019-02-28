import React, {Component} from 'react';
import './App.css';
import {Route,BrowserRouter,Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './stylesheet/main.scss';
import { Container } from 'reactstrap';
import {PrivateRoute} from './PrivateRoute';
import LoginForm from './pages/login.page';
import HomePage from './pages/home.page';
import RegisterPage from './pages/register.page';
import OrderPage from './pages/order.page';
import CookerPage from './pages/cooker.page';
import Layout from './pages/layout.page';
import CategoryPage from './pages/category.page';

class App extends Component {
  constructor(props, context) {
    super(props, context);    
  }
  render() {
    return (      
      <Provider store={store}>
        <Router history={this.props.history}>
          <Layout>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/order" component={OrderPage} />
              <PrivateRoute exact path="/cooker" component={CookerPage} />
              <PrivateRoute path="/category/:name?" component={CategoryPage} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterPage} />
              {/* <Route path='/table/:id' component={TableItem}/>  */}
          </Layout>
        </Router>
      </Provider>
    )
  }
  componentWillMount(){   
    console.log(window.location);   
  }
}
export default App
