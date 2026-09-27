export default function StudentTable({
  students,
  loading,
  handleEdit,
  handleDelete,
  searchTerm,
  setSearchTerm,
  saving,
  Icon
}) {
  return <section className="card table-card" id="students">
              <div className="section-heading"><span className="heading-icon blue"><Icon name="list" /></span><div><h2>Student List</h2><p>View and manage all registered students</p></div><div className="search-box table-search"><Icon name="search" /><input aria-label="Search student list" placeholder="Search students..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)} /></div></div>
              <div className="table-wrapper"><table><thead><tr>{['ID', 'Name', 'Email', 'Phone', 'Department', 'Year', 'Actions'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{loading ? <tr><td colSpan="7" className="state-message">Loading students...</td></tr> : students.length === 0 ? <tr><td colSpan="7" className="state-message">{searchTerm ? 'No students match your search.' : 'No students yet. Add your first student to get started.'}</td></tr> : students.map(student => <tr key={student.id}><td>{student.id}</td><td><strong>{student.name}</strong></td><td>{student.email}</td><td>{student.phone || '—'}</td><td><span className={`badge ${student.department === 'IT' ? 'blue' : ['ECE', 'EEE'].includes(student.department) ? 'green' : 'purple'}`}>{student.department}</span></td><td><span className="year-badge">{student.year}</span></td><td><div className="action-buttons"><button className="edit-button" disabled={saving} aria-label={`Edit ${student.name}`} title="Edit student" onClick={() => handleEdit(student)}><Icon name="edit" /></button><button className="delete-button" disabled={saving} aria-label={`Delete ${student.name}`} title="Delete student" onClick={() => handleDelete(student)}><Icon name="trash" /></button></div></td></tr>)}</tbody></table></div>
            </section>;
}
