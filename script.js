/* fetch('demo.json')
    .then(res => {
        console.log(res);
        return res.json();
        res.json()
    })
    .then(json => console.log(json)); */

/* fetch('https://unsplash.it/600/400')
   .then(res => res.blob())
   .then(blob => {
       let img = document.createElement('img');
       img.src = URL.createObjectURL(blob);
       document.querySelector('body').appendChild(img)
   }) */

const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
    .catch(err => console.error(err));

async function getData() {
    const postStream = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postStream.json();


    console.log(posts);

    posts.forEach((post, i) => {
        if (i < 12) {
            const title = post.title;
            const body = post.body;

            fetch('https://unsplash.it/300/200')
                .then(res => res.blob())
                .then(blob => {

                    const newPost = document.importNode(postTemplate.content, true);

                    const postTitle = newPost.querySelector('.post_title');
                    const postBody = newPost.querySelector('.post_body');
                    const postImage = newPost.querySelector('.post_img');

                    postImage.src = URL.createObjectURL(blob);
                    postTitle.innerText = title;
                    postBody.innerText = body;
                    postSection.appendChild(newPost);
                })

                .catch(err => console.error(err));
        }
    })

}

const newPost = {
    title: 'New Post Title',
    body: 'Awesome Post Paragraph',
    userId: 1
}

const createNewPost = post => {
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch('https://jsonplaceholder.typicode.com/posts', options)
        .then(res => res.json())
        .then(posts => console.log(post))
        .catch(err => console.error(err))

}

createNewPost(newPost);
