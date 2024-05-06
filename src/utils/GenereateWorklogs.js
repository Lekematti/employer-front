import axios from 'axios';
import faker from 'faker';

const API_URL = "http://localhost:3000/workLogs";
const token = "YourAuthToken"; // Replace with an actual auth token
// Assume these IDs exist in your database
const companyIds = [1]; // Add more as needed
const workerIds = [1, 2]; // Add more worker IDs
const workAreaIds = [1]; // Add more work area IDs
const workTypes = ['regular', 'overtime', 'project'];

const generateRandomTimeframe = () => {
  const start = faker.date.between('2023-01-01', '2023-12-31');
  const end = new Date(start.getTime() + faker.datatype.number({ min: 1 * 60 * 60 * 1000, max: 8 * 60 * 60 * 1000 })); // Adds between 1 to 8 hours
  const hoursWorked = new Date(end - start).toISOString().substr(11, 8); // HH:MM:SS format
  return { start, end, hoursWorked };
};

const generateWorklogs = async (numEntries = 50) => {
  for (let i = 0; i < numEntries; i++) {
    const { start, end, hoursWorked } = generateRandomTimeframe();
    
    const worklog = {
      worker_id: faker.random.arrayElement(workerIds),
      company_id: faker.random.arrayElement(companyIds),
      workArea_id: faker.random.arrayElement(workAreaIds),
      start_time: start,
      end_time: end,
      hours_worked: hoursWorked,
      date_recorded: start.toISOString().split('T')[0], // Just the date part
      work_type: faker.random.arrayElement(workTypes),
      comment: faker.lorem.sentence(),
    };

    try {
      await axios.post(API_URL, worklog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`Worklog ${i + 1} created:`, worklog);
    } catch (error) {
      console.error('Error creating worklog:', error.message);
      break; // Exit loop on error
    }
  }
};

generateWorklogs().then(() => console.log('Finished generating worklogs'));
