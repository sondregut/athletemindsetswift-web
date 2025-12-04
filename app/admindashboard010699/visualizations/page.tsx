'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, Search, Brain, Target, Sparkles, Heart, Zap, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Modal } from '@/components/admin/ui/modal';
import { Textarea } from '@/components/admin/ui/textarea';
import { Select } from '@/components/admin/ui/select';
import {
  getVisualizations,
  createVisualization,
  updateVisualization,
  deleteVisualization,
} from '@/lib/admin/firestore';
import type { VisualizationTemplate } from '@/types/admin';

// Category configuration with icons, colors, and display names
const categoryConfig: Record<string, {
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
}> = {
  skill_development: {
    label: 'Performance & Skill Mastery',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    description: 'PETTLEP imagery, AOMI training, and skill refinement'
  },
  pre_performance: {
    label: 'Pre-Performance',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    description: 'Elite performance visualization and competition prep'
  },
  pressure: {
    label: 'Pressure & Adversity',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
    description: 'Adversity rehearsal and pressure situation training'
  },
  goal: {
    label: 'Goals & Vision',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    description: 'Goal visualization and future self imagery'
  },
  confidence: {
    label: 'Confidence & Identity',
    icon: Sparkles,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    description: 'Self-belief, champion persona, and inner confidence'
  },
  recovery: {
    label: 'Recovery & Release',
    icon: Heart,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    description: 'Letting go, hope, resilience, and mental recovery'
  },
  anxiety: {
    label: 'Anxiety Relief',
    icon: Heart,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 border-teal-200',
    description: 'Releasing anxiety and stress management'
  },
  wellness: {
    label: 'Wellness & Regulation',
    icon: Heart,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    description: 'Relaxation, pain relief, and gratitude practices'
  },
};

