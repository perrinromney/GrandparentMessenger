import React, {useState} from 'react'
import sendText from '../twilio/sendText'

const perrin = '+13606402655'

const TextButton = () => {

    const [message, setMessage] = useState('Default Message');
    const [phoneNumber, setPhoneNumber] = useState('+12084322282');

    const changeMessage = (e) => {
        setMessage(e.target.value)
    }

    const changeNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    return (
        <div>
            <label>Phone Number</label>
            <input type='text' onChange={changeNumber}></input>
            <br/>
            <label>Message</label>
            <input type='text' onChange={changeMessage}></input>
            <br/>
            <button onClick ={()=>sendText(message, phoneNumber)}>
                Send Text
            </button>
        </div>
        
    )
}


export default TextButton
