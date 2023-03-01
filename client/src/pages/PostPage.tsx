import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../services/post";
import { IPost } from "../types/post";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState<IPost | undefined>();
  React.useEffect(() => {
    if (id) {
      const response = fetchPost(id);
      response.then((postInfo) => setPost(postInfo));
    }
  }, [id]);
  return (
    <Container>
      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <Typography variant="h5">
          Пост с id :<span className="profile-span">{post?.id}</span>
        </Typography>
        <Typography variant="h5">
          Пост с title :<span className="profile-span">{post?.title}</span>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Пост с body :<span className="profile-span">{post?.body}</span>
        </Typography>
      </Box>
    </Container>
  );
};

export default PostPage;
