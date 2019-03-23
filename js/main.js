let questionText;
let number;
let correct=0;
let total=0;

$('#hardGroup').show();
$('#easyGroup').hide();

function update() {
    $('#correct').text(correct);
    $('#total').text(total);
    $('#textForm').val("");
    $.get('http://numbersapi.com/random/trivia', function(data) {
        number =  parseInt(data, 10);
        //$('#test').text(number);
        $.get('http://numbersapi.com/'+number+"/trivia?fragment", function(data){
            questionText = data;
            $('#number').text(data);
        });
        console.log(number);
        updateMult();
    });



}

function updateMult() {
    //update the multiply choice text
    let highest = number + Math.floor(number/2) + 1;
    console.log("highest "+highest);
    let multAwnsers=[1,2,3,4];
    let correctindex = Math.floor(Math.random()*4);
    for (let i = 0; i < 4; i++) {
        if(i===correctindex) {
            multAwnsers[i]=number;
        }
        else {
            multAwnsers[i]= Math.floor(Math.random()*highest +1);
        }
    }
    $('.choice').each(function (index) {
        $( this ).text( multAwnsers[index]);
    })
}
function go() {
    //this runs from the hard group
    let myAwns = parseInt( $('#textForm').val(), 10);
    let threshold  = Math.floor(.1*number);

    if((Math.abs(myAwns-number))<=threshold) {
        console.log("correct");
        $('.modal-body').text('correct');
        correct=correct+1;
    }
    else {
        $('.modal-body').text('wrong the correct answer is '+number);
    }
    total = total +1;
    $('#myModal').modal({"show":true});
    update();
}
function mult(awns){
    if(awns == number) {
        $('.modal-body').text('correct');
        correct=correct+1;
    } else {
        $('.modal-body').text('wrong the correct answer is '+number);
    }
    $('#myModal').modal({"show":true});
    total = total +1;
    update();
}

$('#go').click(function () {
   go();
});

$('.nav-item').click(function (event) {
    let navText = $(this).text();
    if(navText=='Easy'){
        $('#easyGroup').show();
        $('#hardGroup').hide();
    } else if(navText==='Hard') {
        $('#hardGroup').show();
        $('#easyGroup').hide();
    }
});
$('.choice').click(function (e) {
    //console.log('clicked')
    console.log($(this).text());
    mult($(this).text());
});
$('#getQuestion').click(function () {
    update();
});

document.querySelector('#textForm').addEventListener('keypress', function (e) {
    let key = e.which;
    if (key === 13) { // 13 is enter
        go();
    }
});

update();
