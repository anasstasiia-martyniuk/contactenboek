import { Link } from "react-router-dom";

export const ContactItem = ({
    id,
    first_name,
    last_name,
    email,
    phone,
    company,
    is_favorite,
    onToggleFavorite,
    favoriteError,
    favoriteLoading
}) => {
    
    return (
        <li className="d-flex flex-column gap-2 border border-dark rounded-3 p-3 p-md-4 position-relative">
            
            <Link to={`/contacts/${id}`} className="text-decoration-none text-reset pe-4" >
                <div>
                    <p className="fs-5 fw-bold text-break mb-2"> {first_name} {last_name} </p>

                    <p className="mb-1 text-break"> {company ?? "Geen bedrijf"} </p>

                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-1">
                        <p className="mb-0 text-break">{email}</p>
                        <p className="mb-0 text-break"> {phone ?? "Geen telefoonnummer"} </p>
                    </div>
                </div>
            </Link>

            <button
                type="button"
                onClick={() => onToggleFavorite(id)}
                disabled={favoriteLoading}
                className={`btn btn-link position-absolute top-0 end-0 p-1 fs-4 lh-1 text-decoration-none 
                    ${ is_favorite ? "text-warning" : "text-secondary"}`}>
                ★
            </button>

            {favoriteError && (<p className="text-danger small mb-0">{favoriteError}</p>)}
        </li>
    );
};