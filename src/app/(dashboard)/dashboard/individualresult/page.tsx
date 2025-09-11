"use client";
import React, { useEffect, useState } from "react";

// ধরুন API থেকে students fetch করা হবে
interface IStudent {
  _id: string;
  name: string;
  roll: number;
}

interface ISubjectMark {
  subject: string;
  total: number;
  grade: string;
  gpa: number;
}

const IndividualResultForm = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [formData, setFormData] = useState({
    studentId: "",
    examType: "অর্ধ-বার্ষিক",
    year: new Date().getFullYear(),
    class: 6,
    group: "সাধারণ",
    subjects: [{ subject: "", total: 0, grade: "", gpa: 0 }],
    totalMarks: 0,
    gpa: 0,
    grade: "",
    position: undefined,
  });

  // Mock fetch student list
  useEffect(() => {
    // Normally: fetch('/api/students')
    setStudents([
      { _id: "1", name: "Rahim", roll: 1 },
      { _id: "2", name: "Karim", roll: 2 },
      { _id: "3", name: "Salma", roll: 3 },
    ]);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubjectChange = (index: number, field: string, value: any) => {
    const updatedSubjects = [...formData.subjects];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updatedSubjects as any)[index][field] = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { subject: "", total: 0, grade: "", gpa: 0 },
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">
        📘 Individual Result Entry
      </h2>

      {/* Student select */}
      <select
        value={formData.studentId}
        onChange={(e) =>
          setFormData({ ...formData, studentId: e.target.value })
        }
        className="w-full p-2 border rounded"
        required
      >
        <option value="">-- Select Student --</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} (Roll: {s.roll})
          </option>
        ))}
      </select>

      {/* Exam Type */}
      <select
        name="examType"
        value={formData.examType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="অর্ধ-বার্ষিক">অর্ধ-বার্ষিক</option>
        <option value="বার্ষিক">বার্ষিক</option>
      </select>

      {/* Year */}
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Class */}
      <select
        name="class"
        value={formData.class}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        {[6, 7, 8, 9, 10].map((cls) => (
          <option key={cls} value={cls}>
            {cls} শ্রেণি
          </option>
        ))}
      </select>

      {/* Group */}
      <select
        name="group"
        value={formData.group}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="সাধারণ">সাধারণ</option>
        <option value="বিজ্ঞান">বিজ্ঞান</option>
        <option value="মানবিক">মানবিক</option>
        <option value="বাণিজ্য">বাণিজ্য</option>
      </select>

      {/* Subject Marks */}
      <div className="space-y-4">
        <h3 className="font-semibold">Subjects</h3>
        {formData.subjects.map((subj, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-2">
            <input
              type="text"
              placeholder="Subject"
              value={subj.subject}
              onChange={(e) =>
                handleSubjectChange(idx, "subject", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <input
              type="number"
              placeholder="Total Marks"
              value={subj.total}
              onChange={(e) =>
                handleSubjectChange(idx, "total", +e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <input
              type="text"
              placeholder="Grade"
              value={subj.grade}
              onChange={(e) =>
                handleSubjectChange(idx, "grade", e.target.value)
              }
              className="p-2 border rounded col-span-1"
            />
            <input
              type="number"
              step="0.01"
              placeholder="GPA"
              value={subj.gpa}
              onChange={(e) => handleSubjectChange(idx, "gpa", +e.target.value)}
              className="p-2 border rounded col-span-1"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Subject
        </button>
      </div>

      {/* Total Marks, GPA, Grade, Position */}
      <div className="grid grid-cols-4 gap-2">
        <input
          type="number"
          name="totalMarks"
          placeholder="Total Marks"
          value={formData.totalMarks}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          step="0.01"
          name="gpa"
          placeholder="GPA"
          value={formData.gpa}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="position"
          placeholder="Position"
          value={formData.position || ""}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Save Result
      </button>
    </form>
  );
};

export default IndividualResultForm;
