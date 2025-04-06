import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Calendar = ({ onDateClick, dateDetails }) => {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const currentYear = parseInt(year, 10);
  const currentMonth = parseInt(month, 10);
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      navigate(`/calendar/${currentYear - 1}/12`); // Previous year if January
    } else {
      navigate(`/calendar/${currentYear}/${currentMonth - 1}`);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      navigate(`/calendar/${currentYear + 1}/1`); // Next year if December
    } else {
      navigate(`/calendar/${currentYear}/${currentMonth + 1}`);
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigates back to the MonthYearSelector page
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Shift Details", "Assigned Tasks", "Machinery", "Message"];
    const tableRows = [];

    dates.forEach(date => {
      const dateKey = `${currentYear}-${currentMonth}-${date}`;
      const details = dateDetails[dateKey] || { shiftDetails: '', assignedTasks: '', machinery: '', message: '' };
      tableRows.push([
        `${currentYear}-${currentMonth}-${date}`,
        details.shiftDetails,
        details.assignedTasks,
        details.machinery,
        details.message
      ]);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text(`Work Shift Details for ${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`, 14, 15);
    doc.save(`Work_Shift_Details_${currentYear}_${currentMonth}.pdf`);
  };

  return (
    <div style={styles.container}>
      <button style={styles.navButton} onClick={handlePreviousMonth}>Previous Month</button>
      <button style={styles.navButton} onClick={handleNextMonth}>Next Month</button>
      <button style={styles.backButton} onClick={handleBack}>Back</button>
      <button style={styles.pdfButton} onClick={downloadPDF}>Download PDF</button>
      <h2>{new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
      <div style={styles.calendar}>
        {dates.map(date => (
          <div
            key={date}
            style={styles.date}
            onClick={() => onDateClick(`${currentYear}-${currentMonth}-${date}`)}
          >
            <div style={styles.dateNumber}>{date}</div>
            {dateDetails[`${currentYear}-${currentMonth}-${date}`] && (
              <div style={styles.detailsSummary}>
                <p><strong>Shift:</strong> {dateDetails[`${currentYear}-${currentMonth}-${date}`].shiftDetails}</p>
                <p><strong>Tasks:</strong> {dateDetails[`${currentYear}-${currentMonth}-${date}`].assignedTasks}</p>
                <p><strong>Machinery:</strong> {dateDetails[`${currentYear}-${currentMonth}-${date}`].machinery}</p>
                <p><strong>Message:</strong> {dateDetails[`${currentYear}-${currentMonth}-${date}`].message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '10px',
    margin: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
  },
  date: {
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  dateNumber: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  detailsSummary: {
    marginTop: '10px',
    fontSize: '14px',
    textAlign: 'left',
    color: '#555',
  },
  navButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  backButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  pdfButton: {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Calendar;
