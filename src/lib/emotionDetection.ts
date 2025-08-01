import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface EmotionResult {
  emotion: string;
  score: number;
  emoji: string;
  color: string;
}

const emotionMappings: Record<string, { emoji: string; color: string }> = {
  joy: { emoji: '😊', color: 'emotion-joy' },
  happiness: { emoji: '😊', color: 'emotion-joy' },
  sadness: { emoji: '😢', color: 'emotion-sad' },
  anger: { emoji: '😠', color: 'emotion-angry' },
  fear: { emoji: '😨', color: 'emotion-sad' },
  surprise: { emoji: '😲', color: 'emotion-excited' },
  disgust: { emoji: '🤢', color: 'emotion-angry' },
  love: { emoji: '❤️', color: 'emotion-love' },
  calm: { emoji: '😌', color: 'emotion-calm' },
  excited: { emoji: '🤩', color: 'emotion-excited' },
  neutral: { emoji: '😐', color: 'emotion-calm' }
};

let emotionClassifier: any = null;

export const initializeEmotionDetection = async () => {
  if (!emotionClassifier) {
    try {
      emotionClassifier = await pipeline(
        'text-classification',
        'j-hartmann/emotion-english-distilroberta-base'
      );
    } catch (error) {
      console.error('Failed to initialize emotion detection:', error);
    }
  }
  return emotionClassifier;
};

export const detectEmotion = async (text: string): Promise<EmotionResult> => {
  try {
    const classifier = await initializeEmotionDetection();
    
    if (!classifier) {
      throw new Error('Emotion classifier not initialized');
    }

    const results = await classifier(text);
    const topEmotion = results[0];
    
    const emotion = topEmotion.label.toLowerCase();
    const mapping = emotionMappings[emotion] || emotionMappings.neutral;
    
    return {
      emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      score: topEmotion.score,
      emoji: mapping.emoji,
      color: mapping.color
    };
  } catch (error) {
    console.error('Error detecting emotion:', error);
    // Fallback emotion detection
    return {
      emotion: 'Neutral',
      score: 0.5,
      emoji: '😐',
      color: 'emotion-calm'
    };
  }
};

export const getPlaylistForEmotion = (emotion: string) => {
  const playlists: Record<string, any> = {
    joy: {
      name: "Happy Vibes",
      songs: [
        { title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
        { title: "Good as Hell", artist: "Lizzo", duration: "2:39" },
        { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56" },
        { title: "Walking on Sunshine", artist: "Katrina and the Waves", duration: "3:59" }
      ],
      color: "emotion-joy"
    },
    sadness: {
      name: "Melancholy Moods",
      songs: [
        { title: "Someone Like You", artist: "Adele", duration: "4:45" },
        { title: "Mad World", artist: "Gary Jules", duration: "3:07" },
        { title: "Hurt", artist: "Johnny Cash", duration: "3:38" },
        { title: "Black", artist: "Pearl Jam", duration: "5:43" }
      ],
      color: "emotion-sad"
    },
    anger: {
      name: "Rage Release",
      songs: [
        { title: "Break Stuff", artist: "Limp Bizkit", duration: "2:47" },
        { title: "Bodies", artist: "Drowning Pool", duration: "3:23" },
        { title: "Killing in the Name", artist: "Rage Against the Machine", duration: "5:14" },
        { title: "Freak on a Leash", artist: "Korn", duration: "4:15" }
      ],
      color: "emotion-angry"
    },
    calm: {
      name: "Peaceful Moments",
      songs: [
        { title: "Weightless", artist: "Marconi Union", duration: "8:08" },
        { title: "Clair de Lune", artist: "Claude Debussy", duration: "5:02" },
        { title: "River", artist: "Joni Mitchell", duration: "4:00" },
        { title: "Mad About You", artist: "Sting", duration: "3:56" }
      ],
      color: "emotion-calm"
    },
    excited: {
      name: "Energy Boost",
      songs: [
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30" },
        { title: "I Gotta Feeling", artist: "The Black Eyed Peas", duration: "4:05" },
        { title: "Don't Stop Me Now", artist: "Queen", duration: "3:29" },
        { title: "Mr. Blue Sky", artist: "Electric Light Orchestra", duration: "5:03" }
      ],
      color: "emotion-excited"
    },
    love: {
      name: "Love Songs",
      songs: [
        { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
        { title: "All of Me", artist: "John Legend", duration: "4:29" },
        { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
        { title: "Make You Feel My Love", artist: "Bob Dylan", duration: "3:32" }
      ],
      color: "emotion-love"
    }
  };
  
  return playlists[emotion.toLowerCase()] || playlists.calm;
};