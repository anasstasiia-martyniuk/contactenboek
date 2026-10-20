import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ContactsPage } from "./pages/ContactsPage/ContactsPage";
import { ContactPage } from './pages/ContactPage/ContactPage';

function App() {
    return (
        <div className="App container-fluid px-0 py-4">
            <Routes>
                <Route path="/" element={<ContactsPage />} />
                <Route path='/contacts/:id' element={ <ContactPage /> } />
            </Routes>
        </div>
    );
}

export default App;
