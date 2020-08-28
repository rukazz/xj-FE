import React ,{ useState} from 'react';

export default function Test() {
  const [resourceType,  setResourceType] = useState('post');

  return(
    <>
      <div>
        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>Posts</button>
        <button onClick={() => setResourceType('comments')}>Posts</button>
      </div>
      <h1>{resourceType}</h1>
  </>
  ) 
}