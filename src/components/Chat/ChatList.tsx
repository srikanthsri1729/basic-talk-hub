import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  avatar?: string;
  unreadCount: number;
  isOnline?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
}

export const ChatList = ({ chats, selectedChatId, onChatSelect }: ChatListProps) => {
  return (
    <div className="h-full bg-white border-r">
      <div className="p-4 bg-whatsapp">
        <h1 className="text-xl font-semibold text-white">Chats</h1>
      </div>
      
      <ScrollArea className="flex-1">
        {chats.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No chats yet</p>
            <p className="text-sm mt-2">Start a conversation with your contacts</p>
          </div>
        ) : (
          <div className="divide-y">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedChatId === chat.id ? 'bg-accent' : ''
                }`}
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback className="bg-whatsapp text-white">
                        {chat.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(chat.lastMessageTime, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-whatsapp text-white ml-2">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};