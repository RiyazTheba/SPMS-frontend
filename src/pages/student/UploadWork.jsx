import React, { useState } from "react";
import {
    UploadCloud,
    FileText,
    CheckCircle2,
    X,
    AlertCircle,
    Send
} from "lucide-react";

function UploadWork() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [comment, setComment] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file) => {
        setErrorMessage("");
        if (!file) return;

        // Allowed types: PDF, ZIP, DOC, DOCX
        const allowedTypes = [
            "application/pdf",
            "application/zip",
            "application/x-zip-compressed",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|zip|doc|docx)$/i)) {
            setErrorMessage("Only PDF, ZIP, DOC, or DOCX files are allowed.");
            return;
        }

        // Max file size: 25MB
        if (file.size > 25 * 1024 * 1024) {
            setErrorMessage("File size must be less than 25MB.");
            return;
        }

        setSelectedFile(file);
        setUploadSuccess(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        validateAndSetFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setUploadSuccess(false);
        setErrorMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setErrorMessage("Please select a file to upload.");
            return;
        }

        setIsUploading(true);
        setErrorMessage("");

        // Simulate API upload process
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            // Here you can handle the actual API call to upload `selectedFile` and `comment`
        }, 1500);
    };

    return (
        <div className="container-fluid px-0 py-3">
            
            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                <div>
                    <h4 className="mb-1 fw-semibold text-dark fs-5 tracking-tight">Upload Project Work</h4>
                    <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                        Submit your weekly progress report, source code zip, or documentation for guide review.
                    </p>
                </div>
            </div>

            {/* Main Sharp Container Card */}
            <div className="card border-0 shadow-sm rounded-0 bg-white">
                <div className="card-body p-4 p-lg-5">
                    
                    {uploadSuccess ? (
                        <div className="text-center py-5">
                            <div className="mb-3 text-success">
                                <CheckCircle2 size={48} />
                            </div>
                            <h5 className="fw-semibold text-dark mb-2">Work Uploaded Successfully!</h5>
                            <p className="text-muted small mb-4">
                                Your file has been submitted to your faculty guide for review.
                            </p>
                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-0 px-4 py-2"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setUploadSuccess(false);
                                    setComment("");
                                }}
                                style={{ fontSize: "0.875rem" }}
                            >
                                Upload Another File
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            
                            {/* Error Alert */}
                            {errorMessage && (
                                <div className="alert alert-danger rounded-0 d-flex align-items-center gap-2 mb-4 py-2" role="alert" style={{ fontSize: "0.875rem" }}>
                                    <AlertCircle size={16} className="flex-shrink-0" />
                                    <div>{errorMessage}</div>
                                </div>
                            )}

                            {/* Drag and Drop Zone */}
                            <div className="mb-4">
                                <label className="form-label fw-medium text-dark small mb-2">
                                    Project File / Document <span className="text-danger">*</span>
                                </label>
                                
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border border-2 p-4 text-center rounded-0 position-relative transition-all ${
                                        isDragging ? "border-primary bg-light" : "border-dashed bg-light bg-opacity-25"
                                    }`}
                                    style={{ borderStyle: "dashed", cursor: "pointer" }}
                                >
                                    <input
                                        type="file"
                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                        style={{ cursor: "pointer" }}
                                        onChange={handleFileChange}
                                        accept=".pdf,.zip,.doc,.docx"
                                    />

                                    {!selectedFile ? (
                                        <div className="py-4">
                                            <div className="text-primary mb-2 opacity-75">
                                                <UploadCloud size={36} />
                                            </div>
                                            <p className="fw-medium text-dark mb-1" style={{ fontSize: "0.9rem" }}>
                                                Drag and drop your file here, or <span className="text-primary text-decoration-underline">browse</span>
                                            </p>
                                            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                                                Supported formats: PDF, ZIP, DOC, DOCX (Max size: 25MB)
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-between bg-white border p-3 rounded-0 text-start">
                                            <div className="d-flex align-items-center gap-3 overflow-hidden">
                                                <div className="text-primary flex-shrink-0">
                                                    <FileText size={24} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <div className="fw-medium text-dark text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        {selectedFile.name}
                                                    </div>
                                                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-link text-danger p-1 text-decoration-none flex-shrink-0"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile();
                                                }}
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Comments */}
                            <div className="mb-4">
                                <label htmlFor="workComment" className="form-label fw-medium text-dark small mb-2">
                                    Submission Note / Comments <span className="text-muted fw-normal">(Optional)</span>
                                </label>
                                <textarea
                                    id="workComment"
                                    className="form-control rounded-0 shadow-none border-light bg-light bg-opacity-50"
                                    rows="3"
                                    placeholder="Add a short message or summary of work done for your guide..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{ fontSize: "0.9rem", resize: "none" }}
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="d-flex justify-content-end">
                                <button
                                    type="submit"
                                    className="btn btn-secondary rounded-0 px-4 py-2 d-inline-flex align-items-center gap-2 fw-medium"
                                    disabled={isUploading}
                                    style={{ fontSize: "0.875rem" }}
                                >
                                    {isUploading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={15} /> Submit Work
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    )}

                </div>
            </div>

        </div>
    );
}

export default UploadWork;