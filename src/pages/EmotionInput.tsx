import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Loader2, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { detectEmotion } from '@/lib/emotionDetection';
import { useToast } from '@/hooks/use-toast';

const EmotionInput = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const examples = [
    "I feel so happy and energetic today! The sun is shining and everything seems possible.",
    "I'm feeling a bit down and just want to listen to something calming and peaceful.",
    "I'm angry and frustrated about everything that went wrong today.",
    "I feel nostalgic and want to remember good times from the past.",
    "I'm excited about my upcoming vacation and can't contain my joy!"
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter your feelings",
        description: "Share how you're feeling so we can find the perfect music for you.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await detectEmotion(text);
      
      // Store the result in localStorage for the next page
      localStorage.setItem('emotionResult', JSON.stringify({
        ...result,
        text: text,
        timestamp: new Date().toISOString()
      }));
      
      navigate('/emotion-result');
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Sorry, we couldn't analyze your emotion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setText(example);
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-emotion rounded-2xl flex items-center justify-center mx-auto shadow-glow">
            <Heart className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-bold">How are you feeling?</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Share your current emotions, thoughts, or experiences. Our AI will analyze your mood 
            and recommend the perfect music to match or enhance how you feel.
          </p>
        </div>

        {/* Input Card */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={20} />
              Tell us about your mood
            </CardTitle>
            <CardDescription>
              Describe your feelings, what happened today, or what's on your mind
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I'm feeling..."
              className="min-h-[120px] resize-none"
              disabled={isAnalyzing}
            />
            
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing your emotion...
                </>
              ) : (
                <>
                  <Heart className="mr-2" size={20} />
                  Analyze My Mood
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Need inspiration?</CardTitle>
            <CardDescription>
              Try one of these examples to see how emotion detection works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-sm"
                  disabled={isAnalyzing}
                >
                  "{example}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-secondary/20 border-border/50">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">💡 Tips for better results:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Be specific about your feelings and experiences</li>
              <li>• Describe what's happening in your life right now</li>
              <li>• Share both positive and negative emotions</li>
              <li>• The more detail you provide, the better our recommendations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmotionInput;