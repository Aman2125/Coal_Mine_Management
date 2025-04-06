import React, { useState } from 'react';
import './DigitalDocuments.css';

const DigitalDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: 'report',
    description: '',
    file: null
  });

  const documentTypes = [
    { value: 'report', label: 'Safety Report' },
    { value: 'inspection', label: 'Inspection Record' },
    { value: 'maintenance', label: 'Maintenance Log' },
    { value: 'attendance', label: 'Attendance Record' },
    { value: 'incident', label: 'Incident Report' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewDocument(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDocument.title || !newDocument.file) {
      alert('Please fill in all required fields');
      return;
    }

    const newDoc = {
      ...newDocument,
      id: Date.now(),
      dateCreated: new Date().toISOString(),
      status: 'active'
    };

    setDocuments(prev => [newDoc, ...prev]);
    setNewDocument({
      title: '',
      type: 'report',
      description: '',
      file: null
    });
  };

  const handleArchive = (id) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, status: 'archived' } : doc
      )
    );
  };

  return (
    <div className="digital-docs-container">
      <header className="docs-header">
        <h1>Digital Document Management</h1>
        <p>Manage all your documents digitally to reduce paper waste</p>
      </header>

      <div className="docs-content">
        <section className="upload-section">
          <h2>Upload New Document</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="title">Document Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newDocument.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Document Type*</label>
              <select
                id="type"
                name="type"
                value={newDocument.type}
                onChange={handleInputChange}
                required
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newDocument.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">Upload File*</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Upload Document
            </button>
          </form>
        </section>

        <section className="documents-list">
          <h2>Document Library</h2>
          <div className="docs-grid">
            {documents.map(doc => (
              <div key={doc.id} className={`doc-card ${doc.status}`}>
                <div className="doc-icon">
                  📄
                </div>
                <div className="doc-info">
                  <h3>{doc.title}</h3>
                  <p className="doc-type">{documentTypes.find(t => t.value === doc.type)?.label}</p>
                  <p className="doc-date">Created: {new Date(doc.dateCreated).toLocaleDateString()}</p>
                  {doc.description && (
                    <p className="doc-description">{doc.description}</p>
                  )}
                </div>
                <div className="doc-actions">
                  <button className="view-btn">View</button>
                  {doc.status === 'active' && (
                    <button
                      className="archive-btn"
                      onClick={() => handleArchive(doc.id)}
                    >
                      Archive
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalDocuments;
