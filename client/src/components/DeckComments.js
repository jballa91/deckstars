import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Modal,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import FaceIcon from "@material-ui/icons/Face";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";

import { MainContext } from "../MainContext";
import deckcommentstyles from "../styles/deckcommentstyles";

const useStyles = makeStyles((theme) => deckcommentstyles);

const DeckComments = ({ deck }) => {
  const { authenticated, user, setCurrentDeck } = useContext(MainContext);
  const [comment, setComment] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleClose = () => {};

  const styles = useStyles();

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleChangeEdit = (e) => {
    e.preventDefault();
    setEditContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !authenticated) {
      window.alert(
        "You'll need to sign up if you want to comment on other users' decks. \n The interface to sign up can be found in the top right corner of your screen."
      );
      return;
    }
    const tempDeck = { ...deck };
    const res = await fetch(`/api/comments/new/${deck.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        comment: {
          authorId: user.id,
          content: comment,
        },
      }),
    });
    const newComment = await res.json();
    tempDeck.comments.push(newComment);
    setComment("");
    setCurrentDeck(tempDeck);
  };

  const handleCommentDelete = async (e) => {
    e.preventDefault();
    let tempDeck = { ...deck };
    await fetch(`/api/comments/${commentToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    tempDeck.comments = tempDeck.comments.filter(
      (comment) => comment.id !== commentToDelete
    );
    setCommentToDelete(null);
    setDeleteOpen(false);
    setCurrentDeck(tempDeck);
  };

  const handleDeleteClick = async (e, commentId) => {
    e.preventDefault();
    setCommentToDelete(commentId);
    setDeleteOpen(true);
  };

  const handleCancelClick = (e) => {
    e.preventDefault(e);
    setCommentToDelete(null);
    setDeleteOpen(false);
  };

  const handleEditClick = (e, commentId) => {
    e.preventDefault(e);
    setIsEdit(commentId);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEditContent("");
    setIsEdit(null);
  };

  const handleEditComment = async (e) => {
    debugger;
    e.preventDefault();
    let tempDeck = { ...deck };
    const res = await fetch(`api/comments/${isEdit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        comment: {
          id: isEdit,
          content: editContent,
        },
      }),
    });
    debugger;
    const edited = await res.json();
    debugger;
    const tempComments = [];
    for (let comment of tempDeck.comments) {
      if (comment.id !== isEdit) {
        tempComments.push(comment);
      } else {
        tempComments.push(edited);
      }
    }
    debugger;
    tempDeck.comments = tempComments;
    debugger;
    setIsEdit(null);
    setEditContent("");
    setCurrentDeck(tempDeck);
  };

  return (
    <Box className={styles.container}>
      <Modal
        open={deleteOpen}
        onClose={handleClose}
        className={styles.modal}
        aria-labelledby="Delete Deck"
        aria-describedby="This is asking you if you're sure you want to delete a comment."
      >
        <Box className={styles.modal_box}>
          <Typography>Are you sure you want to delete this comment?</Typography>
          <Button
            className={styles.confirm_delete}
            onClick={(e) => handleCommentDelete(e)}
          >
            Confirm
          </Button>
          <Button
            className={styles.cancel_delete}
            onClick={(e) => handleCancelClick(e)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Typography variant="caption">------Comments------</Typography>
      <Box className={styles.form_container}>
        <form className={styles.comment_form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            variant="outlined"
            fullWidth={true}
            placeholder="Add a comment"
            multiline={true}
            rows={3}
            rowsMax={5}
            value={comment}
            onChange={(e) => handleChange(e)}
          ></TextField>
          <IconButton
            className={styles.comment_send_button}
            size="small"
            aria-label="send comment"
            type="submit"
          >
            <SendIcon fontSize="small" color="primary" />
          </IconButton>
        </form>
      </Box>
      <Box className={styles.comments_container}>
        {deck.comments.map((comment) => (
          <Box className={styles.comment} key={comment.id}>
            <Box className={styles.comment_info_and_delete}>
              <Box className={styles.comment_icon_and_name}>
                <FaceIcon fontSize="small" />
                <Typography className={styles.comment_username} variant="body1">
                  {comment.author.username}
                </Typography>
              </Box>
              {user && user.id === comment.authorId && (
                <Box className={styles.buttons}>
                  <IconButton
                    size="small"
                    onClick={(e) => handleEditClick(e, comment.id)}
                  >
                    <EditIcon fontSize="small" color="primary" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleDeleteClick(e, comment.id)}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              )}
            </Box>
            {comment.edited && (
              <Typography variant="caption">[Edited]</Typography>
            )}
            {isEdit !== comment.id ? (
              <Typography variant="body2">{comment.content}</Typography>
            ) : (
              <form
                className={styles.comment_form}
                onSubmit={(e) => handleEditComment(e)}
              >
                <Button
                  size="small"
                  styles={styles.cancel_edit_button}
                  onClick={(e) => handleCancelEdit(e)}
                >
                  cancel edit
                </Button>
                <TextField
                  variant="outlined"
                  fullWidth={true}
                  placeholder="Add a comment"
                  multiline={true}
                  rows={3}
                  rowsMax={5}
                  onChange={(e) => handleChangeEdit(e)}
                  defaultValue={comment.content}
                ></TextField>
                <IconButton
                  className={styles.comment_send_button}
                  size="small"
                  aria-label="send comment"
                  type="submit"
                >
                  <SendIcon fontSize="small" color="primary" />
                </IconButton>
              </form>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default DeckComments;
