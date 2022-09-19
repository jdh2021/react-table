import './App.css';
import data from './mock-data.json';
import { useState, Fragment } from 'react';
import { nanoid } from 'nanoid'; // generates id for contact record
import EditableRow from './components/EditableRow';
import ReadOnlyRow from './components/ReadOnlyRow';

const App = () => {
  const [contacts, setContacts] = useState(data);
  // store form values in state as object, update value as user types
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })

  // easier to add new values to form
  const handleAddFormChange = (event) => {
    console.log('in handleAddFormChange');
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); // get name of input user has changed
    const fieldValue = event.target.value; // get value
    const newFormData = {...addFormData}; // make copy of existing form data so it can be changed w/o mutating state
    newFormData[fieldName] = fieldValue; // update newFormData object. fieldName is key. fieldValue is property.
    setAddFormData(newFormData);
  }

  // called when form is submitted
  const handleAddFormSubmit = (event) => {
    // prevents form from doing POST request when submitted
    event.preventDefault();
    // take data and create new object
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  }

  return (<div className="app-container">
    {/* wrap entire table in form tag to avoid tbody, form child issue */}
    <form>
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
            // can't have two children components, need to import fragment
            <Fragment>
              {/* would wrap editable row as form but <form> can't appear as child of <tbody */}
              <EditableRow />
              <ReadOnlyRow contact={contact} />
            </Fragment>
          )
        }
      </tbody>
    </table>
    </form>

    <h2>Add A Contact</h2>
    <form>
      <input type="text" name="fullName" required="required" placeholder="Enter a name..." onChange={handleAddFormChange}></input>
      <input type="text" name="address" required="required" placeholder="Enter an address..." onChange={handleAddFormChange}></input>
      <input type="text" name="phoneNumber" required="required" placeholder="Enter a phone number..." onChange={handleAddFormChange}></input>
      <input type="email" name="email" required="required" placeholder="Enter an email..." onChange={handleAddFormChange}></input>
    <button type="submit">Add</button>
    </form>
  </div>)
};

export default App;
