import React, { useState, useEffect, useContext } from "react";
import worklogHooks from "../hooks/worklogHooks";
import { MainContext } from "../Context/MainContext";

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    padding: '8px',
    border: '1px solid #ddd',
  },
  tr: {
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  }
};

const WorklogTable = () => {
  const [worklogs, setWorklogs] = useState([]);
  const { getWorkLogsByCompanyId } = worklogHooks();

  const { user } = useContext(MainContext);

  useEffect(() => {
    if (user.account && user.account.id) {
      const fetchWorklogs = async () => {
        const data = await getWorkLogsByCompanyId(user.account.id);
        setWorklogs(data);
      };

      fetchWorklogs();
    }
  }, [user]);

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {/* Table headers */}
          {['ID', 'Employee ID', 'Company ID', 'Work Area ID', 'Start Time', 'End Time', 'Hours Worked', 'Date Recorded', 'Work Type', 'Comment', 'Photo URL'].map(header => (
            <th style={styles.th} key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {worklogs.map((log, index) => (
          <tr key={log.id} style={index % 2 === 0 ? { backgroundColor: '#f2f2f2' } : null}>
            <td style={styles.td}>{log.id}</td>
            <td style={styles.td}>{log.worker_id}</td>
            <td style={styles.td}>{log.company_id}</td>
            <td style={styles.td}>{log.workArea_id}</td>
            <td style={styles.td}>{new Date(log.start_time).toLocaleString()}</td>
            <td style={styles.td}>{new Date(log.end_time).toLocaleString()}</td>
            <td style={styles.td}>{log.hours_worked}</td>
            <td style={styles.td}>{new Date(log.date_recorded).toLocaleDateString()}</td>
            <td style={styles.td}>{log.work_type}</td>
            <td style={styles.td}>{log.comment}</td>
            <td style={styles.td}>
              <a href={log.photo_url} target="_blank" rel="noopener noreferrer" style={styles.link}>View Photo</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorklogTable;
