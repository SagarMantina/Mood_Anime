import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MoodPage from './pages/MoodPage';
import ResultPage from './pages/ResultPage';


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/mood' element={<MoodPage />} />
        <Route path='/mood/:mood' element = {<ResultPage/>} />
      </Routes>
   
  );
}

export default App;
