import { useEffect, useState } from "react";
import { validateContact } from "../utils/validateContact";
import api from "../api";

const emptyForm = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
}

export const ContactForm = ({initialData = null, onContactSubmit}) => {
    
    const [formData, setFormData] = useState({
        ...emptyForm,
        ...initialData
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        setFormData({
            ...emptyForm,
            ...initialData
        });
        setErrors({});
    }, [initialData]);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            general: undefined
        }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (isSubmitting) return;
        
        const validationErrors = validateContact(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        const request = initialData?.id
            ? api.put(`/contacts/${initialData.id}`, formData)
            : api.post('/contacts', formData);

        request
            .then(() => {
                onContactSubmit();
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors ?? {});
                } else {
                    setErrors(() => ({
                        general: ["Er is een fout opgetreden. Probeer het opnieuw."],
                    }));
                }
            })
            .finally(() => {                
                setIsSubmitting(false)
            });
    }
    
    return (
        <form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
            <div className="row g-3">
                
                <div className="col-12 col-md-6">
                    <div className="d-flex flex-column gap-2">
                        <label htmlFor="firstName" className="form-label mb-0">
                            Voornaam:
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            name="first_name"
                            className={`form-control ${errors.first_name?.[0] ? "is-invalid" : ""}`}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        
                        {errors.first_name?.[0] && (
                            <p className="text-danger small mb-0"> {errors.first_name[0]} </p>
                        )}
                    </div>
                </div>
                
                <div className="col-12 col-md-6">
                    <div className="d-flex flex-column gap-2">
                        <label htmlFor="lastName" className="form-label mb-0">
                            Achternaam:
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            name="last_name"
                            className={`form-control ${errors.last_name?.[0] ? "is-invalid" : ""}`}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        
                        {errors.last_name?.[0] && (
                            <p className="text-danger small mb-0"> {errors.last_name[0]}</p>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="d-flex flex-column gap-2">
                <label htmlFor="email" className="form-label mb-0">
                    E-mailadres:
                </label>
                
                <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-control ${errors.email?.[0] ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                />
                
                {errors.email?.[0] && (
                    <p className="text-danger small mb-0">{errors.email[0]}</p>
                )}
            </div>
            
            <div className="d-flex flex-column gap-2">
                <label htmlFor="phone" className="form-label mb-0">
                    Telefoonnummer:
                </label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    className={`form-control ${errors.phone?.[0] ? "is-invalid" : ""}`}
                    value={formData.phone}
                    onChange={handleChange}
                />
                
                {errors.phone?.[0] && (
                    <p className="text-danger small mb-0">{errors.phone[0]}</p>
                )}
            </div>
            
            <div className="d-flex flex-column gap-2">
                <label htmlFor="company" className="form-label mb-0">
                    Bedrijf:
                </label>
                <input
                    id="company"
                    type="text"
                    name="company"
                    className={`form-control ${errors.company?.[0] ? "is-invalid" : ""}`}
                    value={formData.company}
                    onChange={handleChange}
                />
                
                {errors.company?.[0] && (
                    <p className="text-danger small mb-0">{errors.company[0]}</p>
                )}
            </div>
            
            <div className="d-flex flex-column gap-2">
                <label htmlFor="notes" className="form-label mb-0">
                    Notities:
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    className={`form-control ${errors.notes?.[0] ? "is-invalid" : ""}`}
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                />
                
                {errors.notes?.[0] && (
                    <p className="text-danger small mb-0">{errors.notes[0]}</p>
                )}
            </div>
            
            {errors.general?.[0] && (
                <p className="text-danger mb-0">{errors.general[0]}</p>
            )}
            
            <button
                type="submit"
                className="btn btn-primary align-self-start mt-2 w-100"
                disabled={isSubmitting}>
                {isSubmitting ? "Bezig met opslaan..." : "Opslaan"}
            </button>
        </form>
    );
};