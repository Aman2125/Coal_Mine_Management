import React from 'react';
import { Link } from 'react-router-dom';

const GuidelinesPage = () => {
    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1>DGMS Guidelines for Inspectors and Mine Officials</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Card 1 */}
                <div style={cardStyle}>
                    <h2>Safety Inspections</h2>
                    <p>
                        Inspectors must conduct regular safety inspections to ensure compliance with safety regulations.
                        Learn more about the requirements and procedures.
                    </p>
                    <Link to="/guideline1" style={linkStyle}>Read More</Link>
                </div>

                {/* Card 2 */}
                <div style={cardStyle}>
                    <h2>Emergency Preparedness</h2>
                    <p>
                        Mine officials must develop and implement emergency preparedness plans. 
                        Discover the essential elements and guidelines.
                    </p>
                    <Link to="/guideline2" style={linkStyle}>Read More</Link>
                </div>

                {/* Card 3 */}
                <div style={cardStyle}>
                    <h2>Reporting and Documentation</h2>
                    <p>
                        Proper reporting and documentation are crucial for maintaining safety standards. 
                        Find out what is required and how to stay compliant.
                    </p>
                    <Link to="/guideline3" style={linkStyle}>Read More</Link>
                </div>
            </div>
        </div>
    );
};

// Card styling
const cardStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center'
};

// Link styling
const linkStyle = {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    borderRadius: '4px'
};

export default GuidelinesPage;
