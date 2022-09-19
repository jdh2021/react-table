import './App.css';
import data from './mock-data.json';
import { useState, Fragment } from 'react';
import { nanoid } from 'nanoid'; // generates id for contact record
import EditableRow from './components/EditableRow';
import ReadOnlyRow from './components/ReadOnlyRow';

const App = () => {
  const [contacts, setContacts] = useState(data);

  // store form values in state as object, hold form data when adding a new contact
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  // hold form data when editing a given contact
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })

  // if edit contact id is null, user isn't editing a row. component rerenders b/c state changes
  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    console.log('in handleAddFormChange');
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); // get name of input user has changed
    const fieldValue = event.target.value; // get value
    const newFormData = {...addFormData}; // make copy of existing form data so it can be changed w/o mutating state
    newFormData[fieldName] = fieldValue; // update newFormData object. fieldName is key. fieldValue is property.
    setAddFormData(newFormData);
  }

  // store form data
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); // get name of input user has changed
    const fieldValue = event.target.value; // get value
    const newFormData = {...editFormData}; // make copy of existing form data so it can be changed w/o mutating state
    newFormData[fieldName] = fieldValue; // update newFormData object. fieldName is key. fieldValue is property.
    setEditFormData(newFormData);
  }

  // called when form is submitted
  const handleAddFormSubmit = (event) => {
    // prevents form from doing POST request when submitted
    event.preventDefault();
    // takes data and create new object
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


  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    }
    // copy existing contacts array
    const newContacts = [...contacts];
    // get index of row we're editing in contacts array
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    // replace contact object at index we're editing with editedContact 
    newContacts[index] = editedContact;
    // set new array in state with updated contact object
    setContacts(newContacts);
    // finished editing, hides editable row
    setEditContactId(null);
  }

  // accepts event and contact so we know id of contact being edited
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    // prepopulate row with contact data from that row when user clicks, take values from contact object, save to editFormData. 
    // has same properties as editFormData object
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    // pass this to editable row component
    setEditFormData(formValues);
  }

  return (<div className="app-container">
    {/* wrap entire table in form tag to avoid nesting tbody, form child issue */}
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { contacts.map((contact) =>
            <Fragment>
              {/* if id of current contact object matches id stored in state in editContactId, then render editable row. */} 
              { editContactId === contact.id ? 
                (<EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} />) : 
                (<ReadOnlyRow contact={contact} handleEditClick={handleEditClick} />
                ) 
              }
            </Fragment>
          )
        }
      </tbody>
    </table>
    </form>

    <h2>Add A Contact</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input type="text" name="fullName" required="required" placeholder="Enter a name..." onChange={handleAddFormChange}></input>
      <input type="text" name="address" required="required" placeholder="Enter an address..." onChange={handleAddFormChange}></input>
      <input type="text" name="phoneNumber" required="required" placeholder="Enter a phone number..." onChange={handleAddFormChange}></input>
      <input type="email" name="email" required="required" placeholder="Enter an email..." onChange={handleAddFormChange}></input>
    <button type="submit">Add</button>
    </form>
  </div>)
};

export default App;
