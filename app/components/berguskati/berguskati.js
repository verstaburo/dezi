// export default function BerguskatiVideo() {
//   const video = document.querySelector('#y-video');

//   if (video) {
//     const tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     const firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     const player = null;

//     function onYouTubeIframeAPIReady() {
//       player = new YT.Player('y-video', {
//         playerVars: {
//           autoplay: 1,
//           controls: 0,
//         },
//         events: {
//           onReady: onPlayerReady,
//         },
//       });
//     }

//     function onPlayerReady(event) {
//       event.target.playVideo();
//     }
//   }
// }
