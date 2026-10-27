import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, AlertCircle } from 'lucide-react';
import {
    ANIMAL_CATEGORIES,
    INDIAN_STATES,
    MPO_LIST,
    VISITOR_PROFESSIONS,
    breedsForCategory,
    type RegistrationType,
} from '@/data/registrationConfig';
import type { AnyRegistration } from '@/hooks/useAdminData';

type FieldType = 'text' | 'number' | 'date' | 'select';

interface FieldSpec {
    key: string;
    label: string;
    type: FieldType;
    options?: { value: string; label: string }[];
    /** Options depend on another field's current value (breed depends on category). */
    dependsOn?: string;
}

const stateOptions = INDIAN_STATES.map(s => ({ value: s, label: s }));
const mpoOptions = MPO_LIST.map(m => ({ value: m, label: m }));
const categoryOptions = ANIMAL_CATEGORIES.map(c => ({ value: c.code, label: c.en }));
const professionOptions = VISITOR_PROFESSIONS.map(p => ({ value: p.code, label: p.en }));

const COMMON: FieldSpec[] = [
    { key: 'full_name', label: 'Full Name', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'state', label: 'State', type: 'select', options: stateOptions },
];

const FIELDS: Record<RegistrationType, FieldSpec[]> = {
    animal: [
        ...COMMON,
        { key: 'category_code', label: 'Category', type: 'select', options: categoryOptions },
        { key: 'breed_code', label: 'Breed', type: 'select', dependsOn: 'category_code' },
        { key: 'tag_number', label: 'Tag Number', type: 'text' },
        { key: 'milk_yield', label: 'Milk Yield (kg / 24 hours)', type: 'number' },
        { key: 'proposed_milk_recording_date', label: 'Proposed Live Milk Recording', type: 'date' },
        { key: 'mpo_name', label: 'Project / MPO', type: 'select', options: mpoOptions },
    ],
    visitor: [
        ...COMMON,
        { key: 'profession_code', label: 'Profession', type: 'select', options: professionOptions },
        { key: 'organisation_name', label: 'Organisation', type: 'text' },
        { key: 'email', label: 'Email', type: 'text' },
    ],
    exhibitor: [
        ...COMMON,
        { key: 'organisation', label: 'Organisation', type: 'text' },
        { key: 'designation', label: 'Designation', type: 'text' },
    ],
    sponsor: [
        ...COMMON,
        { key: 'organisation', label: 'Organisation', type: 'text' },
        { key: 'designation', label: 'Designation', type: 'text' },
    ],
};

interface EditRegistrationModalProps {
    registration: AnyRegistration;
    type: RegistrationType;
    onSave: (id: string, updates: Record<string, unknown>) => Promise<boolean>;
    onClose: () => void;
}

const EditRegistrationModal: React.FC<EditRegistrationModalProps> = ({
    registration,
    type,
    onSave,
    onClose,
}) => {
    const fields = FIELDS[type];
    const record = registration as unknown as Record<string, unknown>;

    const [formData, setFormData] = useState<Record<string, string>>(() =>
        Object.fromEntries(fields.map(f => [f.key, record[f.key] == null ? '' : String(record[f.key])])),
    );
    const [isSaving, setIsSaving] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const breedOptions = useMemo(
        () => breedsForCategory(formData.category_code || '').map(b => ({ value: b.code, label: b.en })),
        [formData.category_code],
    );

    const optionsFor = (field: FieldSpec) =>
        field.dependsOn === 'category_code' ? breedOptions : field.options || [];

    const setValue = (key: string, value: string) =>
        setFormData(prev => {
            const next = { ...prev, [key]: value };
            // Changing category invalidates the selected breed.
            if (key === 'category_code') next.breed_code = '';
            return next;
        });

    const handleConfirmSave = async () => {
        setIsSaving(true);
        // Empty strings become NULL; numeric and date columns reject ''.
        const updates = Object.fromEntries(
            fields.map(f => [f.key, formData[f.key] === '' ? null : formData[f.key]]),
        );
        const success = await onSave(registration.id, updates);
        setIsSaving(false);
        setShowConfirm(false);
        if (success) onClose();
    };

    const registrationCode = (registration as { registration_code?: string }).registration_code;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div
                className="relative bg-gray-800 border border-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Edit Registration</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 bg-gray-900/50 border-b border-gray-700">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Read-only</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {registrationCode && (
                                <div>
                                    <span className="text-gray-500">Registration Code:</span>
                                    <p className="text-green-400 font-mono">{registrationCode}</p>
                                </div>
                            )}
                            <div>
                                <span className="text-gray-500">Mobile:</span>
                                <p className="text-white">{registration.mobile}</p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={e => { e.preventDefault(); setShowConfirm(true); }}
                        className="p-4 space-y-4"
                    >
                        {fields.map(field => (
                            <div key={field.key} className="space-y-2">
                                <Label htmlFor={field.key} className="text-gray-300">{field.label}</Label>
                                {field.type === 'select' ? (
                                    <Select
                                        value={formData[field.key] || ''}
                                        onValueChange={v => setValue(field.key, v)}
                                        disabled={Boolean(field.dependsOn) && !formData[field.dependsOn!]}
                                    >
                                        <SelectTrigger id={field.key} className="bg-gray-700/50 border-gray-600 text-white">
                                            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
                                            {optionsFor(field).map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}
                                                    className="text-white hover:bg-gray-700">
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        id={field.key}
                                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                                        step={field.type === 'number' ? '0.01' : undefined}
                                        value={formData[field.key] || ''}
                                        onChange={e => setValue(field.key, e.target.value)}
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}
                                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSaving}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                <Save className="w-4 h-4 mr-2" />
                                {isSaving ? 'Saving…' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>

                {showConfirm && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 m-4 max-w-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white">Confirm Changes</h3>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Are you sure you want to save changes to this registration?
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setShowConfirm(false)}
                                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmSave} disabled={isSaving}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                    {isSaving ? 'Saving…' : 'Confirm'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditRegistrationModal;
