import {ContactItem} from "../ContactItem/ContactItem"

export const ContactList = ({ contacts, onToggleFavorite, favoriteError }) => {
    return (
        <ul>
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