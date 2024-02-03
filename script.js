// Correspondances entre les touches et les notes pour chaque corde de la guitare
const guitarStrings = {
    'E': ['E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2'],
    'A': ['A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2'],
    'D': ['D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3'],
    'G': ['G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3'],
    'B': ['B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'],
    'M': ['E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4']
};

// Liste pour stocker les notes éclairées
let highlightedNotes = [];

function toggleHighlightRectangle(rectangleId) {
    var selectedRectangle = document.getElementById(rectangleId);
    var isHighlighted = selectedRectangle.classList.contains('highlighted');

    if (isHighlighted) {
        selectedRectangle.classList.remove('highlighted');
        // Retirer la note de la liste
        highlightedNotes = highlightedNotes.filter(note => note !== rectangleId);
    } else {
        selectedRectangle.classList.add('highlighted');
        // Ajouter la note à la liste
        highlightedNotes.push(rectangleId);
    }
}

function highlightRectanglesFromInput() {
    var rectangleNameInput = document.getElementById('rectangleName');
    var rectangleNames = rectangleNameInput.value.toUpperCase().split('/');

    for (var i = 0; i < rectangleNames.length; i++) {
        var currentRectangleName = rectangleNames[i].trim();

        if (isValidRectangleName(currentRectangleName)) {
            const correspondingRectangleId = getCorrespondingRectangleId(currentRectangleName);
            toggleHighlightRectangle(correspondingRectangleId);
        } else {
            alert("Note de guitare invalide. Utilisez des noms comme e1, b3, a2, m3, etc.");
            return; // Arrêtez la fonction si un nom de rectangle est invalide
        }
    }

    // Réinitialiser la valeur de l'input après avoir éclairé les notes
    rectangleNameInput.value = '';
}


function isValidRectangleName(name) {
    const regex = /^[EADGBM][0-9]+$/;
    return regex.test(name);
}

function getCorrespondingRectangleId(chord) {
    const string = chord[0].toUpperCase();
    const fret = parseInt(chord.substring(1));

    const validStrings = Object.keys(guitarStrings);

    if (!validStrings.includes(string) || isNaN(fret) || fret < 0 || fret > 12) {
        return null;
    }

    const correspondingNote = guitarStrings[string][fret];

    return correspondingNote;
}

// Fonction pour éteindre la dernière note éclairée
function undoLastHighlight() {
    if (highlightedNotes.length > 0) {
        const lastHighlightedNote = highlightedNotes.pop();
        document.getElementById(lastHighlightedNote).classList.remove('highlighted');
    }
}

// Fonction pour éteindre toute note éclairée
function turnOffAllRectangles() {
    var rectangles = document.querySelectorAll('.rectangle');
    rectangles.forEach(rectangle => {
        rectangle.classList.remove('highlighted');
    });
}

