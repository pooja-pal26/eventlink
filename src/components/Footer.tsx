import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-16 snap-start snap-always border-t border-primary/20">
      <div className="container-custom px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center text-center">
            <img src="/LOGO RANGEELO.png" alt="Rangeelo" className="h-16 w-auto object-contain mb-4 mx-auto block" />
            <p className="text-background/80 text-sm leading-relaxed mb-6">
              {t('hero.tagline')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.instagram.com/ndsrangeelo/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1CGqRzyyEV/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/NDDBDairyServ" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/nddb-dairy-services/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@NDDBDairyServices_YT" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('nav.about')}</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li><a href="/#about" className="hover:text-primary transition-colors">{t('nav.about')} Rangeelo</a></li>
              <li><a href="/#organisers" className="hover:text-primary transition-colors">{t('nav.organisers')}</a></li>
              <li><a href="/#pashu-mela" className="hover:text-primary transition-colors">{t('nav.pashu_mela')}</a></li>
              <li><a href="/#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</a></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">{t('hero.register')}</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('nav.contact')}</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:sponsorship@rangeelo.co.in" className="hover:text-primary transition-colors">sponsorship@rangeelo.co.in</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <a href="https://maps.app.goo.gl/HDp2GqEZGHZWsQcw5" target="_blank" rel="noreferrer" className="whitespace-pre-line hover:text-primary transition-colors">{t('hero.location')}</a>
              </li>
            </ul>
          </div>

          {/* Branding */}
          <div>
            <h4 className="font-bold text-lg mb-6">{t('hero.organised_by')}</h4>
            <div className="flex flex-col gap-4">
              <div className="bg-white p-3 rounded-xl w-32 h-14 flex items-center justify-center">
                <img src="/nddb.png" alt="NDDB" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white p-3 rounded-xl w-32 h-14 flex items-center justify-center">
                <img src="/nddbds.png" alt="NDS" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center">
          <p className="text-sm text-background/40">
            {language === 'hi'
              ? `© ${new Date().getFullYear()} रंगीलो. ${t('hero.organised_by')} राष्ट्रीय डेरी विकास बोर्ड एवं एनडीडीबी डेरी सर्विसेज़।`
              : `© ${new Date().getFullYear()} Rangeelo. ${t('hero.organised_by')} National Dairy Development Board & NDDB Dairy Services.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
