import { Box } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import "./ChatPage.css";

var stompClient: any = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState<any>([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/identity/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload: any)=>{
        var payloadData = JSON.parse(payload.body) || {};
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload: any)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err: any) => {
        console.log(err);
        toast.error("Connect failed!")
    }

    const handleMessage =(event: any)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event: any)=>{
        const {value}=event.target;
        setUserData({...userData,username: value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <Box sx={{minHeight:"80vh"}} className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && 
            <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat: any,index: any)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="Nhập tin nhắn" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>Gửi</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && 
            <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="Nhập tin nhắn" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>Gửi</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Nhập tên của bạn"
                name="userName"
                value={userData.username}
                onChange={handleUsername} 
              />
              <button type="button" onClick={registerUser}>
                    Kết nối
              </button> 
        </div>}
    </Box>
    )
}

export default ChatRoom