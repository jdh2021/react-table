

const EditableRow = () => {
    return  (//component for editable row
    <tr>
      <td><input type="text" name="fullName" required="required" placeholder="Enter a name..."></input></td>
      <td><input type="text" name="address" required="required" placeholder="Enter an address..."></input></td>
      <td><input type="text" name="phoneNumber" required="required" placeholder="Enter a phone number..."></input></td>
      <td><input type="email" name="email" required="required" placeholder="Enter an email..."></input></td>
    </tr>
    )
}

export default EditableRow;