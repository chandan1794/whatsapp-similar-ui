// All html elements
const MSGBOX = document.getElementById("message-box");
const LOADOLDERBTN = document.getElementById("load-older-messages");

// All global variables
const BASEDATAFILEURL = "https://static-websites-data.s3-ap-northeast-1.amazonaws.com/whatsapp-similar-ui/";
const LEFTMESSAGETYPE = "recieved";
const RIGHTMESSAGETYPE = "sent";
var lastLoadedFile = "";

// All async functions
async function loadData(monthYearString) {
    const dataUrl = BASEDATAFILEURL + monthYearString + ".json";
    try {
        const response = await fetch(dataUrl);
        if (response.status !== 200) {
            if (response.status == 403) {
                console.error('File does not exists');
                sendAlert("", "No more messages");
                LOADOLDERBTN.classList.add("disabled");
                return;
            }
            console.error('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        const jsonResponse = await response.json();
        lastLoadedFile = monthYearString;
        // console.log(jsonResponse);
        return jsonResponse;
    }
    catch (err) {
        console.error('Fetch Error :-S', err);
    }
}

async function loadMessages(monthYearString) {
    const jsonData = await loadData(monthYearString);
    console.log(jsonData);
    console.log(jsonData.sort(datetimeCompare));
    jsonData.forEach(msgObject => {
        loadUI(msgObject);
    });
}


// All not async functions
function loadUI(msgObject) {
    var objectToInsert = msgLeftHTML;
    if(msgObject.type === RIGHTMESSAGETYPE) {
        objectToInsert = msgRightHTML;
    }

    objectToInsert = objectToInsert.formatUnicorn({
        message: msgObject.message,
        datetime: msgObject.datetime
    })

    if(MSGBOX.childElementCount) {
        MSGBOX.lastElementChild.insertAdjacentHTML("afterend", objectToInsert);
    } else {
        MSGBOX.innerHTML = objectToInsert;
    }
}

// All Event Listeners
LOADOLDERBTN.addEventListener('click', function(e){
    var newFileName = getPreviousFileName(lastLoadedFile);
    if (newFileName.length !== 6 || newFileName == lastLoadedFile) {
        console.error("Generation of filename failed: " + newFileName);
        return;
    }

    loadMessages(newFileName);
})
