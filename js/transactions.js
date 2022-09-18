let $transactionBox = document.querySelector('#transactionBox');

function removeAllChild(){
    while ($transactionBox.firstChild) {
		$transactionBox.removeChild($transactionBox.lastChild);
	}
}
let $transactionData,$transactions,$transactionCount;


function updateTransactions(){
    removeAllChild()
    db.child('transactions').get().then(ss=>{
        if(ss.exists()){
            $transactionData = ss.val()
            $transactionCount = $transactionData.count;
            $transactions = $transactionData.data
            for (let i = 0; i <= $transactionCount; i++){
                let dd = $transactionData.data;
                if(dd[i]){
                    let $div = document.createElement('div');

                    $div.style=`
                    width: 90vw;
                    color:white;
                    background: gray;
                    border-radius:5px;
                    padding:5px;
                    margin:5px;
                    `;
                    $div.innerHTML=`
                    <p>from: ${dd[i].from} to: ${dd[i].to}</p>
                    <p>ammount: <span style="background-color: gold; color:white; border-radius:20px;padding:5px;">$ ${dd[i].ammount}</span> date: ${dd[i].time}</p>
                    `;

                    $transactionBox.appendChild($div);
                }else{
                    continue;
                }
                
            }
        }
    })
}

auth.onAuthStateChanged(user => {
	if(user){
        UID = user.uid;
        updateTransactions();
    }else{
        location.href=`../index.html`;
    }
});


db.child('transactions').on("child_changed", ()=>{
    updateTransactions()
})