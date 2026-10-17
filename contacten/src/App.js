import './App.css';
import api from "./api";
import { useState, useEffect } from 'react';
import { ContactList } from './components/ContactList/ContactList';
import { ContactToolbar } from './components/ContactToolbar/ContactToolbar';

function App() {
  
    const [contacts, setContacts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('last_name');
    const [direction, setDirection] = useState('asc');
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    
    const [debounceSearch, setDebounceSearch] = useState('');
    const [favoriteError, setFavoriteError] = useState({});
    
    const resetPage = () => {
        setCurrentPage(1);
    }
    
    const loadContacts = (params) => {
        setLoading(true);
        
        api
            .get("/contacts", { params })
            .then((response) => {
                setContacts(response.data.data);
                setTotal(response.data.meta.total)
                setCurrentPage(response.data.meta.current_page);
                setLastPage(response.data.meta.last_page);
                setPerPage(response.data.meta.per_page);
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
        loadContacts({
            ...(debounceSearch ? { search: debounceSearch } : {}),
            sort,
            direction,
            page: currentPage,
            per_page: perPage,
            ...(onlyFavorites ? {is_favorite: 1 } : {})
        });
    }, [debounceSearch, sort, direction, currentPage, perPage, onlyFavorites]);
    
    
    // search
    const handleSearch = (value) => {
        setSearch(value);
    };
    
    // search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(search);
        }, 300);
        
        return (() => clearTimeout(timer));
    }, [search]);
    
    
    // is_favorite filter
    const handleFavoriteChanges = (checked) => {
        setOnlyFavorites(checked);
        setCurrentPage(1);
    };
    
    const handleToggleFacorite = (id) => {
        const contact = contacts.find((contact) => contact.id === id);

        if (!contact) return;
        
        const newFavoriteStatus = !contact.is_favorite;
        
        setFavoriteError((previous) => ({
            ...previous,
            [id]: "",
        }));
        
        api
            .patch(`/contacts/${id}/favorite`, {
                is_favorite: newFavoriteStatus,
            })
            .then(() => {
                if (!newFavoriteStatus && onlyFavorites) {
                    setContacts(previousContacts => previousContacts.filter(contact => contact.id !== id));
                    
                    setTotal(previousTotal => previousTotal - 1);
                    
                    if (contacts.length === 1 && currentPage > 1) {
                        setCurrentPage(page => page - 1)
                    }
                } else {
                    setContacts((previousContacts) =>
                        previousContacts.map((item) =>
                            item.id === id
                                ? { ...item, is_favorite: newFavoriteStatus }
                                : item,
                        ),
                    );
                }
          })
          .catch(() =>
            setFavoriteError((previous) => ({
              ...previous,
              [id]: "Het bijwerken van de favorietenstatus is mislukt. Probeer het opnieuw.",
            })),
          );
    }
  
    return (
        <div className="App">
            <ContactToolbar
                search={search}
                onSearch={handleSearch}
                sort={sort}
                onSortChange={setSort}
                direction={direction}
                onDirectionChange={setDirection}
                perPage={perPage}
                onPerPageChange={value => {
                    setPerPage(Number(value));
                    setCurrentPage(1);
                }}
                onlyFavorites={onlyFavorites}
                onFavoriteChange={handleFavoriteChanges}
                resetPage={resetPage}
            />
            
            {loading ? (<p>Loading...</p>)
                : error ? (<p>{error}</p>)
                : contacts.length === 0 ? (debounceSearch ?
                    (<p>Geen contacten gevonden voor {debounceSearch}.</p>) : (<p>Geen contacten.</p>))
                : (<ContactList
                    contacts={contacts}   
                    favoriteError={favoriteError}
                    onToggleFavorite={handleToggleFacorite}        
                />
            )}
            
            <div>
                <button type='button' disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>Vorige</button>
                <p>Pagina {currentPage} van {lastPage} · {total} contacten</p>
                <button type='button' disabled={currentPage >= lastPage} onClick={() => setCurrentPage(currentPage + 1)}>Volgende</button>
            </div>
      </div>
    );
}

export default App;
