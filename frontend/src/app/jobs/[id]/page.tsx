'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getJobById, updateJobStatus, deleteJob, JobRequest } from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Trash2, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function JobDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState<JobRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (err) {
      setError('Job not found or failed to load');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!job) return;
    setStatusUpdating(true);
    try {
      const updatedJob = await updateJobStatus(job._id, e.target.value);
      setJob(updatedJob);
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job request?')) return;
    try {
      await deleteJob(id);
      router.push('/');
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-xl min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="py-xl text-center">
        <h1 className="font-display-lg text-primary mb-sm">Oops!</h1>
        <p className="text-on-surface-variant mb-lg">{error}</p>
        <Link href="/" className="text-primary font-bold hover:underline">
          &larr; Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto py-lg w-full"
    >
      <Link href="/" className="inline-flex items-center text-on-surface-variant hover:text-primary mb-lg transition-colors group font-label-md">
        <ArrowLeft size={16} className="mr-xs group-hover:-translate-x-1 transition-transform" />
        Back to Jobs
      </Link>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="p-md md:p-xl border-b border-outline-variant bg-surface-container-low/30 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap justify-between items-start gap-md mb-sm">
              <span className="bg-primary-container text-on-primary-container px-sm py-xs rounded-full font-label-sm tracking-wide uppercase">
                {job.category}
              </span>
              
              <div className="flex items-center gap-sm">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">Status:</span>
                <select
                  value={job.status}
                  onChange={handleStatusChange}
                  disabled={statusUpdating}
                  className={`px-sm py-xs rounded-lg font-label-md appearance-none cursor-pointer border border-transparent hover:border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-8 relative ${
                    job.status === 'Open' ? 'bg-secondary-container text-on-secondary-container' : 
                    job.status === 'In Progress' ? 'bg-tertiary-container text-on-tertiary-container' : 
                    'bg-surface-variant text-on-surface-variant'
                  } ${statusUpdating ? 'opacity-50' : ''}`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <h1 className="font-display-lg text-primary mb-md">{job.title}</h1>
            
            <div className="flex flex-wrap gap-md text-on-surface-variant font-body-md">
              <div className="flex items-center bg-surface-container py-xs px-sm rounded-lg">
                <MapPin size={18} className="mr-sm text-primary" />
                {job.location}
              </div>
              <div className="flex items-center bg-surface-container py-xs px-sm rounded-lg">
                <Clock size={18} className="mr-sm text-primary" />
                Posted on {new Date(job.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-md md:p-xl grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <div className="lg:col-span-2">
            <h2 className="font-title-md text-primary mb-sm">Job Description</h2>
            <div className="font-body-md text-on-surface whitespace-pre-wrap leading-relaxed bg-surface-container-low p-md rounded-xl border border-outline-variant/50">
              {job.description}
            </div>
          </div>

          <div className="space-y-lg">
            <div>
              <h2 className="font-title-md text-primary mb-sm border-b border-outline-variant pb-xs">Contact Information</h2>
              <div className="space-y-sm mt-sm">
                <div className="flex items-center text-on-surface font-body-md">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center mr-sm">
                    <User size={20} />
                  </div>
                  <span className="font-medium">{job.contactName}</span>
                </div>
                <div className="flex items-center text-on-surface font-body-md">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mr-sm">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:${job.contactEmail}`} className="hover:text-primary transition-colors hover:underline">
                    {job.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-md border-t border-outline-variant">
              {isAuthenticated && (
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-xs text-error hover:bg-error-container hover:text-on-error-container border border-error/20 py-sm rounded-lg transition-colors font-label-md"
                >
                  <Trash2 size={18} />
                  Delete Request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
