import { useState, useMemo, useCallback } from 'react';
import CarCard from '../components/CarCard';
import Icon from '../components/Icon';
import { useCars, useCategories } from '../api/cars';
import './Fleet.css';

export default function Fleet() {
  const carList = useCars();
  const categoryList = useCategories();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');

  const filteredCars = useMemo(() => {
    let result = [...carList];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q),
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.dailyRate - b.dailyRate);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.dailyRate - a.dailyRate);
    else if (sortBy === 'name') result.sort((a, b) => a.make.localeCompare(b.make));

    return result;
  }, [carList, search, selectedCategory, sortBy]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('');
  }, []);

  return (
    <main className="fleet-page">
      <div className="fleet-hero">
        <div className="container">
          <span className="section-badge">Our Collection</span>
          <h1>Choose Your Ride</h1>
          <p>From track-ready supercars to refined luxury cruisers</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        <div className="fleet-controls">
          <div className="fleet-search">
            <Icon name="filter" size={18} />
            <input
              type="text"
              placeholder="Search by make or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search vehicles"
            />
            {search && (
              <button
                className="fleet-clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="fleet-filters">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {categoryList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort vehicles"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>

            {(search || selectedCategory !== 'All' || sortBy) && (
              <button className="fleet-clear-btn" onClick={clearFilters}>
                <Icon name="close" size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="fleet-grid">
            {filteredCars.map((car, i) => (
              <CarCard key={car._id} car={car} index={i} />
            ))}
          </div>
        ) : (
          <div className="fleet-empty">
            <Icon name="car" size={48} />
            <h3>No vehicles found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
