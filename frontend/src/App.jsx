import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import { getStudents, createStudent, updateStudent, deleteStudent } from './services/studentApi.js';
import './App.css';
const emptyForm = {
  name: '',
  email: '',
  phone: '',
  department: '',
  year: ''
};
const paths = {
  cap: 'M2 9 12 4l10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v8',
  home: 'm3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2',
  users: 'M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 21v-2a8 8 0 0 1 16 0v2M18 3a4 4 0 0 1 0 8m3 10v-3a7 7 0 0 0-3-6',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  menu: 'M5 6h14M5 12h14M5 18h14',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1',
  layers: 'm3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5',
  file: 'M5 2h9l5 5v15H5V2Zm9 0v6h5M9 12h6m-6 4h6',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  phone: 'M7 3H3c0 10 8 18 18 18v-4l-5-2-2 2a17 17 0 0 1-7-7l2-2-2-5Z',
  building: 'M4 21V5h10v16M14 11h6v10M2 21h20M8 9h2m-2 4h2m-2 4h2m7-2h1',
  calendar: 'M4 5h16v16H4V5Zm0 5h16M8 2v6m8-6v6',
  chevron: 'm7 10 5 5 5-5',
  plus: 'M12 4v16M4 12h16',
  refresh: 'M20 10a8 8 0 1 0 0 6M20 3v7h-7',
  list: 'M9 4h12v4H9V4Zm0 6h12v4H9v-4Zm0 6h12v4H9v-4ZM3 4h2v4H3V4Zm0 6h2v4H3v-4Zm0 6h2v4H3v-4Z',
  edit: 'm15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6Z',
  trash: 'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7'
};
function Icon({
  name,
  ...props
}) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.user} /></svg>;
}
function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [dark, setDark] = useState(false);
  const [activity, setActivity] = useState(0);
  const nameInput = useRef(null);
  useEffect(() => {
    const controller = new AbortController();
    getStudents({
      signal: controller.signal
    }).then(setStudents).catch(error => {
      if (error.name !== 'AbortError') setMessage({
        text: 'Unable to load students. Check that the backend is running.',
        type: 'error'
      });
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!message || message.type === 'error') return;
    const timeout = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timeout);
  }, [message]);
  const handleNavigate = page => {
    setActivePage(page);
    setSidebarOpen(false);
  };
  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };
  const handleChange = event => setFormData(current => ({
    ...current,
    [event.target.name]: event.target.value
  }));
  const handleSubmit = async event => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.department || !formData.year) {
      setMessage({
        text: 'Please fill all required fields.',
        type: 'error'
      });
      return;
    }
    if (formData.phone && !/^[+\d\s()-]{10,}$/.test(formData.phone)) {
      setMessage({
        text: 'Please enter a valid phone number with at least 10 characters.',
        type: 'error'
      });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        year: Number(formData.year)
      };
      const student = editingId !== null ? await updateStudent(editingId, payload) : await createStudent(payload);
      setStudents(current => editingId !== null ? current.map(item => item.id === editingId ? student : item) : [...current, student]);
      setActivity(current => current + 1);
      setMessage({
        text: editingId !== null ? 'Student updated successfully.' : 'Student added successfully.',
        type: 'success'
      });
      resetForm();
    } catch {
      setMessage({
        text: 'Unable to save student. Please try again.',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };
  const handleEdit = student => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone || '',
      department: student.department,
      year: student.year
    });
    nameInput.current?.focus();
    nameInput.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };
  const handleDelete = async student => {
    if (!window.confirm(`Delete ${student.name}'s student record?`)) return;
    try {
      await deleteStudent(student.id);
      setStudents(current => current.filter(item => item.id !== student.id));
      if (editingId === student.id) resetForm();
      setActivity(current => current + 1);
      setMessage({
        text: 'Student deleted successfully.',
        type: 'success'
      });
    } catch {
      setMessage({
        text: 'Unable to delete student. Please try again.',
        type: 'error'
      });
    }
  };
  const filteredStudents = students.filter(student => [student.name, student.email, student.department, student.phone, student.year, student.id].some(value => String(value ?? '').toLowerCase().includes(searchTerm.trim().toLowerCase())));
  const stats = [{
    label: 'Total Students',
    value: students.length,
    caption: 'All registered students',
    icon: 'users',
    color: 'purple'
  }, {
    label: 'Departments',
    value: new Set(students.map(student => student.department)).size,
    caption: 'Unique departments',
    icon: 'cap',
    color: 'blue'
  }, {
    label: 'Years',
    value: new Set(students.map(student => student.year)).size,
    caption: 'Academic years',
    icon: 'layers',
    color: 'green'
  }, {
    label: 'Recent Activity',
    value: activity,
    caption: 'Operations this session',
    icon: 'file',
    color: 'orange'
  }];
  return <div className={`app ${dark ? 'dark' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {sidebarOpen && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} Icon={Icon} />
      <div className="workspace">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} dark={dark} onToggleTheme={() => setDark(!dark)} Icon={Icon} />
        <main id="dashboard">
          <div className="page-heading"><div><h1>Dashboard</h1><p>Manage student records efficiently</p></div><div className="breadcrumb">Dashboard <span>›</span> Students</div></div>
          <div className="stats-grid">{stats.map(stat => <section className={`stat-card ${stat.color}`} key={stat.label}><span className="stat-icon"><Icon name={stat.icon} /></span><div className="stat-copy"><h2>{stat.label}</h2><strong>{loading ? '—' : stat.value}</strong><p>{stat.caption}</p></div><Icon name={stat.icon} className="stat-decoration" /></section>)}</div>
          {message && <div className={`message ${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}><span>{message.text}</span><button aria-label="Dismiss message" onClick={() => setMessage(null)}>×</button></div>}
          <div className="content">
            <StudentForm formData={formData} editingId={editingId} handleChange={handleChange} handleSubmit={handleSubmit} resetForm={resetForm} saving={saving} nameInput={nameInput} Icon={Icon} />
            <StudentTable students={filteredStudents} loading={loading} handleEdit={handleEdit} handleDelete={handleDelete} searchTerm={searchTerm} setSearchTerm={setSearchTerm} saving={saving} Icon={Icon} />
          </div>
        </main>
      </div>
    </div>;
}
export default App;
