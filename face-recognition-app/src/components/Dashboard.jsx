import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [employeeCount, setEmployeeCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Получаем токен

    if (token) {
      // Получаем роль текущего пользователя
      axios.get('http://localhost:8000/api/user/role', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        setRole(response.data.role);
        if (response.data.role === 'director') {
          fetchEmployeeCount(token);
        }
      })
      .catch(err => {
        console.error('Error fetching user role:', err);
        setError('Ошибка при получении данных о пользователе');
      });
    } else {
      setError('Токен не найден. Пожалуйста, авторизуйтесь.');
    }
  }, []);

  const fetchEmployeeCount = (token) => {
    // Получаем количество сотрудников только для директора
    axios.get('http://localhost:8000/api/employees/count', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setEmployeeCount(response.data.employees);
    })
    .catch(error => {
      console.error('Error fetching employee count:', error);
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Role: {role}</p>
      {role === 'director' && (
        <p>Number of employees: {employeeCount}</p>
      )}
    </div>
  );
};

export default Dashboard;
