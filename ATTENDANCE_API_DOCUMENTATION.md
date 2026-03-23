# Attendance API Documentation

## Overview
The Attendance API provides endpoints for managing student check-in and check-out in the library. All endpoints require authentication via JWT token passed in cookies or Authorization header.

---

## Base URL
```
http://localhost:3000/api/attendance
```

---

## Authentication
All endpoints require an authenticated user (Admin). Include the JWT token in:
- **Cookie**: `token`
- **Or Header**: `Authorization: Bearer <token>`

---

## Endpoints

### 1. Check-In Student

**Endpoint:** `POST /api/attendance/check-in`

**Description:** Records a student's check-in time for the current day.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
(or Cookie: token=<JWT_TOKEN>)
```

**Request Body:**
```json
{
  "collegeId": "STU001"
}
```

**Payload Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| collegeId | String | Yes | Unique college ID of the student (e.g., "STU001") |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Check-in successful",
  "data": {
    "studentName": "John Doe",
    "collegeId": "STU001",
    "checkInTime": "9:15:30 AM",
    "status": "checked-in"
  }
}
```

**Error Responses:**

Student Already Checked In (400):
```json
{
  "success": false,
  "error": "Student is already checked in"
}
```

Student Not Found (404):
```json
{
  "success": false,
  "error": "Student not found"
}
```

Server Error (500):
```json
{
  "success": false,
  "error": "Error during check-in"
}
```

**Example (Frontend):**
```javascript
const checkIn = async (collegeId) => {
  try {
    const response = await fetch('http://localhost:3000/api/attendance/check-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ collegeId })
    });
    
    const data = await response.json();
    if (data.success) {
      console.log(`${data.data.studentName} checked in at ${data.data.checkInTime}`);
      // Show success toast
    } else {
      console.error(data.error);
      // Show error toast
    }
  } catch (error) {
    console.error('Check-in failed:', error);
  }
};
```

---

### 2. Check-Out Student

**Endpoint:** `POST /api/attendance/check-out`

**Description:** Records a student's check-out time and calculates duration in the library.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
(or Cookie: token=<JWT_TOKEN>)
```

**Request Body:**
```json
{
  "collegeId": "STU001"
}
```

**Payload Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| collegeId | String | Yes | Unique college ID of the student |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Check-out successful",
  "data": {
    "studentName": "John Doe",
    "collegeId": "STU001",
    "checkOutTime": "12:45:15 PM",
    "duration": "3h 30m",
    "status": "checked-out"
  }
}
```

**Error Responses:**

No Check-in Found (404):
```json
{
  "success": false,
  "error": "No check-in record found for today"
}
```

Already Checked Out (400):
```json
{
  "success": false,
  "error": "Already checked out"
}
```

Student Not Found (404):
```json
{
  "success": false,
  "error": "Student not found"
}
```

Server Error (500):
```json
{
  "success": false,
  "error": "Error during check-out"
}
```

**Example (Frontend):**
```javascript
const checkOut = async (collegeId) => {
  try {
    const response = await fetch('http://localhost:3000/api/attendance/check-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ collegeId })
    });
    
    const data = await response.json();
    if (data.success) {
      console.log(`${data.data.studentName} checked out. Duration: ${data.data.duration}`);
      // Show success toast with duration
    } else {
      console.error(data.error);
      // Show error toast
    }
  } catch (error) {
    console.error('Check-out failed:', error);
  }
};
```

---

### 3. Get Today's Status

**Endpoint:** `GET /api/attendance/status/:collegeId`

**Description:** Retrieves the current check-in/out status for a student on today's date.

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
(or Cookie: token=<JWT_TOKEN>)
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| collegeId | String | Yes | Unique college ID of the student |

**Success Response (200) - Not Checked In:**
```json
{
  "success": true,
  "data": {
    "studentName": "John Doe",
    "collegeId": "STU001",
    "status": "not-checked-in",
    "sessions": []
  }
}
```

**Success Response (200) - Currently Checked In:**
```json
{
  "success": true,
  "data": {
    "studentName": "John Doe",
    "collegeId": "STU001",
    "status": "checked-in",
    "currentSessionCheckInTime": "2026-03-23T09:15:30.000Z",
    "totalSessions": 1,
    "sessions": [
      {
        "checkInTime": "2026-03-23T09:15:30.000Z"
      }
    ]
  }
}
```

**Success Response (200) - With Completed Session:**
```json
{
  "success": true,
  "data": {
    "studentName": "John Doe",
    "collegeId": "STU001",
    "status": "checked-out",
    "currentSessionCheckInTime": "2026-03-23T09:15:30.000Z",
    "totalSessions": 2,
    "sessions": [
      {
        "checkInTime": "2026-03-23T09:15:30.000Z",
        "checkOutTime": "2026-03-23T12:45:15.000Z",
        "duration": "3h 30m"
      },
      {
        "checkInTime": "2026-03-23T14:00:00.000Z",
        "checkOutTime": "2026-03-23T17:30:00.000Z",
        "duration": "3h 30m"
      }
    ]
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

**Example (Frontend):**
```javascript
const getTodayStatus = async (collegeId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/attendance/status/${collegeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json();
    if (data.success) {
      const { status, sessions, totalSessions } = data.data;
      console.log(`Status: ${status}`);
      console.log(`Total Sessions: ${totalSessions}`);
      
      // Show button based on status
      if (status === 'checked-in') {
        // Show "Check Out" button
      } else if (status === 'checked-out' || status === 'not-checked-in') {
        // Show "Check In" button
      }
    }
  } catch (error) {
    console.error('Failed to get status:', error);
  }
};
```

---

### 4. Get All Attendance Records

**Endpoint:** `GET /api/attendance/all`

**Description:** Retrieves all attendance records (paginated by date, newest first).

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
(or Cookie: token=<JWT_TOKEN>)
```

