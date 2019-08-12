
  function startTheSearch (){
    $('.start').on('click','.startbutton', function(event){
      //alert('start button pressed');
      $('.hide').css('display','block');
      $('.info').hide();
      $('.apinfo').hide();
      $('.start').hide();
      
      $(searchCountry);
    })

  };

  function searchCountry (){
    $('.searchBlock').on('click', '.search',  function(event){
      // alert('search initiated')
      $('.searchBlock').hide();
      $('.rhide').css('display', 'block');
    })
  }




  function start (){
    $(startTheSearch)
  }

  $(start);