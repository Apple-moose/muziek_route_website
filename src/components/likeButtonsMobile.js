import "../style/global.scss";
import { useDispatch } from "react-redux";
import {
  addFav,
  dislikeFav,
  resetFav,
} from "../store/favorites/slice";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
import { Col } from "react-bootstrap";

const NoLike = (props) => {
  const dispatch = useDispatch();

  return (
    <>
    <Col xs={5} className="text-center">
        <IoMdThumbsUp
          style={{
            width: "2.5rem",
            height: "auto",
            color: "grey",
          }}
          onClick={() => {
            dispatch(addFav(props.id));
          }}
        />
        </Col>
        <Col xs={5} className="text-center">
        <IoMdThumbsDown
          style={{
            width: "2.5rem",
            height: "auto",
            color: "grey",
          }}
          onClick={() => {
            dispatch(dislikeFav(props.id));
          }}
        />
        </Col>
    </>
  );
};
export { NoLike };

const Like = (props) => {
  const dispatch = useDispatch();

  return (
    <>
        <IoMdThumbsUp
          style={{
            width: "5rem",
            height: "auto",
            color: "green",
          }}
          onClick={() => {
            dispatch(resetFav(props.id));
          }}
        />
    </>
  );
};
export { Like };

const DisLike = (props) => {
  const dispatch = useDispatch();

  return (
    <>
        <IoMdThumbsDown
          style={{
            width: "5rem",
            height: "auto",
            color: "Red",
          }}
          onClick={() => {
            dispatch(resetFav(props.id));
          }}
        />
    </>
  );
};
export { DisLike };
