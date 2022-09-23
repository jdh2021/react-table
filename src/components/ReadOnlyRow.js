const ReadOnlyRow = ({contact, handleEditClick, handleDeleteClick}) => {
    return <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, contact)}>Edit</button>
      </td>
      <td>
        {/* use arrow function to pass parameters, prevents function from being invoked right away*/}
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>Delete</button>
      </td>
    </tr>
  }

export default ReadOnlyRow;