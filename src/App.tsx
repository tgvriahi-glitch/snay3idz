/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Artisan, AppOwnerConfig, ClientReview } from './types';
import { INITIAL_ARTISANS, DEFAULT_OWNER_CONFIG, INITIAL_REVIEWS } from './data/initialArtisans';
import { CRAFT_CATEGORIES } from './data/crafts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CraftsGrid } from './components/CraftsGrid';
import { ArtisanList } from './components/ArtisanList';
import { EmergencyBanner } from './components/EmergencyBanner';
import { AboutSection } from './components/AboutSection';
import { OwnerContactSection } from './components/OwnerContactSection';
import { Footer } from './components/Footer';
import { ArtisanModal } from './components/ArtisanModal';
import { AdminPanelModal } from './components/AdminPanelModal';

const ARTISANS_STORAGE_KEY = 'snay3i_artisans_v2';
const OWNER_STORAGE_KEY = 'snay3i_owner_config_v1';
const REVIEWS_STORAGE_KEY = 'snay3i_reviews_v1';

export default function App() {
  // 1. Data persistence with LocalStorage
  const [artisans, setArtisans] = useState<Artisan[]>(() => {
    try {
      const saved = localStorage.getItem(ARTISANS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading artisans from storage:', e);
    }
    return INITIAL_ARTISANS;
  });

  const [ownerConfig, setOwnerConfig] = useState<AppOwnerConfig>(() => {
    try {
      const saved = localStorage.getItem(OWNER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading owner config from storage:', e);
    }
    return DEFAULT_OWNER_CONFIG;
  });

  const [reviews, setReviews] = useState<ClientReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading reviews from storage:', e);
    }
    return INITIAL_REVIEWS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(artisans));
    } catch (e) {
      console.error('Error saving artisans:', e);
    }
  }, [artisans]);

  useEffect(() => {
    try {
      localStorage.setItem(OWNER_STORAGE_KEY, JSON.stringify(ownerConfig));
    } catch (e) {
      console.error('Error saving owner config:', e);
    }
  }, [ownerConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Error saving reviews:', e);
    }
  }, [reviews]);

  // 2. Search and Filtering States
  const [selectedWilaya, setSelectedWilaya] = useState<number | 'all'>('all');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  // 3. Modals and Navigation States
  const [selectedArtisanForModal, setSelectedArtisanForModal] = useState<Artisan | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Scroll to section helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. Calculate Artisan Counts by Craft
  const artisanCountsByCraft = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const craft of CRAFT_CATEGORIES) {
      counts[craft.id] = 0;
    }
    for (const a of artisans) {
      if (a.isAvailable) {
        counts[a.craftId] = (counts[a.craftId] || 0) + 1;
      }
    }
    return counts;
  }, [artisans]);

  // 5. Filter Artisans
  const filteredArtisans = useMemo(() => {
    return artisans.filter((artisan) => {
      // Wilaya filter
      if (selectedWilaya !== 'all' && artisan.wilayaId !== selectedWilaya) {
        return false;
      }

      // Craft category filter
      if (selectedCraft !== 'all' && artisan.craftId !== selectedCraft) {
        return false;
      }

      // Emergency filter
      if (emergencyOnly && !artisan.isEmergency24h) {
        return false;
      }

      // Search query filter (search in name, baladiya, wilayaName, bio, price, craft name)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const craft = CRAFT_CATEGORIES.find((c) => c.id === artisan.craftId);
        const matchName = artisan.name.toLowerCase().includes(query);
        const matchBaladiya = artisan.baladiya.toLowerCase().includes(query);
        const matchWilaya = artisan.wilayaName.toLowerCase().includes(query);
        const matchBio = artisan.bio.toLowerCase().includes(query);
        const matchCraft =
          craft?.nameAr.toLowerCase().includes(query) ||
          craft?.nameFr.toLowerCase().includes(query) ||
          craft?.popularJobs.some((j) => j.toLowerCase().includes(query));

        if (!matchName && !matchBaladiya && !matchWilaya && !matchBio && !matchCraft) {
          return false;
        }
      }

      return true;
    });
  }, [artisans, selectedWilaya, selectedCraft, emergencyOnly, searchQuery]);

  // 6. Admin Worker Management Handlers
  const handleAddArtisan = (
    newArtisanData: Omit<Artisan, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>
  ) => {
    const newArtisan: Artisan = {
      ...newArtisanData,
      id: `art-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setArtisans((prev) => [newArtisan, ...prev]);
  };

  const handleUpdateArtisan = (updated: Artisan) => {
    setArtisans((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteArtisan = (id: string) => {
    setArtisans((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleArtisanAvailability = (id: string) => {
    setArtisans((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isAvailable: !a.isAvailable } : a))
    );
  };

  const handleResetArtisans = () => {
    setArtisans(INITIAL_ARTISANS);
    setReviews(INITIAL_REVIEWS);
    setOwnerConfig(DEFAULT_OWNER_CONFIG);
  };

  // 7. Add Review Handler
  const handleAddReview = (
    artisanId: string,
    authorName: string,
    rating: number,
    comment: string
  ) => {
    const newRev: ClientReview = {
      id: `rev-${Date.now()}`,
      artisanId,
      authorName,
      rating,
      comment,
      date: 'الآن',
      wilaya: 'الجزائر',
    };

    setReviews((prev) => [newRev, ...prev]);

    // Update artisan average rating
    setArtisans((prev) =>
      prev.map((art) => {
        if (art.id === artisanId) {
          const currentTotal = art.rating * art.reviewsCount;
          const newReviewsCount = art.reviewsCount + 1;
          const newAvgRating = (currentTotal + rating) / newReviewsCount;
          return {
            ...art,
            rating: Math.round(newAvgRating * 10) / 10,
            reviewsCount: newReviewsCount,
          };
        }
        return art;
      })
    );
  };

  // Reset all filters helper
  const handleResetFilters = () => {
    setSelectedWilaya('all');
    setSelectedCraft('all');
    setSearchQuery('');
    setEmergencyOnly(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenOwnerContact={() => handleNavigateSection('owner-contact')}
        onNavigateSection={handleNavigateSection}
        isAdminLoggedIn={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero with Wilaya & Craft search inputs */}
        <Hero
          selectedWilaya={selectedWilaya}
          onSelectWilaya={setSelectedWilaya}
          selectedCraft={selectedCraft}
          onSelectCraft={setSelectedCraft}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          emergencyOnly={emergencyOnly}
          onToggleEmergency={() => setEmergencyOnly((prev) => !prev)}
          onSearchSubmit={() => handleNavigateSection('artisans')}
        />

        {/* Categories / Crafts Grid (خانات لكل حرفة) */}
        <CraftsGrid
          selectedCraft={selectedCraft}
          onSelectCraft={(id) => {
            setSelectedCraft(id);
            handleNavigateSection('artisans');
          }}
          artisanCountsByCraft={artisanCountsByCraft}
        />

        {/* Emergency Dépannage Banner */}
        <EmergencyBanner
          isEmergencyActive={emergencyOnly}
          onFilterEmergency={() => {
            setEmergencyOnly((prev) => !prev);
            handleNavigateSection('artisans');
          }}
        />

        {/* Artisans List Section */}
        <ArtisanList
          artisans={filteredArtisans}
          selectedWilaya={selectedWilaya}
          selectedCraft={selectedCraft}
          emergencyOnly={emergencyOnly}
          searchQuery={searchQuery}
          onSelectWilaya={setSelectedWilaya}
          onSelectCraft={setSelectedCraft}
          onToggleEmergency={() => setEmergencyOnly((prev) => !prev)}
          onResetFilters={handleResetFilters}
          onOpenDetails={(artisan) => setSelectedArtisanForModal(artisan)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* About App Section (خانة تعرف التطبيق) */}
        <AboutSection />

        {/* Owner Contact Section (تواصل مع صاحب التطبيق عبر انستاغرام وواتساب) */}
        <OwnerContactSection ownerConfig={ownerConfig} />
      </main>

      {/* Footer */}
      <Footer
        ownerConfig={ownerConfig}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenOwnerContact={() => handleNavigateSection('owner-contact')}
        onNavigateSection={handleNavigateSection}
      />

      {/* Artisan Profile & Reviews Modal */}
      {selectedArtisanForModal && (
        <ArtisanModal
          artisan={selectedArtisanForModal}
          reviews={reviews}
          onClose={() => setSelectedArtisanForModal(null)}
          onAddReview={handleAddReview}
        />
      )}

      {/* Admin Panel Modal (Protected with Admin PIN) */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        artisans={artisans}
        onAddArtisan={handleAddArtisan}
        onUpdateArtisan={handleUpdateArtisan}
        onDeleteArtisan={handleDeleteArtisan}
        onToggleArtisanAvailability={handleToggleArtisanAvailability}
        ownerConfig={ownerConfig}
        onUpdateOwnerConfig={setOwnerConfig}
        onResetArtisans={handleResetArtisans}
        isAuthenticated={isAdminAuthenticated}
        setIsAuthenticated={setIsAdminAuthenticated}
      />
    </div>
  );
}
