// HEADER INFO
const ACCOUNT_SID = "AC55007ebe8b707442887ee4a7e05c7834"
const AUTH_TOKEN = "ee4b130e871def07b64659a3ea40eceb";
const TWILIO_PHONE = "+12088566876";

// Create Fetch API headers
const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(ACCOUNT_SID + ":" + AUTH_TOKEN));

// Method for actually sending text
const sendText = async (message, phoneNumber) => {

    console.log(`attempting to send message "${message}" to number: ${phoneNumber}`)
    const result = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages`, {
        headers: headers,
        method: 'POST',
        body: new URLSearchParams({
            'To': phoneNumber,
            'From': TWILIO_PHONE,
            'Body': message
        })

    })

    if(result.status !== 201){
        alert('message failed to send')
    }
}

export default sendText;
