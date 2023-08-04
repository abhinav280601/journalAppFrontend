import { CardActionArea, CardActions, Button } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "./Card.css";
import styles from "./JournalCard.module.css";

const JournalCard = ({ journal, options }) => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (!token) {
        console.error("No JWT token found.");
        return;
      }
      const response = await fetch(
        `https://journalapptest.onrender.com/api/publish`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: journal.title,
            tagged_students: selectedNames,
          }),
        }
      ).then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            setErrorMessage(data.message);
          });
        } else {
          alert("Published");
        }
      });
      setSelectedNames([]);
      return response;
    } catch (error) {
      console.error("Error publishing journals:", error);
    }
  };

  return (
    <div key={journal.id}>
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              journal.attachment === ""
                ? "https://www.deccanherald.com/sites/dh/files/articleimages/2023/07/26/file7oj1ye2kl1d1ewhnm70m-1240773-1690323853.jpg"
                : journal.attachment
            }
            alt={journal.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {journal.title}
            </Typography>
            <Typography variant="body2" className="description_text">
              {journal.description}
            </Typography>
          </CardContent>
          <CardActions className={styles.sel_publish}>
            <div className={styles.publish_select}>
              <FormControl className={styles.select}>
                <InputLabel style={{ color: "#7b1fa2" }}>
                  Select Students To tag
                </InputLabel>
                <Select
                  multiple
                  value={selectedNames}
                  onChange={(e) => setSelectedNames(e.target.value)}
                  input={<OutlinedInput label="Multiple Select" />}
                >
                  {options.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button onClick={handlePublish} size="small">
              Publish
            </Button>
            {errorMessage && (
              <Typography variant="body2" className={styles.error}>
                {errorMessage}
              </Typography>
            )}
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default JournalCard;
