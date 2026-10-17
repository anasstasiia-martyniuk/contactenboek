export const ContactItem = ({ id, first_name, last_name, email, phone, company, is_favorite, onToggleFavorite }) => {
    return (
        <li>
            <div>
                <p>{first_name} {last_name}</p>
                <p>{company ?? "Geen bedrijf"}</p>
                <p>{email}</p>
                <p>{phone ?? "Geen telefoonnumer"}</p>
            </div>
            <button
                type="button"
                onClick={() => onToggleFavorite(id)}
                className={is_favorite ? "favorite" : "nofavorite"}>★</button>
        </li>
    )
}