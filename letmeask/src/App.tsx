import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NewRoom } from './pages/NewRoom/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room/Room';
import { AdminRoom } from './pages/AdminRoom/AdminRoom';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/room/:id" component={Room} />
          <Route path="/admin/room/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
