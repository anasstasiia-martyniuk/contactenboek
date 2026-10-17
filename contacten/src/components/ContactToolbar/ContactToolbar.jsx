export const ContactToolbar = ({ search, onSearch, sort, onSortChange, direction, onDirectionChange, perPage, onPerPageChange, resetPage }) => {
    return (
        <div>
            
            <input
                type="text"
                placeholder="zoek contacten..."
                value={search}
                onChange={event => { onSearch(event.target.value); resetPage(); }} />
            
            <select onChange={event => { onSortChange(event.target.value); resetPage(); }} value={sort}>
                <option value="last_name">Achternaam</option>
                <option value="first_name">Voornaam</option>
                <option value="created_at">Datum toegevoegd</option>
            </select>
            
            <select onChange={event => { onDirectionChange(event.target.value); resetPage() }} value={direction}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>
            
            <select onChange={event => onPerPageChange(event.target.value)} value={perPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            
        </div>
    )
}