// const appContainer = document.querySelector(".app");
// // const posts = document.querySelectorAll(".post");

// function debounce(cb, delay = 2000) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => cb(...args), delay);
//   };
// }

// window.addEventListener(
//   "scroll",
//   debounce((e) => {
//     Array.from(posts).forEach((post) => {
//       const rect = post.getBoundingClientRect();
//       // console.log(rect.x, rect.y);
//       // console.log(rect);
//       console.log('insideee')

//       const rectTop = rect.top;
//       const rectBottom = rect.bottom;
//     //   postCount(rectTop, rectBottom);
//     });
//   }),
//   false
// );

//* Solution:

const posts = document.querySelectorAll(".post");
const postCount = {};
const timers = {};
const timerPostDelay = 5000;
// timers used to store timer refrences

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0, // full element visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    const postNumber = el.target.textContent;

    if (el.isIntersecting) {
      // becomes true if div is shown fully in viewport
      if (!timers[postNumber]) {
        timers[postNumber] = setTimeout(() => {
          postCount[postNumber] += 1;
          console.log(
            `post ${postNumber} viewed ${postCount[postNumber]} times.`
          );
          // clear the timer after incrementing the count
          timers[postNumber] = null;
        }, timerPostDelay);
      }
    } else {
      // clears timer if post not visible
      if (timers[postNumber]) {
        clearTimeout(timers[postNumber]);
        timers[postNumber] = null;
      }
    }
  });
}, options);

posts.forEach((post) => {
  postCount[post.textContent] = 0;
  timers[post.textContent] = null;
  observer.observe(post);
});
