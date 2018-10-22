import React, {Component} from 'react';
import './App.css';
import {Route,BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Layout from './components/layouts/Layout';
import Home from './components/layouts/Home';


class App extends Component {
  render() {
    return (      
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
              <Route path="/" component={Home} />
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
