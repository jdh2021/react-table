import './App.css';
import data from './mock-data.json';
import { useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(data);

  return (<div className="app-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        { contacts.map((contact) =>
            <tr>
              <td>{contact.fullName}</td>
              <td>{contact.address}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.email}</td>
          </tr>)
        }
      </tbody>
    </table>
  </div>)
};

export default App;
