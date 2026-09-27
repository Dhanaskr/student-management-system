export default function StudentForm({
  formData,
  editingId,
  handleChange,
  handleSubmit,
  resetForm,
  saving,
  nameInput,
  Icon
}) {
  return <section className="card form-card">
              <div className="section-heading"><span className="heading-icon purple"><Icon name="users" /></span><div><h2>{editingId !== null ? 'Edit Student' : 'Add Student'}</h2><p>{editingId !== null ? 'Update student details below' : 'Enter student details below'}</p></div><span className="mode-badge">{editingId !== null ? 'Editing' : 'Add New'}</span></div>
              <form className="student-form" onSubmit={handleSubmit}>
                {[{
        name: 'name',
        label: 'Name',
        icon: 'user',
        placeholder: 'Enter student name',
        type: 'text'
      }, {
        name: 'email',
        label: 'Email',
        icon: 'mail',
        placeholder: 'Enter email address',
        type: 'email'
      }, {
        name: 'phone',
        label: 'Phone',
        icon: 'phone',
        placeholder: 'Enter phone number',
        type: 'tel'
      }, {
        name: 'department',
        label: 'Department',
        icon: 'building',
        options: ['CSE', 'IT', 'ECE', 'EEE', 'MECH']
      }, {
        name: 'year',
        label: 'Year',
        icon: 'calendar',
        options: [1, 2, 3, 4]
      }].map(field => <div className="form-group" key={field.name}><label htmlFor={field.name}>{field.label}{field.name !== 'phone' && <span className="required"> *</span>}</label><div className="input-wrap"><Icon name={field.icon} />{field.options ? <><select id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required disabled={saving}><option value="">Select {field.name}</option>{field.options.map(option => <option key={option} value={option}>{field.name === 'year' ? `Year ${option}` : option}</option>)}</select><Icon name="chevron" className="select-chevron" /></> : <input ref={field.name === 'name' ? nameInput : undefined} id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name]} onChange={handleChange} required={field.name !== 'phone'} disabled={saving} />}</div></div>)}
                <div className="form-actions"><button className="primary-button" type="submit" disabled={saving}><Icon name={editingId !== null ? 'edit' : 'plus'} />{saving ? 'Saving...' : editingId !== null ? 'Update Student' : 'Add Student'}</button><button className="secondary-button" type="button" onClick={resetForm} disabled={saving}><Icon name="refresh" />{editingId !== null ? 'Cancel' : 'Clear'}</button></div>
              </form>
            </section>;
}
