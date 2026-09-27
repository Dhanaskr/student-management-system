export default function Header({
  searchTerm,
  setSearchTerm,
  sidebarOpen,
  onToggleSidebar,
  dark,
  onToggleTheme,
  Icon
}) {
  return <header className="topbar">
          <button className="icon-button menu-button" aria-label="Toggle navigation" aria-expanded={sidebarOpen} onClick={onToggleSidebar}><Icon name="menu" /></button>
          <div className="search-box global-search"><Icon name="search" /><input aria-label="Search all students" placeholder="Search students by name, email or department..." value={searchTerm} onChange={event => setSearchTerm(event.target.value)} /></div>
          <button className="icon-button theme-button" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={onToggleTheme}><Icon name="sun" /></button>
          <div className="profile"><span className="avatar">D</span><span>Dhanasekar</span></div>
        </header>;
}
