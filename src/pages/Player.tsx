import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Shuffle, 
  Repeat,
  MoreVertical,
  ArrowUp
} from 'lucide-react';
import Layout from '@/components/Layout';

interface Song {
  title: string;
  artist: string;
  duration: string;
}

interface CurrentlyPlaying {
  playlist: string;
  song: Song;
  songIndex: number;
  isPlaying: boolean;
}

const Player = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);
  const [progress, setProgress] = useState([30]); // 30% progress for demo
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

  useEffect(() => {
    const storedPlaying = localStorage.getItem('currentlyPlaying');
    if (storedPlaying) {
      setCurrentlyPlaying(JSON.parse(storedPlaying));
    }
  }, []);

  const togglePlayPause = () => {
    if (currentlyPlaying) {
      const updated = { ...currentlyPlaying, isPlaying: !currentlyPlaying.isPlaying };
      setCurrentlyPlaying(updated);
      localStorage.setItem('currentlyPlaying', JSON.stringify(updated));
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const cycleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDurationInSeconds = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  if (!currentlyPlaying) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={24} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No music playing</h2>
              <p className="text-muted-foreground">
                Start playing music from a playlist to see the player controls
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const currentTime = Math.floor((getDurationInSeconds(currentlyPlaying.song.duration) * progress[0]) / 100);
  const totalTime = getDurationInSeconds(currentlyPlaying.song.duration);

  return (
    <Layout>
      <div className="min-h-screen p-6">
        {/* Main Player Card */}
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-card border-border/50 shadow-player">
            <CardContent className="p-8">
              {/* Album Art */}
              <div className="w-full aspect-square bg-gradient-to-br from-primary to-primary/60 rounded-xl mb-6 flex items-center justify-center shadow-glow">
                <div className="text-8xl">🎵</div>
              </div>

              {/* Song Info */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2 truncate">
                  {currentlyPlaying.song.title}
                </h1>
                <p className="text-muted-foreground truncate">
                  {currentlyPlaying.song.artist}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  from "{currentlyPlaying.playlist}"
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <Slider
                  value={progress}
                  onValueChange={setProgress}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalTime)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleShuffle}
                  className={isShuffled ? "text-primary" : "text-muted-foreground"}
                >
                  <Shuffle size={20} />
                </Button>

                <Button variant="ghost" size="sm">
                  <SkipBack size={24} />
                </Button>

                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-gradient-hero hover:opacity-90 text-primary-foreground"
                >
                  {currentlyPlaying.isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} />
                  )}
                </Button>

                <Button variant="ghost" size="sm">
                  <SkipForward size={24} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleRepeat}
                  className={repeatMode !== 'off' ? "text-primary" : "text-muted-foreground"}
                >
                  <Repeat size={20} />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLike}
                  className={isLiked ? "text-red-500" : "text-muted-foreground"}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </Button>

                <div className="flex items-center gap-2 flex-1 max-w-32 mx-4">
                  <Volume2 size={16} className="text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                </div>

                <Button variant="ghost" size="sm">
                  <MoreVertical size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Up Next */}
          <Card className="mt-6 bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Up Next</h3>
                <Button variant="ghost" size="sm">
                  <ArrowUp size={16} className="mr-1" />
                  Queue
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 cursor-pointer">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Play size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Good as Hell</p>
                    <p className="text-sm text-muted-foreground truncate">Lizzo</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2:39</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 cursor-pointer">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Play size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Can't Stop the Feeling!</p>
                    <p className="text-sm text-muted-foreground truncate">Justin Timberlake</p>
                  </div>
                  <span className="text-sm text-muted-foreground">3:56</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Player;