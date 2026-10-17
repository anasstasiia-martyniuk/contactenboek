import './App.css';
import api from "./api";
import { useState, useEffect } from 'react';
import { ContactList } from './components/ContactList/ContactList';
import { ContactToolbar } from './components/ContactToolbar/ContactToolbar';

function App() {
  
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [error, setError] = useState('');
    
    const loadContacts = (params) => {
        setLoading(true);
        
        api
            .get("/contacts", { params })
            .then((response) => {
                setContacts(response.data.data);
                setError('');
            })
            .catch(() => {
                setError("Er is een fout opgetreden bij het laden van contacten. Probeer het opnieuw.");
            })
            .finally(() => {
                setLoading(false);
            })
    };
    
    useEffect(() => {
        loadContacts(
            debounceSearch ? {search: debounceSearch} : {},
        );
    }, [debounceSearch]);
    
    
    // search
    const handleSearch = (value) => {
        setSearch(value);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 300);
        
        return (() => clearTimeout(timer));
    }, [search]);
    
    // is_favorite toggle
    const handleToggleFavorite = (id) => {
        setContacts((previousContacts) =>
            previousContacts.map((contact) =>
                contact.id === id
                    ? { ...contact, is_favorite: !contact.is_favorite }
                    : contact,
            ),
        );
    };
  
    return (
        <div className="App">
            <ContactToolbar search={search} onSearch={handleSearch}/>
            
            {loading ? (<p>Loading...</p>)
                : error ? (<p>{error}</p>)
                : contacts.length === 0 ? (debounceSearch ?
                    (<p>Geen contacten gevonden voor {debounceSearch}.</p>) : (<p>Geen contacten.</p>))
                : (<ContactList
                    contacts={contacts}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
      </div>
    );
}

export default App;
