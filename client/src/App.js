import React, {Component} from 'react';
import './App.css';
import {Route,BrowserRouter,Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './stylesheet/main.scss';
// import Layout from './components/layouts/Layout';
// import AllTable from './components/layouts/AllTable';
// import OrderTable from './components/layouts/OrderTable';
// import WaitingTable from './components/layouts/WaitingTable';
// import BillingTable from './components/layouts/BillingTable';
// import AddTable from './components/containers/AddTable';

// import Authentication from './components/containers/Authentication';

// class App extends Component {
//   render() {
//     return (      
//       <Provider store={store}>
//         <BrowserRouter>
//           <Layout>
//               <Route exact path="/" component={AllTable} />
//               <Route path="/order" component={OrderTable} />
//               <Route path="/waiting" component={WaitingTable} />
//               <Route path="/billing" component={BillingTable} />
//               <Route path="/log" component={Authentication} />

//               {/* <Route path='/table/:id' component={TableItem}/>  */}
//               <Route path='/addTable' component={AddTable}/>
//           </Layout>
//         </BrowserRouter>
//       </Provider>
//     )
//   }
// }
import { Container } from 'reactstrap';
import {PrivateRoute} from './PrivateRoute';
import LoginForm from './pages/login.page';
import HomePage from './pages/home.page';
import RegisterPage from './pages/register.page';
import CookerPage from './pages/cooker.page';
class App extends Component {
  constructor(props, context) {
    super(props, context);    
  }
  render() {
    return (      
      <Provider store={store}>
        <Router history={this.props.history}>
          <Container fluid>
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute exact path="/cooker" component={CookerPage} />
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterPage} />
          </Container>
        </Router>
      </Provider>
    )
  }
  componentWillMount(){   
    console.log(window.location);   
  }
}
export default App
