document.addEventListener("DOMContentLoaded", function () {
  const partyList = document.getElementById("party-list");
  const addPartyForm = document.getElementById("add-party");
  const apiUrl =
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-PT/events";

  // Mock data
  let parties = [
    {
      id: 1,
      name: "Tessa turns 6!",
      date: "2024-07-25",
      time: "15:00",
      location: "123 Queens St",
      description: "Come join us as we celebrate Tessa's 6th Birthday!",
    },
    {
      id: 2,
      name: "Office Party",
      date: "2024-08-25",
      time: "20:00",
      location: "250 West Houston St",
      description: "Let's celebrate end of the summer season!",
    },
    {
      id: 3,
      name: "Jenny and Chris's Babyshower",
      date: "2024-09-15",
      time: "15:30",
      location: "16 Riverview Park",
      description:
        "We are happy to welcome a new addition to Jenny and Chris's family! Join us in their babyshower!!",
    },
  ];

  // Function to fetch and display parties
  async function renderParties() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch parties");
      const parties = await response.json();

      partyList.innerHTML = "";
      parties.forEach((party) => {
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
        body: JSON.stringify({ name, date, time, location, description }),
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
