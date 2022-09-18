let profileBox = document.querySelector('#profileBox');

db.child('users').child(UID).get().then(ss=>{
    if(ss.exists()){
        let d = ss.val();
        data.user.name=d.name;
        data.user.email=d.email;
        data.user.profilePicture=d.profilePicture;
        data.user.birthYear=d.birthYear;
        data.user.bio=d.bio;

        show();
    }
})

function show(){
    if(data.user.profilePicture=="default"){
        profileBox.innerHTML=`
    <img src="" width="100px">
    <label>name :${data.user.name}</label><br>
    <label>email: ${data.user.email}</label><br>
    <label>age: ${new Date().getFullYear-data.user.birthYear}</label><br>
    <label>bio: ${data.user.bio}</label>
    `;
    }else{
        profileBox.innerHTML=`
    <img src="${data.user.profilePicture}" width="100px">
    <label>name :${data.user.name}</label><br>
    <label>email: ${data.user.email}</label><br>
    <label>age: ${new Date().getFullYear-data.user.birthYear}</label><br>
    <label>bio: ${data.user.bio}</label>
    `;
    }
    
}