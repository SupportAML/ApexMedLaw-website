import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  MapPin,
  Shield,
  ChevronRight,
  UserPlus,
  CheckCircle,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { physicians, SPECIALTIES, CASE_TYPE_OPTIONS, US_STATES, type Physician } from '@/data/physicians';

function availabilityColor(a: Physician['availability']) {
  if (a === 'available') return 'bg-emerald-100 text-emerald-700';
  if (a === 'limited') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
}

function availabilityLabel(a: Physician['availability']) {
  if (a === 'available') return 'Available';
  if (a === 'limited') return 'Limited';
  return 'Unavailable';
}

function PhysicianCard({ physician }: { physician: Physician }) {
  return (
    <Link
      to={`/registry/${physician.slug}`}
      className="group bg-white rounded-2xl border border-border hover:border-electric/30 hover:shadow-card transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center text-electric font-display font-bold text-lg">
              {physician.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground group-hover:text-electric transition-colors">
                {physician.name}
              </h3>
              <p className="text-sm text-muted-foreground">{physician.specialty}</p>
            </div>
          </div>
          {physician.featured && (
            <Badge className="bg-electric/10 text-electric border-0 text-xs">Featured</Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {physician.boardCertifications.slice(0, 2).map((cert) => (
            <span key={cert} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-clinical-100 px-2 py-1 rounded-md">
              <Shield size={10} className="text-teal" />
              {cert.length > 45 ? cert.slice(0, 42) + '...' : cert}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} />
            {physician.location.city}, {physician.location.state}
          </div>
          <div className="text-muted-foreground">
            {physician.yearsExperience}+ years experience
          </div>
          <div className="text-muted-foreground">
            {physician.caseCount}+ cases reviewed
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${availabilityColor(physician.availability)}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {availabilityLabel(physician.availability)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {physician.subspecialties.slice(0, 3).map((sub) => (
            <Badge key={sub} variant="secondary" className="text-xs font-normal">
              {sub}
            </Badge>
          ))}
          {physician.subspecialties.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{physician.subspecialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center text-sm font-medium text-electric group-hover:gap-2 transition-all">
          View full profile <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}

export function RegistryPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [state, setState] = useState('');
  const [caseType, setCaseType] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return physicians.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.specialty.toLowerCase().includes(q) ||
          p.subspecialties.some((s) => s.toLowerCase().includes(q)) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.state.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (specialty && p.specialty !== specialty) return false;
      if (state && !p.statesLicensed.includes(state)) return false;
      if (caseType && !p.caseTypes.includes(caseType)) return false;
      if (availabilityFilter && p.availability !== availabilityFilter) return false;
      return true;
    });
  }, [search, specialty, state, caseType, availabilityFilter]);

  const hasActiveFilters = specialty || state || caseType || availabilityFilter;

  const clearFilters = () => {
    setSpecialty('');
    setState('');
    setCaseType('');
    setAvailabilityFilter('');
    setSearch('');
  };

  const selectClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none appearance-none';
  const selectArrow = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: 'right 12px center',
  };

  return (
    <>
      <SEO
        title="Expert Witness Registry"
        description="Browse our network of board-certified physician expert witnesses. Search by specialty, location, and case type. Free for attorneys."
      />
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative w-full py-16 lg:py-24 bg-navy overflow-hidden">
          <div className="absolute inset-0 neural-bg opacity-[0.05]" />
          <div className="relative z-10 w-full px-6 lg:px-12">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-electric/20 text-electric rounded-full text-sm font-medium mb-6">
                Physician Expert Witness Registry
              </span>
              <h1 className="display-heading text-display-lg text-white mb-6">
                Find Your <span className="text-electric">Expert Witness</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-8">
                Browse board-certified physicians across multiple specialties. Free to search.
                No annual fees. Connect directly with qualified experts for your case.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/join">
                  <Button className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-3 rounded-full flex items-center gap-2">
                    <UserPlus size={18} />
                    Join Our Network — It's Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="w-full px-6 lg:px-12 -mt-8 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, specialty, or location..."
                    className="pl-11 py-3 rounded-xl border-border focus:border-electric"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                    showFilters || hasActiveFilters
                      ? 'bg-electric/10 text-electric border-electric/30'
                      : 'bg-white text-foreground border-border hover:border-electric/30'
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 rounded-full bg-electric text-white text-xs flex items-center justify-center">
                      {[specialty, state, caseType, availabilityFilter].filter(Boolean).length}
                    </span>
                  )}
                </button>
              </div>

              {showFilters && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border">
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={selectClass} style={selectArrow}>
                    <option value="">All Specialties</option>
                    {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={state} onChange={(e) => setState(e.target.value)} className={selectClass} style={selectArrow}>
                    <option value="">All States</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select value={caseType} onChange={(e) => setCaseType(e.target.value)} className={selectClass} style={selectArrow}>
                    <option value="">All Case Types</option>
                    {CASE_TYPE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className={selectClass} style={selectArrow}>
                    <option value="">Any Availability</option>
                    <option value="available">Available Now</option>
                    <option value="limited">Limited</option>
                  </select>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-electric transition-colors sm:col-span-2 lg:col-span-4">
                      <X size={14} /> Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                {filtered.length} expert{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-clinical-100 flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">No experts found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-full">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((p) => (
                  <PhysicianCard key={p.id} physician={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="w-full px-6 lg:px-12 pb-16 lg:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="bg-navy rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 neural-bg opacity-[0.05]" />
              <div className="relative z-10">
                <h2 className="display-heading text-display-sm text-white mb-4">
                  Are You a Physician Expert Witness?
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                  Join the ApexMedLaw expert network — completely free. No annual fees, no listing charges.
                  Get matched with attorneys who need your specialty.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/join">
                    <Button className="bg-electric hover:bg-electric/90 text-white font-medium px-8 py-3 rounded-full flex items-center gap-2">
                      <UserPlus size={18} />
                      Join Our Network
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-electric" /> Free forever
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-electric" /> No commitments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
