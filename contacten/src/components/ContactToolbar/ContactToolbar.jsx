export const ContactToolbar = ({ search, onSearch}) => {
    
    return (
        <div>
            <input
                type="text"
                placeholder="zoek contacten..."
                value={search}
                onChange={(event) => onSearch(event.target.value)} />
        </div>
    )
}