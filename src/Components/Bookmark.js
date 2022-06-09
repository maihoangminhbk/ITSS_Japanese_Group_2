import React from 'react';
import Bookmarks from './Bookmarks';

export default ({bookmarks}) => {
  return (
    <div className="bookmark-page">
      <h1>ブックマーク</h1>
      <Bookmarks bookmarks={bookmarks} />
    </div>
  )
}
