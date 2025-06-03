
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { MessageCircle, User, Send, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Sample conversation data
const sampleConversations = [
  {
    id: "conv1",
    customer: {
      id: "cust1",
      name: "Rajesh Kumar",
      avatar: null,
      lastSeen: "5 minutes ago",
      phone: "+91 98765 43210",
    },
    messages: [
      {
        id: "msg1",
        sender: "customer",
        text: "Hello, I placed an order 30 minutes ago but it hasn't been delivered yet. Order #ORD45678",
        timestamp: "10:35 AM",
      },
      {
        id: "msg2",
        sender: "restaurant",
        text: "Hi Rajesh, I apologize for the delay. I've checked with our delivery team and your order is on the way. It should reach you in 10-15 minutes.",
        timestamp: "10:38 AM",
      },
      {
        id: "msg3",
        sender: "customer",
        text: "Thank you for checking. I'll wait.",
        timestamp: "10:40 AM",
      },
    ],
    unread: true,
  },
  {
    id: "conv2",
    customer: {
      id: "cust2",
      name: "Priya Sharma",
      avatar: null,
      lastSeen: "Online",
      phone: "+91 87654 32109",
    },
    messages: [
      {
        id: "msg4",
        sender: "customer",
        text: "Do you have any special offers for the weekend?",
        timestamp: "Yesterday",
      },
      {
        id: "msg5",
        sender: "restaurant",
        text: "Yes, we have a 'Buy 1 Get 1' offer on all main course dishes this weekend. Would you like to make a reservation?",
        timestamp: "Yesterday",
      },
    ],
    unread: false,
  },
  {
    id: "conv3",
    customer: {
      id: "cust3",
      name: "Mohammed Ansari",
      avatar: null,
      lastSeen: "2 hours ago",
      phone: "+91 76543 21098",
    },
    messages: [
      {
        id: "msg6",
        sender: "customer",
        text: "Is your restaurant open for dine-in today?",
        timestamp: "12:20 PM",
      },
    ],
    unread: true,
  },
];

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [conversations, setConversations] = useState(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Create a new message
    const message = {
      id: `msg${Date.now()}`,
      sender: "restaurant",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update the conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    
    // Update the selected conversation
    const updated = updatedConversations.find(conv => conv.id === selectedConversation.id);
    if (updated) {
      setSelectedConversation(updated);
    }
    
    // Clear the input
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your reply has been sent to the customer.",
    });
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Customer Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex h-[600px] border-t">
                {/* Conversations List */}
                <div className="w-1/3 border-r overflow-y-auto">
                  {conversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={cn(
                        "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                        selectedConversation.id === conversation.id && "bg-muted"
                      )}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{conversation.customer.name}</span>
                            {conversation.unread && (
                              <span className="bg-primary w-2 h-2 rounded-full" />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex justify-between mt-1">
                            <span>{conversation.customer.phone}</span>
                            <span>{conversation.customer.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground truncate">
                        {conversation.messages[conversation.messages.length - 1]?.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Conversation Area */}
                <div className="flex-1 flex flex-col">
                  {/* Conversation Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{selectedConversation.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedConversation.customer.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedConversation.customer.phone}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map(message => (
                      <div 
                        key={message.id} 
                        className={cn(
                          "flex",
                          message.sender === "customer" ? "justify-start" : "justify-end"
                        )}
                      >
                        <div 
                          className={cn(
                            "max-w-[75%] rounded-lg p-3",
                            message.sender === "customer" 
                              ? "bg-muted text-foreground" 
                              : "bg-primary text-primary-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.sender === "customer" ? (
                              <User className="h-3 w-3" />
                            ) : (
                              <Store className="h-3 w-3" />
                            )}
                            <span className="text-xs font-medium">
                              {message.sender === "customer" ? selectedConversation.customer.name : "Restaurant"}
                            </span>
                          </div>
                          <div>{message.text}</div>
                          <div className="text-xs mt-2 opacity-80 text-right">{message.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea 
                        className="flex-1 min-h-[60px] resize-none" 
                        placeholder="Type your reply here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        className="h-[60px]"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Create Email Campaigns</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create and schedule email campaigns to engage with your customers and promote special offers.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Create Quick Response Templates</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create templates for common messages to save time when communicating with customers.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TransitionWrapper>
  );
};

export default CommunicationTools;
