document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const list = document.getElementById("schoolList");

  let schoolsData = [];

  fetch("schools.json")
    .then((res) => res.json())
    .then((data) => {
      schoolsData = data;
      renderSchools(data); // initially show all
    });

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = schoolsData.filter((school) =>
      school.name.toLowerCase().includes(query) ||
      school.location.toLowerCase().includes(query) ||
      school.curriculum.toLowerCase().includes(query) ||
      school.language.toLowerCase().includes(query)
    );
    renderSchools(filtered);
  });

  function renderSchools(schools) {
    list.innerHTML = schools.map((school) => `
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
        <h3>${school.name}</h3>
        <p><strong>Location:</strong> ${school.location}</p>
        <p><strong>Curriculum:</strong> ${school.curriculum}</p>
        <p><strong>Language:</strong> ${school.language}</p>
        <p><strong>Tuition:</strong> $${school.tuition_per_year_usd}</p>
        <p><strong>Rating:</strong> ⭐ ${school.rating}</p>
      </div>
    `).join("");
  }
});
