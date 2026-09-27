import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  FolderKanban,
  ListChecks,
  UserCog,
  ShieldCheck,
  UserPlus,
  MessageSquare,
  UploadCloud,
  CheckSquare,
  ClipboardList,
} from 'lucide-react';

function Sidebar() {
  const role = localStorage.getItem('role');


  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/admin/tasks', icon: ListChecks },
    { name: 'Users', path: '/admin/users', icon: UserCog },
     
  ];

 
  const adminRoleMenu = [
    { name: 'Role', path: '/admin/roles', icon: ShieldCheck },
    { name: 'User Role Add', path: '/admin/userroles', icon: UserPlus },
  ];


  const studentMenu = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Project', path: '/student/myproject', icon: FolderKanban },
    { name: 'Feedback', path: '/student/feedback', icon: MessageSquare },
    
    { name: 'Tasks', path: '/student/taskdetails', icon: CheckSquare },
  ];

 
  const facultyMenu = [
    { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/faculty/facultystudents', icon: GraduationCap },
    { name: 'Project', path: '/faculty/projects', icon: GraduationCap },
    { name: 'Tasks', path: '/faculty/tasks', icon: GraduationCap },
    // { name: 'Reviews', path: '/faculty/reviews', icon: ClipboardList },
  ];

  let menu = [];
  let roleLabel = 'Guest';
  if (role === 'admin') {
    menu = adminMenu;
    roleLabel = 'Administrator';
  } else if (role === 'student') {
    menu = studentMenu;
    roleLabel = 'Student';
  } else if (role === 'faculty') {
    menu = facultyMenu;
    roleLabel = 'faculty';
  }

  return (
    <aside
      style={{
        width: '250px',
        minHeight: '100vh',
        background: '#669bbc',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '1.5rem 1.5rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#DDA15E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={22} color="#fff" />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.5px',
              }}
            >
              SPMS
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.65)',
                marginTop: '2px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {roleLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav
        style={{
          flex: 1,
          padding: '1rem 0.75rem',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.45)',
            padding: '0 0.75rem 0.6rem',
            fontWeight: 600,
          }}
        >
          Menu
        </div>

        {  menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="spms-nav-link"
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 0.85rem',
                marginBottom: '0.25rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                transition: 'all 0.2s ease',
                borderLeft: isActive ? '3px solid #DDA15E' : '3px solid transparent',
              })}
            >
              <Icon size={18} style={{ flexShrink: 0, opacity: 0.9 }} />
              {item.name}
            </NavLink>
          );
        })}

      
        {role === 'admin' && (
          <>
            <div
              style={{
                fontSize: '0.69rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.45)',
                padding: '1rem 0.75rem 0.6rem',
                fontWeight: 600,
              }}
            >
              Role Management
            </div>

            {adminRoleMenu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="spms-nav-link"
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.7rem 0.85rem',
                    marginBottom: '0.25rem',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    transition: 'all 0.2s ease',
                    borderLeft: isActive ? '3px solid #DDA15E' : '3px solid transparent',
                  })}
                >
                  <Icon size={18} style={{ flexShrink: 0, opacity: 0.9 }} />
                  {item.name}
                </NavLink>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        v1.0.0 · Academic Portal
      </div>
    </aside>
  );
}

export default Sidebar;