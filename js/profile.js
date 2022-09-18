let profileBox = document.querySelector('#profileBox');
auth.onAuthStateChanged(user => {
	if(user){
        UID = user.uid;
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
    }else{
        location.href=`../index.html`;
    }
});


function show(){
    profileBox.style=`
    display:flex;
    padding:5px;
    margin:5px;
    flex-direction:column;
    `;
    if(data.user.profilePicture=="default"){
        profileBox.innerHTML=`
<div class="container">
  <div class="row">
        <div class="col-sm">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${data.user.name}</h5>
                    <img src="${data.user.profilePicture}" width="100px" calss="rounded-circle">
                    <label>Email Address: ${data.user.email}</label><br>
                </div>
            </div>
        </div>
        <div class="col-sm">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Biography</h5>
                <h6 class="card-subtitle mb-2 text-muted">age: ${new Date().getFullYear()-parseInt(data.user.birthYear)}</h6>
                <p class="card-text">${data.user.bio}</p>
                <a href="https://cooldevs.netlify.app/pages/browse.html?emailsearch=${btoa(data.user.email)}" class="card-link">Profile Link</a><br><button class="btn btn-dark" onclick="navigator.clipboard.writeText('https://cooldevs.netlify.app/pages/browse.html?emailsearch=${btoa(data.user.email)}');alert('Copied to clipboard.');">Copy Link</button>
                </div>
            </div>
        </div>
        <div class="col-sm">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Creators of this app</h5>
                    <center><img src="https://cooldevs.netlify.app/img/fav.png" width="100px"></center>
                    <br>
                    This web application is created by Cool-Devs. <a href="https://cooldevs.netlify.app/" class="card-link">Click here to visit our website.</a>
                </div>
            </div>
        </div>
  </div>
</div>

    

    `;
    }else{
        profileBox.innerHTML=`
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.user.name}</h5>
                        <img src="${data.user.profilePicture}" width="100px" class="rounded-circle">
                        <label>Email Address: ${data.user.email}</label><br>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Biography</h5>
                    <h6 class="card-subtitle mb-2 text-muted">age: ${new Date().getFullYear()-parseInt(data.user.birthYear)}</h6>
                    <p class="card-text">${data.user.bio}</p>
                    <a href="https://cooldevs.netlify.app/pages/browse.html?emailsearch=${btoa(data.user.email)}" class="card-link">Profile Link</a><br><button class="btn btn-dark" onclick="navigator.clipboard.writeText('https://cooldevs.netlify.app/pages/browse.html?emailsearch=${btoa(data.user.email)}');alert('Copied to clipboard.');">Copy Link</button>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Creators of this app</h5>
                        <center><img src="https://cooldevs.netlify.app/img/fav.png" width="100px"></center>
                        <br>
                        This web application is created by Cool-Devs. <a href="https://cooldevs.netlify.app/" class="card-link">Click here to visit our website.</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    }
    
}