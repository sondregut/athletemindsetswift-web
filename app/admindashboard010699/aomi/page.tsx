'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, Search, Brain } from 'lucide-react';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Modal } from '@/components/admin/ui/modal';
import { Textarea } from '@/components/admin/ui/textarea';
import { Select } from '@/components/admin/ui/select';
import {
  getAomiTechniques,
  createAomiTechnique,
  updateAomiTechnique,
  deleteAomiTechnique,
} from '@/lib/admin/firestore';
import type { AomiTechnique, AomiLoop } from '@/types/admin';

export default function AomiPage() {
  const [techniques, setTechniques] = useState<AomiTechnique[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<AomiTechnique | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state - matches actual Firestore schema
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sport: 'any',
    purpose: '',
    benefits: '',
    whenToUse: '',
    videoGuidance: '',
    durationMinutes: 10,
    difficultyLevel: 'beginner' as const,
    isActive: true,
    loops: [{ loopNumber: 1, loopName: '', observationFocus: '', imageryFocus: '', observationDurationSeconds: 20, imageryDurationSeconds: 20 }] as AomiLoop[],
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getAomiTechniques();
      setTechniques(data);
    } catch (error) {
      console.error('Error loading AOMI techniques:', error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setSelectedTechnique(null);
    setFormData({
      name: '',
      slug: '',
      sport: 'any',
      purpose: '',
      benefits: '',
      whenToUse: '',
      videoGuidance: '',
      durationMinutes: 10,
      difficultyLevel: 'beginner',
      isActive: true,
      loops: [{ loopNumber: 1, loopName: '', observationFocus: '', imageryFocus: '', observationDurationSeconds: 20, imageryDurationSeconds: 20 }],
    });
    setIsModalOpen(true);
  }

  function openEditModal(technique: AomiTechnique) {
    setSelectedTechnique(technique);
    setFormData({
      name: technique.name,
      slug: technique.slug || '',
      sport: technique.sport || 'any',
      purpose: technique.purpose,
      benefits: (technique.benefits || []).join(', '),
      whenToUse: (technique.whenToUse || []).join(', '),
      videoGuidance: technique.videoGuidance || '',
      durationMinutes: technique.durationMinutes,
      difficultyLevel: technique.difficultyLevel || 'beginner',
      isActive: technique.isActive !== false,
      loops: (technique.loops || []).length > 0 ? technique.loops : [{ loopNumber: 1, loopName: '', observationFocus: '', imageryFocus: '', observationDurationSeconds: 20, imageryDurationSeconds: 20 }],
    });
    setIsModalOpen(true);
  }

  function openViewModal(technique: AomiTechnique) {
    setSelectedTechnique(technique);
    setIsViewModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
      const data = {
        name: formData.name,
        slug: slug,
        sport: formData.sport,
        purpose: formData.purpose,
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(Boolean),
        whenToUse: formData.whenToUse.split(',').map(w => w.trim()).filter(Boolean),
        videoGuidance: formData.videoGuidance,
        durationMinutes: formData.durationMinutes,
        difficultyLevel: formData.difficultyLevel,
        isActive: formData.isActive,
        loops: formData.loops.map((loop, i) => ({ ...loop, loopNumber: i + 1 })),
      };

      if (selectedTechnique) {
        await updateAomiTechnique(selectedTechnique.id, data);
      } else {
        await createAomiTechnique(data);
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving technique:', error);
      alert('Error saving technique');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this technique?')) return;

    try {
      await deleteAomiTechnique(id);
      loadData();
    } catch (error) {
      console.error('Error deleting technique:', error);
      alert('Error deleting technique');
    }
  }

  function addLoop() {
    setFormData({
      ...formData,
      loops: [
        ...formData.loops,
        { loopNumber: formData.loops.length + 1, loopName: '', observationFocus: '', imageryFocus: '', observationDurationSeconds: 20, imageryDurationSeconds: 20 },
      ],
    });
  }

  function removeLoop(index: number) {
    if (formData.loops.length <= 1) return;
    setFormData({
      ...formData,
      loops: formData.loops.filter((_, i) => i !== index),
    });
  }

  function updateLoop(index: number, field: keyof AomiLoop, value: string | number) {
    const newLoops = [...formData.loops];
    newLoops[index] = { ...newLoops[index], [field]: value };
    setFormData({ ...formData, loops: newLoops });
  }

  const filteredTechniques = techniques.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.purpose.toLowerCase().includes(search.toLowerCase())
  );

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            AOMI Techniques
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Action Observation and Motor Imagery protocols for skill development
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Technique
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search techniques..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500">Loading...</div>
      ) : filteredTechniques.length === 0 ? (
        <div className="text-center py-12 text-zinc-500">
          No techniques found. Create your first one!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTechniques.map((technique) => (
            <Card key={technique.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                    </div>
                    <CardTitle className="text-lg">{technique.name}</CardTitle>
                  </div>
                  <Badge className={difficultyColor[technique.difficultyLevel || 'beginner']}>
                    {technique.difficultyLevel || 'beginner'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
                  {technique.purpose}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="secondary">{technique.durationMinutes} min</Badge>
                  <Badge variant="outline">{(technique.loops || []).length} loops</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openViewModal(technique)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEditModal(technique)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(technique.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTechnique ? 'Edit AOMI Technique' : 'Create AOMI Technique'}
        className="max-w-3xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Basic AOMI Protocol"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sport</label>
              <Input
                value={formData.sport}
                onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                placeholder="any, basketball, golf"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Purpose</label>
            <Textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Introduce athletes to the AOMI method for skill development"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
            <label className="text-sm font-medium">Video Guidance</label>
            <Textarea
              value={formData.videoGuidance}
              onChange={(e) => setFormData({ ...formData, videoGuidance: e.target.value })}
              placeholder="Instructions for finding/using video for this technique"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Benefits (comma-separated)</label>
              <Input
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Strengthens neural pathways, Accelerates learning"
              />
            </div>
            <div>
              <label className="text-sm font-medium">When to Use (comma-separated)</label>
              <Input
                value={formData.whenToUse}
                onChange={(e) => setFormData({ ...formData, whenToUse: e.target.value })}
                placeholder="Learning new skills, Injury rehabilitation"
              />
            </div>
          </div>

          {/* Loops */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">AOMI Loops</label>
              <Button type="button" variant="outline" size="sm" onClick={addLoop}>
                <Plus className="h-3 w-3 mr-1" />
                Add Loop
              </Button>
            </div>
            <div className="space-y-4">
              {formData.loops.map((loop, index) => (
                <div key={index} className="border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Loop {index + 1}</span>
                    {formData.loops.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => removeLoop(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Input
                      value={loop.loopName}
                      onChange={(e) => updateLoop(index, 'loopName', e.target.value)}
                      placeholder="Loop name (e.g., Technical Form)"
                    />
                    <Textarea
                      value={loop.observationFocus}
                      onChange={(e) => updateLoop(index, 'observationFocus', e.target.value)}
                      placeholder="Observation focus - what to watch for"
                      rows={2}
                    />
                    <Textarea
                      value={loop.imageryFocus}
                      onChange={(e) => updateLoop(index, 'imageryFocus', e.target.value)}
                      placeholder="Imagery focus - what to imagine/feel"
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-zinc-500">Observation (seconds)</label>
                        <Input
                          type="number"
                          value={loop.observationDurationSeconds}
                          onChange={(e) => updateLoop(index, 'observationDurationSeconds', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500">Imagery (seconds)</label>
                        <Input
                          type="number"
                          value={loop.imageryDurationSeconds}
                          onChange={(e) => updateLoop(index, 'imageryDurationSeconds', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !formData.name}>
            {saving ? 'Saving...' : selectedTechnique ? 'Update' : 'Create'}
          </Button>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedTechnique?.name || ''}
        className="max-w-2xl"
      >
        {selectedTechnique && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <p className="text-zinc-600 dark:text-zinc-400">
              {selectedTechnique.purpose}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge className={difficultyColor[selectedTechnique.difficultyLevel || 'beginner']}>
                {selectedTechnique.difficultyLevel || 'beginner'}
              </Badge>
              <Badge variant="secondary">{selectedTechnique.durationMinutes} min</Badge>
              <Badge variant="outline">{selectedTechnique.sport}</Badge>
            </div>

            {selectedTechnique.videoGuidance && (
              <div>
                <h4 className="font-medium mb-2">Video Guidance</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {selectedTechnique.videoGuidance}
                </p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">AOMI Loops ({(selectedTechnique.loops || []).length})</h4>
              <div className="space-y-3">
                {(selectedTechnique.loops || []).map((loop, i) => (
                  <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
                        Loop {loop.loopNumber}
                      </span>
                      <span className="font-medium">{loop.loopName}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Observation ({loop.observationDurationSeconds}s)</p>
                        <p className="text-zinc-600 dark:text-zinc-400">{loop.observationFocus}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Imagery ({loop.imageryDurationSeconds}s)</p>
                        <p className="text-zinc-600 dark:text-zinc-400">{loop.imageryFocus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(selectedTechnique.benefits || []).length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTechnique.benefits.map((benefit, i) => (
                    <Badge key={i} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(selectedTechnique.whenToUse || []).length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">When to Use</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTechnique.whenToUse.map((use, i) => (
                    <Badge key={i} variant="outline">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
