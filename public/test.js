var profile = document.getElementById('change-profile');
var myfav = document.getElementById('change-myfav');
var mycomment = document.getElementById('change-mycomment');
var booking =  document.getElementById('change-history');
function change(x){
    if(x==profile){
        profile.style.display='block';
        myfav.style.display='none';
        mycomment.style.display='none';
        booking.style.display='none';
    }else if(x==myfav){
        profile.style.display='none';
        myfav.style.display='block';
        mycomment.style.display='none';
        booking.style.display='none';
    }else if(x==mycomment){
        profile.style.display='none';
        myfav.style.display='none';
        mycomment.style.display='block';
        booking.style.display='none';
    }else if(x==booking){
        profile.style.display='none';
        myfav.style.display='none';
        mycomment.style.display='none';
        booking.style.display='block';
    }
}

function areYouSureEdit() {
    swal({
        title: "Are you sure you wish to edit this record?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes!',
        closeOnConfirm: false,
    }.then((value) => {
      if(value){
               //bring edit page
         }else{
           //write what you want to do
          }
     }) 
)};

// function areYouSureDelete() {
//     swal({   title: "Your account will be deleted permanently!",   
//     text: "Are you sure to proceed?",   
//     type: "warning",   
//     showCancelButton: true,   
//     confirmButtonColor: "#DD6B55",   
//     confirmButtonText: "Remove My Account!",   
//     cancelButtonText: "I am not sure!",   
//     closeOnConfirm: false,   
//     closeOnCancel: false }, 
//     function(isConfirm){   
//         if (isConfirm) 
//     {   
//         swal("Account Removed!", "Your account is removed permanently!", "success");   
//         } 
//         else {     
//             swal("Hurray", "Account is not removed!", "error");   
//             } });
// }