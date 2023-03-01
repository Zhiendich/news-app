import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/UseTypesSelector";
import { deletePost } from "../store/action-creators/post";
import { IPost } from "../types/post";

const Post = ({ body, title, id }: IPost) => {
  const dispatch = useAppDispatch();
  const deletePostHandler = () => {
    dispatch(deletePost(id));
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #1976D2",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            pb: "0",
            position: "relative",
          }}
        >
          <span onClick={deletePostHandler} className="dagger"></span>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "16px",
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography sx={{ my: 1 }}>{body}</Typography>
          <CardActions>
            <Link className="post-link" to={`./${id}`}>
              Learn More
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
