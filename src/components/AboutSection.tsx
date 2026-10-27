import { BookOpen, Lightbulb, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const pillars = [
  {
    icon: BookOpen,
    title: 'Knowledge',
    titleHi: 'ज्ञान',
    description: 'Learning of modern techniques related to dairy farming and expert interactions.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    titleHi: 'नवाचार',
    description: 'Exposure to modern dairy technology and agri-solutions.',
  },
  {
    icon: Music,
    title: 'Culture',
    titleHi: 'संस्कृति',
    description: 'A celebration of folk art, cuisine and traditional crafts.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center section-padding pt-20 md:pt-24 bg-background snap-start snap-always">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About The Event</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 text-foreground">
            What is <span className="text-primary">Rangeelo</span>?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Rangeelo is a farmer-centric event designed to bring together farmers, agri & dairy experts, 
              government bodies, financial institutions, and industry stakeholders on a single platform, 
              while celebrating the vibrant cultural heritage of Rajasthan.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Blending knowledge, innovation, sustainability, and culture, Rangeelo aims to empower farmers 
              through learning, engagement, and exposure to modern agricultural and dairy practices — 
              driving rural prosperity and inclusive growth.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-10 text-foreground">Our Core Pillars</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <Card 
                key={pillar.title} 
                className="group card-hover border-0 shadow-card bg-card overflow-hidden"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{pillar.title}</h4>
                  <p className="text-primary font-medium text-sm mb-4">{pillar.titleHi}</p>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
