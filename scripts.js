// Main JS file

//Make request
let request = new XMLHttpRequest();
//open request
request.open('GET', 'https://dog.ceo/api/breeds/list', true);
//function to parse data
request.onload = function() {
    //Access JSON data
    let data = JSON.parse(this.response);
    let list = document.getElementById('list');
    if (request.status >= 200 && request.status < 400) {
        data.message.forEach(item => {
            console.log(item);
            let option = document.createElement("option"); //create an option node
            option.text = item;
            option.value = item;
            option.className = 'option-class'
            document.getElementById("list").appendChild(option); // Append <li> to <ul> with id="myList"
        })
    } else {
        console.log('error')
    }
}

function getValue() {
    //Remove picGrid from DOM if it exists
    var childDiv = 'picGrid';
    var parentDiv = 'picContainer';

    if (document.getElementById(childDiv)) {
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
        parent.removeChild(child);
    }

    //Add picGrid to DOM
    var parent = document.getElementById('picContainer');
    var newElement = document.createElement('div');
    newElement.setAttribute('id', 'picGrid');
    newElement.setAttribute('class', 'grid');
    parent.appendChild(newElement);

    //Get breed name from select list
    let selectListValue = document.getElementById("list").selectedIndex;
    let selectListText = (document.getElementsByTagName("option")[selectListValue].value);

    //Initiate a new HTTP request for pics
    let getPics = new XMLHttpRequest();
    getPics.open('GET', 'https://dog.ceo/api/breed/' + selectListText + '/images', true);
    getPics.onload = function() {
        //Access JSON data
        let picData = JSON.parse(this.response);

        if (getPics.status >= 200 && getPics.status < 400) {
            picData.message.forEach(item => {
                console.log(item);
                let imgNode = document.createElement("img"); //create an img node
                imgNode.src = item;
                imgNode.className = 'grid-item';
                document.getElementById("picGrid").appendChild(imgNode); // Add images to picGrid
            })
        } else {
            console.log('error')
        }

    }
    getPics.send();
    return selectListText;
}

request.send()
