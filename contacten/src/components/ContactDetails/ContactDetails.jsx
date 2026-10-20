import { useState } from "react";
import "./ContactDetails.css"
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "../ContactForm/ContactForm";

export const ContactDetails = ({
    id,
    first_name,
    last_name,
    email, phone,
    company, notes,
    onContactUpdate }) => {
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [deleting, setDeleting] = useState(false);
    
    const navigate = useNavigate();
    
    const handleDelete = () => {
        setDeleting(true);
        setDeleteError("");
        
        api
            .delete(`/contacts/${id}`)
            .then(() => {
                setShowDeleteModal(false);
                navigate("/");
            })
            .catch(() => {
                setDeleteError("Contact verwijderen mislukt. Probeer het opnieuw.");
            })
            .finally(() => {
                setDeleting(false);
            });
    };
    
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body p-3 p-md-4">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 mb-3">
                        
                        <h2 className="card-title fs-3 fw-bold mb-0 text-break"> {first_name} {last_name} </h2>
                        
                        <div className="d-flex gap-2 flex-shrink-0">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setShowEditModal(true)}>
                                Bewerken
                            </button>
                            
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => setShowDeleteModal(true)}>
                                Verwijderen
                            </button>
                        </div>
                    </div>
                    
                    <hr />

                    <div className="mb-3">
                        <h3 className="fs-6 fw-semibold text-secondary"> E-mailadres </h3>
                        <p className="mb-0 text-break">{email}</p>
                    </div>
                    
                    <div className="mb-3">
                        <h3 className="fs-6 fw-semibold text-secondary"> Telefoonnummer </h3>
                        <p className="mb-0 text-break"> {phone || "Geen telefoonnummer"} </p>
                    </div>
                    
                    <div className="mb-3">
                        <h3 className="fs-6 fw-semibold text-secondary"> Bedrijf </h3>
                        <p className="mb-0 text-break"> {company || "Geen bedrijf"} </p>
                    </div>
                    
                    <div>
                        <h3 className="fs-6 fw-semibold text-secondary"> Notities </h3>
                        <p className="mb-0 text-break notes-text"> {notes || "Geen notities"} </p>
                    </div>
                </div>
            </div>
            
            {showEditModal && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="editContactTitle">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    
                                    <h2 className="modal-title fs-5" id="editContactTitle"> Contact bewerken </h2>
                                    
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowEditModal(false)}/>
                                </div>
                                
                                <div className="modal-body">
                                    <ContactForm
                                        initialData={{
                                            id,
                                            first_name,
                                            last_name,
                                            email,
                                            phone: phone ?? "",
                                            company: company ?? "",
                                            notes: notes ?? ""
                                        }}
                                        onContactSubmit={() => {
                                            setShowEditModal(false);
                                            onContactUpdate();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={() => setShowEditModal(false)} />
                </>
            )}
            
            {showDeleteModal && (
                <>
                    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="deleteContactTitle">
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title fs-5" id="deleteContactTitle"> Contact verwijderen </h2>
                                </div>
                                
                                <div className="modal-body">
                                    <p className="mb-0 text-break">
                                        Weet je zeker dat je <strong> {first_name} {last_name} </strong> wilt verwijderen?
                                    </p>
                                </div>
                                
                                {deleteError && (
                                    <p className="text-danger small mb-3" role="alert"> {deleteError} </p>
                                )}
                                
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteModal(false)}>
                                        Nee
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >
                                        {deleting ? "Bezig met verwijderen..." : "Ja, verwijderen"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={() => setShowDeleteModal(false)} />
                </>
            )}
        </>
    )
};