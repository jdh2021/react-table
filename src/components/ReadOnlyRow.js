

const ReadOnlyRow = ({contact}) => {
    return  (//component for read-only row
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
  </tr>
    )
}

export default ReadOnlyRow;