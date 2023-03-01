import axios from "axios";
import { IPost } from "../types/post";
export const fetchPost = async (id: string): Promise<IPost | undefined> => {
  try {
    const response = await axios.get<IPost>(
      `${process.env.REACT_APP_API_URL_POST}/${id}`
    );
    return response.data;
  } catch (e: string | any) {
    console.log(e.message);
  }
};
