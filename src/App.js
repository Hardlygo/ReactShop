import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CacheRoute, CacheSwitch } from 'react-router-cache-route'
import store from 'SRC/store'
import Pages from 'SRC/pages/Pages.jsx'
import Login from 'SRC/pages/login/Login'
import Search from 'SRC/pages/search/Search.jsx'
import Storage from 'SRC/utils/storage'
import { USER_KEY } from 'SRC/utils/keys'
import { saveInfo } from 'SRC/store/user/action'
import 'antd-mobile/dist/antd-mobile.css'
import 'PUBLIC/css/normalize.css'
import 'SRC/App.css'

class App extends Component {

  state = {
    basename: process.env.REACT_APP_BASENAME
  };

  componentWillMount() {
    //读取本地存储是否有用户信息
    const userInfo = Storage.getStorage(USER_KEY)
    if (userInfo) {
      store.dispatch(saveInfo(userInfo))
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={this.state.basename}>
          <div className="App">
            <CacheSwitch>
              <CacheRoute path='/' exact component={Pages}></CacheRoute>
              <CacheRoute path='/search' exact component={Search}></CacheRoute>
            </CacheSwitch>
            <Switch>
              <Route path='/login' exact component={Login}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
