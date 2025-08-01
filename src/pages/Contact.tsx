import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Github, 
  Twitter, 
  Linkedin,
  Bug,
  Lightbulb,
  Star,
  Heart
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'feedback'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your feedback. We'll get back to you soon!"
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'feedback'
      });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const feedbackTypes = [
    { value: 'feedback', label: 'General Feedback', icon: MessageSquare },
    { value: 'bug', label: 'Bug Report', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'praise', label: 'Praise', icon: Star }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: '#', description: 'View source code' },
    { name: 'Twitter', icon: Twitter, url: '#', description: 'Follow updates' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', description: 'Professional network' }
  ];

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have feedback, found a bug, or just want to say hello, 
            don't hesitate to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  We'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Message Type */}
                  <div className="space-y-3">
                    <Label>Message Type</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.value })}
                            className={`p-3 rounded-lg border transition-colors text-left ${
                              formData.type === type.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:bg-secondary/30'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon size={16} />
                              <span className="text-sm font-medium">{type.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your message"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your feedback, bug report, or feature request..."
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={20} />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground">hello@moodtune.dev</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Response Time</h4>
                  <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Support Hours</h4>
                  <p className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <Icon size={20} className="text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{social.name}</p>
                        <p className="text-xs text-muted-foreground">{social.description}</p>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Common Questions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• How accurate is emotion detection?</li>
                    <li>• Can I use this offline?</li>
                    <li>• Is my data private?</li>
                    <li>• How do you select music?</li>
                  </ul>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View FAQ
                </Button>
              </CardContent>
            </Card>

            {/* Feedback Types */}
            <Card className="bg-secondary/20 border-border/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">We appreciate:</h4>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2 mb-1">
                    <Heart size={12} className="mr-1" />
                    User feedback
                  </Badge>
                  <Badge variant="secondary" className="mr-2 mb-1">
                    <Bug size={12} className="mr-1" />
                    Bug reports
                  </Badge>
                  <Badge variant="secondary" className="mr-2 mb-1">
                    <Lightbulb size={12} className="mr-1" />
                    Feature ideas
                  </Badge>
                  <Badge variant="secondary" className="mr-2 mb-1">
                    <Star size={12} className="mr-1" />
                    Success stories
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;