let menu = [
    {name:"Tea", price:10},
    {name:"Masala Tea", price:20},
    {name:"Coffee", price:30},
    {name:"Cold Coffee", price:80},
    {name:"Black Tea", price:10},
    {name:"Lemon Tea", price:10},
    {name:"Lemon Masala Tea", price:10},
    {name:"Veg Soup", price:90},
    {name:"Sweet Corn Soup", price:90},
    {name:"Hot & Sour Soup", price:90},
    {name:"All Mix Soup", price:80},
    {name:"Crispy Corn", price:120},
    {name:"Veg Manchurian", price:120}
];

let groupLink = "https://chat.whatsapp.com/CQb8n5C1edF3Be0RfIzwED";

function loadMenu() {
    let box = "";
    menu.forEach((item, i) => {
        box += `
            <div class="item">
                ${item.name} - ₹${item.price}
                <input type="number" class="qty" id="q${i}" value="0" min="0">
            </div>
        `;
    });
    document.getElementById("menu").innerHTML = box;
}

loadMenu();

setInterval(() => {
    let total = 0;
    menu.forEach((item, i) => {
        let q = parseInt(document.getElementById("q"+i).value);
        total += item.price * q;
    });
    document.getElementById("total").innerText = total;
}, 200);

document.getElementById("orderBtn").onclick = () => {
    let finalOrder = "🟢 *New Order from Tarkari Restaurant*\n\n";
    let hasItem = false;

    menu.forEach((item, i) => {
        let q = parseInt(document.getElementById("q"+i).value);
        if(q > 0) {
            hasItem = true;
            finalOrder += `• ${item.name} x ${q} = ₹${item.price*q}\n`;
        }
    });

    finalOrder += `\n*Total Amount:* ₹${document.getElementById("total").innerText}`;
    finalOrder += "\n\nPowered by Tarkari Restaurant";

    if(!hasItem){
        alert("Please select at least 1 item!");
        return;
    }

    let wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(finalOrder)}`;
    window.open(wa, "_blank");
};
