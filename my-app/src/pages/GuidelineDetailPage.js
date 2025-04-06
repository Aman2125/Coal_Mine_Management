import React from 'react';
import { useParams } from 'react-router-dom';
import './GuidelineDetailPage.css';

const guidelineDetails = {
    1: { title: "Guideline 1", content: "Detailed information about Guideline 1..." },
    2: { title: "Guideline 2", content: "Detailed information about Guideline 2..." },
    3: { title: "Guideline 3", content: "Detailed information about Guideline 3..." },
    // Add more details as needed
};

const GuidelineDetailPage = () => {
    const { id } = useParams();
    const guideline = guidelineDetails[id];

    if (!guideline) {
        return <h2>Guideline not found</h2>;
    }

    return (
        <div className="guideline-detail-page">
            <h1>{guideline.title}</h1>
            <p>{guideline.content}</p>
        </div>
    );
};

export default GuidelineDetailPage;
