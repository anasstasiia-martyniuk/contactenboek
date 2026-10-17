export const ContactToolbar = ({ search, onSearch, sort, onSortChange, direction, onDirectionChange }) => {
    return (
        <div>
            
            <input
                type="text"
                placeholder="zoek contacten..."
                value={search}
                onChange={event => onSearch(event.target.value)} />
            
            <select onChange={event => onSortChange(event.target.value)} value={sort}>
                <option value="last_name">Achternaam</option>
                <option value="first_name">Voornaam</option>
                <option value="created_at">Datum toegevoegd</option>
            </select>
            
            <select onChange={event => onDirectionChange(event.target.value)} value={direction}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>
            
        </div>
    )
}