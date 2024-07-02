import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import AppRoute from './router/AppRoute';
import routes from './router/routes';
import Navigation from './components/Navigation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation/>
        <Routes>
        {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <AppRoute
                                path={route.path}
                                component={route.component}
                                routeType={route.routeType}
                            />
                        }
                    />
                ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
