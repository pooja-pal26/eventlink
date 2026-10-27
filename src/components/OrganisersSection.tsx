import { useLanguage } from '@/contexts/LanguageContext';

const OrganisersSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="organisers" className="min-h-screen flex items-center section-padding pt-20 md:pt-24 bg-muted snap-start snap-always">
      <div className="container-custom">
        <div >

          {/* Page Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-black uppercase tracking-tight mb-10 md:mb-14" style={{ color: '#1a2744', fontFamily: 'Inter, sans-serif' }}>
            {t('organisers.page_title')}
          </h2>

          {/* Quote + Chairman Photo Row */}
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">

  {/* Left Content */}
  <div>

    {/* Quote */}
    <blockquote className="text-lg md:text-xl lg:text-2xl italic leading-relaxed font-serif mb-6 text-center lg:text-left">
      {t("organisers.quote")}
    </blockquote>

    <div className="mb-10 text-center lg:text-left">
      <p className="text-base font-medium">
        {t("organisers.quote_author")}
      </p>
      <p className="text-base italic text-muted-foreground">
        {t("organisers.quote_designation")}
      </p>
    </div>

    {/* Heading */}
    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center lg:text-left">
      {t("organisers.combined_title")}
    </h3>

    {/* Content */}
    <div className="space-y-5">
      
        
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4 text-justify">
              {language === 'hi' ? (
                <><span className="font-bold">राष्ट्रीय डेरी विकास बोर्ड (एनडीडीबी)</span>{t('organisers.nddb.desc1').replace('राष्ट्रीय डेरी विकास बोर्ड (एनडीडीबी)', '')}</>
              ) : (
                <>The <span className="font-bold">National Dairy Development Board's (NDDB)</span> {t('organisers.nddb.desc1').replace("The National Dairy Development Board's (NDDB) ", '')}</>
              )}
            </p>
            
          
      

      
    </div>

  </div>

  {/* Right Image */}
  <div className="relative mt-2 lg:-mt-10 order-first lg:order-last w-full">
    <div
      className="sticky top-24 w-64 h-[380px] md:w-72 md:h-[430px] overflow-hidden mx-auto lg:ml-auto"
      style={{
        border: "2px solid #c8894f",
        borderRadius: "0 150px 0 0",
      }}
    >
      <img
        src="/chairman.jpeg"
        alt="Chairman"
        className="w-full h-full object-cover"
        style={{
          objectPosition: "center top",
          transform: "scale(1.9) translateX(-25px)",
          transformOrigin: "top center",
        }}
      />
    </div>
  </div>

</div>

          {/* Divider */}
          {/* <hr className="border-foreground/20 mb-10 md:mb-14" /> */}

          {/* Combined Heading */}
          {/* <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">
            {t('organisers.combined_title')}
          </h3> */}

          {/* NDDB Content */}
          <div className="mb-8 md:mb-10">
            {/* <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4 text-justify">
              The <span className="font-bold">National Dairy Development Board's (NDDB)</span> {t('organisers.nddb.desc1').replace("The National Dairy Development Board's (NDDB) ", '')}
            </p> */}
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4 text-justify">
              {t('organisers.nddb.desc2')}
            </p>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed text-justify">
              {t('organisers.nddb.desc3')}
            </p>
          </div>

          
          <div>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4 text-justify">
              {language === 'hi' ? (
                <><span className="font-bold">एनडीडीबी डेरी सर्विसेज़ (एनडीएस)</span>{t('organisers.nds.desc1').replace('एनडीडीबी डेरी सर्विसेज़ (एनडीएस)', '')}</>
              ) : (
                <><span className="font-bold">NDDB Dairy Services (NDS)</span> {t('organisers.nds.desc1').replace('NDDB Dairy Services (NDS) ', '')}</>
              )}
            </p>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4 text-justify">
              {t('organisers.nds.desc2')}
            </p>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed text-justify">
              {t('organisers.nds.desc3')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrganisersSection;
