import React, {Component} from 'react';
import './App.css';
import {Route,BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './stylesheet/main.scss';
import Layout from './components/layouts/Layout';
import AllTable from './components/layouts/AllTable';
import OrderTable from './components/layouts/OrderTable';
import WaitingTable from './components/layouts/WaitingTable';
import BillingTable from './components/layouts/BillingTable';
import AddTable from './components/containers/AddTable';

import Authentication from './components/containers/Authentication';

class App extends Component {
  render() {
    return (      
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
              <Route exact path="/" component={AllTable} />
              <Route path="/order" component={OrderTable} />
              <Route path="/waiting" component={WaitingTable} />
              <Route path="/billing" component={BillingTable} />
              <Route path="/log" component={Authentication} />

              {/* <Route path='/table/:id' component={TableItem}/>  */}
              <Route path='/addTable' component={AddTable}/>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
