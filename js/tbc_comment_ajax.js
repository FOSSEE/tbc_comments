 
$(document).ready(function(e){

    var basePath = Drupal.settings.basePath;
    var modPath = basePath + "comments/";
    var modPath1 = basePath + "comments/books/";
    var modPath2 = basePath + "comments/books/all";
    var modPath3 = basePath + "comments/forms/";
    var modPath4 = basePath + "comments/rand/";
//function changeLikeDislike(type,id){

$(".likebt").click(function(){
    console.log("Like");

var type = $(this).attr('data-name');
var id = $(this).attr('data-bid');
      console.log("###");
      var dataString = 'id='+ id + '&type=' + type;
      $("#product_flash_"+id).show();
      $("#product_flash_"+id).fadeIn(400).html('<img src="' +basePath+'sites/all/modules/tbc_comments/image/loading.gif" />');      
      console.log(dataString);
      $.ajax({
      type: "POST",
      url: modPath + "ajax/",
      data: dataString,
      cache: false,
      success: function(result){
       console.log("Like");
       console.log(result);
       $('#product_like_'+ id).html(result);  
              
      }
      });
});

$(".dislikebt").click(function(){
var type = $(this).attr('data-name');
var id = $(this).attr('data-bid');
      console.log("###");
      var dataString = 'id='+ id + '&type=' + type;
      $("#product_flash_"+id).show();
      $("#product_flash_"+id).fadeIn(400).html('<img src="' +basePath+'sites/all/modules/tbc_comments/image/loading.gif" />');            
      console.log(dataString);
      $.ajax({
      type: "POST",
      url: modPath + "ajax/",
      data: dataString,
      cache: false,
      success: function(result){
       console.log("disLike");
        console.log(result);       
       $('#product_dislike_'+ id).html(result);              
      }
      });
      
      
});
			
	
$(".popup_comment_box").hide();
$(".comment_click").click(function() {


var cid = $(this).attr('data-bookid');
$('#popup_box_'+ cid).fadeIn("slow");
            $("#container").css({ // this is just for style
                "opacity": "0.3"  
            });
            
var datastring = 'id=' + cid;
console.log(datastring);
           $.ajax({
             type: "POST",
             url: modPath3 + "ajax/",
             data: datastring,             
             cache: false,
             success: function(data){
             console.log("TTTTT");
             console.log(data);
           
       $('#wrap_box_'+ cid).html(data);
              
          }    
            
            
      });

 });
 
  $(this).on('click', '.close_box',function() { 
              $(".popup_comment_box").fadeOut("slow");
                  $("#container").css({ // this is just for style        
                  "opacity": "1"  
                  }); 
                  
 }); 

 
 /*$(this).on('keyup','#rand_num',function(e) {  
      var num_input = $(this).val();
      var input_num = $(this).attr('data-num');
 
       if( num_input != input_num){
       
      $('.submit_form').val('Submit Comment').attr('disabled', 'disabled');
       e.preventDefault();
      
      }else{
     
    $('.submit_form').val('Submit Comment').removeAttr('disabled');
     e.preventDefault(); 
     
     
      }
              
 });*/
 
 $(this).on('click', '.submit_form', function() {
 
 var num_input = $('#rand_num').val();
 if (num_input.length > 0){

  var input_num = $('#rand_num').attr('data-num');
   if( num_input == input_num){
 
     
    var form = $('form');	
	var submit = $('.submit_form');  
	form.on('submit', function(e) {
	
		// prevent default action
		//e.preventDefault();
		$('#rand_num').val('');
		rand_refresh();		
		e.stopImmediatePropagation();
		
		// send ajax request
		$.ajax({
			url: modPath1 + "ajax/",
			type: 'POST',
			//cache: false,
			data: form.serialize(), //form serizlize data
			beforeSend: function(){
			console.log('###');
				// change submit button value text and disabled it
				console.log(form.serialize());
				submit.val('Submitting...').attr('disabled', 'disabled');
			},
			success: function(data){
			console.log(item);
				
				var item = $(data).hide().fadeIn(800);
				console.log('sssss');
				console.log(item);
				$('#comment-block').prepend(item);
				

				// reset form and button
				form.trigger('reset');				
						
				submit.val('Submit Comment').removeAttr('disabled');
				
			},
			error: function(e){
				alert(e);
			}
		});
			
		return false;
		

	});
	
	 
	}else{
	alert("Incorrect value, please insert again");
	
	$(".num_input").css({ // this is just for style
         "border":  "1px solid red"  
                  }); 
                  return false;	
	}
	
}
else{
         alert("Please insert value");
         $(".num_input").css({ // this is just for style
           "border":  "1px solid red"  
                  }); 
         return false;
}

});

function rand_refresh()
{
 $.ajax({
      type: "POST",
      url: modPath4 + "ajax/",
      //data: dataString,
      cache: false,
      success: function(result){
      console.log(result);       
       $('#rand_fun').html(result);
              
      }
      
      });

}

});



