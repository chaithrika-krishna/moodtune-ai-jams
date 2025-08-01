import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Music, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { getPlaylistForEmotion } from '@/lib/emotionDetection';

interface StoredEmotionResult {
  emotion: string;
  score: number;
  emoji: string;
  color: string;
  text: string;
  timestamp: string;
}

const EmotionResult = () => {
  const [result, setResult] = useState<StoredEmotionResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = localStorage.getItem('emotionResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate('/emotion-input');
    }
  }, [navigate]);

  const handleViewPlaylist = () => {
    if (result) {
      const playlist = getPlaylistForEmotion(result.emotion);
      localStorage.setItem('currentPlaylist', JSON.stringify({
        ...playlist,
        emotion: result.emotion,
        timestamp: result.timestamp
      }));
      navigate('/playlist');
    }
  };

  const handleSaveToHistory = () => {
    if (result) {
      const history = JSON.parse(localStorage.getItem('emotionHistory') || '[]');
      const newEntry = {
        id: Date.now(),
        ...result,
        playlist: getPlaylistForEmotion(result.emotion).name
      };
      history.unshift(newEntry);
      // Keep only last 20 entries
      localStorage.setItem('emotionHistory', JSON.stringify(history.slice(0, 20)));
    }
  };

  if (!result) {
    return null;
  }

  const confidencePercentage = Math.round(result.score * 100);

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Result Header */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
            <h1 className="text-3xl font-bold">
              You're feeling{' '}
              <span className={`text-${result.color}`}>
                {result.emotion}
              </span>
            </h1>
            <p className="text-muted-foreground">
              Based on your description, our AI detected this emotion
            </p>
          </div>

          {/* Confidence Score */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <span className="text-sm text-muted-foreground">{confidencePercentage}%</span>
                </div>
                <Progress value={confidencePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Our AI is {confidencePercentage}% confident in this emotion detection
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Input */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">What you shared</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic">"{result.text}"</p>
          </CardContent>
        </Card>

        {/* Emotion Insights */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles size={20} />
              Emotion Insights
            </CardTitle>
            <CardDescription>Understanding your {result.emotion.toLowerCase()} mood</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.emotion.toLowerCase() === 'joy' && (
                <p className="text-sm">
                  Joy is a wonderful emotion! You're likely feeling positive, energetic, and optimistic. 
                  Music that enhances this mood can help you celebrate and maintain these good vibes.
                </p>
              )}
              {result.emotion.toLowerCase() === 'sadness' && (
                <p className="text-sm">
                  It's okay to feel sad sometimes. Music can be therapeutic and help you process these emotions. 
                  Consider whether you want to embrace the sadness or lift your spirits.
                </p>
              )}
              {result.emotion.toLowerCase() === 'anger' && (
                <p className="text-sm">
                  Anger can be intense. Music can help you either channel this energy constructively 
                  or find ways to calm down and regain your center.
                </p>
              )}
              {result.emotion.toLowerCase() === 'calm' && (
                <p className="text-sm">
                  A calm state is perfect for relaxation and reflection. Music that maintains this 
                  peaceful feeling can enhance your sense of tranquility.
                </p>
              )}
              {result.emotion.toLowerCase() === 'excited' && (
                <p className="text-sm">
                  Excitement is pure energy! This is a great time for upbeat music that matches 
                  your enthusiasm and keeps your energy levels high.
                </p>
              )}
              {!['joy', 'sadness', 'anger', 'calm', 'excited'].includes(result.emotion.toLowerCase()) && (
                <p className="text-sm">
                  Every emotion is valid and has its place. Music can help you explore and understand 
                  your feelings while providing the perfect soundtrack to your current state.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleViewPlaylist}
            className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground"
            size="lg"
          >
            <Music className="mr-2" size={20} />
            View Your {result.emotion} Playlist
            <ArrowRight className="ml-2" size={20} />
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline"
              onClick={handleSaveToHistory}
              className="w-full"
            >
              Save to History
            </Button>
            
            <Link to="/emotion-input">
              <Button variant="outline" className="w-full">
                <RotateCcw className="mr-2" size={16} />
                Try Again
              </Button>
            </Link>
          </div>
        </div>

        {/* Analysis Details */}
        <Card className="bg-secondary/20 border-border/50">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Analysis completed at: {new Date(result.timestamp).toLocaleString()}</p>
              <p>Emotion model: Hugging Face DistilRoBERTa</p>
              <p>Confidence threshold: {confidencePercentage}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmotionResult;
