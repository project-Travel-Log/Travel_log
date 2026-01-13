import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import WishToggleButton from '../../components/common/WishToggleButton';
import { getReviewDetail } from '../../API/review';
import { toggleLike } from '../../API/like';
import { createComment, getComments } from '../../API/comment';
import { mypage } from '../../API/user';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [liked, setLiked] = useState(false);
  const [reviewImag, setReviewImage] = useState([])
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [user, setUser] = useState(null)
  const [commentLikes, setCommentLikes] = useState({})


  const [likes, setLikes] = useState([
    { count: 14, liked: false },
    { count: 14, liked: false },
  ]);
  const IMAGE_BASE_URL = "http://localhost:5000/"

  useEffect(() => {
    getReviewDetail(id)
      .then(res => {
        console.log("리뷰데이터", res.data);
        setReview(res.data);
        setLiked(res.data.liked ?? false);
      })
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    mypage()
      .then(res => {
        console.log("유저정보", res.data)
        setUser(res.data.user)
      })
      .catch(err => console.error(err))
  }, [])


  useEffect(() => {
    if (review?.image?.length > 0) {
      setReviewImage(IMAGE_BASE_URL + review.review_image[0]);
    }
  }, [review])

  useEffect(() => {
    getComments("review", id)
      .then(res => {
        console.log("댓글", res.data);
        setComments(res.data)
      })
  }, [id]);

  useEffect(() => {
    if (Array.isArray(comments)) {
      const likesObj = {};
      comments.forEach(c => {
        likesObj[c.id] = {
          liked: c.liked,
          count: c.like_count
        };
      });
      setCommentLikes(likesObj);
    }
  }, [comments]);

  const handleCommentLike = async (commentId) => {
    try {
      const res = await toggleLike("comment", commentId); // Flask API 호출
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: {
          liked: res.data.liked,
          count: res.data.like_count
        }
      }));
    } catch (err) {
      console.error("댓글 좋아요 실패:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await createComment("review", id, commentText);
    setCommentText("");
    getComments("review", id).then(res => setComments(res.data));
  };

  const handleLike = () => {
    toggleLike("review", review.id)
      .then(res => {
        setLiked(res.data.liked);
        setReview(prev => ({
          ...prev,
          like_count: res.data.like_count
        }));
      })
      .catch(err => console.error(err));
  };

  const fetchComments = () => {
    getComments(id)
      .then(res => {
        if (Array.isArray(res.data)) setComments(res.data);
        else setComments([]);
      })
      .catch(err => console.error(err));
  };

  if (!review) {
    return
  }

  return (
    <div className="board__view-wrap">
      <div className="board__view-inner">
        <div className="top-wrap">
          <div className="top-inner">
            <h3 className="title">{review.title}</h3>
            <div className="info-wrap">
              <p className="info">
                <span className="tit">작성자 :</span>
                &nbsp;
                <span className="txt">{review.user.username}</span>
              </p>
              <p className="info">
                <span className="tit">작성일 :</span>
                &nbsp;
                <span className="txt">{review.created_at}</span>
              </p>
              <p className="info">
                <span className="tit">추천수 :</span>
                &nbsp;
                <span className="txt">{review.like_count}</span>
              </p>
              <p className="info">
                <WishToggleButton className="heart-btn"
                  active={liked}
                  onToggle={() => handleLike()} />
              </p>
            </div>
            {/* <img
              src={
                isWished
                  ? '/images/review/icon-wish-active.png'
                  : '/images/review/icon-wish.png'
              }
              alt="찜"
              onClick={() => setIsWished((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            /> */}
          </div>
        </div>

        <div className="board__content-wrap">
          <div className="board__content">
            <p>
              {review.content}
            </p>
            {Array.isArray(review?.review_image) &&
              review.review_image.map(url => (
                <img key={url} src={`http://localhost:5000/${url}`} />
              ))}

          </div>

          <div className="board__reivew-wrap">
            <div className="title-wrap">
              <h3 className="title">Review</h3>
            </div>
            {/* review list */}
            {comments?.length > 0 ? (
            comments.map(comment => (
              <div className="board__review" key={comment.id}>
                <div className="img-wrap">
                  <img src={`${IMAGE_BASE_URL}static/${comment.user.profile_img}`} />
                </div>
                <div className="board__review-content">
                  <div className="title-wrap">
                    <span className="username">{comment.user.username}</span>
                    <span className="date">{comment.created_at}</span>
                  </div>
                  <p className="content">{comment.content}</p>
                  <div className="review__like-wrap" onClick={() => handleCommentLike(comment.id)}>
                    <img
                      src={
                        commentLikes[comment.id]?.liked
                          ? '/images/common/icon-thumb-up-active.png'
                          : '/images/common/icon-thumb-up.png'
                      }
                      className="icon"
                      alt="추천"
                    />
                    <span className="like-count">
                      {commentLikes[comment.id]?.count ?? comment.like_count}
                    </span>
                  </div>
                </div>
              </div>
            ))):(<p className='no-result'>등록된 리뷰가 없습니다.</p>)}
            {/* end review list */}
            <div className="board__review-form">
              <form onSubmit={handleSubmit}>
                <div className="img-wrap">
                  <img src={`${IMAGE_BASE_URL}static/${user?.user_img}`} />
                </div>
                <input type="text" value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="댓글을 작성해주세요" />
                <button type="submit">등록</button>
              </form>
            </div>

            <div className="btn-wrap">
              <Link to='/review'> <button className="btn-list">목록</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailPage;
