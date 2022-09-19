import './App.css';
import data from './mock-data.json';
import { useState, Fragment } from 'react';
import { nanoid } from 'nanoid'; // generates id for contact record
import EditableRow from './components/EditableRow';
import ReadOnlyRow from './components/ReadOnlyRow';

const App = () => {
  // array holding contact objects
  const [contacts, setContacts] = useState(data);

  // store values for new contact in form, in state as object
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });


  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); // get name of input user has changed
    const fieldValue = event.target.value; // get value of input user has changed
    const newFormData = {...addFormData}; // make copy of existing form data so it can be changed w/o mutating state
    newFormData[fieldName] = fieldValue; // update newFormData object with fieldName and fieldValue. fieldName is key, fieldValue is property.
    setAddFormData(newFormData);
  }

  // called when form is submitted
  const handleAddFormSubmit = (event) => {
    // prevents form from doing POST request when submitted
    event.preventDefault();
    // takes data and creates newContact object
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    // keeps existing array of contacts, adds newContact object
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  }

   // if edit contact id is null, user isn't editing a row. component rerenders b/c state changes
   const [editContactId, setEditContactId] = useState(null);

  // holds form data when editing a given contact
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })

  // accepts event and contact from ReadOnly row clicked on, so we know id of contact being edited
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    // prepopulates EditableRow with contact data from the object of row that user clicks on in ReadOnly row
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    // editFormData is passed to EditableRow component with prepopulated values
    setEditFormData(formValues);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name'); // get name of input user has changed
    const fieldValue = event.target.value; // get value of input user has changed
    const newFormData = {...editFormData}; // make copy of existing form data so it can be changed w/o mutating state
    newFormData[fieldName] = fieldValue; // update newFormData object
    setEditFormData(newFormData);
  }

  // called from EditableRow component when save button is clicked
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
    // get index of object we're editing in contacts array based on id
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    // replace contact object at index we're editing with editedContact object
    newContacts[index] = editedContact;
    // set new array in state with updated contact object
    setContacts(newContacts);
    // finished editing, hides editable row
    setEditContactId(null);
  }

  // EditableRow only renders if editContactId exists in contacts array
  const handleCancelClick = () => {
    setEditContactId(null);
  }

  // finds index of contactId and removes object at that index from contacts array
  const handleDeleteClick = (contactId) => {
    // copy of current array so not mutate state
    const newContacts = [...contacts];
    // get index with findIndex
    const index = contacts.findIndex((contact) => contact.id === contactId);
    // splice method to remove contact object at given index in array
    newContacts.splice(index, 1);
    // set contacts with record removed as new contacts array
    setContacts(newContacts);
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
                (<EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />) : 
                (<ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
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
