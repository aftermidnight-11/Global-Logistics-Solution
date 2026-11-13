import { useState, useEffect, useCallback, useId, type FormEvent } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { postJson, getJson, putJson, patchJson, deleteJson } from '@/api/client';
import './AdminPage.css';

export type InquiryItem = {
  _id: string;
  name: string;
  phone: string;
  companyName?: string;
  inquiryType: string;
  message?: string;
  sourcePage?: string;
  status: string;
  createdAt: string;
  attachments?: Array<{
    filename: string;
    url: string;
    data?: string;
    size?: number;
    mime?: string;
  }>;
};

export type CareerItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  roleTitle?: string;
  coverLetter?: string;
  status: string;
  createdAt: string;
  cvFile?: {
    filename?: string;
    url?: string;
    size?: number;
    mime?: string;
  };
};

export type BlogItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  createdAt?: string;
};

type SectionType = 'dashboard' | 'inquiries' | 'careers' | 'blog';

export function AdminPage() {
  const [token, setToken] = useState<string>(() => localStorage.getItem('harborline_admin_token') || '');
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<SectionType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null);
  const [blogModal, setBlogModal] = useState<{ open: boolean; item: Partial<BlogItem> | null }>({
    open: false,
    item: null,
  });

  const formId = useId();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('harborline_admin_token');
    localStorage.removeItem('harborline_auth_token');
    localStorage.removeItem('harborline_user');
    window.dispatchEvent(new Event('storage'));
    setToken('');
    navigate('/login');
  }, [navigate]);

  const authHeaders = useCallback(() => {
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  const loadAllData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setFeedback(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [inqData, carData, blogData] = await Promise.all([
        getJson<InquiryItem[]>('/admin/api/inquiries', headers),
        getJson<CareerItem[]>('/admin/api/careers', headers),
        getJson<BlogItem[]>('/admin/api/blog', headers),
      ]);
      setInquiries(inqData);
      setCareers(carData);
      setBlogs(blogData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch data';
      if (msg.includes('401') || msg.toLowerCase().includes('token') || msg.toLowerCase().includes('unauthorized')) {
        handleLogout();
        setFeedback({ type: 'error', text: 'Session expired. Please log in again.' });
      } else {
        setFeedback({ type: 'error', text: msg });
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (token) {
      loadAllData();
    }
  }, [token, loadAllData]);

  // Derived stats
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const resolvedInquiries = inquiries.filter((i) => i.status === 'resolved').length;
  const newCareers = careers.filter((c) => c.status === 'new').length;
  const inquiryTypes = inquiries.reduce<Record<string, number>>((acc, i) => {
    acc[i.inquiryType] = (acc[i.inquiryType] || 0) + 1;
    return acc;
  }, {});

  // Inquiry actions
  async function updateInquiryStatus(id: string, newStatus: string) {
    try {
      await patchJson(`/admin/api/inquiries/${id}`, { status: newStatus }, authHeaders());
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry?._id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setFeedback({ type: 'success', text: 'Inquiry status updated successfully.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update status';
      setFeedback({ type: 'error', text: msg });
    }
  }

  async function deleteInquiry(id: string) {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteJson(`/admin/api/inquiries/${id}`, authHeaders());
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
      setFeedback({ type: 'success', text: 'Inquiry deleted.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete inquiry';
      setFeedback({ type: 'error', text: msg });
    }
  }

  // Career actions
  async function updateCareerStatus(id: string, newStatus: string) {
    try {
      await patchJson(`/admin/api/careers/${id}`, { status: newStatus }, authHeaders());
      setCareers((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedCareer?._id === id) {
        setSelectedCareer((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      setFeedback({ type: 'success', text: 'Application status updated.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update status';
      setFeedback({ type: 'error', text: msg });
    }
  }

  async function deleteCareer(id: string) {
    if (!window.confirm('Are you sure you want to delete this career application?')) return;
    try {
      await deleteJson(`/admin/api/careers/${id}`, authHeaders());
      setCareers((prev) => prev.filter((c) => c._id !== id));
      if (selectedCareer?._id === id) setSelectedCareer(null);
      setFeedback({ type: 'success', text: 'Application deleted.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete application';
      setFeedback({ type: 'error', text: msg });
    }
  }

  // Blog actions
  async function saveBlogPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get('title') as string) || '';
    const slug = (formData.get('slug') as string) || '';
    const excerpt = (formData.get('excerpt') as string) || '';
    const content = (formData.get('content') as string) || '';
    const publishedAt = (formData.get('publishedAt') as string) || '';
    const author = (formData.get('author') as string) || '';

    const editingId = blogModal.item?._id;

    try {
      if (editingId) {
        const res = await putJson<{ success: boolean; post: BlogItem }>(
          `/admin/api/blog/${editingId}`,
          { title, slug, excerpt, content, publishedAt, author },
          authHeaders()
        );
        setBlogs((prev) => prev.map((p) => (p._id === editingId ? res.post : p)));
        setFeedback({ type: 'success', text: 'Blog post updated successfully.' });
      } else {
        const res = await postJson<{ success: boolean; post: BlogItem }>(
          '/admin/api/blog',
          { title, slug, excerpt, content, publishedAt, author },
          authHeaders()
        );
        setBlogs((prev) => [res.post, ...prev]);
        setFeedback({ type: 'success', text: 'Blog post created successfully.' });
      }
      setBlogModal({ open: false, item: null });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save blog post';
      setFeedback({ type: 'error', text: msg });
    }
  }

  async function deleteBlogPost(id: string) {
    if (!window.confirm('Are you sure you want to permanently delete this blog post?')) return;
    try {
      await deleteJson(`/admin/api/blog/${id}`, authHeaders());
      setBlogs((prev) => prev.filter((p) => p._id !== id));
      setFeedback({ type: 'success', text: 'Blog post deleted.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete blog post';
      setFeedback({ type: 'error', text: msg });
    }
  }

  // Filtered views
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      (item.companyName && item.companyName.toLowerCase().includes(search.toLowerCase())) ||
      item.inquiryType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredCareers = careers.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.roleId.toLowerCase().includes(search.toLowerCase()) ||
      (item.roleTitle && item.roleTitle.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const filteredBlogs = blogs.filter((item) => {
    return (
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (!token) {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  const currentUser = (() => {
    try {
      const raw = localStorage.getItem('harborline_user');
      return raw ? (JSON.parse(raw) as { name?: string; email?: string }) : null;
    } catch {
      return null;
    }
  })();

  const navItems: { id: SectionType; icon: string; label: string }[] = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { id: 'inquiries', icon: '✉️', label: 'Messages' },
    { id: 'careers', icon: '👤', label: 'Careers & Resumes' },
    { id: 'blog', icon: '✏️', label: 'Blog & CMS' },
  ];

  const navigate_to = (section: SectionType) => {
    setActiveSection(section);
    setSearch('');
    setStatusFilter('all');
    setSidebarOpen(false);
  };

  return (
    <>
      <PageMeta title="Admin Dashboard" description="Internal Operations Dashboard" path="/admin" />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="admin-layout">
        {/* ── SIDEBAR ── */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
          <div className="admin-sidebar__brand">
            <span className="admin-sidebar__brand-icon">⚓</span>
            <span className="admin-sidebar__brand-name">Global Logistics</span>
          </div>

          <nav className="admin-sidebar__nav" aria-label="Admin navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`admin-sidebar__link ${activeSection === item.id ? 'admin-sidebar__link--active' : ''}`}
                    onClick={() => navigate_to(item.id)}
                  >
                    <span className="admin-sidebar__icon">{item.icon}</span>
                    <span>{item.label}</span>
                    {item.id === 'inquiries' && newInquiries > 0 && (
                      <span className="admin-sidebar__badge">{newInquiries}</span>
                    )}
                    {item.id === 'careers' && newCareers > 0 && (
                      <span className="admin-sidebar__badge">{newCareers}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="admin-sidebar__footer">
            <Link
              to="/"
              className="admin-sidebar__link"
              style={{ color: '#9cb9c3', marginBottom: '0.25rem' }}
            >
              <span className="admin-sidebar__icon">🌐</span>
              <span>View Website</span>
            </Link>
            <button
              type="button"
              className="admin-sidebar__link admin-sidebar__link--logout"
              onClick={handleLogout}
            >
              <span className="admin-sidebar__icon">⏻</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div className="admin-topbar__left">
              <button
                type="button"
                className="admin-topbar__hamburger"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              <h1 className="admin-topbar__title">
                {navItems.find((n) => n.id === activeSection)?.label ?? 'Dashboard'}
              </h1>
            </div>
            <div className="admin-topbar__right">
              <div className="admin-topbar__search">
                <span className="admin-topbar__search-icon">🔍</span>
                <input
                  type="search"
                  placeholder="Search records…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="admin-topbar__icon-btn"
                onClick={loadAllData}
                disabled={loading}
                title="Refresh data"
              >
                {loading ? '⟳' : '↻'}
              </button>
              <div className="admin-topbar__user">
                <div className="admin-topbar__avatar">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="admin-topbar__user-info">
                  <span className="admin-topbar__user-name">
                    {currentUser?.name || 'Admin User'}
                  </span>
                  <span className="admin-topbar__user-email">
                    {currentUser?.email || 'admin@global-logisticssolution.com'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`admin-alert admin-alert--${feedback.type}`}>
              <span>{feedback.text}</span>
              <button
                type="button"
                className="admin-alert__close"
                onClick={() => setFeedback(null)}
              >
                ×
              </button>
            </div>
          )}

          {/* ── DASHBOARD SECTION ── */}
          {activeSection === 'dashboard' && (
            <div className="admin-content">
              {/* Stat cards */}
              <div className="admin-stat-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-card__icon admin-stat-card__icon--blue">📋</div>
                  <div className="admin-stat-card__body">
                    <div className="admin-stat-card__num">{inquiries.length}</div>
                    <div className="admin-stat-card__label">Total Inquiries</div>
                  </div>
                  <div className="admin-stat-card__wave" />
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-card__icon admin-stat-card__icon--orange">🔔</div>
                  <div className="admin-stat-card__body">
                    <div className="admin-stat-card__num">{newInquiries}</div>
                    <div className="admin-stat-card__label">New Inquiries</div>
                  </div>
                  <div className="admin-stat-card__wave" />
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-card__icon admin-stat-card__icon--green">✅</div>
                  <div className="admin-stat-card__body">
                    <div className="admin-stat-card__num">{resolvedInquiries}</div>
                    <div className="admin-stat-card__label">Resolved</div>
                  </div>
                  <div className="admin-stat-card__wave" />
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-card__icon admin-stat-card__icon--teal">👤</div>
                  <div className="admin-stat-card__body">
                    <div className="admin-stat-card__num">{careers.length}</div>
                    <div className="admin-stat-card__label">Applications</div>
                  </div>
                  <div className="admin-stat-card__wave" />
                </div>
              </div>

              {/* Charts row */}
              <div className="admin-charts-row">
                {/* Bar chart — Inquiry Statistics */}
                <div className="admin-chart-card">
                  <div className="admin-chart-card__head">
                    <h3>Inquiry Statistics</h3>
                    <span className="admin-chart-card__sub">By service type</span>
                  </div>
                  <div className="admin-bar-chart">
                    {Object.entries(inquiryTypes).length === 0 ? (
                      <div className="admin-empty">No inquiry data yet.</div>
                    ) : (
                      Object.entries(inquiryTypes).map(([type, count]) => {
                        const max = Math.max(...Object.values(inquiryTypes));
                        const pct = max > 0 ? (count / max) * 100 : 0;
                        return (
                          <div key={type} className="admin-bar-chart__item">
                            <div className="admin-bar-chart__label">{type}</div>
                            <div className="admin-bar-chart__track">
                              <div
                                className="admin-bar-chart__fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="admin-bar-chart__count">{count}</div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Donut chart — Inquiry Types */}
                <div className="admin-chart-card">
                  <div className="admin-chart-card__head">
                    <h3>Inquiry Status</h3>
                    <span className="admin-chart-card__sub">Distribution overview</span>
                  </div>
                  <div className="admin-donut-wrap">
                    {/* CSS-only donut using conic-gradient */}
                    {(() => {
                      const newC = inquiries.filter((i) => i.status === 'new').length;
                      const emailedC = inquiries.filter((i) => i.status === 'emailed').length;
                      const resolvedC = inquiries.filter((i) => i.status === 'resolved').length;
                      const failedC = inquiries.filter((i) => i.status === 'failed_email').length;
                      const total = inquiries.length || 1;
                      const newPct = (newC / total) * 360;
                      const emailedPct = (emailedC / total) * 360;
                      const resolvedPct = (resolvedC / total) * 360;
                      const failedPct = (failedC / total) * 360;
                      const grad = `conic-gradient(
                        #3b82f6 0deg ${newPct}deg,
                        #10b981 ${newPct}deg ${newPct + emailedPct}deg,
                        #14b8a6 ${newPct + emailedPct}deg ${newPct + emailedPct + resolvedPct}deg,
                        #f59e0b ${newPct + emailedPct + resolvedPct}deg ${newPct + emailedPct + resolvedPct + failedPct}deg,
                        #e5e7eb ${newPct + emailedPct + resolvedPct + failedPct}deg 360deg
                      )`;
                      return (
                        <div className="admin-donut" style={{ background: grad }}>
                          <div className="admin-donut__hole">
                            <span className="admin-donut__total">{inquiries.length}</span>
                            <span className="admin-donut__label">Total</span>
                          </div>
                        </div>
                      );
                    })()}
                    <ul className="admin-donut-legend">
                      <li><span className="admin-donut-legend__dot" style={{ background: '#3b82f6' }} />New</li>
                      <li><span className="admin-donut-legend__dot" style={{ background: '#10b981' }} />Emailed</li>
                      <li><span className="admin-donut-legend__dot" style={{ background: '#14b8a6' }} />Resolved</li>
                      <li><span className="admin-donut-legend__dot" style={{ background: '#f59e0b' }} />Failed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent inquiries table */}
              <div className="admin-recent-card">
                <div className="admin-recent-card__head">
                  <h3>Recent Inquiries</h3>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}
                    onClick={() => navigate_to('inquiries')}
                  >
                    View All →
                  </button>
                </div>
                <div className="admin-table-container">
                  {inquiries.length === 0 ? (
                    <div className="admin-empty">No inquiries yet.</div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Inquiry Type</th>
                          <th>Company</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 5).map((row) => (
                          <tr key={row._id}>
                            <td>
                              <div className="admin-table__name-cell">
                                <div className="admin-table__avatar">
                                  {row.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <strong>{row.name}</strong>
                                  <br />
                                  <small style={{ color: 'var(--text-muted)' }}>{row.phone}</small>
                                </div>
                              </div>
                            </td>
                            <td><span className="admin-badge">{row.inquiryType}</span></td>
                            <td>{row.companyName || '—'}</td>
                            <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                              {new Date(row.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <span className={`status-pill status-pill--${row.status}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── INQUIRIES SECTION ── */}
          {activeSection === 'inquiries' && (
            <div className="admin-content">
              <div className="admin-section-toolbar">
                <div className="admin-section-toolbar__filters">
                  <select
                    className="admin-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="emailed">Emailed / In Review</option>
                    <option value="resolved">Resolved / Actioned</option>
                    <option value="failed_email">Email Failed</option>
                  </select>
                </div>
                <div className="admin-section-toolbar__info">
                  Showing {filteredInquiries.length} of {inquiries.length} inquiries
                </div>
              </div>

              <div className="admin-table-container">
                {filteredInquiries.length === 0 ? (
                  <div className="admin-empty">No inquiries found matching your filters.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Inquiry Type</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Attachments</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((row) => (
                        <tr key={row._id}>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            {new Date(row.createdAt).toLocaleDateString()}{' '}
                            <small style={{ color: 'var(--text-muted)' }}>
                              {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                          </td>
                          <td>
                            <div className="admin-table__name-cell">
                              <div className="admin-table__avatar">
                                {row.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong>{row.name}</strong>
                                <br />
                                <a
                                  href={`https://wa.me/${row.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ fontSize: '0.82rem' }}
                                >
                                  {row.phone}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-badge">{row.inquiryType}</span>
                          </td>
                          <td>{row.companyName || '—'}</td>
                          <td>
                            <select
                              className={`status-pill status-pill--${row.status}`}
                              value={row.status}
                              onChange={(e) => updateInquiryStatus(row._id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="emailed">Emailed</option>
                              <option value="resolved">Resolved</option>
                              <option value="failed_email">Failed Email</option>
                            </select>
                          </td>
                          <td>
                            {row.attachments && row.attachments.length > 0 ? (
                              <span style={{ fontWeight: 600 }}>{row.attachments.length} file(s)</span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td>
                            <div className="admin-table__actions">
                              <button
                                type="button"
                                className="btn btn--ghost btn--sm"
                                onClick={() => setSelectedInquiry(row)}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn btn--danger btn--sm"
                                onClick={() => deleteInquiry(row._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ── CAREERS SECTION ── */}
          {activeSection === 'careers' && (
            <div className="admin-content">
              <div className="admin-section-toolbar">
                <div className="admin-section-toolbar__filters">
                  <select
                    className="admin-filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="emailed">Emailed</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="admin-section-toolbar__info">
                  Showing {filteredCareers.length} of {careers.length} applications
                </div>
              </div>

              <div className="admin-table-container">
                {filteredCareers.length === 0 ? (
                  <div className="admin-empty">No job applications found matching your filters.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Candidate</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Resume / CV</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCareers.map((row) => (
                        <tr key={row._id}>
                          <td style={{ whiteSpace: 'nowrap' }}>
                            {new Date(row.createdAt).toLocaleDateString()}{' '}
                            <small style={{ color: 'var(--text-muted)' }}>
                              {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </small>
                          </td>
                          <td>
                            <div className="admin-table__name-cell">
                              <div className="admin-table__avatar">
                                {row.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong>{row.name}</strong>
                                <br />
                                <a href={`mailto:${row.email}`} style={{ fontSize: '0.82rem' }}>
                                  {row.email}
                                </a>{' '}
                                · <span style={{ fontSize: '0.82rem' }}>{row.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{row.roleTitle || row.roleId}</strong>
                          </td>
                          <td>
                            <select
                              className={`status-pill status-pill--${row.status}`}
                              value={row.status}
                              onChange={(e) => updateCareerStatus(row._id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="emailed">Emailed</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td>
                            {row.cvFile?.url ? (
                              <a
                                href={row.cvFile.url}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-attachment-link"
                              >
                                Download CV ↗
                              </a>
                            ) : (
                              'No CV attached'
                            )}
                          </td>
                          <td>
                            <div className="admin-table__actions">
                              <button
                                type="button"
                                className="btn btn--ghost btn--sm"
                                onClick={() => setSelectedCareer(row)}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn btn--danger btn--sm"
                                onClick={() => deleteCareer(row._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ── BLOG SECTION ── */}
          {activeSection === 'blog' && (
            <div className="admin-content">
              <div className="admin-section-toolbar">
                <div className="admin-section-toolbar__filters" />
                <div className="admin-section-toolbar__info">
                  {filteredBlogs.length} of {blogs.length} posts
                </div>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() =>
                    setBlogModal({
                      open: true,
                      item: {
                        title: '',
                        slug: '',
                        author: 'Editorial Team',
                        publishedAt: new Date().toISOString().split('T')[0],
                        excerpt: '',
                        content: '',
                      },
                    })
                  }
                >
                  + New Blog Post
                </button>
              </div>

              <div className="admin-table-container">
                {filteredBlogs.length === 0 ? (
                  <div className="admin-empty">No blog posts found. Click "+ New Blog Post" above to publish one.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Slug / Link</th>
                        <th>Author</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((row) => (
                        <tr key={row._id}>
                          <td style={{ whiteSpace: 'nowrap' }}>{row.publishedAt}</td>
                          <td>
                            <strong>{row.title}</strong>
                            <br />
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                              {row.excerpt?.slice(0, 80)}…
                            </span>
                          </td>
                          <td>
                            <a
                              href={`/blog/${row.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '0.82rem' }}
                            >
                              /blog/{row.slug} ↗
                            </a>
                          </td>
                          <td>{row.author}</td>
                          <td>
                            <div className="admin-table__actions">
                              <button
                                type="button"
                                className="btn btn--ghost btn--sm"
                                onClick={() => setBlogModal({ open: true, item: row })}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn--danger btn--sm"
                                onClick={() => deleteBlogPost(row._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h3>Inquiry from {selectedInquiry.name}</h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setSelectedInquiry(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Status</div>
              <select
                className={`status-pill status-pill--${selectedInquiry.status}`}
                value={selectedInquiry.status}
                onChange={(e) => updateInquiryStatus(selectedInquiry._id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="emailed">Emailed</option>
                <option value="resolved">Resolved</option>
                <option value="failed_email">Failed Email</option>
              </select>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Contact Details</div>
              <div className="admin-detail-value">
                <strong>Name:</strong> {selectedInquiry.name} <br />
                <strong>Phone / WhatsApp:</strong>{' '}
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedInquiry.phone}
                </a>{' '}
                <br />
                <strong>Company:</strong> {selectedInquiry.companyName || 'None specified'} <br />
                <strong>Inquiry Service:</strong> {selectedInquiry.inquiryType} <br />
                <strong>Source Page:</strong> {selectedInquiry.sourcePage || 'Direct'}
              </div>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Message</div>
              <div className="admin-detail-box">
                {selectedInquiry.message || 'No written message provided.'}
              </div>
            </div>

            {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 && (
              <div className="admin-detail-row">
                <div className="admin-detail-label">Attachments ({selectedInquiry.attachments.length})</div>
                {selectedInquiry.attachments.map((att, idx) => {
                  const isImage = att.data || att.mime?.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/i.test(att.filename);
                  const imgSrc = att.data ? `data:${att.mime || 'image/jpeg'};base64,${att.data}` : att.url;
                  return (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <div className="admin-attachment-item">
                        <span>{att.filename}</span>
                        <a
                          href={imgSrc}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-attachment-link"
                          download={att.filename}
                        >
                          Download ↗
                        </a>
                      </div>
                      {isImage && (
                        <div style={{ marginTop: '0.4rem', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', maxWidth: '300px' }}>
                          <img
                            src={imgSrc}
                            alt={att.filename}
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => deleteInquiry(selectedInquiry._id)}
              >
                Delete Inquiry
              </button>
              <button type="button" className="btn btn--primary" onClick={() => setSelectedInquiry(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Detail Modal */}
      {selectedCareer && (
        <div className="admin-modal-overlay" onClick={() => setSelectedCareer(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h3>Application: {selectedCareer.name}</h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setSelectedCareer(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Role Applied</div>
              <div className="admin-detail-value">
                <strong>{selectedCareer.roleTitle || selectedCareer.roleId}</strong>
              </div>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Candidate Details</div>
              <div className="admin-detail-value">
                <strong>Email:</strong> <a href={`mailto:${selectedCareer.email}`}>{selectedCareer.email}</a> <br />
                <strong>Phone:</strong> {selectedCareer.phone} <br />
                <strong>Submitted:</strong> {new Date(selectedCareer.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="admin-detail-row">
              <div className="admin-detail-label">Cover Letter / Notes</div>
              <div className="admin-detail-box">
                {selectedCareer.coverLetter || 'No cover letter provided.'}
              </div>
            </div>

            {selectedCareer.cvFile?.url && (
              <div className="admin-detail-row">
                <div className="admin-detail-label">Curriculum Vitae (CV)</div>
                <div className="admin-attachment-item">
                  <span>{selectedCareer.cvFile.filename || 'Attached CV Document'}</span>
                  <a
                    href={selectedCareer.cvFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-attachment-link"
                  >
                    Download CV ↗
                  </a>
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => deleteCareer(selectedCareer._id)}
              >
                Delete Application
              </button>
              <button type="button" className="btn btn--primary" onClick={() => setSelectedCareer(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Editor Modal */}
      {blogModal.open && (
        <div className="admin-modal-overlay" onClick={() => setBlogModal({ open: false, item: null })}>
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h3>{blogModal.item?._id ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
              <button
                type="button"
                className="admin-modal__close"
                onClick={() => setBlogModal({ open: false, item: null })}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveBlogPost}>
              <div className="admin-form-group">
                <label htmlFor={`${formId}-post-title`}>Post Title *</label>
                <input
                  id={`${formId}-post-title`}
                  name="title"
                  required
                  defaultValue={blogModal.item?.title || ''}
                  onChange={(e) => {
                    if (!blogModal.item?._id) {
                      const generatedSlug = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      const slugInput = document.getElementById(`${formId}-post-slug`) as HTMLInputElement | null;
                      if (slugInput) slugInput.value = generatedSlug;
                    }
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label htmlFor={`${formId}-post-slug`}>Slug *</label>
                  <input
                    id={`${formId}-post-slug`}
                    name="slug"
                    required
                    defaultValue={blogModal.item?.slug || ''}
                    placeholder="e.g. cross-border-freight-trends"
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor={`${formId}-post-author`}>Author *</label>
                  <input
                    id={`${formId}-post-author`}
                    name="author"
                    required
                    defaultValue={blogModal.item?.author || 'Editorial Team'}
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor={`${formId}-post-date`}>Published Date *</label>
                  <input
                    id={`${formId}-post-date`}
                    name="publishedAt"
                    type="date"
                    required
                    defaultValue={blogModal.item?.publishedAt || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label htmlFor={`${formId}-post-excerpt`}>Excerpt / Summary</label>
                <textarea
                  id={`${formId}-post-excerpt`}
                  name="excerpt"
                  rows={2}
                  defaultValue={blogModal.item?.excerpt || ''}
                  placeholder="Short 1-2 sentence overview for cards and meta descriptions…"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor={`${formId}-post-content`}>Content (Full Text / Markdown) *</label>
                <textarea
                  id={`${formId}-post-content`}
                  name="content"
                  required
                  rows={10}
                  defaultValue={blogModal.item?.content || ''}
                  placeholder="Write post content here. Separate paragraphs with blank lines."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => setBlogModal({ open: false, item: null })}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {blogModal.item?._id ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
