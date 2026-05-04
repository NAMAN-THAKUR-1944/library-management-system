import { useEffect } from 'react';

const WatsonChat = () => {
  useEffect(() => {
    // Only add script if not already added to prevent duplicates during dev hot-reloads
    if (!document.getElementById('watson-script')) {
      window.watsonAssistantChatOptions = {
        integrationID: "5786e971-7004-4d52-9b54-24ee9f7c1123",
        region: "au-syd",
        serviceInstanceID: "893526d1-1242-4ede-9235-26c9256b137c",
        onLoad: function(instance) { instance.render(); }
      };

      const t = document.createElement('script');
      t.id = 'watson-script';
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }
  }, []);

  return null;
};

export default WatsonChat;
