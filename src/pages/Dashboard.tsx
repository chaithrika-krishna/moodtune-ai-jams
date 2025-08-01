import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Headphones, History, Sparkles, TrendingUp, Clock } from 'lucide-react';
import Layout from '@/components/Layout';

const Dashboard = () => {
  const recentEmotions = [
    { emotion: 'Happy', time: '2 hours ago', playlist: 'Upbeat Vibes' },
    { emotion: 'Calm', time: '1 day ago', playlist: 'Peaceful Moments' },
    { emotion: 'Excited', time: '2 days ago', playlist: 'Energy Boost' }
  ];

  const trendingPlaylists = [
    { name: 'Chill Vibes', mood: 'Relaxed', songs: 24 },
    { name: 'Workout Energy', mood: 'Energetic', songs: 32 },
    { name: 'Late Night Jazz', mood: 'Contemplative', songs: 18 }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            How are you feeling today? Let's find the perfect music for your mood.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/emotion-input">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-emotion rounded-xl flex items-center justify-center">
                    <Heart className="text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Analyze Your Mood</h3>
                    <p className="text-sm text-muted-foreground">Tell us how you're feeling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/history">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emotion-calm/20 rounded-xl flex items-center justify-center">
                    <History className="text-emotion-calm" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Your History</h3>
                    <p className="text-sm text-muted-foreground">Revisit past moods</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/player">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emotion-excited/20 rounded-xl flex items-center justify-center">
                    <Headphones className="text-emotion-excited" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Music Player</h3>
                    <p className="text-sm text-muted-foreground">Continue listening</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Recent Emotions
              </CardTitle>
              <CardDescription>Your latest mood analyses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEmotions.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">{item.emotion}</p>
                    <p className="text-sm text-muted-foreground">{item.playlist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
              <Link to="/history">
                <Button variant="outline" className="w-full">
                  View All History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Trending Playlists
              </CardTitle>
              <CardDescription>Popular mood-based collections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingPlaylists.map((playlist, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">{playlist.name}</p>
                    <p className="text-sm text-muted-foreground">{playlist.mood} • {playlist.songs} songs</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Sparkles size={16} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Get Started CTA */}
        <Card className="bg-gradient-hero border-border/50 shadow-glow">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              Ready to discover your perfect mood music?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Share your feelings and let our AI create the ideal playlist for you.
            </p>
            <Link to="/emotion-input">
              <Button size="lg" variant="secondary">
                <Heart className="mr-2" size={20} />
                Analyze My Mood Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;