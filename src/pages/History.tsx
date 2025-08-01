import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Music, Trash2, BarChart3, Filter } from 'lucide-react';
import Layout from '@/components/Layout';

interface HistoryEntry {
  id: number;
  emotion: string;
  score: number;
  emoji: string;
  color: string;
  text: string;
  timestamp: string;
  playlist: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmotion, setFilterEmotion] = useState<string>('all');

  useEffect(() => {
    const storedHistory = localStorage.getItem('emotionHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setHistory(parsedHistory);
      setFilteredHistory(parsedHistory);
    }
  }, []);

  useEffect(() => {
    let filtered = history;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.emotion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.playlist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by emotion
    if (filterEmotion !== 'all') {
      filtered = filtered.filter(entry =>
        entry.emotion.toLowerCase() === filterEmotion.toLowerCase()
      );
    }

    setFilteredHistory(filtered);
  }, [searchTerm, filterEmotion, history]);

  const clearHistory = () => {
    localStorage.removeItem('emotionHistory');
    setHistory([]);
    setFilteredHistory([]);
  };

  const deleteEntry = (id: number) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('emotionHistory', JSON.stringify(updatedHistory));
  };

  const replayAnalysis = (entry: HistoryEntry) => {
    localStorage.setItem('emotionResult', JSON.stringify({
      emotion: entry.emotion,
      score: entry.score,
      emoji: entry.emoji,
      color: entry.color,
      text: entry.text,
      timestamp: entry.timestamp
    }));
  };

  const getEmotionStats = () => {
    const emotionCounts: Record<string, number> = {};
    history.forEach(entry => {
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
    });
    return Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const uniqueEmotions = Array.from(new Set(history.map(entry => entry.emotion)));

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Emotion History</h1>
            <p className="text-muted-foreground">
              Track your emotional journey and rediscover past moods
            </p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" onClick={clearHistory}>
              <Trash2 className="mr-2" size={16} />
              Clear History
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        {history.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{history.length}</p>
                    <p className="text-sm text-muted-foreground">Total Analyses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emotion-joy/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{getEmotionStats()[0]?.[0] === 'Joy' ? '😊' : getEmotionStats()[0]?.[0] === 'Sadness' ? '😢' : '😐'}</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{getEmotionStats()[0]?.[0] || 'None'}</p>
                    <p className="text-sm text-muted-foreground">Most Common</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emotion-excited/20 rounded-lg flex items-center justify-center">
                    <Music className="text-emotion-excited" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{uniqueEmotions.length}</p>
                    <p className="text-sm text-muted-foreground">Unique Emotions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        {history.length > 0 && (
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your emotions, descriptions, or playlists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <select
                    value={filterEmotion}
                    onChange={(e) => setFilterEmotion(e.target.value)}
                    className="bg-background border border-border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">All Emotions</option>
                    {uniqueEmotions.map(emotion => (
                      <option key={emotion} value={emotion}>{emotion}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((entry) => (
              <Card key={entry.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Emotion Icon */}
                    <div className={`w-16 h-16 bg-${entry.color}/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{entry.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Badge className={`bg-${entry.color}/20 text-${entry.color} border-${entry.color}/30`}>
                            {entry.emotion}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(entry.score * 100)}% confidence
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          {new Date(entry.timestamp).toLocaleDateString()} at{' '}
                          {new Date(entry.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>

                      <p className="text-sm italic text-muted-foreground">
                        "{entry.text}"
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Music size={14} className="text-muted-foreground" />
                          <span className="text-sm">Playlist: {entry.playlist}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link to="/emotion-result" onClick={() => replayAnalysis(entry)}>
                            <Button variant="outline" size="sm">
                              View Analysis
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteEntry(entry.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : history.length > 0 ? (
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No emotion history yet</h3>
              <p className="text-muted-foreground mb-6">
                Start analyzing your emotions to build your mood history
              </p>
              <Link to="/emotion-input">
                <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground">
                  Analyze Your First Emotion
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default History;