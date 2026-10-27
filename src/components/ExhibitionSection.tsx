import { Card, CardContent } from "@/components/ui/card";
import { Map, Info, Layout, Maximize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ExhibitionSection = () => {
    const { t } = useLanguage();

    return (
        <section id="exhibition" className="section-padding bg-muted/50 snap-start snap-always">
            <div className="container-custom">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">{t('exhibition.showcase')}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 text-foreground">
                        {t('exhibition.title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('exhibition.subtitle')}
                    </p>
                </div>


                {/* Professional Exhibition Maps Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Main Floor Plan */}
                    <div className="rounded-2xl overflow-hidden shadow-soft border border-border bg-white group relative aspect-[4/3] flex flex-col">
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                            </div>
                            <img
                                src="/floor-plan.jpg"
                                alt={t('exhibition.map_placeholder')}
                                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-110"
                                onClick={() => window.open('/floor-plan.jpg', '_blank')}
                            />
                        </div>
                        <div className="p-4 bg-card border-t border-border mt-auto">
                            <h4 className="text-sm font-bold text-center text-foreground uppercase tracking-widest">
                                {t('exhibition.floor_plan')}
                            </h4>
                        </div>
                    </div>

                    {/* Zone I */}
                    <div className="rounded-2xl overflow-hidden shadow-soft border border-border bg-white group relative aspect-[4/3] flex flex-col">
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                            </div>
                            <img
                                src="/exhibition_map1.jpeg"
                                alt={`${t('exhibition.map')} 1`}
                                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-110"
                                onClick={() => window.open('/exhibition_map1.jpeg', '_blank')}
                            />
                        </div>
                        <div className="p-4 bg-card border-t border-border mt-auto">
                            <h4 className="text-sm font-bold text-center text-foreground uppercase tracking-widest">
                                {t('exhibition.zone_layout')} I
                            </h4>
                        </div>
                    </div>

                    {/* Zone II */}
                    <div className="rounded-2xl overflow-hidden shadow-soft border border-border bg-white group relative aspect-[4/3] flex flex-col">
                        <div className="flex-1 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                            </div>
                            <img
                                src="/exhibition_map2.jpeg"
                                alt={`${t('exhibition.map')} 2`}
                                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-110"
                                onClick={() => window.open('/exhibition_map2.jpeg', '_blank')}
                            />
                        </div>
                        <div className="p-4 bg-card border-t border-border mt-auto">
                            <h4 className="text-sm font-bold text-center text-foreground uppercase tracking-widest">
                                {t('exhibition.zone_layout')} II
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExhibitionSection;
