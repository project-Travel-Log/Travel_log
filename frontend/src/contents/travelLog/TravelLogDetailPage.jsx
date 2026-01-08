import React,{useState} from 'react'

const TravelLogDetailPage=()=>{
 const [replyOpen1,setReplyOpen1]=useState(false)
 const [replyOpen2,setReplyOpen2]=useState(false)

 const [like1,setLike1]=useState(false)
 const [likeCount1,setLikeCount1]=useState(14)

 const [like2,setLike2]=useState(false)
 const [likeCount2,setLikeCount2]=useState(14)

 const [replyLike1_1,setReplyLike1_1]=useState(false)
 const [replyLikeCount1_1,setReplyLikeCount1_1]=useState(14)

 const [replyLike1_2,setReplyLike1_2]=useState(false)
 const [replyLikeCount1_2,setReplyLikeCount1_2]=useState(14)

 const [replyLike2_1,setReplyLike2_1]=useState(false)
 const [replyLikeCount2_1,setReplyLikeCount2_1]=useState(14)

 const [replyLike2_2,setReplyLike2_2]=useState(false)
 const [replyLikeCount2_2,setReplyLikeCount2_2]=useState(14)

 const toggleLike=(liked,setLiked,count,setCount)=>{
  setLiked(!liked)
  setCount(liked?count-1:count+1)
 }

 return(
  <>
   <div className="tld-container">
    <img src="/images/review/reviewdetail.png" alt=""/>
    <div className="tld-container-text">
     <h1>게시글 제목</h1>
     <span>닉네임 | 2025.12.11</span>
    </div>
   </div>

   <div className="tld-wrap">
    <div className="tld-content">
     <img src="/images/review/tldsample.png" alt=""/>
     <p>
      여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다.여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다.여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다.
     </p>
    </div>

    <div className="tld-comment-section">
     <h3>댓글 6개</h3>

     <div className="tld-comment">
      <div className="tld-comment-profile"></div>
      <div className="tld-comment-content">
       <div className="tld-comment-header">
        <span className="tld-comment-user">닉네임</span>
        <span className="tld-comment-date">2025.12.11</span>
       </div>

       <p className="tld-comment-text">댓글 1</p>

       <div className="tld-comment-action-row">
        <div className="tld-comment-like" onClick={()=>toggleLike(like1,setLike1,likeCount1,setLikeCount1)}>
         <img src={like1?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
         <span className="tld-comment-like-count">{likeCount1}</span>
        </div>
        <span className="tld-comment-write">댓글 달기</span>
       </div>

       <div className="tld-comment-reply" onClick={()=>setReplyOpen1(!replyOpen1)}>
        <img src={replyOpen1?'/images/common/icon-up-arrow.png':'/images/common/icon-down.png'} className="tld-comment-arrow" alt=""/>
        <span className="tld-comment-add">답글 2개</span>
       </div>

       {replyOpen1&&(
        <div className="tld-reply-list">
         <div className="tld-reply">
          <div className="tld-comment-profile"></div>
          <div className="tld-comment-content">
           <div className="tld-comment-header">
            <span className="tld-comment-user">닉네임</span>
            <span className="tld-comment-date">2025.12.11</span>
           </div>
           <p className="tld-comment-text">대댓글 1</p>
           <div className="tld-comment-action-row">
            <div className="tld-comment-like" onClick={()=>toggleLike(replyLike1_1,setReplyLike1_1,replyLikeCount1_1,setReplyLikeCount1_1)}>
             <img src={replyLike1_1?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
             <span className="tld-comment-like-count">{replyLikeCount1_1}</span>
            </div>
            <span className="tld-comment-write">댓글 달기</span>
           </div>
          </div>
         </div>

         <div className="tld-reply">
          <div className="tld-comment-profile"></div>
          <div className="tld-comment-content">
           <div className="tld-comment-header">
            <span className="tld-comment-user">닉네임</span>
            <span className="tld-comment-date">2025.12.11</span>
           </div>
           <p className="tld-comment-text">대댓글 2</p>
           <div className="tld-comment-action-row">
            <div className="tld-comment-like" onClick={()=>toggleLike(replyLike1_2,setReplyLike1_2,replyLikeCount1_2,setReplyLikeCount1_2)}>
             <img src={replyLike1_2?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
             <span className="tld-comment-like-count">{replyLikeCount1_2}</span>
            </div>
            <span className="tld-comment-write">댓글 달기</span>
           </div>
          </div>
         </div>
        </div>
       )}
      </div>
     </div>

     <div className="tld-comment">
      <div className="tld-comment-profile"></div>
      <div className="tld-comment-content">
       <div className="tld-comment-header">
        <span className="tld-comment-user">닉네임</span>
        <span className="tld-comment-date">2025.12.10</span>
       </div>

       <p className="tld-comment-text">댓글 2</p>

       <div className="tld-comment-action-row">
        <div className="tld-comment-like" onClick={()=>toggleLike(like2,setLike2,likeCount2,setLikeCount2)}>
         <img src={like2?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
         <span className="tld-comment-like-count">{likeCount2}</span>
        </div>
        <span className="tld-comment-write">댓글 달기</span>
       </div>

       <div className="tld-comment-reply" onClick={()=>setReplyOpen2(!replyOpen2)}>
        <img src={replyOpen2?'/images/common/icon-up-arrow.png':'/images/common/icon-down.png'} className="tld-comment-arrow" alt=""/>
        <span className="tld-comment-add">답글 2개</span>
       </div>

       {replyOpen2&&(
        <div className="tld-reply-list">
         <div className="tld-reply">
          <div className="tld-comment-profile"></div>
          <div className="tld-comment-content">
           <div className="tld-comment-header">
            <span className="tld-comment-user">닉네임</span>
            <span className="tld-comment-date">2025.12.10</span>
           </div>
           <p className="tld-comment-text">대댓글 3</p>
           <div className="tld-comment-action-row">
            <div className="tld-comment-like" onClick={()=>toggleLike(replyLike2_1,setReplyLike2_1,replyLikeCount2_1,setReplyLikeCount2_1)}>
             <img src={replyLike2_1?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
             <span className="tld-comment-like-count">{replyLikeCount2_1}</span>
            </div>
            <span className="tld-comment-write">댓글 달기</span>
           </div>
          </div>
         </div>

         <div className="tld-reply">
          <div className="tld-comment-profile"></div>
          <div className="tld-comment-content">
           <div className="tld-comment-header">
            <span className="tld-comment-user">닉네임</span>
            <span className="tld-comment-date">2025.12.10</span>
           </div>
           <p className="tld-comment-text">대댓글 4</p>
           <div className="tld-comment-action-row">
            <div className="tld-comment-like" onClick={()=>toggleLike(replyLike2_2,setReplyLike2_2,replyLikeCount2_2,setReplyLikeCount2_2)}>
             <img src={replyLike2_2?'/images/common/icon-thumb-up-active.png':'/images/common/icon-thumb-up.png'} className="tld-comment-like-icon" alt=""/>
             <span className="tld-comment-like-count">{replyLikeCount2_2}</span>
            </div>
            <span className="tld-comment-write">댓글 달기</span>
           </div>
          </div>
         </div>
        </div>
       )}
      </div>
     </div>

     <div className="tld-comment-input">
      <div className="tld-comment-profile2"></div>
      <input type="text" placeholder="댓글을 작성해주세요"/>
      <button>작성</button>
     </div>

    </div>
   </div>
  </>
 )
}

export default TravelLogDetailPage