export default function VisualizationsPage() {
  const [visualizations, setVisualizations] = useState<VisualizationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState<VisualizationTemplate | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Form state - matches actual Firestore schema
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'goal',
    supportedSports: 'any',
    difficultyLevel: 'beginner' as const,
    durationMinutes: 10,
    placeholders: '',
    scriptText: '',
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  // Expand all categories by default once data is loaded
  useEffect(() => {
    if (visualizations.length > 0) {
      const categories = [...new Set(visualizations.map(v => v.category))];
      setExpandedCategories(new Set(categories));
    }
  }, [visualizations]);

  async function loadData() {
    try {
      const data = await getVisualizations();
      setVisualizations(data);
    } catch (error) {
      console.error('Error loading visualizations:', error);
    } finally {
      setLoading(false);
    }
  }

  function toggleCategory(category: string) {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  }

  function openCreateModal() {
    setSelectedVisualization(null);
    setFormData({
      title: '',
      description: '',
      category: 'goal',
      supportedSports: 'any',
      difficultyLevel: 'beginner',
      durationMinutes: 10,
      placeholders: '',
      scriptText: '',
      isActive: true,
    });
    setIsModalOpen(true);
  }

  function openEditModal(viz: VisualizationTemplate) {
    setSelectedVisualization(viz);
    setFormData({
      title: viz.title,
      description: viz.description,
      category: viz.category,
      supportedSports: (viz.supportedSports || []).join(', '),
      difficultyLevel: viz.difficultyLevel || 'beginner',
      durationMinutes: viz.durationMinutes,
      placeholders: (viz.placeholders || []).join(', '),
      scriptText: viz.scriptText || '',
      isActive: viz.isActive !== false,
    });
    setIsModalOpen(true);
  }

  function openViewModal(viz: VisualizationTemplate) {
    setSelectedVisualization(viz);
    setIsViewModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        supportedSports: formData.supportedSports.split(',').map(s => s.trim()).filter(Boolean),
        difficultyLevel: formData.difficultyLevel,
        durationMinutes: formData.durationMinutes,
        placeholders: formData.placeholders.split(',').map(p => p.trim()).filter(Boolean),
        scriptText: formData.scriptText,
        isActive: formData.isActive,
      };

      if (selectedVisualization) {
        await updateVisualization(selectedVisualization.id, data);
      } else {
        await createVisualization(data);
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving visualization:', error);
      alert('Error saving visualization');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this visualization?')) return;

    try {
      await deleteVisualization(id);
      loadData();
    } catch (error) {
      console.error('Error deleting visualization:', error);
      alert('Error deleting visualization');
    }
  }

  const filteredVisualizations = visualizations.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
  );

  // Group visualizations by category
  const groupedVisualizations = filteredVisualizations.reduce((acc, viz) => {
    const category = viz.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(viz);
    return acc;
  }, {} as Record<string, VisualizationTemplate[]>);

  // Sort categories by a logical order
  const categoryOrder = ['skill_development', 'pre_performance', 'pressure', 'goal', 'confidence', 'recovery', 'anxiety', 'wellness'];
  const sortedCategories = Object.keys(groupedVisualizations).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  const totalScripts = filteredVisualizations.length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Visualization Scripts
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {totalScripts} scripts across {sortedCategories.length} categories for the voice agent
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Script
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search visualizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grouped Content */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500">Loading...</div>
      ) : filteredVisualizations.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No visualizations found. Create your first one!
        </div>
      ) : (
        <div className="space-y-6">
          {sortedCategories.map((category) => {
            const config = categoryConfig[category] || {
              label: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              icon: Brain,
              color: 'text-zinc-600',
              bgColor: 'bg-zinc-50 border-zinc-200',
              description: ''
            };
            const Icon = config.icon;
            const scripts = groupedVisualizations[category];
            const isExpanded = expandedCategories.has(category);

            return (
              <div key={category} className={`rounded-xl border ${config.bgColor}`}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors rounded-t-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm ${config.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-semibold text-zinc-900">{config.label}</h2>
                      <p className="text-sm text-zinc-500">{config.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {scripts.length} {scripts.length === 1 ? 'script' : 'scripts'}
                    </Badge>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-zinc-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Scripts Grid */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {scripts.map((viz) => (
                        <Card key={viz.id} className="hover:shadow-md transition-shadow bg-white">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-base">{viz.title}</CardTitle>
                              <Badge className={difficultyColor[viz.difficultyLevel || 'beginner']}>
                                {viz.difficultyLevel || 'beginner'}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
                              {viz.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              <Badge variant="secondary">{viz.durationMinutes} min</Badge>
                              {viz.isActive === false && (
                                <Badge variant="destructive">Inactive</Badge>
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 mb-4">
                              {(viz.placeholders || []).length} placeholders
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openViewModal(viz)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditModal(viz)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(viz.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedVisualization ? 'Edit Visualization Script' : 'Create Visualization Script'}
        className="max-w-3xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Pre-Competition Focus"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="skill_development">Performance & Skill Mastery</option>
                <option value="pre_performance">Pre-Performance</option>
                <option value="pressure">Pressure & Adversity</option>
                <option value="goal">Goals & Vision</option>
                <option value="confidence">Confidence & Identity</option>
                <option value="recovery">Recovery & Release</option>
                <option value="anxiety">Anxiety Relief</option>
                <option value="wellness">Wellness & Regulation</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A guided visualization for..."
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Supported Sports</label>
              <Input
                value={formData.supportedSports}
                onChange={(e) => setFormData({ ...formData, supportedSports: e.target.value })}
                placeholder="any, basketball, running"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Difficulty</label>
              <Select
                value={formData.difficultyLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficultyLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced',
                  })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) =>
                  setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Placeholders (comma-separated)</label>
            <Input
              value={formData.placeholders}
              onChange={(e) => setFormData({ ...formData, placeholders: e.target.value })}
              placeholder="GOAL, SPORT, SPORT_ENVIRONMENT"
            />
            <p className="text-xs text-zinc-500 mt-1">
              Use {'{PLACEHOLDER}'} in the script text to insert dynamic values
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Script Text</label>
            <Textarea
              value={formData.scriptText}
              onChange={(e) => setFormData({ ...formData, scriptText: e.target.value })}
              placeholder="Find a comfortable position and close your eyes. Take three deep breaths..."
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-zinc-500 mt-1">
              This is the full script the voice agent will read to the user
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !formData.title || !formData.scriptText}>
            {saving ? 'Saving...' : selectedVisualization ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedVisualization?.title || ''}
        className="max-w-3xl"
      >
        {selectedVisualization && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <p className="text-zinc-600 dark:text-zinc-400">
              {selectedVisualization.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>{categoryConfig[selectedVisualization.category]?.label || selectedVisualization.category}</Badge>
              <Badge className={difficultyColor[selectedVisualization.difficultyLevel || 'beginner']}>
                {selectedVisualization.difficultyLevel || 'beginner'}
              </Badge>
              <Badge variant="secondary">{selectedVisualization.durationMinutes} min</Badge>
            </div>

            {(selectedVisualization.placeholders || []).length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Placeholders</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVisualization.placeholders.map((p, i) => (
                    <Badge key={i} variant="outline">{`{${p}}`}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Script Text</h4>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                {selectedVisualization.scriptText}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
