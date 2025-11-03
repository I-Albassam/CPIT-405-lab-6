function setC(n, v, days) {
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = n + "=" + encodeURIComponent(v) + ";expires=" + d.toUTCString() + ";path=/";
}
function getC(n) {
  const parts = document.cookie.split(";");
  for (let p of parts) {
    p = p.trim();
    if (p.startsWith(n + "=")) return decodeURIComponent(p.split("=")[1]);
  }
  return null;
}
function delC(n) { document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"; }

const likeEl = document.getElementById("numLike");
const dislikeEl = document.getElementById("numDislike");
const listEl = document.getElementById("list");
const txtEl = document.getElementById("txt");

let likes = Number(getC("likes")) || 0;
let dislikes = Number(getC("dislikes")) || 0;
let vote = getC("vote");
let comment = getC("comment");

likeEl.textContent = likes;
dislikeEl.textContent = dislikes;

if (comment) {
  const li = document.createElement("li");
  li.textContent = comment;
  listEl.appendChild(li);
}

document.getElementById("like").onclick = () => {
  if (vote) return;
  likes += 1;
  setC("likes", likes, 30);
  setC("vote", "like", 30);
  vote = "like";
  likeEl.textContent = likes;
};

document.getElementById("dislike").onclick = () => {
  if (vote) return;
  dislikes += 1;
  setC("dislikes", dislikes, 30);
  setC("vote", "dislike", 30);
  vote = "dislike";
  dislikeEl.textContent = dislikes;
};

document.getElementById("send").onclick = () => {
  const t = txtEl.value.trim();
  if (!t) return;
  if (comment) return;
  comment = t;
  setC("comment", t, 30);
  const li = document.createElement("li");
  li.textContent = t;
  listEl.appendChild(li);
  txtEl.value = "";
};

document.getElementById("reset").onclick = () => {
  delC("likes");
  delC("dislikes");
  delC("vote");
  delC("comment");
  location.reload();
};
