'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/lib/api';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function NewJob() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    contactName: '',
    contactEmail: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createJob(formData);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create job request');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-xl w-full"
    >
      <div className="mb-lg text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">Post a New Job</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Describe what you need done, and we'll connect you with trusted local professionals.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        {error && (
          <div className="bg-error-container text-on-error-container p-sm rounded-lg mb-md font-body-md border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
          {/* Job Title */}
          <div>
            <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="title">
              Job Title <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Fix Leaking Kitchen Sink"
              className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md placeholder:text-outline-variant"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="category">
              Category <span className="text-error">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md"
            >
              <option value="" disabled>Select a category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Painting">Painting</option>
              <option value="General Handyman">General Handyman</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="description">
              Detailed Description <span className="text-error">*</span>
            </label>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm">
              Provide as much detail as possible to get accurate quotes.
            </p>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue, required materials, or any specific instructions..."
              className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md placeholder:text-outline-variant resize-y"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Location */}
            <div>
              <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="location">
                Location (City, Zip) <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Austin, 78701"
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md placeholder:text-outline-variant"
              />
            </div>
          </div>

          <hr className="border-outline-variant my-lg" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Contact Name */}
            <div>
              <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="contactName">
                Your Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                required
                value={formData.contactName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md placeholder:text-outline-variant"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block font-label-md text-label-md text-primary mb-xs" htmlFor="contactEmail">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                required
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-sm mt-lg pt-md">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto font-label-md text-label-md text-primary bg-transparent border border-outline-variant px-lg py-sm rounded-lg hover:bg-surface-container-low transition-colors duration-200"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto font-label-md text-label-md text-on-primary bg-primary px-lg py-sm rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 shadow-md flex items-center justify-center min-w-[150px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Submit Request'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
