import { Member } from './definitions';

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    status: 'Active',
    joinDate: '2022-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    status: 'Active',
    joinDate: '2021-11-20',
  },
  {
    id: '3',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    phone: '555-555-5555',
    status: 'Inactive',
    joinDate: '2020-05-10',
  },
  {
    id: '4',
    name: 'Mary Williams',
    email: 'mary.williams@example.com',
    phone: '111-222-3333',
    status: 'New',
    joinDate: '2023-03-01',
  },
];
