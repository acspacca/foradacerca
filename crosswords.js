var horizontal_questions = $('<div></div>');
var vertical_questions = $('<div></div>');

var grid = [['0,0',	'0,0', '0,0', '0,0', '1,0', '0,0', '0,0', '0,0', '0,0', '0,0'],
			['0,0', '0,0', '0,0', '0,0', '1,0', '0,0', '0,0', '0,0', '0,0', '0,0'],
			['0,0', '0,0', '0,0', '0,0', '1,0', '0,0', '2,0', '0,0', '0,0', '0,0'],
			['0,0', '3,0', '3,0', '3,0', '3,1', '3,0', '3,2', '3,0', '3,0', '3,4'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '2,0', '0,0', '0,0', '4,0'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '2,0', '0,0', '0,0', '4,0'],
			['0,0', '0,0', '5,0', '5,0', '5,0', '5,0', '2,5', '5,0', '0,0', '4,0'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '2,0', '0,0', '0,0', '4,0'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '2,0', '0,0', '0,0', '0,0'],
			['6,0', '6,0', '6,0', '6,0', '6,0', '6,0', '2,6', '0,0', '0,0', '0,0'],
			['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '2,0', '0,0', '0,0', '0,0']
        ];

var questions = [
                "Para que Mari e Jeru trabalharam a semana toda?", 
                "Jesibel se apovara quando vê?", 
                "O que o caipira do espaço e Timi tem em comum?", 
                "Além de ladrão Zez também é?", 
                "O que encanta o menino ruaceiro?", 
                "Não é comum, mas nessa mata tem?", 
                "O que é bom para te um momento de paz", 
                "Quando em casa como o ruaceiro escapa", 
                "O que a velha usa além de pedras?"
            ];

var answers = [
                "FESTA", 
                "BURACO", 
                "NAVE", 
                "SABUGO", 
                "FRUTA", 
                "PIRAMIDE", 
                "ASSADO", 
                "SONHO", 
                "SOMBRA"
            ];

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
            
            $(row).append('<td>' + question_number_span + '<div class="letter square" data-number="' + this + '" contenteditable="true"></div></td>'); 
        }
    });
    $("#crosswords").append(row);
});

$.each(questions, function(index){
  
    var direction = get_direction(index + 1);
    
    if(direction == "horizontal"){
        $(horizontal_questions).append('<div>' + (index + 1) + ' - '+ questions[index] + '</div>');
    }
    else if(direction == "vertical"){
    	$(vertical_questions).append('<div>' + (index + 1) + ' - '+ questions[index] + '</div>');
    }
    
});

$("#vertical_questions").append(vertical_questions);
$("#horizontal_questions").append(horizontal_questions);

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
