import "./ContactList.css"
import { ContactItem } from "../ContactItem/ContactItem"

export const ContactList = ({ contacts, onToggleFavorite, favoriteError }) => {
    return (
        <ul className="contactList">
            {contacts.map((contact) =>
                <ContactItem
                    key={contact.id}
                    {...contact}
                    onToggleFavorite={onToggleFavorite}
                    favoriteError={favoriteError[contact.id]}
                />)}
        </ul>
    )
}