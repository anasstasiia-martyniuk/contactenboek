import "./ContactForm.css"
import { useEffect, useState } from "react";
import { validateContact } from "../../utils/validateContact";
import api from "../../api";

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
            [name]: ''
        }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
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
                    setErrors(() => ({
                        general: error.response.data.errors
                    }));
                } else {
                    setErrors(() => ({
                        general: ["Er is een fout opgetreden. Probeer het opnieuw."],
                }));
              }
          })
          .finally(() => {
              setIsSubmitting(false);
          });
    }
    
    return (
        <form className="contactForm" onSubmit={handleSubmit}>
            <div className='formName'>
                <div className="formField">
                    <label htmlFor="firstName">Voornaam: </label>
                    <input id="firstName" type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                    {errors && (<p className="validationMessage">{ errors.first_name?.[0] }</p>)}
                </div>
                
                <div className="formField">
                    <label htmlFor="lastName">Achternaam: </label>
                    <input id="lastName" type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                    {errors && (<p className="validationMessage">{ errors.last_name?.[0] }</p>)}
                </div>
            </div>  
            
            <div className="formField">
                <label htmlFor="email">E-mailadres: </label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors && (<p className="validationMessage">{ errors.email?.[0] }</p>)}
            </div>
            
            <div className="formField">
                <label htmlFor="phone">Telefoonnummer: </label>
                <input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} />
                {errors && (<p className="validationMessage">{ errors.phone?.[0] }</p>)}
            </div>
            
            <div className="formField">
                <label htmlFor="company">Bedrijf: </label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} />
                {errors && (<p className="validationMessage">{ errors.company?.[0] }</p>)}
            </div>
            
            <div className="formField">
                <label htmlFor="notes">Notities: </label>
                <textarea id="notes" placeholder="" name="notes" value={formData.notes} onChange={handleChange} />
                {errors && (<p className="validationMessage">{ errors.notes?.[0] }</p>)}
            </div>
            
            {errors && (<p>{ errors.general?.[0] }</p>)}
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Bezig met opslaan..." : "Opslaan"}
            </button>
        </form>
    )
};