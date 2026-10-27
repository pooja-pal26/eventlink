import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import bottamImg from '@/assets/bottam.png';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="min-h-screen flex flex-col bg-background snap-start snap-always pb-0">
      <div className="container-custom flex-1 flex flex-col justify-center section-padding pt-20 md:pt-24">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t('contact.badge')}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-foreground">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          <Card className="border-0 shadow-card bg-card text-center card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Mail className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{t('contact.email')}</h3>
              <a href="mailto:sponsorship@rangeelo.co.in" className="text-muted-foreground hover:text-primary transition-colors">sponsorship@rangeelo.co.in</a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-card text-center card-hover">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <MapPin className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{t('contact.location')}</h3>
              <a href="https://maps.app.goo.gl/HDp2GqEZGHZWsQcw5" target="_blank" rel="noreferrer" className="text-muted-foreground text-sm whitespace-pre-line hover:text-primary transition-colors inline-block">{t('hero.location')}</a>
            </CardContent>
          </Card>
        </div>

        {/* Map Embed */}
        {/* <div className="max-w-4xl mx-auto mb-16 rounded-xl overflow-hidden shadow-card border-2 border-primary/10 bg-card">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4193.133185751023!2d77.19738717604395!3d28.56484858715001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce279fa28f713%3A0xa6914db36a4ac6a6!2sNDDB%20Dairy%20Services!5e1!3m2!1sen!2sin!4v1783594513397!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div> */}

        {/* Social Links */}
        <div className="text-center">
          <h3 className="font-bold text-foreground mb-6">{t('contact.follow')}</h3>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/ndsrangeelo/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/share/1CGqRzyyEV/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://x.com/NDDBDairyServ" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/nddb-dairy-services/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@NDDBDairyServices_YT" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <div className="w-full mt-auto leading-[0]">
        <img
          src={bottamImg}
          alt="Bottom decoration"
          className="w-full block"
        />
      </div>
    </section>
  );
};

export default ContactSection;
