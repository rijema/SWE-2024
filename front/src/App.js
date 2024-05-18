import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Banner from './components/Banner';
import CreateClient from './pages/CreateClient';

function App() {
  return (
    <div>

      {/* deixando a página cadastrar cliente como padrão inicialmente */}
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateClient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
