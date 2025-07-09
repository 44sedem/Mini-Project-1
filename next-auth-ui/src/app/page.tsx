"use client"
import { useEffect, useState } from "react";
import axios from "axios"

interface Student {
  id?: number;
  name: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/student/get");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async () => {
    try {
      const res = await axios.post("http://localhost:8080/student/add", {
        name,
        email,
      });
      setStudents([...students, res.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>List of Student Data</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.name} - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