**Success Response (200):**
```json
{
  "success": true,
  "attendanceRecords": [
    {
      "id": 1,
      "studentId": 5,
      "date": "2026-03-23",
      "sessions": [
        {
          "checkInTime": "2026-03-23T09:15:30.000Z",
          "checkOutTime": "2026-03-23T12:45:00.000Z",
          "duration": "3h 30m"
        }
      ],
      "createdAt": "2026-03-23T09:15:30.000Z",
      "student": {
        "id": 5,
        "collegeId": "STU001",
        "fullName": "John Doe"
      }
    },
    {
      "id": 2,
      "studentId": 6,
      "date": "2026-03-23",
      "sessions": [
        {
          "checkInTime": "2026-03-23T10:00:00.000Z"
        }
      ],
      "createdAt": "2026-03-23T10:00:00.000Z",
      "student": {
        "id": 6,
        "collegeId": "STU002",
        "fullName": "Jane Smith"
      }
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Error fetching attendance records"
}
```

**Example (Frontend):**
```javascript
const getAllRecords = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/attendance/all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json();
    if (data.success) {
      // Display attendance records in a table
      console.table(data.attendanceRecords);
    }
  } catch (error) {
    console.error('Failed to fetch records:', error);
  }
};
```

---

## Frontend Implementation Example

Here's a complete example component for the Attendance page:

```jsx
import React, { useState, useEffect } from 'react';

const AttendanceComponent = () => {
  const [collegeId, setCollegeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentStatus, setStudentStatus] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE = 'http://localhost:3000/api/attendance';
  const token = localStorage.getItem('token');

  const handleCheckIn = async () => {
    if (!collegeId.trim()) {
      setError('Please enter college ID');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE}/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`${data.data.studentName} checked in at ${data.data.checkInTime}`);
        setCollegeId('');
        getStatus(collegeId);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Check-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!collegeId.trim()) {
      setError('Please enter college ID');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE}/check-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ collegeId })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`${data.data.studentName} checked out. Duration: ${data.data.duration}`);
        setCollegeId('');
        getStatus(collegeId);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Check-out failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatus = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/status/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setStudentStatus(data.data);
      }
    } catch (err) {
      console.error('Failed to get status:', err);
    }
  };

  const showCheckInBtn = !studentStatus || studentStatus.status !== 'checked-in';

  return (
    <div className="attendance-container">
      <h2>Student Attendance</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="input-group">
        <input
          type="text"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          placeholder="Enter Student College ID"
          disabled={loading}
        />
        
        {showCheckInBtn ? (
          <button onClick={handleCheckIn} disabled={loading}>
            {loading ? 'Processing...' : 'Check In'}
          </button>
        ) : (
          <button onClick={handleCheckOut} disabled={loading}>
            {loading ? 'Processing...' : 'Check Out'}
          </button>
        )}
      </div>

      {studentStatus && (
        <div className="status-card">
          <h3>{studentStatus.studentName}</h3>
          <p>ID: {studentStatus.collegeId}</p>
          <p>Status: <strong>{studentStatus.status}</strong></p>
          <p>Total Sessions Today: {studentStatus.totalSessions}</p>
          
          {studentStatus.sessions.length > 0 && (
            <div className="sessions">
              <h4>Sessions Detail:</h4>
              {studentStatus.sessions.map((session, idx) => (
                <div key={idx} className="session-item">
                  <p>Session {idx + 1}</p>
                  <p>Check-in: {new Date(session.checkInTime).toLocaleTimeString()}</p>
                  {session.checkOutTime && (
                    <>
                      <p>Check-out: {new Date(session.checkOutTime).toLocaleTimeString()}</p>
                      <p>Duration: {session.duration}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceComponent;
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Server Error |

---

## Important Notes

1. **Token:** Always include the JWT token in the request headers
2. **CollegeId:** Use college ID for student identification, not database IDs
3. **Timestamps:** All timestamps are in ISO 8601 format (UTC)
4. **Time Display:** Convert timestamps to local time for frontend display
5. **Error Handling:** Always check `success` field before accessing data
6. **Multiple Sessions:** A student can have multiple check-in/check-out sessions per day
7. **Date Logic:** The system automatically manages dates; frontend only needs to send collegeId

---

## Testing with cURL

```bash
# Check-in
curl -X POST http://localhost:3000/api/attendance/check-in \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"collegeId":"STU001"}'

# Check-out
curl -X POST http://localhost:3000/api/attendance/check-out \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"collegeId":"STU001"}'

# Get Today's Status
curl -X GET http://localhost:3000/api/attendance/status/STU001 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get All Records
curl -X GET http://localhost:3000/api/attendance/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Database Schema (Reference)

```prisma
model Attendance {
  id        Int      @id @default(autoincrement())
  studentId Int
  student   Student  @relation(fields: [studentId], references: [id])
  date      DateTime @db.Date
  sessions  Json     // Array of session objects
  createdAt DateTime @default(now())

  @@unique([studentId, date])
}
```

Each session object in the JSON array contains:
```json
{
  "checkInTime": "ISO 8601 timestamp",
  "checkOutTime": "ISO 8601 timestamp (optional)",
  "duration": "string like '3h 30m' (optional)"
}
```
