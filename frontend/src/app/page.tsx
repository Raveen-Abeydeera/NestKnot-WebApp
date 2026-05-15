'use client';

import { useState, useEffect } from 'react';
import { getJobs, JobRequest } from '@/lib/api';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Filter, Search } from 'lucide-react';

import Image from 'next/image';

export default function Home() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<string>('Open');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs(category, status, search, sortBy, location);
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    fetchJobs();
  };

  const handleResetFilters = async () => {
    setCategory('');
    setStatus('Open');
    setSearch('');
    setSortBy('newest');
    setLocation('');
    setLoading(true);
    try {
      const data = await getJobs('', 'Open', '', 'newest', '');
      setJobs(data);
    } catch (error) {
      console.error('Failed to reset and fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'General Handyman'];

  return (
    <div className="w-full flex flex-col gap-xl">
      {/* Decorative background image sticking to the edge of the screen */}
      <div className="absolute top-[80px] lg:top-[100px] right-0 w-full lg:w-[90%] h-[500px] lg:h-[600px] opacity-[85%] lg:opacity-100 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 hidden lg:block"></div>
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-background to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 lg:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
        <Image
          src="/homepage.png"
          alt="NestKnot Services"
          fill
          className="object-cover object-top lg:object-right-top"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="w-full relative flex flex-col gap-md py-lg lg:py-xl mb-md">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display-lg text-primary text-[36px] leading-[44px] lg:text-[56px] lg:leading-[64px] font-bold max-w-[700px]"
        >
          Find the right hands for your home.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]"
        >
          Connect with trusted local tradespeople. From minor repairs to major renovations, browse active requests or list your own project today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-sm flex gap-sm"
        >
          <Link href="/jobs/new" className="bg-primary text-on-primary font-label-md text-label-md px-xl py-md rounded-lg hover:opacity-90 transition-all flex items-center gap-xs w-max shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
            Post a Job
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <div className="flex flex-col gap-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-xs font-bold">Active Requests</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Showing {jobs.length} jobs needing a trusted hand.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-sm items-start lg:items-center bg-surface-container-low p-sm rounded-xl border border-outline-variant shadow-sm w-full lg:w-auto">
            <div className="flex flex-wrap gap-sm items-center w-full lg:w-auto">
              <div className="relative flex-grow lg:flex-grow-0">
                <Search className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                  className="w-full lg:w-40 pl-[32px] pr-sm py-xs bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-sm"
                />
              </div>
              <div className="relative flex-grow lg:flex-grow-0">
                <MapPin className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                  className="w-full lg:w-32 pl-[32px] pr-sm py-xs bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-sm"
                />
              </div>
              <Filter size={18} className="text-primary ml-xs hidden lg:block" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-grow lg:flex-grow-0 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-grow lg:flex-grow-0 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-sm"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-grow lg:flex-grow-0 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-lg px-sm py-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-sm font-semibold text-primary"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
            </div>

            <div className="flex gap-sm w-full lg:w-auto mt-sm lg:mt-0 pt-sm lg:pt-0 border-t border-outline-variant lg:border-t-0 lg:border-l lg:pl-sm">
              <button
                onClick={handleResetFilters}
                className="flex-1 lg:flex-none text-on-surface-variant hover:text-error bg-surface-container-lowest border border-outline-variant hover:border-error px-sm py-xs rounded-lg transition-colors font-label-md text-sm"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 lg:flex-none bg-primary text-on-primary hover:opacity-90 px-md py-xs rounded-lg transition-colors font-label-md text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            <AnimatePresence>
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="bg-surface-container-lowest rounded-xl p-md border border-outline-variant shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-sm">
                      <span className="bg-primary-container text-on-primary-container px-sm py-xs rounded-full font-label-sm text-xs font-bold uppercase tracking-wider">
                        {job.category}
                      </span>
                      <span className={`px-sm py-xs rounded-full font-label-sm text-xs font-bold ${job.status === 'Open' ? 'bg-secondary-container text-on-secondary-container' : job.status === 'In Progress' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
                        {job.status}
                      </span>
                    </div>

                    <h3 className="font-title-md text-title-md text-primary mb-xs line-clamp-2">
                      {job.title}
                    </h3>

                    <p className="font-body-md text-body-md text-on-surface-variant mb-md line-clamp-3 flex-grow">
                      {job.description}
                    </p>

                    <div className="flex flex-col gap-xs mt-auto pt-sm border-t border-outline-variant">
                      <div className="flex items-center text-on-surface-variant font-label-md text-sm">
                        <MapPin size={16} className="mr-xs" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-on-surface-variant font-label-md text-sm">
                        <Clock size={16} className="mr-xs" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <Link href={`/jobs/${job._id}`} className="mt-md w-full bg-surface text-primary border border-primary font-label-md py-sm rounded-lg flex items-center justify-center gap-xs group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-xl text-center bg-surface-container rounded-xl border border-dashed border-outline"
                >
                  <p className="font-title-md text-title-md text-primary mb-xs">No jobs found</p>
                  <p className="text-on-surface-variant">Try adjusting your filters or checking back later.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
