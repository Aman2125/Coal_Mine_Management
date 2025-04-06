// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="home-page">
            <h1>Welcome to CoalMineManager</h1>
            <div className="block-container">
                <div
                    className="action-block"
                    onClick={() => handleNavigate('/track-complaints')}
                >
                    <h2>Track My Complaints</h2>
                    <p>Click here to view and track your submitted complaints.</p>
                </div>
                <div
                    className="action-block"
                    onClick={() => handleNavigate('/claim-report')}
                >
                    <h2>Submit a Claim/Report</h2>
                    <p>Click here to submit a new claim or report an issue.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;