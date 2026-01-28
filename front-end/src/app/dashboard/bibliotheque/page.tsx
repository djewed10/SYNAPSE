'use client';

import { useState } from 'react';
import { Play, MoreVertical, Eye, Lock } from 'lucide-react';

type TabType = 'playlists' | 'notes';
type NotesViewMode = 'cards' | 'list';

interface Playlist {
  id: number;
  title: string;
  qcmCount: number;
  isPinned: boolean;
}

interface Note {
  id: number;
  subject: string;
  title: string;
  description: string;
  date: string;
  moduleName: string;
}

interface NoteListItem {
  id: number;
  title: string;
  count: number;
  isLocked?: boolean;
}

// Mock data for playlists
const mockPlaylists: Playlist[] = [
  { id: 1, title: 'Le Tissu Musculaire', qcmCount: 120, isPinned: true },
  { id: 2, title: 'Electrophysiologie', qcmCount: 120, isPinned: true },
  { id: 3, title: 'Neoglucogenese', qcmCount: 120, isPinned: false },
  { id: 4, title: 'Ovogenese', qcmCount: 80, isPinned: false },
  { id: 5, title: 'Anapath', qcmCount: 120, isPinned: false },
  { id: 6, title: 'Latif', qcmCount: 120, isPinned: false },
  { id: 7, title: 'Generale', qcmCount: 120, isPinned: false },
  { id: 8, title: 'CTF', qcmCount: 120, isPinned: false },
  { id: 9, title: 'Spermatogenese', qcmCount: 120, isPinned: false },
  { id: 10, title: 'PSYCHIATRIE', qcmCount: 120, isPinned: false },
  { id: 11, title: 'Méta', qcmCount: 120, isPinned: false },
  { id: 12, title: 'Laboratoire d\'apathie', qcmCount: 120, isPinned: false },
];

// Mock data for notes list
const mockNotesList: NoteListItem[] = [
  { id: 1, title: 'Biochimie', count: 120, isLocked: true },
  { id: 2, title: 'Histologie', count: 180, isLocked: true },
  { id: 3, title: 'Biochimie', count: 80, isLocked: true },
  { id: 4, title: 'Physiologie', count: 95, isLocked: false },
  { id: 5, title: 'Cardiologie', count: 150, isLocked: false },
];

// Mock data for notes cards
const mockNotes: Note[] = [
  {
    id: 1,
    subject: 'Métabolisme du Fer',
    title: 'PCEM : Concernant le métabolisme du fer',
    description: 'Le fer est absorbé au intestin grele et transporté par la transferrine et stocké sous forme de ferritine ; son absorption est régulée par l\'hepcidine.',
    date: '11 jan 2026',
    moduleName: 'Biochimie'
  },
  {
    id: 2,
    subject: 'Métabolisme du Fer',
    title: 'Residanat 2025 : Le rhabdomyocite',
    description: 'Le fer est absorbé au intestin grele et transporté par la transferrine et stocké sous forme de ferritine ; son absorption est régulée par l\'hepcidine.',
    date: '11 jan 2026',
    moduleName: 'Biochimie'
  },
  {
    id: 3,
    subject: 'Métabolisme du Fer',
    title: 'Histo 1001 : Le cardiomyocyte',
    description: 'Le fer est absorbé au intestin grele et transporté par la transferrine et stocké sous forme de ferritine ; son absorption est régulée par l\'hepcidine.',
    date: '11 jan 2026',
    moduleName: 'Histologie'
  },
];

export default function BibliotequePage() {
  const [activeTab, setActiveTab] = useState<TabType>('playlists');
  const [notesViewMode, setNotesViewMode] = useState<NotesViewMode>('cards');

  return (
    <div className="min-h-screen w-full font-['Product_Sans'] text-[var(--text-primary)] transition-colors duration-300">
      {/* Tabs */}
      <div className="flex justify-center pt-6 pb-4">
        <div className="inline-flex rounded-full p-1 bg-[var(--surface)] border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'playlists'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Playlists
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'notes'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Notes
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto border-b border-[var(--border)]" />
      </div>

      {/* View Mode Toggle for Notes */}
      {activeTab === 'notes' && (
        <div className="px-4 md:px-8 lg:px-12 py-4">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="inline-flex rounded-lg p-0.5 bg-[var(--surface)] border border-[var(--border)]">
              <button
                onClick={() => setNotesViewMode('cards')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  notesViewMode === 'cards'
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                Cartes
              </button>
              <button
                onClick={() => setNotesViewMode('list')}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  notesViewMode === 'list'
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                Liste
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'playlists' ? (
            <PlaylistsView playlists={mockPlaylists} />
          ) : notesViewMode === 'cards' ? (
            <NotesCardsView notes={mockNotes} />
          ) : (
            <NotesListView notes={mockNotesList} />
          )}
        </div>
      </div>
    </div>
  );
}

function PlaylistsView({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

function PlaylistItem({ playlist }: { playlist: Playlist }) {
  return (
    <div 
      className="flex items-center justify-between bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)] transition-all duration-300 hover:shadow-md cursor-pointer relative"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Pinned Indicator */}
      {playlist.isPinned && (
        <div className="absolute -top-2 -right-2 text-xl">
          📌
        </div>
      )}

      {/* Left side - Play icon and title */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 flex items-center justify-center text-[var(--text-primary)]">
          <Play className="w-5 h-5 fill-current" />
        </div>
        <span className="font-medium text-[var(--text-primary)]">{playlist.title}</span>
      </div>

      {/* Right side - QCM count and menu */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] font-semibold text-sm">
          {playlist.qcmCount}
        </span>
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function NotesListView({ notes }: { notes: NoteListItem[] }) {
  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div 
          key={note.id}
          className="flex items-center justify-between bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)] transition-all duration-300 hover:shadow-md cursor-pointer"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          {/* Left side - Lock icon and title */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)]">
              {note.isLocked ? <Lock className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
            <span className="font-medium text-[var(--text-primary)]">{note.title}</span>
          </div>

          {/* Right side - Count and menu */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-semibold text-sm">
              {note.count}
            </span>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesCardsView({ notes }: { notes: Note[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  return (
    <div 
      className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] transition-all duration-300 hover:shadow-lg flex flex-col"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Header with subject tag and date */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium">
          {note.subject}
        </span>
        <span className="text-sm text-[var(--text-secondary)]">{note.date}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-[var(--text-primary)] mb-2">{note.title}</h3>

      {/* Separator */}
      <div className="border-b border-[var(--border)] mb-3" />

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed flex-1 mb-4">
        {note.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <button className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
          <Eye className="w-4 h-4" />
          <span className="underline">Voir le QCM</span>
        </button>
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
