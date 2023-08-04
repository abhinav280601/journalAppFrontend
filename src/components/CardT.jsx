import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CardActionArea, CardActions, Button } from "@mui/material";
import styles from "./CardT.module.css";

export default function ActionAreaCard({
  title,
  description,
  image,
  journalId,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = async (journalId, title, description) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    const id = journalId;
    // try {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("No JWT token found.");
      return;
    }
    await fetch("https://journalapptest.onrender.com/api/journals/" + id, {
      method: "PUT",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Journal not updated");
      }
    });
    alert("Journal updated");
    window.location.reload();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleDelete = async (journalId) => {
    console.log("delete");
    const id = journalId;
    // try {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      console.error("No JWT token found.");
      return;
    }
    await fetch("https://journalapptest.onrender.com/journals/" + id, {
      method: "DELETE",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        title: title,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Journal not deleted");
      }
    });
    alert("Journal deleted");
    window.location.reload();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  console.log(image);

  return (
    <div>
      <Card className={styles.card} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" className={styles.description_text}>
              {description}
            </Typography>
          </CardContent>
          <div className={styles.options}>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
            <div className={styles.update_delete}>
              <CardActions>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <UpdateIcon onClick={handleClickOpen} />
                </IconButton>
              </CardActions>
              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={() => handleUpdate(journalId)}>
                  <DialogContent>
                    <DialogTitle>Update Journal</DialogTitle>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="title"
                      label="Title"
                      name="title"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      label="Description"
                      name="description"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </DialogActions>
                </form>
              </Dialog>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={() => handleDelete(journalId)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </div>
  );
}
