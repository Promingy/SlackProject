import TextareaAutoSize from 'react-textarea-autosize'
import './MessageBox.css'
import { useState } from "react";
import { initializeMessage } from '../../redux/server'
import { useDispatch } from 'react-redux'

export default function MessageBox({ socket, channelName, channelId, serverId }) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const theme = localStorage.getItem('theme') === 'dark'

    document.documentElement.className = `theme-${localStorage.getItem('theme') || 'light'}`;

    const sendSocket = (message) => {
        socket.emit("server", message)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const newMessage = {
            body: message,
            pinned: false
        }
        setMessage('')

        dispatch(initializeMessage(channelId, newMessage))
            .then(res => {
                const messageToEmit = {
                    userId: res.user_id,
                    type: 'message',
                    method: "POST",
                    room: +serverId,
                    channelId,
                    message: res
                }

                sendSocket(messageToEmit)

                const element = document.querySelector('.all-messages-container')
                element.scrollTo(0, element.scrollHeight)
            })


    }

    return (
        <form className={`send-message-form ${ theme ? 'send-message-form-dark' : ''}`}>
            <div className='message-wrapper-top'>
                <TextareaAutoSize
                    className="message-box"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={`Message #${channelName}`}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' &&
                            !!message.match(/[A-Za-z0-9!@?#$&()\\-`.+,/\\]/g) &&
                            message.length <= 2001) {
                            return handleSubmit(e)
                        }
                    }} />

            </div>
            <div className='message-wrapper-bottom'>
                <div className='char-count-and-submit'>
                    <span className={message.length >= 1800 ? message.length >= 2000 ? 'over-message-limit' : 'nearing-message-limit' : `clear-message-limit ${theme ? 'clear-message-limit-dark' : ''}`}>{message.length}/2000</span>
                    <button disabled={!message.match(/[A-Za-z0-9!@?#$&()\\-`.+,/\\]/g) || message.length > 2000} onClick={handleSubmit} className={`fa-regular fa-paper-plane fa-lg send-message ${theme ? 'send-message-dark' : ''}`} />
                </div>

            </div>
        </form >
    )
}
