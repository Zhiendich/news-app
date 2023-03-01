import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Post from "../components/Post";
import { useAppDispatch, useAppSelector } from "../hooks/UseTypesSelector";
import { fetchPosts } from "../store/action-creators/post";
import { IPost } from "../types/post";

const News = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { posts, isPostDeleting, isPostLoading } = useAppSelector(
    (state) => state.postReducer
  );
  const [postsState, setPosts] = useState<IPost[]>(posts);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const postsPromise = dispatch(fetchPosts(limit, page));
    postsPromise.then((data) => {
      setPosts([...postsState, ...(data?.posts as [])]);
      setTotalPages(data?.totalCountPages || 0);
    });
  }, [dispatch, page, limit]);
  const loadPostsHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page + 1);
  };
  React.useEffect(() => {
    if (!isPostDeleting) {
      setPosts(posts);
    }
  }, [isPostDeleting]);
  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={5}>
          {isPostLoading && !posts.length ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: "20%",
              }}
            >
              <CircularProgress size="5rem" />
            </Box>
          ) : (
            postsState?.map((post) => (
              <Post
                id={post.id}
                body={post.body}
                key={post.id}
                title={post.title}
              />
            ))
          )}
        </Grid>
        {page < totalPages && (
          <Box sx={{ marginTop: 5 }}>
            <Button
              variant="contained"
              sx={{ mx: "auto", display: "block" }}
              size="large"
              onClick={loadPostsHandler}
            >
              Загрузить еще
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default News;
