import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatList } from '@/components/Chat/ChatList';
import { ChatWindow } from '@/components/Chat/ChatWindow';
import { ContactList } from '@/components/Chat/ContactList';
import { PhoneAuth } from '@/components/Auth/PhoneAuth';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Users } from 'lucide-react';

// Mock data for development
const mockChats = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hey, how are you doing?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    lastMessage: 'See you tomorrow!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    isOnline: false
  }
];

const mockContacts = [
  {
    id: '1',
    name: 'John Doe',
    phoneNumber: '+1234567890',
    statusMessage: 'Available',
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    phoneNumber: '+1234567891',
    statusMessage: 'Busy',
    isOnline: false
  },
  {
    id: '3',
    name: 'Mike Johnson',
    phoneNumber: '+1234567892',
    statusMessage: 'At work',
    isOnline: true
  }
];

const mockMessages = [
  {
    id: '1',
    content: 'Hello there!',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    status: 'read' as const
  },
  {
    id: '2',
    content: 'Hey! How are you doing?',
    senderId: 'current-user',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    status: 'delivered' as const
  },
  {
    id: '3',
    content: 'I\'m doing great, thanks for asking! What about you?',
    senderId: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'read' as const
  },
  {
    id: '4',
    content: 'Same here! Working on some exciting projects.',
    senderId: 'current-user',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    status: 'sent' as const
  }
];

export const WhatsApp = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState('chats');
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in (demo implementation)
    const savedUser = localStorage.getItem('whatsapp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleSendMessage = (content: string) => {
    toast({
      title: "Message sent!",
      description: "Your message has been delivered.",
    });
  };

  const handleStartChat = (contactId: string) => {
    // In a real app, this would create or find an existing chat
    setSelectedChatId(contactId);
    setSelectedTab('chats');
  };

  const handleAddContact = (phoneNumber: string, name: string) => {
    toast({
      title: "Contact added!",
      description: `${name} has been added to your contacts.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-whatsapp flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <PhoneAuth />;
  }

  const selectedChat = mockChats.find(chat => chat.id === selectedChatId);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-whatsapp">
            <TabsTrigger 
              value="chats" 
              className="data-[state=active]:bg-whatsapp-dark data-[state=active]:text-white text-white/80"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chats
            </TabsTrigger>
            <TabsTrigger 
              value="contacts"
              className="data-[state=active]:bg-whatsapp-dark data-[state=active]:text-white text-white/80"
            >
              <Users className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="flex-1 m-0">
            <ChatList
              chats={mockChats}
              selectedChatId={selectedChatId}
              onChatSelect={setSelectedChatId}
            />
          </TabsContent>
          
          <TabsContent value="contacts" className="flex-1 m-0">
            <ContactList
              contacts={mockContacts}
              onStartChat={handleStartChat}
              onAddContact={handleAddContact}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        {selectedChatId && selectedChat ? (
          <ChatWindow
            chatId={selectedChatId}
            chatName={selectedChat.name}
            chatAvatar={undefined}
            messages={mockMessages}
            currentUserId="current-user"
            onSendMessage={handleSendMessage}
            isOnline={selectedChat.isOnline}
          />
        ) : (
          <div className="h-full bg-chat-bg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="text-xl font-medium mb-2">Welcome to WhatsApp</h2>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};