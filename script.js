// HTML se search input ko select kar rahe hain
const searchInput = document.getElementById("searchInput");

// HTML se search button ko select kar rahe hain
const searchButton = document.getElementById("searchButton");

// Saare app cards ko select karke array mein store kar rahe hain
const cards = [...document.querySelectorAll(".app-card")];

// Saare category filter buttons ko select kar rahe hain
const filters = [...document.querySelectorAll(".filter")];

// Apps ki total counting dikhane wale element ko select kar rahe hain
const resultCount = document.getElementById("resultCount");

// Jab koi app nahi milta, tab ye message show hota hai
const emptyMessage = document.getElementById("emptyMessage");

// Starting mein All category selected rahegi
let activeCategory = "All";

// Ye function search aur category ke according apps ko filter karta hai
function updateApps() {
  const query = searchInput.value.trim().toLowerCase(); //Search box mein likhe text ko read karta hai aur trim() extra spces hatata hai aur toLowerCase() small letters mein convert karta hai
  let visible = 0; 

  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase(); 
    const category = card.dataset.category;
     // App ki category HTML ke data-category attribute se 
    const matchesSearch = name.includes(query);
      // Check kar rahe hain ki app selected category mein hai ya nahi
    const matchesCategory = activeCategory === "All" || category === activeCategory;
     //check karta hai ki selected category mein hai ya nahi
    const show = matchesSearch && matchesCategory; 
     // Dono conditions true hone par hi app show hoga

    card.hidden = !show; // match Na hone par hide
    if (show) visible++;
  });

  emptyMessage.hidden = visible !== 0; //na mila to empty show
}

searchButton.addEventListener("click", updateApps);
searchInput.addEventListener("input", updateApps); 

filters.forEach((filter) => {
   // Har category filter button par click event lagaya gaya hai
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    activeCategory = filter.dataset.category;
    updateApps();
  });
});

// Website ke saare download buttons ko
document.querySelectorAll(".download-btn").forEach(button => {
 // download button par click event laga
    button.addEventListener("click", function() {

        let appLink = this.getAttribute("data-link");

        window.open(appLink, "_blank");

    });

});