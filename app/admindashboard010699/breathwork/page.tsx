'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, Search, Wind } from 'lucide-react';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Modal } from '@/components/admin/ui/modal';
import { Textarea } from '@/components/admin/ui/textarea';
import { Select } from '@/components/admin/ui/select';
import {
  getBreathworkTechniques,
  createBreathworkTechnique,
  updateBreathworkTechnique,
  deleteBreathworkTechnique,
} from '@/lib/admin/firestore';
import type { BreathworkTechnique } from '@/types/admin';

export default function BreathworkPage() {
  const [techniques, setTechniques] = useState<BreathworkTechnique[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<BreathworkTechnique | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state - matches actual Firestore schema
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    purpose: '',
    category: 'anxiety',
    steps: [''],
    whenToUse: '',
    durationRounds: '',
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getBreathworkTechniques();
      setTechniques(data);
    } catch (error) {
      console.error('Error loading breathwork techniques:', error);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setSelectedTechnique(null);
    setFormData({
      name: '',
      slug: '',
      purpose: '',
      category: 'anxiety',
      steps: [''],
      whenToUse: '',
      durationRounds: '',
      isActive: true,
    });
    setIsModalOpen(true);
  }

  function openEditModal(technique: BreathworkTechnique) {
    setSelectedTechnique(technique);
    setFormData({
      name: technique.name,
      slug: technique.slug || '',
      purpose: technique.purpose,
      category: technique.category,
      steps: (technique.steps || []).length > 0 ? technique.steps : [''],
      whenToUse: (technique.whenToUse || []).join(', '),
      durationRounds: technique.durationRounds || '',
      isActive: technique.isActive !== false,
    });
    setIsModalOpen(true);
  }

  function openViewModal(technique: BreathworkTechnique) {
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
        purpose: formData.purpose,
        category: formData.category,
        steps: formData.steps.filter(s => s.trim()),
        whenToUse: formData.whenToUse.split(',').map(w => w.trim()).filter(Boolean),
        durationRounds: formData.durationRounds,
        isActive: formData.isActive,
      };

      if (selectedTechnique) {
        await updateBreathworkTechnique(selectedTechnique.id, data);
      } else {
        await createBreathworkTechnique(data);
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
      await deleteBreathworkTechnique(id);
      loadData();
    } catch (error) {
      console.error('Error deleting technique:', error);
      alert('Error deleting technique');
    }
  }

  function addStep() {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  }

  function removeStep(index: number) {
    if (formData.steps.length <= 1) return;
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  }

  function updateStep(index: number, value: string) {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  }

  const filteredTechniques = techniques.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.purpose.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    anxiety: 'bg-blue-100 text-blue-800',
    recovery: 'bg-green-100 text-green-800',
    energy: 'bg-orange-100 text-orange-800',
    balance: 'bg-purple-100 text-purple-800',
    stress: 'bg-red-100 text-red-800',
    focus: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Breathwork Techniques
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Manage breathing exercises for mental performance
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
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <Wind className="h-4 w-4 text-green-500" />
                    </div>
                    <CardTitle className="text-lg">{technique.name}</CardTitle>
                  </div>
                  <Badge className={categoryColors[technique.category] || 'bg-zinc-100 text-zinc-800'}>
                    {technique.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 mb-3 line-clamp-2">
                  {technique.purpose}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="secondary">{technique.durationRounds}</Badge>
                  <Badge variant="outline">{(technique.steps || []).length} steps</Badge>
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
        title={selectedTechnique ? 'Edit Technique' : 'Create Technique'}
        className="max-w-2xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Box Breathing"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="anxiety">Anxiety Reduction</option>
                <option value="recovery">Recovery</option>
                <option value="energy">Energy / Activation</option>
                <option value="balance">Balance</option>
                <option value="stress">Stress Relief</option>
                <option value="focus">Focus</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Purpose</label>
            <Textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Reduce anxiety, improve focus, calm nerves before performance"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Duration / Rounds</label>
              <Input
                value={formData.durationRounds}
                onChange={(e) => setFormData({ ...formData, durationRounds: e.target.value })}
                placeholder="4-6 rounds"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Slug (auto-generated if empty)</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="box-breathing"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">When to Use (comma-separated)</label>
            <Input
              value={formData.whenToUse}
              onChange={(e) => setFormData({ ...formData, whenToUse: e.target.value })}
              placeholder="Pre-competition nerves, Mental clarity, Anxiety reduction"
            />
          </div>

          {/* Steps */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Breathing Steps</label>
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                <Plus className="h-3 w-3 mr-1" />
                Add Step
              </Button>
            </div>
            <div className="space-y-2">
              {formData.steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-9 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-medium">
                    {index + 1}
                  </div>
                  <Input
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    placeholder={`Step ${index + 1}: e.g., "Breathe in through nose for 4 counts"`}
                    className="flex-1"
                  />
                  {formData.steps.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 flex-shrink-0"
                      onClick={() => removeStep(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
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
      >
        {selectedTechnique && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={categoryColors[selectedTechnique.category] || 'bg-zinc-100 text-zinc-800'}>
                {selectedTechnique.category}
              </Badge>
              <Badge variant="secondary">{selectedTechnique.durationRounds}</Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Purpose</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {selectedTechnique.purpose}
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Breathing Steps</h4>
              <ol className="space-y-2">
                {(selectedTechnique.steps || []).map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                      {i + 1}
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

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
