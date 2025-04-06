import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewRegistrationPage.css'; // Ensure the CSS is correctly imported

function NewRegistrationPage() {
  const navigate = useNavigate(); // For navigation after successful registration

  const [formData, setFormData] = useState({
    financialYear: '2023-2024',
    state: '',
    coalMineName: '',
    typeOfMine: '',
    subsidiaryCompany: '',
    mineDistrict: '',
    mineCode: '',
    address: '',
    captiveMine: '',
    area: '',
    mineManager: '',
    mobile: '',
    landline: '',
    email: '',
    userId: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });

  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // List of states
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.captcha !== captcha) {
      setError('Captcha is incorrect');
      return;
    }

    try {
      const response = await fetch('http://localhost:9002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful!');
        setError('');
        setFormData({
          financialYear: '2023-2024',
          state: '',
          coalMineName: '',
          typeOfMine: '',
          subsidiaryCompany: '',
          mineDistrict: '',
          mineCode: '',
          address: '',
          captiveMine: '',
          area: '',
          mineManager: '',
          mobile: '',
          landline: '',
          email: '',
          userId: '',
          password: '',
          confirmPassword: '',
          captcha: ''
        });
        setCaptcha(generateCaptcha()); // Generate a new CAPTCHA after successful registration
        navigate('/login'); // Redirect to the login page
      } else {
        setError(data.message || 'Registration failed');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while registering');
      setSuccess('');
    }
  };

  return (
    <div className="registration-container">
      <h1>Coal Mines Registration</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Financial Year: </label>
          <input 
            type="text" 
            name="financialYear" 
            value={formData.financialYear} 
            onChange={handleChange} 
            readOnly
          />
        </div>
        
        <div>
          <label>State: </label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Name of the Coal Mine: </label>
          <input type="text" name="coalMineName" value={formData.coalMineName} onChange={handleChange} />
        </div>
        
        <div>
          <label>Type of Mine: </label>
          <select name="typeOfMine" value={formData.typeOfMine} onChange={handleChange}>
            <option value="">Select</option>
            {/* Add type of mine options here */}
          </select>
        </div>
        
        <div>
          <label>Name of the Coal India Subsidiary / Company: </label>
          <input type="text" name="subsidiaryCompany" value={formData.subsidiaryCompany} onChange={handleChange} />
        </div>
        
        <div>
          <label>Mine District: </label>
          <input type="text" name="mineDistrict" value={formData.mineDistrict} onChange={handleChange} />
        </div>
        
        <div>
          <label>Mine Code: </label>
          <input type="text" name="mineCode" value={formData.mineCode} onChange={handleChange} />
        </div>
        
        <div>
          <label>Address: </label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        
        <div>
          <label>Captive or Non-captive mine: </label>
          <select name="captiveMine" value={formData.captiveMine} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Captive">Captive</option>
            <option value="Non-Captive">Non-Captive</option>
          </select>
        </div>
        
        <div>
          <label>Total Area of the Mine (in hectare): </label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} />
        </div>
        
        <div>
          <label>Name of the Mine Manager: </label>
          <input type="text" name="mineManager" value={formData.mineManager} onChange={handleChange} />
        </div>
        
        <div>
          <label>Mobile: </label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
        
        <div>
          <label>Office landline number: </label>
          <input type="text" name="landline" value={formData.landline} onChange={handleChange} />
        </div>
        
        <div>
          <label>Official Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        
        <div>
          <label>User ID: </label>
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} />
        </div>
        
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        
        <div>
          <label>Confirm Password: </label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        
        <div>
          <label>Captcha: </label>
          <input 
            type="text" 
            name="captcha" 
            value={formData.captcha} 
            onChange={handleChange} 
          />
          <div className="captcha-display">{captcha}</div> {/* Display the generated CAPTCHA */}
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewRegistrationPage;
