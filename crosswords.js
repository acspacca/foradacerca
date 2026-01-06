var grid = [['0,0',	'1,0', '1,0', '1,0', '1,0', '1,0', '1,0', '0,0', '0,0', '0,10'],
			['0,0', '1,1', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,10'],
			['0,0', '1,1', '0,0', '0,3', '0,0', '0,0', '0,0', '7,0', '0,0', '0,10'],
			['2,0', '2,1', '2,0', '2,3', '2,0', '0,0', '0,9', '7,9', '0,9', '10,9'],
			['2,0', '0,0', '0,0', '0,3', '0,0', '0,0', '0,0', '7,0', '0,0', '0,10'],
			['2,4', '4,0', '4,0', '4,3', '4,0', '4,0', '0,0', '7,0', '0,0', '0,0'],
			['2,0', '0,0', '0,0', '0,3', '0,0', '0,0', '0,0', '7,0', '0,0', '0,8'],
			['2,0', '0,0', '5,0', '5,3', '5,0', '5,0', '5,0', '5,7', '5,0', '5,8'],
			['2,0', '0,0', '0,0', '0,3', '0,0', '0,0', '0,0', '0,0', '0,0', '0,8'],
			['0,0', '0,0', '6,0', '6,3', '6,0', '6,0', '6,0', '0,0', '0,0', '0,8'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '0,0']
        ];

var lit_cells = [[0,5],[0,9],[3,9],[4,3],[9,5]];

$.each(grid, function(i){

    var row = $('<tr></tr>');

	$.each(this, function(j){

        if(this == '0,0'){
        	$(row).append('<td class="empty square"></td>');  
        }
        else{
            
            var starting_number = '';
            var question_number_span = '';
            var question_number = String(grid[i][j]).split(",");
            
            for(var k = 0; k < question_number.length; k++){

                var direction = get_direction(question_number[k]);
                var startpos = get_startpos(question_number[k],direction);
                
                if(direction == "horizontal" && startpos[0] == i && startpos[1] == j){
                    starting_number += question_number[k] + ",";
                                
                }
                else if(direction == "vertical" && startpos[0] == j && startpos[1] == i){
                    starting_number += question_number[k] + ",";
                }              
                
            }
            if(starting_number != ""){
                question_number_span = '<span class="question_number">' + starting_number.replace(",", "") + '</span>';   
            }
            
            if(lit_cells.some(cell => cell[0] === i && cell[1] === j)){
                $(row).append('<td>' + question_number_span + '<div class="light letter square" data-number="' + this + '" contenteditable="true"></div></td>'); 
            } else {  
                $(row).append('<td>' + question_number_span + '<div class="letter square" data-number="' + this + '" contenteditable="true"></div></td>'); 
            }
        }
    });
    $("#crosswords").append(row);
});

function get_direction(question_number){
    for(var i = 0; i < grid.length; i++){
    	for(var j = 0; j < grid[i].length; j++){
            if(String(grid[i][j]).indexOf(question_number) != -1){            
                if(grid[i+1][j].indexOf(question_number)>-1 || (grid[i-1][j].indexOf(question_number)>-1)){
                    return "vertical";
                }
                if(grid[i][j+1].indexOf(question_number)>-1 || grid[i][j-1].indexOf(question_number)>-1){
                    return "horizontal";
                }
            }
    	}
    }
}

function get_startpos(question_number,direction){
	if(direction == "horizontal"){
       for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                if(String(grid[i][j]).indexOf(question_number) != -1){            
                    return [i, j];
                }
            }
        }
    }
    else if(direction == "vertical"){
       for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                if(String(grid[j][i]).indexOf(question_number) != -1){            
                     return [i, j];
                }
            }
        }
    }
}
