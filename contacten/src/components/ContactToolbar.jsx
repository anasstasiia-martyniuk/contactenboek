export const ContactToolbar = ({
    search,
    onSearch,
    sort,
    onSortChange,
    direction,
    onDirectionChange,
    perPage,
    onPerPageChange,
    onlyFavorites,
    onFavoriteChange,
    resetPage
}) => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch gap-3 mb-4">

            <input
                type="search"
                className="form-control flex-grow-1"
                placeholder="Zoek contacten..."
                value={search}
                onChange={event => { onSearch(event.target.value); }}
            />

            <select
                className="form-select"
                onChange={event => {
                    onSortChange(event.target.value);
                    resetPage();
                }}
                value={sort}
            >
                <option value="last_name">Achternaam</option>
                <option value="first_name">Voornaam</option>
                <option value="created_at">Datum toegevoegd</option>
            </select>

            <select
                className="form-select"
                onChange={event => {
                    onDirectionChange(event.target.value);
                    resetPage();
                }}
                value={direction}
            >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

            <select
                className="form-select"
                onChange={event => onPerPageChange(Number(event.target.value))}
                value={perPage}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>

            <div className="form-check d-flex align-items-center gap-2 text-nowrap">
                <input
                    id="onlyFavorites"
                    type="checkbox"
                    className="form-check-input mt-0"
                    checked={onlyFavorites}
                    onChange={event => onFavoriteChange(event.target.checked)}
                />
                <label className="form-check-label" htmlFor="onlyFavorites">
                    Alleen favorieten
                </label>
            </div>

        </div>
    );
};