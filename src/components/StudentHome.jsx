import { useState, useEffect } from "react";
// import { json } from "react-router-dom";
import NavBarStu from "./NavBarStu";
import Card from "./Card";
import styles from "./StudentHome.module.css";
import { style } from "@mui/system";

const StudentHome = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [journals, setJournals] = useState([]);
  useEffect(() => {
    // Fetch journals data here
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
          console.error("No JWT token found.");
          return;
        }

        await fetch(
          "https://journalapptest.onrender.com/api/student-journals",
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `${token}`,
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                setErrorMessage(data.message);
                throw new Error(data.message);
              });
            }
            return response.json();
          })
          .then((data) => {
            if (data.message === "No journals found") {
              setErrorMessage(data.message);
              return;
            }
            setJournals(data);
          });
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchJournals();
  }, []);
  console.log(journals);
  return (
    <div>
      <NavBarStu />
      <div className={styles.main}>
        <h1 className={styles.main_heading}>My Journals</h1>
        <div>
          {journals.length === 0 || errorMessage === "No journals found" ? (
            <p>No journals yet</p>
          ) : (
            <div className={styles.cards}>
              {journals.map((journal) => (
                <div key={journal.id}>
                  <Card
                    className={styles.card}
                    title={journal.title}
                    description={journal.description}
                    image={
                      journal.attachment === ""
                        ? "https://www.deccanherald.com/sites/dh/files/articleimages/2023/07/26/file7oj1ye2kl1d1ewhnm70m-1240773-1690323853.jpg"
                        : journal.attachment
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
