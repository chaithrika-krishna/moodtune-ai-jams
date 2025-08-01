import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Music, 
  Heart, 
  Zap, 
  Shield, 
  Code, 
  Headphones,
  ArrowRight,
  Github,
  ExternalLink
} from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Emotion Detection",
      description: "Using state-of-the-art DistilRoBERTa models from Hugging Face to analyze text and detect emotions with high accuracy.",
      tech: ["Transformers.js", "DistilRoBERTa", "NLP"]
    },
    {
      icon: Music,
      title: "Curated Music Recommendations",
      description: "Carefully selected playlists that match specific emotional states, designed to enhance or transform your mood.",
      tech: ["Music Psychology", "Playlist Curation", "Mood Matching"]
    },
    {
      icon: Heart,
      title: "Emotion Journey Tracking",
      description: "Track your emotional patterns over time and revisit past moods to understand your emotional journey.",
      tech: ["Data Visualization", "History Tracking", "Analytics"]
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast emotion analysis that processes your text in real-time without sending data to external servers.",
      tech: ["WebGPU", "Browser ML", "Privacy-First"]
    }
  ];

  const techStack = [
    { name: "React 18", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Hugging Face Transformers", category: "AI/ML" },
    { name: "Vite", category: "Build Tool" },
    { name: "Lucide React", category: "Icons" }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Share Your Feelings",
      description: "Write about your current mood, experiences, or thoughts in natural language."
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our DistilRoBERTa model analyzes your text to identify the dominant emotion with confidence scoring."
    },
    {
      step: 3,
      title: "Music Matching",
      description: "Based on your emotion, we recommend curated playlists designed to complement your mood."
    },
    {
      step: 4,
      title: "Enjoy & Track",
      description: "Listen to your personalized playlist and track your emotional journey over time."
    }
  ];

  return (
    <Layout>
      <div className="p-6 space-y-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow">
              <Headphones size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              MoodTune
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where artificial intelligence meets emotional intelligence to create the perfect 
            soundtrack for your feelings.
          </p>
        </div>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <Card key={item.step} className="bg-gradient-card border-border/50 shadow-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Privacy & Security */}
        <section>
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="text-primary" size={24} />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">🔒 Local Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your emotional data is processed entirely in your browser using WebGPU acceleration. 
                    Nothing is sent to external servers.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🛡️ Data Control</h4>
                  <p className="text-sm text-muted-foreground">
                    You own your data. Everything is stored locally and you can clear your history 
                    at any time.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🚫 No Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    We don't track your usage, collect analytics, or share any personal information 
                    with third parties.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">⚡ Offline Capable</h4>
                  <p className="text-sm text-muted-foreground">
                    Once loaded, the emotion detection works offline. Your privacy is guaranteed 
                    even without an internet connection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Built With Modern Technology</h2>
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="text-primary" size={24} />
                Technology Stack
              </CardTitle>
              <CardDescription>
                Cutting-edge technologies for optimal performance and user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {techStack.map((tech) => (
                  <div key={tech.name} className="p-3 rounded-lg bg-secondary/30">
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.category}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Open Source */}
        <section>
          <Card className="bg-gradient-hero border-border/50 shadow-glow">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Open Source & GitHub Ready
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                MoodTune is built with clean, modern code that's perfect for your GitHub portfolio. 
                Showcase your skills in AI, React, and modern web development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Github className="mr-2" size={20} />
                  View Source Code
                </Button>
                <Button variant="secondary" size="lg">
                  <ExternalLink className="mr-2" size={20} />
                  Live Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Discover Your Perfect Soundtrack?</h2>
              <p className="text-muted-foreground mb-6">
                Start your emotional music journey today and let AI create the perfect playlist for your mood.
              </p>
              <Link to="/emotion-input">
                <Button size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground">
                  <Heart className="mr-2" size={20} />
                  Analyze Your Mood Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;