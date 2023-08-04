import { useState, useEffect } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  Stack,
  Chip,
} from "@mui/material";

const TeacherHome = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [count, setCount] = useState(0);
  const [journals, setJournals] = useState([]);
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch journals data here
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
          console.error("No JWT token found.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/teacher-journals",
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Error fetching journals:", response.statusText);
          return;
        }

        const data = await response.json();
        setJournals(data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
    // Fetch students data here
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
          console.error("No JWT token found.");
          return;
        }

        const response = await fetch("http://localhost:3000/api/getStudents", {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          console.error("Error fetching students:", response.statusText);
          return;
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [count]);
  console.log(students);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = document.getElementById("createJournalForm");
    const formData = new FormData(formElement);
    try {
      const token = localStorage.getItem("accesstoken");
      await fetch("http://localhost:3000/api/journals", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              setErrorMessage(data.message);
              throw new Error(data.message);
            });
          }
          return response.json();
        })
        .then(() => {
          formElement.reset();
        });
    } catch (error) {
      console.error("Error Creating Journal :", error);
    }
  };
  return (
    <div>
      <h1>Teacher Home</h1>
      <h2>All Journals</h2>
      {journals.length === 0 ? (
        <p>No journals yet</p>
      ) : (
        journals.map((journal) => (
          <div key={journal.id}>
            <h3>{journal.title}</h3>
            <p>{journal.description}</p>
            {journal.publish_time === null ? (
              <div>
                <form>
                  {students.length === 0 ? (
                    <p>No Students</p>
                  ) : (
                    <FormControl sx={{ m: 1, width: 100, height: 50 }}>
                      <InputLabel>Students</InputLabel>
                      <Select
                        multiple
                        value={selectedNames}
                        onChange={(e) => setSelectedNames(e.target.value)}
                      >
                        {students.map((student) => (
                          <MenuItem
                            key={student.username}
                            value={student.username}
                          >
                            {student.username}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  <Button>Publish Journal</Button>
                </form>
              </div>
            ) : (
              <p>{journal.publish_time}</p>
            )}
          </div>
        ))
      )}
      {/* Form to create a new journal */}
      <h2>Create a New Journal</h2>
      <form id="createJournalForm" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" id="title" name="title" />
        </label>
        <label>
          Description:
          <textarea id="description" name="description" />
        </label>
        <label>
          Attachment:
          <input type="file" id="attachment" name="attachment" />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        <button
          type="submit"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeacherHome;
