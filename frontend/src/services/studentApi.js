const API = 'http://localhost:5000/api/students';

function checkResponse(response, action) {
  if (!response.ok) {
    throw new Error(`Unable to ${action}: HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`);
  }
}

// An optional signal preserves cancellation when App unmounts.
export async function getStudents({ signal } = {}) {
  const response = await fetch(API, { signal });
  checkResponse(response, 'load students');
  return response.json();
}

export async function createStudent(student) {
  const response = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  checkResponse(response, 'create student');
  return response.json();
}

export async function updateStudent(id, student) {
  const response = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  checkResponse(response, 'update student');
  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`${API}/${id}`, { method: 'DELETE' });
  checkResponse(response, 'delete student');
}
