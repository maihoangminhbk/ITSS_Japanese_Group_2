import React from 'react';
import renderHTML from 'react-render-html';

export default ({match: {params: {id}}, history, posts, handleBookmark, handleRemoveBookmark, handleRemove}) => {
  let post = posts.filter(post => post.id === id);
  post = post[0];
  
  return (
    <div className="single-post">
      <h1 className="header">{post.title}</h1>
      {renderHTML(post.body)}
      <ul className="post-foot">
        <li>{post.bookmark ? <button className="btn btn-remove-bookmarks" onClick={() => handleRemoveBookmark(post)} >ブックマークから削除</button> : <button className="btn btn-bookmarks" onClick={() => handleBookmark(post)} >ブックマークに追加</button>}</li>
        <li><button className="btn btn-remove" onClick={()=>handleRemove(post, history)}>削除</button></li>
      </ul>
    </div>
  )
}
