import "./style.css";

document.getElementById("searchBar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log(e.target.value);
  }
});
