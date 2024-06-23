import React, { useState } from 'react';
import './styles/App.css';
import emailsData from './data/emails';
import Header from './components/Header';

function App() {
  // Initial state 
  const [emails, setEmails] = useState(emailsData);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');

  // Handle Email read 
  const toggleRead = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };

  // Handle Email star 
  const toggleStar = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

  // Filter emails based on the current tab and hideRead state
  const filteredEmails = emails.filter(email => {
    if (hideRead && email.read) return false;
    if (currentTab === 'starred' && !email.starred) return false;
    return true;
  });

  return (
    <div className="app">
      <Header />
      <div className="left-menu">
        <div className="inbox-list">
          <div className={`item ${currentTab === 'inbox' ? 'active' : ''}`} onClick={() => setCurrentTab('inbox')}>
            Inbox ({emails.filter(email => !email.read).length})
          </div>
          <div className={`item ${currentTab === 'starred' ? 'active' : ''}`} onClick={() => setCurrentTab('starred')}>
            Starred ({emails.filter(email => email.starred).length})
          </div>
          <div className="item toggle">
            <label>
              <input
                type="checkbox"
                checked={hideRead}
                onChange={(e) => setHideRead(e.target.checked)}
              />
              Hide read
            </label>
          </div>
        </div>
      </div>
      <div className="emails">
        <ul>
          {filteredEmails.map(email => (
            <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email.id)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email.id)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
