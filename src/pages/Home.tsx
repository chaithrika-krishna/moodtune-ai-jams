import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Heart, Music, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
              <Headphones size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MoodTune
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover music that matches your emotions. Our AI analyzes your mood and creates 
            the perfect playlist to enhance or transform how you feel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow">
                <Heart className="mr-2" size={20} />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10">
                <Sparkles className="mr-2" size={20} />
                How It Works
              </Button>
            </Link>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emotion-joy/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-emotion-joy" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Emotion Detection</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced AI analyzes your text to understand your current emotional state
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Music className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Playlists</h3>
                <p className="text-muted-foreground text-sm">
                  Curated music collections that perfectly match and enhance your mood
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emotion-excited/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-emotion-excited" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mood History</h3>
                <p className="text-muted-foreground text-sm">
                  Track your emotional journey and rediscover your favorite mood-based playlists
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;