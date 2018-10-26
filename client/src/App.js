import React, {Component} from 'react';
import './App.css';
import {Route,BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './stylesheet/main.scss';
import Layout from './components/layouts/Layout';
import Home from './components/layouts/Home';
import AddTable from './components/containers/AddTable';
import TableItem from './components/containers/TableItem';


class App extends Component {
  render() {
    return (      
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
              <Route path="/" component={Home} />
              <Route path='/table/:id' component={TableItem}/> 
              <Route path='/addTable' component={AddTable}/>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
