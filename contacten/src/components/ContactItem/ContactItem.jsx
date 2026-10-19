import "./ContactItem.css"

export const ContactItem = ({ id, first_name, last_name, email, phone, company, is_favorite, onToggleFavorite, favoriteError }) => {
    return (
        <li className="contactItem">
            <div>
                <p className="contactName">{first_name} {last_name}</p>
                <p>{company ?? "Geen bedrijf"}</p>
                <div className="emailPhoneBox">
                    <p>{email}</p>
                    <p>{phone ?? "Geen telefoonnumer"}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={() => onToggleFavorite(id)}
                className={is_favorite ? "favorite" : "nofavorite"}>
                ★
            </button>
            {favoriteError && <p>{favoriteError}</p>}
        </li>
    )
}