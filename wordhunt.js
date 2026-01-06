var whgrid = [
    ['C','L','I','P','X','C','L','U','B','E'],
    ['L','I','M','O','E','I','R','O','C','S'],
    ['A','G','B','R','U','X','A','X','A','P'],
    ['N','O','I','T','E','S','E','U','L','A'],
    ['T','C','H','A','V','E','S','R','D','N'],
    ['E','D','E','L','E','I','T','E','E','T'],
    ['R','V','I','V','H','X','R','M','I','A'],
    ['N','E','S','T','U','F','A','U','R','L'],
    ['A','H','A','B','P','E','D','R','A','H'],
    ['S','A','B','A','D','O','A','O','O','O'],
];

for(var i = 0; i < 10; i++) {
    var whrow = $('<tr></tr>');
    for(var j = 0; j < 10; j++) {
        var cell = $("<td class='letter square'>" + whgrid[i][j] + "</td>");
        whrow.append(cell);
    }
    $("#wordhunt").append(whrow);
}