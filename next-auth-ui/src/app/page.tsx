"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id?: number;
  name: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 text-gray-800 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center animate-fade-in">List of Student Data</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-200 text-left">
               <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr
                key={s.id ?? i}
                className="even:bg-white odd:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="p-4">{s.id}</td>
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
