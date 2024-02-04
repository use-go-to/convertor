const guitarStrings = {
    'E': ['E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'],
    'A': ['A1', 'A#1', 'B1', 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'],
    'D': ['D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'],
    'G': ['G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'],
    'B': ['B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5'],
    'M': ['E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5']
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
    var inputText = rectangleNameInput.value.toUpperCase();

    // Utiliser une expression régulière pour trouver tous les accords dans le texte d'entrée
    var chordMatches = inputText.match(/\(.*?\)/g);

    if (chordMatches) {
        for (var i = 0; i < chordMatches.length; i++) {
            var currentChord = chordMatches[i].replace(/[()]/g, '').trim();

            if (isValidChordSyntax(currentChord)) {
                // Éclairer les touches correspondantes à l'accord
                highlightNotesInChord(currentChord);
            } else {
                alert("Syntaxe d'accord invalide. Utilisez des accords comme (e4), (a6), etc.");
                return; // Arrêtez la fonction si la syntaxe de l'accord est invalide
            }
        }
    } else {
        // Aucun accord trouvé dans la recherche, éclairer les touches individuelles
        var rectangleNames = inputText.split('/');

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
    }

    // Réinitialiser la valeur de l'input après avoir éclairé les notes
    rectangleNameInput.value = '';
}

function isValidChordSyntax(chord) {
    const regex = /^[EADGBM][0-9]+$/;
    return regex.test(chord);
}





function highlightNotesInChord(chord) {
    const validStrings = Object.keys(guitarStrings);

    // Vérifier si la lettre entre les parenthèses est 'e' ou 'a'
    let isEChord = /^e[0-9]+$/i.test(chord);
    let isAChord = /^a[0-9]+$/i.test(chord);

    if (!isEChord && !isAChord) {
        alert("Seuls les accords avec la lettre 'e' ou 'a' sont pris en charge. Utilisez des accords comme (e4), (a6), etc.");
        return;
    }

    const string = chord[0].toUpperCase();
    const fret = parseInt(chord.substring(1));

    if (isNaN(fret) || fret <= 0 || fret > 20) {
        alert("Syntaxe d'accord invalide. Utilisez des accords comme (e4), (a6), etc.");
        return; // Arrêtez la fonction si la syntaxe de l'accord est invalide
    }

    // Éclairer les touches correspondantes à l'accord (barré)
    for (let i = 0; i < 4; i++) {
        const currentString = validStrings[(validStrings.indexOf(string) + i) % validStrings.length];
        let offset;

        // Choix de l'offset en fonction de la lettre entre les parenthèses
        if (isEChord) {
            offset = (currentString === 'D') ? -2 : (currentString === 'G') ? -5 : 0;
        } else if (isAChord) {
            // Ajoutez ici la logique spécifique pour 'a'
            offset = (currentString === 'G') ? -2 : (currentString === 'B') ? -5 : 0;
        }

        const correspondingNote = guitarStrings[currentString][fret - 0 + i * 2 + offset];

        toggleHighlightRectangle(correspondingNote);
    }
}
















































function isValidRectangleName(name) {
    const regex = /^[EADGBM][0-9]+$/;
    return regex.test(name);
}

function getCorrespondingRectangleId(chord) {
    const string = chord[0].toUpperCase();
    const fret = parseInt(chord.substring(1));

    const validStrings = Object.keys(guitarStrings);

    if (!validStrings.includes(string) || isNaN(fret) || fret < 0 || fret > 20) {
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
