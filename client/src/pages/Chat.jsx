import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendBaseUrl = 'http://localhost:3000';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [patient, setPatient] = useState(localStorage.getItem('patient') || '');
    const [token, setToken] = useState(localStorage.getItem('auth0_id') || '');

    const setInitailMessages = () => {
        setMessages([{ role: "assistant", content: "I am Medibot, What seems to be bothering you today?" }])
    }

    useEffect(() => {
        if (!patient) {
            window.location.href = '/';
        }
        if (!token) {
            window.location.href = '/';
        }
    }, [patient]);

    useEffect(() => {
        setInitailMessages();
    }, [])

    const sendMessage = async () => {
        if (inputText.trim() === '') return;
        setMessages((previous) => [...previous, { content: inputText, role: 'user' }]);
        setInputText('');
        try {
            const response = await axios.post(`${backendBaseUrl}/api/chat`, { messages: messages }, {
                headers: {
                    authorization: token
                }
            });
            setMessages((previous) => [...previous, { content: response.data.message, role: 'assistant' }]);
        } catch (error) {
            setMessages([...messages, { content: 'Sorry, I am unable to respond at the moment', role: 'assistant' }])
            console.log('Error sending message:', error);
        }
    };

    const ChatMessage = ({ role, content }) => {
        const messageClass = role === 'assistant' ? 'bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs' : 'bg-gray-200 text-gray-700 rounded-lg py-2 px-4 max-w-xs';
        const containerClass = role === 'assistant' ? 'text-left mb-4 flex justify-start' : 'text-right mb-4 flex justify-end';

        return (
            <div className={containerClass}>
                <div className={messageClass}>
                    {content}
                </div>
            </div>
        );
    };

    const ChatBox = ({ messages }) => {
        return (
            <div className="flex flex-col h-screen bg-gray-100">
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col justify-between bg-gray-100">
            <div className="overflow-auto p-4 flex-1">
                <ChatBox messages={messages} />
            </div>
            <div className="p-4 flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-full py-2 px-4 mr-2 focus:outline-none"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    
                    }}
                />
                <button
                    className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
