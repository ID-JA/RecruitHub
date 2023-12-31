import {
  IconBrandZoom,
  IconFileDescription,
  IconLayoutDashboard,
  IconMessage,
  IconSettings
} from '@tabler/icons-react';
import classes from './PortalNavbar.module.css';
import { Link } from '@tanstack/react-router';

const menuItems = [
  { path: '/portal', label: 'Dashboard', icon: IconLayoutDashboard },
  { path: '/portal/jobs', label: 'Jobs', icon: IconFileDescription },
  { path: '/portal/interviews', label: 'Interviews', icon: IconBrandZoom },
  { path: '/portal/messages', label: 'Messages', icon: IconMessage },
  { path: '/portal/settings', label: 'Settings', icon: IconSettings }
] as const;

export function PortalNavbar() {
  const items = menuItems.map((item) => {
    return (
      <div key={item.path}>
        <Link
          to={item.path}
          className={classes.link}
          preload='intent'
          activeProps={{
            style: {
              fontWeight: 'bold'
            }
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      </div>
    );
  });

  return <div className={classes.navbarMain}>{items}</div>;
}
