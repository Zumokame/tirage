document.addEventListener("DOMContentLoaded", () => {
  
    const titleInput = document.getElementById("title");
    const usersInput = document.getElementById("users");
    const categoriesInput = document.getElementById("categories");
    const drawButton = document.getElementById("draw-button");
    const printButton = document.getElementById("print-button");
    const resultsDiv = document.getElementById("results");

    // Gestion de la fenêtre modale
    const modal = document.getElementById("instructions-modal");
    const openModalBtn = document.getElementById("open-instructions");
    const closeModalBtn = document.getElementsByClassName("close")[0];

    // Ouvrir la fenêtre modale
    openModalBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Fermer la fenêtre modale en cliquant sur le 'x'
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Fermer la fenêtre modale en cliquant en dehors
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
     // Fonction pour mélanger aléatoirement un tableau
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    // Ajouter un écouteur d'événement au bouton de tirage
    drawButton.addEventListener("click", () => {
        // Récupérer les valeurs des champs de saisie
        const title = titleInput.value.trim();
        let users = usersInput.value.trim().split("\n").filter(u => u !== "");
        let categories = categoriesInput.value.trim().split("\n").filter(c => c !== "");

        // Vérifier si le titre et la liste des utilisateurs sont remplis
        if (!title || users.length === 0) {
            alert("Veuillez remplir le titre et la liste des utilisateurs !");
            return;
        }
        // Si aucune catégorie n'est spécifiée, en créer automatiquement
        if (categories.length === 0) {
            categories = users.map((_, i) => `Catégorie ${i + 1}`);
        }

        // Mettre à jour le titre de l'application
        document.getElementById("app-title").textContent = title;
        resultsDiv.innerHTML = "";

        // Mélanger les utilisateurs et les catégories
        const shuffledUsers = shuffleArray([...users]);
        const shuffledCategories = shuffleArray([...categories]);

        // Créer la structure de la table
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Ajouter l'en-tête de la table
        thead.innerHTML = `
            <tr>
                <th>Catégorie</th>
                <th>Utilisateur</th>
            </tr>
        `;
        
          // Remplir le corps de la table avec les résultats du tirage
        shuffledUsers.forEach((user, index) => {
            const category = shuffledCategories[index % shuffledCategories.length];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${category}</td>
                <td>${user}</td>
            `;
            tbody.appendChild(row);
        });

        // Assembler la table et l'ajouter à la div des résultats
        table.appendChild(thead);
        table.appendChild(tbody);
        resultsDiv.appendChild(table);

        // Afficher le bouton d'impression
        printButton.style.display = "block";
    });

      // Ajouter un écouteur d'événement au bouton d'impression
    printButton.addEventListener("click", () => {
        window.print();
    });
});
