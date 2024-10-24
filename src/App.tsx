import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/shared/navbar';
import ReceptionsPage from './components/pages/receptions-page';
import ReceptionPage from './components/pages/reception-page';
import ReceptionSelectedPage from './components/pages/reception-selected-page';

export const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<ReceptionsPage />}
            />

            <Route
              path="/recipe/:id"
              element={<ReceptionPage />}
            />

            <Route
              path="/selected-recipes"
              element={<ReceptionSelectedPage />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};
