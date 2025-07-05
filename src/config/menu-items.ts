import {
  FaTachometerAlt,
  FaUsers,
  FaUserFriends,
  FaClipboardList,
  FaMoneyBillWave,
  FaSms,
  FaTools,
  FaChartBar,
  FaBullhorn,
  FaBook,
  FaCog,
} from 'react-icons/fa';

export const menuItems = [
  { name: 'Dashboard', icon: FaTachometerAlt, path: '/dashboard' },
  { name: 'Members', icon: FaUsers, path: '/members' },
  { name: 'Visitors', icon: FaUserFriends, path: '/visitors' },
  { name: 'Attendance', icon: FaClipboardList, path: '/attendance' },
  { name: 'Finance', icon: FaMoneyBillWave, path: '/finance' },
  { name: 'Bulk SMS', icon: FaSms, path: '/bulk-sms' },
  { name: 'Equipment', icon: FaTools, path: '/equipment' },
  { name: 'Report', icon: FaChartBar, path: '/report' },
  { name: 'Evangelism', icon: FaBullhorn, path: '/evangelism' },
  { name: 'Edification', icon: FaBook, path: '/edification' },
  { name: 'Settings', icon: FaCog, path: '/settings' },
];
