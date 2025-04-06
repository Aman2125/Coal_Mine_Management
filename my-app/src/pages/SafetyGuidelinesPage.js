import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SafetyGuidelinesPage.css';

const SafetyGuidelinesPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [newContact, setNewContact] = useState({ name: '', number: '', position: '' });
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [isHindi, setIsHindi] = useState(false); // New state to manage language toggle

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, [name]: value } : contact
      )
    );
  };

  const toggleEdit = (id) => {
    setIsEditing(isEditing === id ? null : id);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const saveContact = () => {
    setIsEditing(null);
    console.log('Contacts saved:', contacts);
  };

  const addNewContact = () => {
    if (newContact.name && newContact.number && newContact.position) {
      setContacts((prevContacts) => [
        ...prevContacts,
        { id: Date.now(), ...newContact }
      ]);
      setNewContact({ name: '', number: '', position: '' });
      setShowNewContactForm(false); // Hide form after adding a contact
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const toggleLanguage = () => {
    setIsHindi(!isHindi); // Toggle between Hindi and English
  };

  return (
    <div className="safety-guidelines-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">{isHindi ? 'सुरक्षा प्रबंधन योजना' : 'Safety Management Plan'}</h1>
        <button onClick={toggleLanguage} className="language-toggle-button">
          {isHindi ? 'Switch to English' : 'Switch to Hindi'}
        </button>
      </header>

      {/* Back Button */}
      <button onClick={goBack} className="back-button">
        &larr; {isHindi ? 'वापस' : 'Back'}
      </button>

      {/* Dashboard Section */}
      <div className="dashboard-section">
        <h2 className="section-title">{isHindi ? 'डैशबोर्ड' : 'Dashboard'}</h2>
        <div className="dashboard-content">
          <div className="dashboard-item">
            <h3><Link to="/operational-metrics">{isHindi ? 'ऑपरेशनल मेट्रिक्स' : 'Operational Metrics'}</Link></h3>
            <p>{isHindi ? 'सुरक्षा मेट्रिक्स पर वास्तविक समय के आंकड़े, जिनमें घटनाएं और अनुपालन दर शामिल हैं।' : 'Real-time statistics on safety metrics, including incidents and compliance rates.'}</p>
          </div>
          <div className="dashboard-item">
            <h3><Link to="/safety-alerts">{isHindi ? 'सुरक्षा चेतावनियाँ' : 'Safety Alerts'}</Link></h3>
            <p>{isHindi ? 'वर्तमान सुरक्षा चेतावनियाँ और अलर्ट। किसी भी चल रहे मुद्दों या अपडेट के लिए यहां जांचें।' : 'Current safety alerts and warnings. Check here for any ongoing issues or updates.'}</p>
          </div>
          <div className="dashboard-item">
            <h3><Link to="/compliance-status">{isHindi ? 'अनुपालन स्थिति' : 'Compliance Status'}</Link></h3>
            <p>{isHindi ? 'विभिन्न सुरक्षा अनुपालन आवश्यकताओं और ऑडिट की स्थिति।' : 'Status of various safety compliance requirements and audits.'}</p>
          </div>
          <div className="dashboard-item">
            <h3><Link to="/dgms-guidelines">{isHindi ? 'DGMS दिशानिर्देश' : 'DGMS Guidelines'}</Link></h3>
            <p>{isHindi ? 'DGMS सुरक्षा दिशानिर्देश, आपातकालीन प्रक्रियाओं और अनुपालन आवश्यकताओं पर विवरण।' : 'Details on DGMS safety guidelines, emergency procedures, and compliance requirements.'}</p>
          </div>
        </div>
      </div>

      {/* DGMS Safety Management Plan Guidelines Section */}
      <div className="smp-guidelines-section">
        <h2 className="section-title">{isHindi ? 'DGMS सुरक्षा प्रबंधन योजना (SMP) दिशानिर्देश' : 'DGMS Safety Management Plan (SMP) Guidelines'}</h2>
        <div className="smp-content">
          <h3>{isHindi ? 'सारांश' : 'Overview'}</h3>
          <p>{isHindi ? 'सुरक्षा प्रबंधन योजना (SMP) खानों में सुरक्षा प्रबंधन के लिए एक संरचित दृष्टिकोण है। SMP दो भागों में होता है: सूत्रीकरण और कार्यान्वयन।' : 'The Safety Management Plan (SMP) is a structured approach to manage safety in mines. The SMP consists of two parts: Formulation and Implementation.'}</p>

          <h3>{isHindi ? 'SMP सूत्रीकरण के मुख्य बिंदु:' : 'Key Points on SMP Formulation:'}</h3>
          <ul>
            <li>{isHindi ? 'प्रमुख खतरों की पहचान करें और नियंत्रण योजनाओं को विकसित करें।' : 'Identify principal hazards and develop mitigating control plans.'}</li>
            <li>{isHindi ? 'विशिष्ट जिम्मेदारियां निर्दिष्ट करें जिनमें नाम और पदनाम स्पष्ट हों।' : 'Assign specific responsibilities with clear names and designations.'}</li>
            <li>{isHindi ? 'प्रक्रियाओं को निष्पादित करने के लिए यथार्थवादी समयसीमा निर्धारित करें, न केवल दिन बल्कि सटीक तिथियां भी।' : 'Set realistic timelines for executing procedures, not just days but exact dates.'}</li>
            <li>{isHindi ? 'सुनिश्चित करें कि SMP दस्तावेज़ को ठीक से क्रमांकित, अनुक्रमित, और नामित स्वामी द्वारा अनुमोदित किया गया है।' : 'Ensure the SMP document is properly numbered, indexed, and approved by the Nominated Owner.'}</li>
          </ul>

          <h3>{isHindi ? 'SMP कार्यान्वयन के मुख्य बिंदु:' : 'Key Points on SMP Implementation:'}</h3>
          <ul>
            <li>{isHindi ? 'केवल तभी कार्यान्वयन शुरू करें जब SMP को नामित स्वामी द्वारा लिखित रूप में अनुमोदित किया गया हो।' : 'Start implementation only after SMP is approved in writing by the Nominated Owner.'}</li>
            <li>{isHindi ? 'प्रत्येक प्रक्रिया के लिए एक \'वर्कप्लान\' बनाएं जिसमें क्रियाएं, जिम्मेदारियां, और समयसीमाएं शामिल हों।' : 'Create a \'Workplan\' for each procedure detailing actions, responsibilities, and timelines.'}</li>
            <li>{isHindi ? 'SMP के कार्यान्वयन और प्रभावशीलता को सत्यापित करने के लिए ऑडिट (आंतरिक और बाहरी दोनों) करें।' : 'Conduct audits (both internal and external) to verify the implementation and effectiveness of SMP.'}</li>
            <li>{isHindi ? 'बेहतर प्रबंधन और निरंतर सुधार के लिए SMP प्रक्रिया को डिजिटाइज़ करें।' : 'Digitize the SMP process for better management and continuous improvement.'}</li>
          </ul>

          <h3>{isHindi ? 'निष्कर्ष' : 'Conclusion'}</h3>
          <p>{isHindi ? 'SMP एक जीवित दस्तावेज़ होना चाहिए, जिसे नियमित रूप से अपडेट किया जाना चाहिए और यह सुनिश्चित करने के लिए ऑडिट किया जाना चाहिए कि सुरक्षा प्रोटोकॉल का प्रभावी ढंग से पालन किया जा रहा है। सभी हितधारकों को नियमित प्रशिक्षण और अपडेट प्रदान किए जाने चाहिए।' : 'The SMP should be a living document, updated regularly and audited to ensure safety protocols are followed effectively. Regular training and updates should be provided to all stakeholders.'}</p>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="emergency-contact-section">
        <h2 className="section-title">{isHindi ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</h2>
        <button onClick={() => setShowNewContactForm(true)} className="add-contact-button">
          {isHindi ? 'नया संपर्क जोड़ें' : 'Add New Contact'}
        </button>

        {/* Form to Add New Contact */}
        {showNewContactForm && (
          <div className="new-contact-form">
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="contact-input"
              placeholder={isHindi ? 'नाम' : 'Name'}
            />
            <input
              type="text"
              name="number"
              value={newContact.number}
              onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
              className="contact-input"
              placeholder={isHindi ? 'संपर्क संख्या' : 'Contact Number'}
            />
            <input
              type="text"
              name="position"
              value={newContact.position}
              onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
              className="contact-input"
              placeholder={isHindi ? 'पद' : 'Position'}
            />
            <button onClick={addNewContact} className="save-button">{isHindi ? 'संपर्क जोड़ें' : 'Add Contact'}</button>
          </div>
        )}

        <div className="contact-list">
          {contacts.length === 0 ? (
            <p>{isHindi ? 'कोई संपर्क उपलब्ध नहीं है। नया संपर्क जोड़ने के लिए "नया संपर्क जोड़ें" पर क्लिक करें।' : 'No contacts available. Click "Add New Contact" to add a contact.'}</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="contact-info">
                {isEditing === contact.id ? (
                  <div className="edit-contact">
                    <input
                      type="text"
                      name="name"
                      value={contact.name}
                      onChange={(event) => handleInputChange(contact.id, event)}
                      className="contact-input"
                      placeholder={isHindi ? 'नाम' : 'Name'}
                    />
                    <input
                      type="text"
                      name="number"
                      value={contact.number}
                      onChange={(event) => handleInputChange(contact.id, event)}
                      className="contact-input"
                      placeholder={isHindi ? 'संपर्क संख्या' : 'Contact Number'}
                    />
                    <input
                      type="text"
                      name="position"
                      value={contact.position}
                      onChange={(event) => handleInputChange(contact.id, event)}
                      className="contact-input"
                      placeholder={isHindi ? 'पद' : 'Position'}
                    />
                    <button onClick={saveContact} className="save-button">{isHindi ? 'सहेजें' : 'Save'}</button>
                  </div>
                ) : (
                  <div className="display-contact">
                    <p><strong>{isHindi ? 'नाम:' : 'Name:'}</strong> {contact.name}</p>
                    <p><strong>{isHindi ? 'संपर्क संख्या:' : 'Number:'}</strong> {contact.number}</p>
                    <p><strong>{isHindi ? 'पद:' : 'Position:'}</strong> {contact.position}</p>
                    <button onClick={() => toggleEdit(contact.id)} className="edit-button">{isHindi ? 'संपादित करें' : 'Edit'}</button>
                    <button onClick={() => deleteContact(contact.id)} className="delete-button">{isHindi ? 'हटाएं' : 'Delete'}</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 {isHindi ? 'आपकी कंपनी का नाम। सर्वाधिकार सुरक्षित।' : 'Your Company Name. All rights reserved.'}</p>
      </footer>
    </div>
  );
};

export default SafetyGuidelinesPage;