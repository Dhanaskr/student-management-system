export default function Sidebar({
  activePage,
  onNavigate,
  Icon
}) {
  return <aside className="sidebar">
        <a className="brand" href="#dashboard"><span className="brand-icon"><Icon name="cap" /></span><span>Student Management<br />System</span></a>
        <nav aria-label="Main navigation">{['Dashboard', 'Students'].map(page => <a key={page} className={`nav-item ${activePage === page ? 'active' : ''}`} href={page === 'Dashboard' ? '#dashboard' : '#students'} onClick={() => onNavigate(page)}><Icon name={page === 'Dashboard' ? 'home' : 'user'} /><span>{page}</span></a>)}</nav>
      </aside>;
}
