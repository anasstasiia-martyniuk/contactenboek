export const validateContact = ({first_name, last_name, email, phone, company, notes}) => {
    const errors = {};
    
    if (first_name.trim() === "") {
        errors.first_name = ["Voornaam is verplicht."]
    } else if (first_name.length > 100) {
        errors.first_name = ["De voornaam mag maximaal 100 tekens bevatten."]
    }
    
    if (last_name.trim() === "") {
        errors.last_name = ["Achternaam is verplicht."]
    } else if (last_name.length > 100) {
        errors.last_name = ["De achternaam mag maximaal 100 tekens bevatten."]
    }
    
    if (email.trim() === "") {
        errors.email = ["Email is verplicht."];
    } else if (email.length > 255) {
        errors.email = ["De e-mailadres mag maximaal 255 tekens bevatten."]
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = ["Vul een geldig e-mailadres in."];
    }
    
    if (phone) {
        if (!/^[0-9\s+-]+$/.test(phone)) {
            errors.phone = ["Het telefoonnummer mag alleen cijfers, spaties, een + en een - bevatten."];
        } else if (phone.length > 20) {
            errors.phone = ["Het telefoonnummer mag maximaal 20 tekens bevatten."]
        } 
    }
    
    if (company.length > 255) {
        errors.company = ["De bedrijfsnaam mag maximaal 255 tekens bevatten."]
    }
    
    if (notes.length > 2000) {
        errors.company = ["De notities mag maximaal 2000 tekens bevatten."];
    }
    
    return errors;
}