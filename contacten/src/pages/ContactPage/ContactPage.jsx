import { useParams } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";
import { ContactDetails } from "../../components/ContactDetails/ContactDetails";

export const ContactPage = () => {
    const { id } = useParams();

    const [contact, setContact] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadContact = () => {
        setLoading(true);
        setError("");

        api
            .get(`/contacts/${id}`)
            .then((res) => setContact(res.data.data))
            .catch(() => setError("Contact laden mislukt. Probeer het opnieuw."))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadContact();
    }, [id]);

    return (
        <div className="container py-4">
            {loading ? (
                <div className="d-flex flex-column align-items-center gap-2 mt-4">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                        aria-label="Contact laden"
                    >
                        <span className="visually-hidden">Laden...</span>
                    </div>
                    <p className="text-secondary mb-0">
                        Contact laden...
                    </p>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <ContactDetails
                    {...contact}
                    onContactUpdate={loadContact}
                />
            )}
        </div>
    );
};