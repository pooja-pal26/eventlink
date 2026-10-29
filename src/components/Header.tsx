import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);
  const [isMobileRegisterOpen, setIsMobileRegisterOpen] = useState(false);
  const [isPashuMelaOpen, setIsPashuMelaOpen] = useState(false);
  const [isMobilePashuMelaOpen, setIsMobilePashuMelaOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const registerDropdownRef = useRef<HTMLDivElement>(null);
  const pashuMelaDropdownRef = useRef<HTMLDivElement>(null);
  const pashuMelaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const handlePashuMelaMouseEnter = () => {
    if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
    setIsPashuMelaOpen(true);
  };

  const handlePashuMelaMouseLeave = () => {
    if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
    pashuMelaTimeoutRef.current = setTimeout(() => {
      setIsPashuMelaOpen(false);
    }, 250);
  };

  const registerOptions = [
    { labelKey: 'register.animal', href: '/register?type=animal' },
    { labelKey: 'register.visitor', href: '/register?type=visitor' },
    { labelKey: 'register.sponsor', href: '/register?type=sponsor' },
    { labelKey: 'register.exhibitor', href: '/register?type=exhibitor' },
  ];

  const pashuMelaOptions = [
    {
      name: language === 'hi' ? 'रंगीलो काशी के विजेता' : 'Winners of Rangeelo Kashi',
      href: '/pashu-mela/kashi',
    },
    {
      name: language === 'hi' ? 'रंगीलो जयपुर के विजेता' : 'Winners of Rangeelo Jaipur',
      href: '/pashu-mela/jaipur',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (registerDropdownRef.current && !registerDropdownRef.current.contains(e.target as Node)) {
        setIsRegisterDropdownOpen(false);
      }
      if (pashuMelaDropdownRef.current && !pashuMelaDropdownRef.current.contains(e.target as Node)) {
        if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
        setIsPashuMelaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const startHideTimer = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (!isMobileMenuOpen) setIsVisible(false);
      }, 2500);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsVisible(true);
      startHideTimer();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show header when mouse is near the top of the screen
      if (e.clientY < 80) {
        setIsVisible(true);
        startHideTimer();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    startHideTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
        { name: t('nav.organisers'), href: '/#organisers' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.program'), href: '/#event-program' },
    { name: t('nav.pashu_mela'), href: '/pashu-mela', isDropdown: true },
    // { name: t('nav.exhibition'), href: '/#exhibition' },
    { name: t('nav.accommodation'), href: '/accommodation' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '/' && (location.pathname === '/' || location.pathname === '' || location.pathname === '/index.html')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.includes('#')) {
      const elementId = href.split('#')[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md',
        isScrolled
          ? 'bg-card/95 shadow-soft py-2'
          : 'bg-foreground/20 py-3',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      )}
    >
      <div className="container-custom flex items-center justify-between px-4 md:px-8">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={cn(
            "h-9 w-16 md:h-11 md:w-24 xl:h-12 xl:w-28 rounded-lg flex items-center justify-center p-1.5 transition-all bg-white shadow-md hover:shadow-lg",
            isScrolled ? "h-8 w-14 md:h-9 md:w-20 xl:h-10 xl:w-24" : ""
          )}>
            <img src="/nddb.png" alt="NDDB" className="h-full w-full object-contain" />
          </div>
          <div className={cn(
            "h-9 w-16 md:h-11 md:w-24 xl:h-12 xl:w-28 rounded-lg flex items-center justify-center p-1.5 transition-all bg-white shadow-md hover:shadow-lg",
            isScrolled ? "h-8 w-14 md:h-9 md:w-20 xl:h-10 xl:w-24" : ""
          )}>
            <img src="/nddbds.png" alt="NDS" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-2 xl:gap-6 mx-2">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  ref={pashuMelaDropdownRef}
                  onMouseEnter={handlePashuMelaMouseEnter}
                  onMouseLeave={handlePashuMelaMouseLeave}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
                      setIsPashuMelaOpen(!isPashuMelaOpen);
                    }}
                    className={cn(
                      'text-[13px] xl:text-sm font-semibold transition-colors hover:text-primary whitespace-nowrap flex items-center gap-1 cursor-pointer py-1',
                      isScrolled ? 'text-foreground/80' : 'text-primary-foreground/90'
                    )}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isPashuMelaOpen && "rotate-180")} />
                  </button>

                  {isPashuMelaOpen && (
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={handlePashuMelaMouseEnter}
                      onMouseLeave={handlePashuMelaMouseLeave}
                    >
                      <div className="bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden">
                        {pashuMelaOptions.map((opt) => (
                          <Link
                            key={opt.href}
                            to={opt.href}
                            onClick={() => {
                              if (pashuMelaTimeoutRef.current) clearTimeout(pashuMelaTimeoutRef.current);
                              setIsPashuMelaOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/30 last:border-b-0",
                              (location.pathname === opt.href || (location.pathname + location.search) === opt.href || (location.pathname === '/pashu-mela' && location.search.toLowerCase().includes(opt.href.split('/').pop()!))) && "font-bold bg-muted/40"
                            )}
                          >
                            <span>{opt.name}</span>
                            {(location.pathname === opt.href || (location.pathname + location.search) === opt.href || (location.pathname === '/pashu-mela' && location.search.toLowerCase().includes(opt.href.split('/').pop()!))) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  const isHome = location.pathname === '/' || location.pathname === '' || location.pathname === '/index.html';
                  if (isHome && link.href.includes('#')) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  } else if (!link.href.includes('#')) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={cn(
                  'text-[13px] xl:text-sm font-semibold transition-colors hover:text-primary whitespace-nowrap',
                  isScrolled ? 'text-foreground/80' : 'text-primary-foreground/90'
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className={cn(
                "gap-1 xl:gap-1.5 px-2 xl:px-3 h-9",
                isScrolled ? "text-foreground" : "text-primary-foreground hover:bg-white/10"
              )}
            >
              <Globe className="w-4 h-4" />
              <span className="font-bold text-xs xl:text-sm">{language === 'en' ? 'EN' : 'हि'}</span>
            </Button>

            {/* <a
              href="/Rangeelo_Brochure.pdf"
              download
              title={t('hero.download_brochure')}
              className={cn(
                "hidden xl:flex items-center gap-1.5 text-xs font-bold hover:text-primary transition-colors whitespace-nowrap",
                isScrolled ? "text-foreground/80" : "text-primary-foreground/90"
              )}
            >
              <Download className="w-4 h-4" />
              <span>{t('hero.download_brochure')}</span>
            </a> */}

            <div className="relative" ref={registerDropdownRef}>
              <Button
                variant={isScrolled ? 'default' : 'golden'}
                size="sm"
                className="font-bold px-3 xl:px-5 h-8 xl:h-10 shadow-glow whitespace-nowrap text-xs xl:text-sm gap-1.5"
                onClick={() => setIsRegisterDropdownOpen(!isRegisterDropdownOpen)}
              >
                {t('nav.register')}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isRegisterDropdownOpen && "rotate-180")} />
              </Button>
              {isRegisterDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-xl border border-border/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {registerOptions.map((opt) => (
                    <Link
                      key={opt.href}
                      to={opt.href}
                      onClick={() => setIsRegisterDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {t(opt.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions: Language Toggle & Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className={cn(
                "px-2 h-9",
                isScrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="font-bold text-xs">{language === 'en' ? 'EN' : 'हि'}</span>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isScrolled ? 'text-foreground hover:bg-muted' : 'text-primary-foreground hover:bg-primary-foreground/10'
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-lg border-b border-border">
          <nav className="flex flex-col gap-4 py-8 px-4">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="border-b border-border pb-2">
                    <button
                      type="button"
                      onClick={() => setIsMobilePashuMelaOpen(!isMobilePashuMelaOpen)}
                      className="w-full flex items-center justify-between text-lg font-semibold text-foreground hover:text-foreground transition-colors py-1"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobilePashuMelaOpen && "rotate-180")} />
                    </button>
                    {isMobilePashuMelaOpen && (
                      <div className="mt-2 rounded-xl border border-border overflow-hidden bg-muted/50">
                        {pashuMelaOptions.map((opt) => (
                          <Link
                            key={opt.href}
                            to={opt.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobilePashuMelaOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/30 last:border-b-0",
                              (location.pathname === opt.href || (location.pathname + location.search) === opt.href || (location.pathname === '/pashu-mela' && location.search.toLowerCase().includes(opt.href.split('/').pop()!))) && "font-bold bg-muted/40"
                            )}
                          >
                            <span>{opt.name}</span>
                            {(location.pathname === opt.href || (location.pathname + location.search) === opt.href || (location.pathname === '/pashu-mela' && location.search.toLowerCase().includes(opt.href.split('/').pop()!))) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    const isHome = location.pathname === '/' || location.pathname === '';
                    if (isHome && link.href.includes('#')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    } else if (!link.href.includes('#')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors border-b border-border pb-2"
                >
                  {link.name}
                </a>
              );
            })}
            <div className="mt-4">
              <Button
                className="w-full font-bold shadow-low gap-2"
                size="lg"
                onClick={() => setIsMobileRegisterOpen(!isMobileRegisterOpen)}
              >
                {t('nav.register')}
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileRegisterOpen && "rotate-180")} />
              </Button>
              {isMobileRegisterOpen && (
                <div className="mt-2 rounded-xl border border-border overflow-hidden bg-muted/50">
                  {registerOptions.map((opt) => (
                    <Link
                      key={opt.href}
                      to={opt.href}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileRegisterOpen(false); }}
                      className="flex items-center px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {t(opt.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4 mt-2">
              <p className="text-xs text-muted-foreground mb-3">{t('nav.language') || 'Language'}</p>
              <div className="flex gap-2">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setLanguage('en')}
                >
                  English
                </Button>
                <Button
                  variant={language === 'hi' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setLanguage('hi')}
                >
                  हिन्दी
                </Button>
              </div>
            </div>

            <a
              href="/Rangeelo_Brochure.pdf"
              download
              className="mt-4 flex items-center justify-center gap-2 text-foreground font-bold border border-border rounded-lg py-3 hover:bg-muted transition-colors"
            >
              <Download className="w-5 h-5 text-primary" />
              {t('hero.download_brochure')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
