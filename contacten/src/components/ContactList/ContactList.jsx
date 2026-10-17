import {ContactItem} from "../ContactItem/ContactItem"

export const ContactList = ({ contacts, onToggleFavorite }) => {
    return (
        <ul>
            {contacts.map(({id, first_name, last_name, email, phone, company, is_favorite}) =>
                <ContactItem
                    key={id}
                    id={id}
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    phone={phone}
                    company={company}
                    is_favorite={is_favorite}
                    onToggleFavorite={onToggleFavorite}
                />)}
        </ul>
    )
}