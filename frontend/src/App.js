import { useState, useEffect } from 'react';
import './App.css';
import { Context, State } from './context/Context';
import NewsList from './pages/NewsList';
import LoadingScreen from './components/LoadingScreen';
import Login from './dialogs/Login';
import Cookies from 'js-cookie'
import * as api from './utils/apiService'
function App() {
  const [state, setState] = useState(State)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let token = Cookies.get('AuthToken')
    if (token) {
      setState({...state, is_loading:true})
      api.get('autologin?token=' + token).then(res => {
        setState({...state, is_loading:false})
        if (res['user']) { 
          Cookies.set('AuthToken', res['token'], { expires: 30 }) // expires 30 days
          if(!res['preference']){
            setState({ ...state, user: res['user'], preference:res['preference'] })
          }else{
            setState({ ...state, user: res['user'],  source: res['preference']['source'],  author: res['preference']['author'],  category: res['preference']['category'] })

          }
        }
        setLoaded(true)
      }).catch(e => {
        setState({...state, is_loading:false})
        console.error(e)
        setLoaded(true)
      })
    }else{
      setLoaded(true)
    }

  }, [])
  return (
    <Context.Provider value={{ state, setState }}>
      <div className="App">
        {state.is_loading ? <LoadingScreen /> : ''}
        {state.auth ? <Login /> : ''}
        {loaded ? <NewsList /> : ''}
      </div>
    </Context.Provider>
  );
}

export default App;
