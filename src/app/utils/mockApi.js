// src/utils/mockApi.js
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function fetchAdminOverview() {
  await delay();
  return {
    donations: 1284,
    users: 342,
    pending: 12,
    distributed: 874,
    recent: [
      { actor: "Alice", action: "Submitted donation", time: "2h ago" },
      { actor: "Bob", action: "Approved donation", time: "3h ago" },
    ],
  };
}

let users = [
  { id: "u1", name: "Alice Stone", email: "alice@example.com", role: "donor", suspended: false },
  { id: "u2", name: "Bob Staff", email: "bob@charity.org", role: "staff", suspended: false },
  { id: "u3", name: "Carol Admin", email: "carol@org.org", role: "admin", suspended: false },
];

export async function getUsers() {
  await delay();
  return [...users];
}

export async function suspendUser(id) {
  await delay();
  users = users.map(u => u.id === id ? {...u, suspended: !u.suspended} : u);
  return true;
}

export async function removeUser(id) {
  await delay();
  users = users.filter(u => u.id !== id);
  return true;
}

export async function resetPassword(id) {
  await delay();
  // simulate reset
  return true;
}

export async function fetchReports() {
  await delay();
  return { donations: [], stock: [] };
}

export async function fetchLogs() {
  await delay();
  return [
    { id: 1, actor: "Carole", action: "Reset password for Bob", time: "2025-10-19 11:23" },
    { id: 2, actor: "System", action: "Daily backup completed", time: "2025-10-19 02:10" },
  ];
}
