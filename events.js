document.addEventListener("DOMContentLoaded", function () {
  const partyList = document.getElementById("party-list");
  const addPartyForm = document.getElementById("add-party");
  const apiUrl =
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-PT/events";

// Function to fetch and display parties
  async function renderParties() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch parties");
      const parties = await response.json();
      console.log(parties);

      partyList.innerHTML = "";
      parties.data.forEach((party) => {
        const partyItem = document.createElement("div");
        partyItem.classList.add("party-item");
        partyItem.innerHTML = `
                    <strong>${party.name}</strong> - ${party.date}, ${party.time}<br>
                    Location: ${party.location}<br>
                    Description: ${party.description}<br>
                    <button class="delete-btn" data-id="${party.id}">Delete</button>
                `;
        partyList.appendChild(partyItem);

        // Add event listener to delete button
        const deleteButton = partyItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteParty(party.id));
      });
    } catch (error) {
      console.error("Error rendering parties:", error);
    }
  }

  // Function to delete party
  async function deleteParty(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete party");
      await renderParties(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  }

  // Event listener for add party form submission
  addPartyForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date: new Date(date), location, description }),
      });
      if (!response.ok) throw new Error("Failed to add party");
      await renderParties(); // Refresh the list after adding
      addPartyForm.reset(); // Clear form fields
    } catch (error) {
      console.error("Error adding party:", error);
    }
  });

  // Initial rendering of parties
  renderParties();
});
