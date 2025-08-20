"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Download,
  Eye,
  Phone,
  Mail,
  Calendar,
  Music,
  Check,
  X,
  Clock,
  Filter,
  Lock,
  EyeOff,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MembersPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Data state
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    revenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSongs, setFilterSongs] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Song mapping with complete details
  const songOptions = [
    { id: 'chuttamalle', name: 'Chuttamalle', time: '12:00 PM', style: 'Hip Hop Fusion' },
    { id: 'ramta-jogi', name: 'Ramta Jogi', time: '3:00 PM', style: 'Contemporary' },
    { id: 'chaudhary', name: 'Chaudhary', time: '5:00 PM', style: 'Bollywood' }
  ];

  const songNames = {
    chuttamalle: "Chuttamalle (12PM)",
    "ramta-jogi": "Ramta Jogi (3PM)",
    chaudhary: "Chaudhary (5PM)",
  };

  // Helper function to get selected songs display
  // Updated function to handle the selectedSongs properly
const getSelectedSongsDisplay = (selectedSongs, songCount) => {
  // Handle case where all 3 songs are selected
  if (songCount === 3) {
    return "All 3 Songs (Chuttamalle, Ramta Jogi, Chaudhary)";
  }

  // Handle case where selectedSongs is null or undefined
  if (!selectedSongs) {
    return "Not specified";
  }

  try {
    // Parse the JSON string from database
    let parsed;
    if (typeof selectedSongs === 'string') {
      parsed = JSON.parse(selectedSongs);
    } else {
      parsed = selectedSongs;
    }

    // Check if it's a valid array with items
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(songId => songNames[songId] || songId).join(", ");
    }
    
    return "Not specified";
  } catch (error) {
    console.error('Error parsing selectedSongs:', error, selectedSongs);
    return "Error parsing songs";
  }
};

  // Check authentication on load
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("stepup_admin_auth");
      if (auth === "authenticated") {
        setIsAuthenticated(true);
        fetchMembers();
      }
      setIsAuthLoading(false);
    };
    checkAuth();
  }, []);

  // Authentication handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");

    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "stepup2024";

    if (
      authForm.username === ADMIN_USERNAME &&
      authForm.password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("stepup_admin_auth", "authenticated");
      fetchMembers();
    } else {
      setAuthError("Invalid username or password");
      setAuthForm({ ...authForm, password: "" });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("stepup_admin_auth");
    setAuthForm({ username: "", password: "" });
    setMembers([]);
    setStats({ total: 0, paid: 0, pending: 0, revenue: 0 });
  };

  // Data fetching
  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register");
      if (response.ok) {
        const data = await response.json();
        console.log('Members data:', data);
        setMembers(data.registrations || []);
        setStats(data.stats || { total: 0, paid: 0, pending: 0, revenue: 0 });
      } else {
        console.error("Failed to fetch members");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchMembers();
    setIsRefreshing(false);
  };

  // Filter members based on search and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;
    const matchesSongs =
      filterSongs === "all" || member.songs.toString() === filterSongs;

    return matchesSearch && matchesStatus && matchesSongs;
  });

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <Check className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Mark member as paid
  const handleMarkAsPaid = async (memberId) => {
    try {
      const response = await fetch("/api/register", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: memberId,
          status: "paid",
          transactionId: `TXN${Date.now()}${Math.random()
            .toString(36)
            .substr(2, 5)
            .toUpperCase()}`,
          paymentMethod: "upi",
        }),
      });

      if (response.ok) {
        await fetchMembers();
      } else {
        alert("Failed to update payment status");
      }
    } catch (error) {
      console.error("Failed to update member status:", error);
      alert("Error updating payment status");
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Age",
        "Experience",
        "Songs",
        "Selected Songs",
        "Price",
        "Status",
        "Registered At",
        "Transaction ID",
      ],
      ...filteredMembers.map((member) => [
        member.name,
        member.email,
        member.phone,
        member.age,
        member.experience,
        member.songs,
        getSelectedSongsDisplay(member.selectedSongs, member.songs),
        member.price,
        member.status,
        new Date(member.registeredAt).toLocaleString(),
        member.transactionId || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anvi-shetty-workshop-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Loading screen
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Lock className="text-white" size={24} />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Anvi Shetty Workshop Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={authForm.username}
                onChange={(e) =>
                  setAuthForm({ ...authForm, username: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {authError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Default: admin / stepup2024</p>
            <Link
              href="/"
              className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block"
            >
              ← Back to Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link
                href="/"
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                ← Back to Website
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Workshop Members
            </h1>
            <p className="text-gray-600">
              Anvi Shetty Dance Workshop - September 21, 2024
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Registrations</div>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="mt-2 flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={isRefreshing ? "animate-spin" : ""}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Members</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.paid}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{stats.revenue.toLocaleString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Songs Filter */}
              <select
                value={filterSongs}
                onChange={(e) => setFilterSongs(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Packages</option>
                <option value="1">1 Song</option>
                <option value="2">2 Songs</option>
                <option value="3">3 Songs</option>
              </select>
            </div>

            {/* Export Button */}
            <motion.button
              onClick={exportToCSV}
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading members...</p>
          </div>
        ) : (
          <>
            {/* Members Cards - Mobile Friendly */}
            <div className="block lg:hidden space-y-4 mb-8">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Age: {member.age} • {member.experience}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        member.status
                      )}`}
                    >
                      {getStatusIcon(member.status)}
                      <span className="capitalize">{member.status}</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="break-all">{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Music className="w-4 h-4 text-orange-500" />
                        <span>
                          {member.songs} Song{member.songs > 1 ? "s" : ""} - ₹{member.price}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-6 bg-gray-50 p-2 rounded">
                        <strong>Songs:</strong> {getSelectedSongsDisplay(member.selectedSongs, member.songs)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(member.registeredAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      {member.status === "pending" && (
                        <button
                          onClick={() => handleMarkAsPaid(member.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Members Table - Desktop */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Member
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Package & Songs
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Registered
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers.map((member, index) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Age: {member.age} • {member.experience}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 break-all">
                                {member.email}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {member.phone}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Music className="w-4 h-4 text-orange-500" />
                              <span className="font-medium">
                                {member.songs} Song{member.songs > 1 ? "s" : ""}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded max-w-xs">
                              <strong>Selected:</strong><br />
                              {getSelectedSongsDisplay(member.selectedSongs, member.songs)}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-900">
                            ₹{member.price}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              member.status
                            )}`}
                          >
                            {getStatusIcon(member.status)}
                            <span className="capitalize">{member.status}</span>
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {new Date(member.registeredAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(member.registeredAt).toLocaleTimeString()}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            {member.status === "pending" && (
                              <button
                                onClick={() => handleMarkAsPaid(member.id)}
                                className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors"
                              >
                                Mark Paid
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No members found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Member Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedMember.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-gray-900 break-all">
                      {selectedMember.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedMember.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Age
                      </label>
                      <p className="text-gray-900">{selectedMember.age}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Experience
                      </label>
                      <p className="text-gray-900 capitalize">
                        {selectedMember.experience}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Package
                      </label>
                      <p className="text-gray-900">
                        {selectedMember.songs} Song
                        {selectedMember.songs > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Price
                      </label>
                      <p className="text-gray-900 font-bold">
                        ₹{selectedMember.price}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Selected Songs
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg mt-1">
                      <p className="text-gray-900 text-sm">
                        {getSelectedSongsDisplay(selectedMember.selectedSongs, selectedMember.songs)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedMember.status
                      )} mt-1`}
                    >
                      {getStatusIcon(selectedMember.status)}
                      <span className="capitalize">
                        {selectedMember.status}
                      </span>
                    </span>
                  </div>

                  {selectedMember.transactionId && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Transaction ID
                      </label>
                      <p className="text-gray-900 font-mono text-sm break-all">
                        {selectedMember.transactionId}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Registered At
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedMember.registeredAt).toLocaleString()}
                    </p>
                  </div>

                  {selectedMember.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Notes
                      </label>
                      <p className="text-gray-900">{selectedMember.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedMember.status === "pending" && (
                    <button
                      onClick={() => {
                        handleMarkAsPaid(selectedMember.id);
                        setSelectedMember(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}