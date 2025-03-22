import '../styles.css';
import { Link, Route, Routes } from 'react-router-dom';
import { SignupForm } from '../modules/auth/components/form';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
