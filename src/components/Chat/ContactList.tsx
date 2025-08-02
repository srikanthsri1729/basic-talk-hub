import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, MessageCircle, UserPlus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
  statusMessage?: string;
  isOnline?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  onStartChat: (contactId: string) => void;
  onAddContact: (phoneNumber: string, name: string) => void;
}

export const ContactList = ({ contacts, onStartChat, onAddContact }: ContactListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery)
  );

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContactPhone.trim() && newContactName.trim()) {
      onAddContact(newContactPhone.trim(), newContactName.trim());
      setNewContactPhone('');
      setNewContactName('');
      setIsAddContactOpen(false);
    }
  };

  return (
    <div className="h-full bg-white">
      <div className="p-4 bg-whatsapp">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white">Contacts</h1>
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-whatsapp-dark">
                <UserPlus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label htmlFor="contactPhone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1234567890"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactName" className="text-sm font-medium">
                    Contact Name
                  </label>
                  <Input
                    id="contactName"
                    type="text"
                    placeholder="John Doe"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-whatsapp hover:bg-whatsapp-dark">
                  Add Contact
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/70" />
          <Input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-whatsapp-dark border-whatsapp-dark text-white placeholder:text-white/70"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No contacts found</p>
            <p className="text-sm mt-2">Add some contacts to start chatting</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-whatsapp text-white">
                        {contact.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.statusMessage || contact.phoneNumber}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onStartChat(contact.id)}
                    className="text-whatsapp hover:text-whatsapp-dark hover:bg-whatsapp-light"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};