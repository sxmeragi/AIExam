var refresh =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDQ3NTA3MSwiaWF0IjoxNzQ0Mzg4NjcxLCJqdGkiOiI5ZTgxZTQxOTZkOTg0NjZkYTkzODgwZmZlMDM1M2E2OSIsInVzZXJfaWQiOjF9.f7-Lhyf9ltcZHWLRKWvoog88AFDHCyOyj6_YUaP774Q";
var acces =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0Mzg4OTcxLCJpYXQiOjE3NDQzODg2NzEsImp0aSI6IjQ3Y2JhZmYwMzc1YTQ0ZGU5YWVmYjM5NzJmY2IxOGIyIiwidXNlcl9pZCI6MX0.9UJlFrP1u-kLxu44O8JSaGhpiwP6Qz1zy_aeXaDHcSA";
// fetch("http://localhost:8000/api/token/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       username: "ivan",
//       password: "123456"
//     })
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error("Ошибка:", err));

fetch("http://localhost:8000/api/token/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "admin",
    password: "3nq4ix57",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("Ошибка:", err));

fetch("http://localhost:8000/api/token/refresh/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    refresh:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDQ2OTM4MSwiaWF0IjoxNzQ0MzgyOTgxLCJqdGkiOiJmMmVjYzQ4MDMyODQ0YjRmYjZmMzM0ZThjODRlOTYxNyIsInVzZXJfaWQiOjF9.9diQIQxbWgjg81RsujQ2lCbbBX5boJeDtoOoE0290Lk",
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("Новый access токен:", data.access);
    // Сохрани новый токен и используй его в следующих запросах
  })
  .catch((err) => console.error("Ошибка:", err));

fetch("http://localhost:8000/api/products/", {
  method: "GET", // Указываем, что это GET-запрос
  headers: {
    Authorization:
      "Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0Mzg4OTcxLCJpYXQiOjE3NDQzODg2NzEsImp0aSI6IjQ3Y2JhZmYwMzc1YTQ0ZGU5YWVmYjM5NzJmY2IxOGIyIiwidXNlcl9pZCI6MX0.9UJlFrP1u-kLxu44O8JSaGhpiwP6Qz1zy_aeXaDHcSA", // Замени на твой JWT токен
    "Content-Type": "application/json", // Для JSON
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data)) // Выводим результат в консоль
  .catch((err) => console.error("Ошибка:", err)); // Ловим ошибку, если что-то не так

fetch("http://localhost:8000/api/employees/count/", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0Mzg4OTcxLCJpYXQiOjE3NDQzODg2NzEsImp0aSI6IjQ3Y2JhZmYwMzc1YTQ0ZGU5YWVmYjM5NzJmY2IxOGIyIiwidXNlcl9pZCI6MX0.9UJlFrP1u-kLxu44O8JSaGhpiwP6Qz1zy_aeXaDHcSA",
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Ошибка сервера");
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => {
    console.error("Ошибка:", err);
  });

const apiUrl = "http://localhost:8000/api"; // замени на свой если другой
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2Njk2MzI3LCJpYXQiOjE3NDY2OTYwMjcsImp0aSI6ImM1M2ZmNmNmM2NkOTQ5MTI4ZjFmZWU3ZGQwNzhmYWYwIiwidXNlcl9pZCI6M30.1eZctwTNZSyAe5uzxzuwceiDq4nnnyBh9F5lPQD1d5w";

fetch(`${apiUrl}/employees/count`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Количество работников:", data.employees);
  })
  .catch((error) => {
    console.error("Ошибка при получении количества сотрудников:", error);
  });
