
const url = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3||0x8)).toString(16);
    });
    return uuid;
}



export const getCategoryPosts = (category) => (
    fetch(`${url}/${category}/posts`, { headers })
        .then(res => res.json())
);

export const getAllPosts = () => (
 fetch(`${url}/posts`, { headers })
   .then(res => res.json())
);

export const fetchCategories = () => {
//console.log("API: inside fetchCategories")
 const u = `${url}/categories`
 return fetch(u, { headers} )
   .then( res => res.text() )
   .then((data) => JSON.parse(data))
}

export const fetchPostsByCategory = (category) => {
 const u = `${url}/${category}/posts`
 return fetch(u, { headers: headers} )
  .then(res => res.json())
}
///

export const fetchPostById = (postId) => (
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())
  //  .then(data => data.post)
);

export const votePost = (id, values) => (
  fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    }).then(res => res.json())
  )
   //.then(res => res.json())

/*
  export const voteUpPostById = (id,vote) =>
    fetch(`${url}/posts/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voteScore:vote + 1
       })
    }).then(res => res.json())
*/
/*
export const voteCommentById = (id,vote) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ voteScore:vote
     })
  }).then(res => res.json())
*/
  export const voteComment = (id, option) => (
    fetch(`${url}/comments/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(option)
    }).then(res => res.json())

)
export const updatePostById = (id,title,body) =>
  fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title:title,
      body:body
     })
  }).then(res => res.json())

export const updateCommentById = (id,body) =>
  fetch(`${url}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp:Date.now(),
      body:body
     })
  }).then(res => res.json())

  export const deleteCommentById = (id) =>
    fetch(`${url}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleted:true
       })
    }).then(res => res.json())

//Sets the deleted flag for a post to 'true'.
//Sets the parentDeleted flag for all child comments to 'true'.
export const deletePostById = (id) =>
  fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      deleted:true
     })
  }).then(res => res.json())

export const fetchCommetsByPostId = (postId) =>
(
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
  );

export const fetchPostCommentsCount = (id) => (
    fetch(`${url}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(res => res.length)
)

export const fetchCommentById = (commentId) => (
  fetch(`${url}/comments/${commentId}`, { headers })
    .then(res => res.json())
    //.then(data => data.comment)
);

export const fetchPost = (id) => (
    fetch(`${url}/posts/${id}`, { headers })
        .then(res => res.json())
);

export const addPost = (body) => (
    fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
)

/*
export const addPost = (title, body, author, category) =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:create_UUID(),
      title:title,
      body:body,
      author:author,
      category:category
     })
  }).then(res => res.json())
*/
  export const editPost = (id, body) => (
    fetch(`${url}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  );

export const addCommentToPost = (postId, body, author) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id:create_UUID(),
      timestamp:Date.now(),
      body:body,
      author:author,
      parentId:postId
     })
  }).then(res => res.json())

  export const addComment = (body) => (
      fetch(`${url}/comments`, {
          method: 'POST',
          headers: {
              ...headers,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => res.json())
  )

export const fetchComment = (id) => (
    fetch(`${url}/comments/${id}`, {
        headers
    }).then(res => res.json())
);

export const editComment = (id, body) => (
    fetch(`${url}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  );


export const getAllCategories = () => (
    fetch(`${url}/categories`, { headers })
        .then(res => res.json())
        .then(res => res.categories)
);


export const voteUpCommentById = (id,vote) =>
  fetch(`${url}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ voteScore: vote + 1
     })
  }).then(res => res.json())
export const update = (book, shelf) =>
  fetch(`${url}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${url}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
