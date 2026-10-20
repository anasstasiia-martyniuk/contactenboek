import { ContactItem } from "./ContactItem";

export const ContactList = ({
    contacts,
    onToggleFavorite,
    favoriteError
}) => {
    return (
        <ul className="list-unstyled d-flex flex-column gap-3 mt-4">
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    {...contact}
                    onToggleFavorite={onToggleFavorite}
                    favoriteError={favoriteError[contact.id]}
                />
            ))}
        </ul>
    );
};