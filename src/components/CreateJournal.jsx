import Navbar from "./NavBar";
import styles from "./CreateJournal.module.css";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TextField } from "@material-ui/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { fetchStudents } from "../student";
import JournalCard from "./JournalCard.jsx";

const CreateJournal = () => {
  // const [selectedNames, setSelectedNames] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const [journals, setJournals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // const [students, setStudents] = useState([]);
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
          "https://journalapptest.onrender.com/api/teacher-journals",
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
  }, [count]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = document.getElementById("createJournalForm");
    const formData = new FormData(formElement);
    if (formData.get("title") === "" || formData.get("description") === "") {
      return setErrorMessage("Please fill all the fields");
    } else {
      try {
        const token = localStorage.getItem("accesstoken");
        await fetch("https://journalapptest.onrender.com/api/journals", {
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
    }
  };
  useEffect(() => {
    fetchStudents().then((students) => {
      const names = students.map((student) => student.username);
      setOptions(names);
    });
  }, []);
  console.log(journals);
  return (
    <div>
      <Navbar />
      <div className={styles.mainc}>
        <div className={styles.create}>
          <Typography className={styles.head} component="h1" variant="h4">
            Create Journal
          </Typography>
          <div className={styles.create_comp}>
            <form id="createJournalForm" onSubmit={handleSubmit}>
              <TextField
                id="outlined-multiline-flexible"
                label="Title"
                name="title"
                fullWidth
                margin="normal"
                multiline
                maxRows={4}
              />
              <TextField
                id="filled-multiline-static"
                margin="normal"
                label="Description"
                name="description"
                fullWidth
                width="100%"
                multiline
                rows={8}
                placeholder="Write your description here"
                variant="filled"
              />
              <TextField
                type="file"
                variant="outlined"
                fullWidth
                name="attachment"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload File
                      <input type="file" hidden />
                    </Button>
                  ),
                }}
              />
              <div className={styles.btn}>
                {errorMessage && <p>{errorMessage}</p>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setCount((prevCount) => prevCount + 1)}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.publish}>
          <div className={styles.head_publish}>
            <Typography component="h1" variant="h4">
              Journals To Publish
            </Typography>
          </div>
          <div className={styles.journals}>
            {journals.length === 0 ? (
              <p>No journals yet</p>
            ) : (
              <div className={styles.cards}>
                {journals.map(
                  (journal) =>
                    journal.publish_time === null && (
                      <JournalCard
                        key={journal.id}
                        journal={journal}
                        options={options}
                      />
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
