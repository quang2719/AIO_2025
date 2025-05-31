import React, { useState } from 'react';
import './style.css';

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  age: string;
}

type ChatMessage = {
  sender: 'bot' | 'user';
  text: string;
};

const initialUserInfo: UserInfo = {
  name: '',
  phone: '',
  address: '',
  age: '',
};

const questions = [
  { key: 'name', text: 'Bạn tên gì?' },
  { key: 'phone', text: 'Số điện thoại của bạn là gì?' },
  { key: 'address', text: 'Địa chỉ của bạn?' },
  { key: 'age', text: 'Bạn bao nhiêu tuổi?' },
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Xin chào! Tôi sẽ giúp bạn điền thông tin.' },
  ]);
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState<null | keyof UserInfo>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    if (confirming && editing) {
      setUserInfo((info) => ({ ...info, [editing]: input }));
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: `Đã cập nhật ${editing === 'name' ? 'tên' : editing === 'phone' ? 'số điện thoại' : editing === 'address' ? 'địa chỉ' : 'tuổi'}: ${input}` },
      ]);
      setEditing(null);
      setTimeout(() => setConfirming(true), 500);
      setTimeout(() => setInput(''), 500);
      return;
    }
    if (step < questions.length) {
      const key = questions[step].key as keyof UserInfo;
      setUserInfo((info) => ({ ...info, [key]: input }));
      setStep(step + 1);
      setTimeout(() => setInput(''), 500);
    }
  };

  React.useEffect(() => {
    if (step < questions.length && !confirming) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: questions[step].text }]);
    }
    if (step === questions.length && !confirming) {
      setConfirming(true);
    }
    // eslint-disable-next-line
  }, [step]);

  React.useEffect(() => {
    if (confirming && !editing) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'bot',
          text: `Vui lòng xác nhận thông tin:\nTên: ${userInfo.name}\nSĐT: ${userInfo.phone}\nĐịa chỉ: ${userInfo.address}\nTuổi: ${userInfo.age}`,
        },
      ]);
    }
    // eslint-disable-next-line
  }, [confirming, editing]);

  const handleConfirm = () => {
    // Lưu vào localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setMessages((msgs) => [
      ...msgs,
      { sender: 'bot', text: 'Đã lưu thông tin! Cảm ơn bạn.' },
    ]);
    setConfirming(false);
    setStep(0);
    setUserInfo(initialUserInfo);
  };

  const handleEdit = (field: keyof UserInfo) => {
    setEditing(field);
    setMessages((msgs) => [
      ...msgs,
      { sender: 'bot', text: `Bạn muốn sửa ${field === 'name' ? 'tên' : field === 'phone' ? 'số điện thoại' : field === 'address' ? 'địa chỉ' : 'tuổi'}. Vui lòng nhập lại:` },
    ]);
  };

  return (
    <div className="container">
      <h2>Demo Chatbot Agent - Điền Form Thông Tin</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'bot' ? 'bot-msg' : 'user-msg'}>
            {msg.text.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      {confirming && !editing ? (
        <div className="confirm-box">
          <button onClick={handleConfirm}>OK</button>
          <button onClick={() => setEditing('name')}>Sửa tên</button>
          <button onClick={() => setEditing('phone')}>Sửa SĐT</button>
          <button onClick={() => setEditing('address')}>Sửa địa chỉ</button>
          <button onClick={() => setEditing('age')}>Sửa tuổi</button>
        </div>
      ) : (
        <form
          className="input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            autoFocus
          />
          <button type="submit">Gửi</button>
        </form>
      )}
    </div>
  );
};

export default App;
