const BASEDATAFILEURL = "https://static-websites-data.s3-ap-northeast-1.amazonaws.com/whatsapp-similar-ui/";
const MSGBOX = document.getElementById("message-box");
const LOADOLDERBTN = document.getElementById("load-older-messages");
const LEFTMESSAGETYPE = "recieved";
const RIGHTMESSAGETYPE = "sent";
var lastLoadedFile = "";

async function loadData(monthString) {
    const dataUrl = BASEDATAFILEURL + monthString + ".json";
async function loadData(monthYearString) {
    const dataUrl = BASEDATAFILEURL + monthYearString + ".json";
    try {
        const response = await fetch(dataUrl);
        if (response.status !== 200) {
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
