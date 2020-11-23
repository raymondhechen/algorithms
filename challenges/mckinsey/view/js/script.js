document.getElementById('button').addEventListener('click', handleClick);
var c = 1;

function handleClick() {
    val = document.getElementById('input').value;
    // empty val
    if (!/\S/.test(val)) {
        alert("Please provide the valid input");
    } 
    else {
        var node = document.createElement('LI');
        var textnode = document.createTextNode(val);

        if (c % 3 === 0) {
            node.setAttribute('style', 'color: red');
        }
        c += 1;

        node.appendChild(textnode);
        document.getElementById('list').appendChild(node);
        // sanitize
        document.getElementById('input').value = '';
    }
}
