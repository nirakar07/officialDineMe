$('#datetimepicker1').on('click', function(){
    $('#datetime').val($(this).text());
});

$('#demolist1 li').on('click', function(){
    $('#datebox1').val($(this).text());
});

$('#demolist2 li').on('click', function(){
    $('#datebox2').val($(this).text());
});

$('#demolist3 li').on('click', function(){
    $('#datebox3').val($(this).text());
});

$('#demolist4 li').on('click', function(){
    $('#datebox4').val($(this).text());
});

$('#calendar span').on('click', function(){
    $('#datetime').val($(this).text());
});
