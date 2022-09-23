const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return  (
    <tr>
      <td><input type="text" name="fullName" required="required" placeholder="Enter a name..." value={editFormData.fullName} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="address" required="required" placeholder="Enter an address..." value={editFormData.address} onChange={handleEditFormChange}></input></td>
      <td><input type="text" name="phoneNumber" required="required" placeholder="Enter a phone number..." value={editFormData.phoneNumber} onChange={handleEditFormChange}></input></td>
      <td><input type="email" name="email" required="required" placeholder="Enter an email..." value={editFormData.email} onChange={handleEditFormChange}></input></td>
      <td>
        <button type="submit">Save</button>
      </td>
      <td>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>
    )
}

export default EditableRow;