import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Heart, Shuffle, MoreVertical, Clock, Plus } from 'lucide-react';
import Layout from '@/components/Layout';

interface Song {
  title: string;
  artist: string;
  duration: string;
}

interface Playlist {
  name: string;
  songs: Song[];
  color: string;
  emotion: string;
  timestamp: string;
}

const Playlist = () => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlaylist = localStorage.getItem('currentPlaylist');
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    } else {
      navigate('/emotion-input');
    }
  }, [navigate]);

  const handlePlayAll = () => {
    if (playlist) {
      localStorage.setItem('currentlyPlaying', JSON.stringify({
        playlist: playlist.name,
        song: playlist.songs[0],
        songIndex: 0,
        isPlaying: true
      }));
      navigate('/player');
    }
  };

  const handlePlaySong = (song: Song, index: number) => {
    localStorage.setItem('currentlyPlaying', JSON.stringify({
      playlist: playlist?.name,
      song,
      songIndex: index,
      isPlaying: true
    }));
    navigate('/player');
  };

  if (!playlist) {
    return null;
  }

  const getTotalDuration = () => {
    return playlist.songs.reduce((total, song) => {
      const [minutes, seconds] = song.duration.split(':').map(Number);
      return total + minutes * 60 + seconds;
    }, 0);
  };

  const formatTotalDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Playlist Header */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br from-${playlist.color}/20 to-transparent rounded-xl blur-xl`} />
          <Card className="relative bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Playlist Cover */}
                <div className={`w-48 h-48 bg-gradient-to-br from-${playlist.color} to-${playlist.color}/60 rounded-xl flex items-center justify-center shadow-glow`}>
                  <div className="text-center text-white">
                    <div className="text-6xl mb-2">
                      {playlist.emotion.toLowerCase() === 'joy' && '😊'}
                      {playlist.emotion.toLowerCase() === 'sadness' && '😢'}
                      {playlist.emotion.toLowerCase() === 'anger' && '😠'}
                      {playlist.emotion.toLowerCase() === 'calm' && '😌'}
                      {playlist.emotion.toLowerCase() === 'excited' && '🤩'}
                      {playlist.emotion.toLowerCase() === 'love' && '❤️'}
                      {!['joy', 'sadness', 'anger', 'calm', 'excited', 'love'].includes(playlist.emotion.toLowerCase()) && '🎵'}
                    </div>
                    <p className="text-sm font-medium">{playlist.emotion}</p>
                  </div>
                </div>

                {/* Playlist Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      MOOD PLAYLIST
                    </p>
                    <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
                    <p className="text-muted-foreground">
                      Curated for your {playlist.emotion.toLowerCase()} mood • {playlist.songs.length} songs, 
                      {formatTotalDuration(getTotalDuration())}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handlePlayAll}
                      size="lg"
                      className="bg-gradient-hero hover:opacity-90 text-primary-foreground"
                    >
                      <Play className="mr-2" size={20} />
                      Play All
                    </Button>
                    <Button variant="outline" size="lg">
                      <Shuffle className="mr-2" size={20} />
                      Shuffle
                    </Button>
                    <Button variant="ghost" size="lg">
                      <Heart size={20} />
                    </Button>
                    <Button variant="ghost" size="lg">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Song List */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Songs</CardTitle>
            <CardDescription>
              Perfect tracks for your {playlist.emotion.toLowerCase()} mood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-3">Artist</div>
                <div className="col-span-2 flex justify-end">
                  <Clock size={16} />
                </div>
              </div>

              {/* Songs */}
              {playlist.songs.map((song, index) => (
                <div 
                  key={index}
                  onClick={() => handlePlaySong(song, index)}
                  className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-secondary/30 cursor-pointer transition-colors group"
                >
                  <div className="col-span-1 flex items-center">
                    <span className="text-sm text-muted-foreground group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play className="hidden group-hover:block text-primary" size={16} />
                  </div>
                  <div className="col-span-6">
                    <p className="font-medium truncate">{song.title}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  <div className="col-span-2 flex justify-end items-center gap-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <Plus size={14} />
                    </Button>
                    <span className="text-sm text-muted-foreground">{song.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mood Context */}
        <Card className="bg-secondary/20 border-border/50">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Why this playlist matches your mood</h3>
            <p className="text-sm text-muted-foreground">
              Based on your {playlist.emotion.toLowerCase()} emotion, these songs are designed to 
              {playlist.emotion.toLowerCase() === 'joy' && ' amplify your happiness and keep your energy high.'}
              {playlist.emotion.toLowerCase() === 'sadness' && ' provide comfort and help you process your feelings.'}
              {playlist.emotion.toLowerCase() === 'anger' && ' help you channel your energy or find calm.'}
              {playlist.emotion.toLowerCase() === 'calm' && ' maintain your peaceful state and enhance relaxation.'}
              {playlist.emotion.toLowerCase() === 'excited' && ' match your high energy and enthusiasm.'}
              {playlist.emotion.toLowerCase() === 'love' && ' celebrate your feelings of love and connection.'}
              {!['joy', 'sadness', 'anger', 'calm', 'excited', 'love'].includes(playlist.emotion.toLowerCase()) && ' complement your current emotional state.'}
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/emotion-result">
            <Button variant="outline">
              ← Back to Results
            </Button>
          </Link>
          <Link to="/emotion-input">
            <Button variant="outline">
              Try New Mood →
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Playlist;