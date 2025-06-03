
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/Card";
import TransitionWrapper from "@/components/ui/custom/TransitionWrapper";
import { 
  Megaphone, 
  Send, 
  Lightbulb, 
  Target,
  ChevronDown,
  ChevronUp,
  RefreshCw 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MarketingCampaigns = () => {
  const [prompt, setPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const marketingSuggestions = [
    "Generate a Diwali special promotion campaign",
    "Create marketing strategies for weekend dinner rush",
    "Design a customer loyalty rewards program",
    "Plan a social media marketing strategy for our new menu launch",
    "Create a Holi festival themed campaign for our restaurant",
    "Generate email marketing templates for special occasions"
  ];

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a marketing query first",
        variant: "destructive"
      });
      return;
    }

    // Try to get the API key from Supabase secrets first
    let geminiApiKey = apiKey;
    
    if (!geminiApiKey) {
      try {
        const { data, error } = await supabase.functions.invoke('get-gemini-key');
        if (!error && data?.apiKey) {
          geminiApiKey = data.apiKey;
        } else {
          setShowApiKeyInput(true);
          toast({
            title: "API Key Required",
            description: "Please enter your Gemini API key to use the marketing assistant",
            variant: "destructive"
          });
          return;
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
        setShowApiKeyInput(true);
      }
    }

    if (!geminiApiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to use the marketing assistant",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `As a restaurant marketing expert, provide detailed strategies for: ${prompt}. Focus on Indian market context. Be specific with actionable steps and examples.`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text from Gemini's response structure
      const responseText = data.candidates[0].content.parts[0].text;
      setResponse(responseText);
    } catch (error) {
      console.error("Error fetching marketing strategy:", error);
      toast({
        title: "Error",
        description: "Failed to generate marketing strategy. Please check your API key and try again.",
        variant: "destructive"
      });
      setResponse("Failed to generate marketing strategy. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  const handleRefresh = () => {
    setResponse("");
    setPrompt("");
  };

  return (
    <TransitionWrapper animation="fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Marketing and Campaign Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!response ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center mb-4 text-center">
                <Lightbulb className="h-12 w-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Marketing Assistant</h3>
                <p className="text-muted-foreground max-w-lg mb-6">
                  Get AI-powered marketing strategies tailored for Indian restaurants. Enter your query below 
                  or select from our suggestions.
                </p>
              </div>

              {showApiKeyInput && (
                <div className="mb-4 p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
                  <h4 className="text-sm font-medium mb-2">Enter API Key</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    This is required to access the AI marketing assistant. Your key will be used only in your current session.
                  </p>
                  <Input
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Don't have an API key? Get one from{" "}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      Google AI Studio
                    </a>
                  </p>
                </div>
              )}

              <div className="relative">
                <Input
                  className="pr-10"
                  placeholder="Ask for marketing strategies, campaign ideas, promotion plans..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendPrompt();
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2" 
                  onClick={handleSendPrompt}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Suggested Queries</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  {showSuggestions ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {showSuggestions && (
                <div className="mt-2 space-y-2">
                  {marketingSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="p-2 border rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Marketing Strategy</h3>
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Query
                </Button>
              </div>
              
              <div className="p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
                <p className="text-sm font-medium mb-2">Your Query:</p>
                <p className="italic text-sm text-muted-foreground mb-4">{prompt}</p>
                
                <p className="text-sm font-medium mb-2">Strategy:</p>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {response.split('\n').map((paragraph, index) => (
                    paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default MarketingCampaigns;
