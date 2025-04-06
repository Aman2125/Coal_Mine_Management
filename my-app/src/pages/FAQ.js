import React, { useState } from 'react';
import './FAQ.css'; // Ensure you have corresponding styles for this component

const FAQ = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions (FAQ)</h1>
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      </button>

      <div className="faq-section">
        <h2>General Questions About Coal Mining</h2>
        {language === 'en' ? (
          <>
            <div className="faq-item">
              <h3>1. What safety measures should I follow while working in a mine?</h3>
              <p>Workers should always wear personal protective equipment (PPE), follow safety protocols, attend training sessions, and report any hazards immediately.</p>
            </div>
            <div className="faq-item">
              <h3>2. What should I do if I encounter an emergency in the mine?</h3>
              <p>Immediately alert your supervisor and follow the emergency evacuation plan. Use emergency exits and follow the instructions provided during safety drills.</p>
            </div>
            <div className="faq-item">
              <h3>3. How can I report unsafe working conditions?</h3>
              <p>Report unsafe conditions to your supervisor or safety officer. You can also use the mine's hazard reporting system to document and address the issues.</p>
            </div>
          </>
        ) : (
          <>
            <div className="faq-item">
              <h3>1. खदान में काम करते समय मुझे कौन-कौन से सुरक्षा उपाय अपनाने चाहिए?</h3>
              <p>कर्मचारियों को हमेशा व्यक्तिगत सुरक्षा उपकरण (PPE) पहनने चाहिए, सुरक्षा प्रोटोकॉल का पालन करना चाहिए, प्रशिक्षण सत्रों में भाग लेना चाहिए, और किसी भी खतरे की रिपोर्ट तुरंत करनी चाहिए।</p>
            </div>
            <div className="faq-item">
              <h3>2. अगर मुझे खदान में आपातकाल का सामना करना पड़े तो क्या करना चाहिए?</h3>
              <p>तुरंत अपने पर्यवेक्षक को सूचित करें और आपातकालीन निकासी योजना का पालन करें। आपातकालीन निकास का उपयोग करें और सुरक्षा अभ्यास के दौरान प्रदान किए गए निर्देशों का पालन करें।</p>
            </div>
            <div className="faq-item">
              <h3>3. अगर मैं खदान में असुरक्षित कार्य स्थितियों का सामना करूं तो मैं क्या करूं?</h3>
              <p>असुरक्षित स्थितियों की रिपोर्ट अपने पर्यवेक्षक या सुरक्षा अधिकारी को दें। आप खदान के खतरा रिपोर्टिंग सिस्टम का भी उपयोग कर सकते हैं ताकि समस्याओं को दस्तावेजित और समाधान किया जा सके।</p>
            </div>
          </>
        )}
      </div>

      <div className="faq-section">
        <h2>DGMS Guidelines and Compliance</h2>
        {language === 'en' ? (
          <>
            <div className="faq-item">
              <h3>4. What are the key safety measures recommended by DGMS for underground mining?</h3>
              <p>DGMS recommends proper ventilation, regular inspections, maintenance of mining equipment, and ensuring that workers are trained and familiar with safety procedures.</p>
            </div>
            <div className="faq-item">
              <h3>5. How can I ensure that I am following DGMS safety guidelines?</h3>
              <p>Regularly review DGMS guidelines, attend safety training, use recommended safety equipment, and participate in safety audits to ensure compliance with the guidelines.</p>
            </div>
            <div className="faq-item">
              <h3>6. What should be done if DGMS guidelines are not being followed?</h3>
              <p>Report non-compliance to the mine's safety officer or DGMS authorities. Immediate corrective actions should be taken to address the issues and ensure compliance.</p>
            </div>
          </>
        ) : (
          <>
            <div className="faq-item">
              <h3>4. अंडरग्राउंड माइनिंग के लिए DGMS द्वारा सिफारिश की गई प्रमुख सुरक्षा उपाय क्या हैं?</h3>
              <p>DGMS उचित वेंटिलेशन, नियमित निरीक्षण, खनन उपकरण की मरम्मत, और सुनिश्चित करना कि श्रमिक सुरक्षा प्रक्रियाओं से परिचित और प्रशिक्षित हैं, की सिफारिश करता है।</p>
            </div>
            <div className="faq-item">
              <h3>5. मैं कैसे सुनिश्चित कर सकता हूँ कि मैं DGMS सुरक्षा दिशानिर्देशों का पालन कर रहा हूँ?</h3>
              <p>नियमित रूप से DGMS दिशानिर्देशों की समीक्षा करें, सुरक्षा प्रशिक्षण में भाग लें, अनुशंसित सुरक्षा उपकरण का उपयोग करें, और दिशानिर्देशों के अनुपालन को सुनिश्चित करने के लिए सुरक्षा ऑडिट में भाग लें।</p>
            </div>
            <div className="faq-item">
              <h3>6. यदि DGMS दिशानिर्देशों का पालन नहीं किया जा रहा है तो क्या करना चाहिए?</h3>
              <p>अनुपालन की कमी की रिपोर्ट खदान के सुरक्षा अधिकारी या DGMS अधिकारियों को दें। मुद्दों को हल करने और अनुपालन सुनिश्चित करने के लिए तत्काल सुधारात्मक कार्रवाई की जानी चाहिए।</p>
            </div>
          </>
        )}
      </div>

      <div className="faq-section">
        <h2>Technical and Operational Issues</h2>
        {language === 'en' ? (
          <>
            <div className="faq-item">
              <h3>7. What training is available for new mine workers?</h3>
              <p>New mine workers receive training on safety procedures, emergency response, equipment handling, and health precautions. This training is essential for ensuring worker safety and compliance with regulations.</p>
            </div>
            <div className="faq-item">
              <h3>8. What should I do if I experience health issues due to mining activities?</h3>
              <p>Report any health issues to your supervisor or the mine's medical facility. Ensure you receive appropriate medical attention and follow any prescribed treatments or preventive measures.</p>
            </div>
            <div className="faq-item">
              <h3>9. How can technology improve safety in mining operations?</h3>
              <p>Technology can improve safety through real-time monitoring systems, automated equipment, and advanced communication tools. These technologies help in detecting potential hazards and improving operational efficiency.</p>
            </div>
          </>
        ) : (
          <>
            <div className="faq-item">
              <h3>7. नए खदान श्रमिकों के लिए कौन-कौन से प्रशिक्षण उपलब्ध हैं?</h3>
              <p>नए खदान श्रमिकों को सुरक्षा प्रक्रियाओं, आपातकालीन प्रतिक्रिया, उपकरण संचालन, और स्वास्थ्य सावधानियों पर प्रशिक्षण प्राप्त होता है। यह प्रशिक्षण श्रमिकों की सुरक्षा और नियमों का अनुपालन सुनिश्चित करने के लिए आवश्यक है।</p>
            </div>
            <div className="faq-item">
              <h3>8. अगर मैं खनन गतिविधियों के कारण स्वास्थ्य समस्याओं का अनुभव करता हूँ तो मुझे क्या करना चाहिए?</h3>
              <p>किसी भी स्वास्थ्य समस्याओं की रिपोर्ट अपने पर्यवेक्षक या खदान की चिकित्सा सुविधा को दें। सुनिश्चित करें कि आपको उचित चिकित्सा देखभाल मिले और किसी भी निर्धारित उपचार या निवारक उपायों का पालन करें।</p>
            </div>
            <div className="faq-item">
              <h3>9. खनन ऑपरेशनों में सुरक्षा में सुधार के लिए तकनीक कैसे सहायक हो सकती है?</h3>
              <p>तकनीक सुरक्षा में सुधार कर सकती है जैसे कि वास्तविक समय में निगरानी सिस्टम, स्वचालित उपकरण, और उन्नत संचार उपकरण। ये तकनीकें संभावित खतरों का पता लगाने और ऑपरेशनल दक्षता को सुधारने में सहायक होती हैं।</p>
            </div>
          </>
        )}
      </div>

      <div className="faq-section">
        <h2>Future of Coal Mining in India</h2>
        {language === 'en' ? (
          <>
            <div className="faq-item">
              <h3>10. What advancements are being made in coal mining technology?</h3>
              <p>Advancements include automation, improved safety equipment, and the use of data analytics for predictive maintenance. These innovations aim to increase efficiency and reduce the environmental impact of mining.</p>
            </div>
            <div className="faq-item">
              <h3>11. How is the coal industry addressing climate change?</h3>
              <p>The coal industry is working to address climate change by investing in cleaner technologies, improving energy efficiency, and exploring carbon capture and storage solutions.</p>
            </div>
            <div className="faq-item">
              <h3>12. What are the prospects for renewable energy in the coal sector?</h3>
              <p>Renewable energy sources are being integrated into the coal sector to reduce dependence on fossil fuels. There is a growing focus on hybrid systems that combine coal with renewable energy to create more sustainable energy solutions.</p>
            </div>
          </>
        ) : (
          <>
            <div className="faq-item">
              <h3>10. खनन तकनीक में कौन-कौन सी प्रगति की जा रही है?</h3>
              <p>प्रगति में स्वचालन, सुधारित सुरक्षा उपकरण, और भविष्यवाणी रखरखाव के लिए डेटा एनालिटिक्स का उपयोग शामिल है। ये नवाचार दक्षता बढ़ाने और खनन के पर्यावरणीय प्रभाव को कम करने का लक्ष्य रखते हैं।</p>
            </div>
            <div className="faq-item">
              <h3>11. कोयला उद्योग जलवायु परिवर्तन को कैसे संबोधित कर रहा है?</h3>
              <p>कोयला उद्योग जलवायु परिवर्तन को संबोधित करने के लिए स्वच्छ तकनीकों में निवेश कर रहा है, ऊर्जा दक्षता में सुधार कर रहा है, और कार्बन कैप्चर और स्टोरेज समाधानों का पता लगा रहा है।</p>
            </div>
            <div className="faq-item">
              <h3>12. कोयला क्षेत्र में नवीकरणीय ऊर्जा के क्या अवसर हैं?</h3>
              <p>नवीकरणीय ऊर्जा स्रोतों को कोयला क्षेत्र में एकीकृत किया जा रहा है ताकि जीवाश्म ईंधन पर निर्भरता को कम किया जा सके। अधिक सतत ऊर्जा समाधान बनाने के लिए कोयला और नवीकरणीय ऊर्जा को मिलाकर हाइब्रिड सिस्टम पर बढ़ता ध्यान है।</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FAQ;