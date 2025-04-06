import React from 'react';

const Guideline1Page = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Detailed Guidelines for Inspectors and Mine Officials</h1>
            </header>
            <section style={styles.section}>
                <h2>1. Overview</h2>
                <p>
                    The safety and efficiency of coal mining operations depend significantly on the roles and responsibilities of Inspectors and Mine Officials. This guideline provides a comprehensive overview of their functions, duties, and collaboration to ensure safe and productive mining operations.
                </p>
            </section>
            <section style={styles.section}>
                <h2>2. Inspectors</h2>
                <h3>2.1 Role and Appointment</h3>
                <p>
                    Inspectors are appointed by the Government under the Mines Act, 1952. They are responsible for overseeing the adherence to mining safety regulations and ensuring that mining operations comply with legal requirements. Inspectors are given the authority to conduct inspections, enforce safety standards, and take corrective actions as necessary.
                </p>
                <h3>2.2 Responsibilities</h3>
                <ul>
                    <li>Conduct regular and unscheduled inspections of mines to assess compliance with safety, health, and welfare provisions.</li>
                    <li>Examine the functioning and maintenance of mining machinery and equipment.</li>
                    <li>Investigate mining accidents, including their causes and the implementation of corrective measures to prevent recurrence.</li>
                    <li>Review and assess mining records and documentation to ensure regulatory compliance.</li>
                    <li>Provide technical guidance and recommendations for improving safety standards and practices.</li>
                </ul>
                <h3>2.3 Powers</h3>
                <ul>
                    <li>Enter and inspect any part of the mine, including mining sites, machinery, and worker facilities.</li>
                    <li>Take samples and photographs as necessary for investigations.</li>
                    <li>Issue orders and notices for compliance with safety regulations.</li>
                    <li>Recommend suspension of operations or closure of unsafe sections if immediate danger is identified.</li>
                </ul>
            </section>
            <section style={styles.section}>
                <h2>3. Mine Officials</h2>
                <h3>3.1 Roles and Responsibilities</h3>
                <p>
                    Mine Officials, including the Manager, Safety Officer, and Engineer, are appointed by the mine owner and are responsible for the day-to-day management and operational safety of the mine. Their primary role is to ensure that the mining operations are conducted safely and in accordance with statutory requirements.
                </p>
                <h3>3.2 Key Officials</h3>
                <ul>
                    <li><strong>Mine Manager</strong>: Oversees all mining operations, ensures compliance with safety regulations, and coordinates with other officials and authorities.</li>
                    <li><strong>Safety Officer</strong>: Focuses on implementing and monitoring safety procedures, conducting safety training, and addressing safety concerns.</li>
                    <li><strong>Mine Engineer</strong>: Manages the technical aspects of mining operations, including the maintenance of machinery and infrastructure.</li>
                </ul>
                <h3>3.3 Duties</h3>
                <ul>
                    <li>Implement safety policies and procedures in compliance with statutory regulations.</li>
                    <li>Conduct regular safety drills and training sessions for mine workers.</li>
                    <li>Monitor and maintain the safety of mining equipment and infrastructure.</li>
                    <li>Report unsafe conditions or incidents to the appropriate authorities, including the Inspectorate.</li>
                    <li>Maintain detailed records of safety inspections, training, and incidents.</li>
                </ul>
            </section>
            <section style={styles.section}>
                <h2>4. Regulatory Compliance</h2>
                <h3>4.1 Legal Framework</h3>
                <p>
                    Both Inspectors and Mine Officials must adhere to the legal framework established by the Mines Act, 1952, and other relevant regulations. This includes compliance with safety standards, health provisions, and welfare regulations. It is crucial to stay updated with any changes in legislation and incorporate them into mining practices.
                </p>
                <h3>4.2 Reporting Requirements</h3>
                <p>
                    Inspectors and Mine Officials are required to maintain accurate records and reports on various aspects of mining operations. This includes safety inspections, accident investigations, compliance audits, and worker training. Regular reporting ensures transparency and accountability in mining operations.
                </p>
            </section>
            <section style={styles.section}>
                <h2>5. Safety Protocols and Best Practices</h2>
                <h3>5.1 Safety Protocols</h3>
                <ul>
                    <li>Implement rigorous safety protocols for mining operations, including emergency response plans and evacuation procedures.</li>
                    <li>Ensure that all mining machinery and equipment are regularly maintained and inspected for safety compliance.</li>
                    <li>Provide personal protective equipment (PPE) to all workers and ensure its proper use.</li>
                </ul>
                <h3>5.2 Best Practices</h3>
                <ul>
                    <li>Foster a culture of safety within the workforce by encouraging open communication and reporting of safety concerns.</li>
                    <li>Regularly review and update safety procedures and training programs based on the latest industry standards and technological advancements.</li>
                    <li>Promote collaboration between Inspectors and Mine Officials to address safety issues and implement best practices effectively.</li>
                </ul>
            </section>
            <section style={styles.section}>
                <h2>6. Conclusion</h2>
                <p>
                    The effective collaboration between Inspectors and Mine Officials is essential for maintaining high safety standards and ensuring the well-being of workers in the mining industry. Adhering to these detailed guidelines will help in achieving a safer and more efficient mining operation, reducing risks, and promoting a culture of safety.
                </p>
            </section>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        lineHeight: 1.6,
    },
    header: {
        textAlign: 'center',
        backgroundColor: '#2F4F4F',
        color: 'white',
        padding: '10px 0',
    },
    section: {
        marginBottom: '20px',
    },
};

export default Guideline1Page;
