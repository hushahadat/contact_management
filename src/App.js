import Dashboard from './component/Dashboard/Dashboard';
import ContactPage from './component/Contactpage/ContactPage';
import { Router,Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './App.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  
const client = new QueryClient()
  const navigate = useNavigate()
  return (
    <div >
      <QueryClientProvider client={client}>
      <Routes>
        <Route path ='/chart-map' element = {<Dashboard />}/>
        <Route path ='/' element = {<ContactPage />}/>
      </Routes>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
