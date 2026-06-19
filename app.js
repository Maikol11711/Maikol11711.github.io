import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const gallery = document.getElementById("gallery");

// 🔥 Cargar logos desde Firebase
async function loadLogos() {
  gallery.innerHTML = ""; // limpiar

  const querySnapshot = await getDocs(collection(db, "logos"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${data.imageUrl || "https://via.placeholder.com/300"}" alt="logo">

      <h3>${data.name || "Sin nombre"}</h3>

      <div class="buttons">
        <button onclick="like('${id}')">👍 ${data.likes || 0}</button>
        <button onclick="dislike('${id}')">👎 ${data.dislikes || 0}</button>
        <button onclick="downloadImage('${data.imageUrl || ""}')">⬇️ Descargar</button>
      </div>

      <small>👀 Vistas: ${data.views || 0}</small>
    `;

    gallery.appendChild(card);

    // 👀 sumar vista automáticamente
    addView(id);
  });
}

// 👍 Like real
window.like = async function (id) {
  const ref = doc(db, "logos", id);

  await updateDoc(ref, {
    likes: increment(1)
  });

  loadLogos();
};

// 👎 Dislike real
window.dislike = async function (id) {
  const ref = doc(db, "logos", id);

  await updateDoc(ref, {
    dislikes: increment(1)
  });

  loadLogos();
};

// 👀 Vista real
async function addView(id) {
  const ref = doc(db, "logos", id);

  await updateDoc(ref, {
    views: increment(1)
  });
}

// ⬇️ Descargar imagen
window.downloadImage = function (url) {
  if (!url) {
    alert("No hay imagen para descargar 😅");
    return;
  }

  const a = document.createElement("a");
  a.href = url;
  a.download = "logo.png";
  a.target = "_blank";
  a.click();
};

// 🚀 iniciar
loadLogos();
