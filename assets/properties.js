// Properties data - in a real application, this would come from a database
const propertiesData = [
    {
        id: 1,
        title: "Luxury Villa with Ocean View",
        price: 1250000,
        location: "Beverly Hills",
        type: "villa",
        bedrooms: 5,
        bathrooms: 4,
        area: 4200,
        status: "new",
        description: "Stunning luxury villa with panoramic ocean views, featuring modern amenities and spacious living areas.",
        image: "[Property Image 1]"
    },
    {
        id: 2,
        title: "Modern Downtown Condo",
        price: 750000,
        location: "Downtown LA",
        type: "condo",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        status: "sold",
        description: "Contemporary condo in the heart of downtown with city views and premium finishes.",
        image: "[Property Image 2]"
    },
    {
        id: 3,
        title: "Family Home with Garden",
        price: 850000,
        location: "Pasadena",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        status: "new",
        description: "Charming family home with a beautiful garden, perfect for comfortable family living.",
        image: "[Property Image 3]"
    },
    {
        id: 4,
        title: "Beachfront Apartment",
        price: 950000,
        location: "Santa Monica",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        area: 1500,
        status: "new",
        description: "Luxurious beachfront apartment with direct access to the beach and stunning ocean views.",
        image: "[Property Image 4]"
    },
    {
        id: 5,
        title: "Hillside Mansion",
        price: 3200000,
        location: "Malibu",
        type: "villa",
        bedrooms: 6,
        bathrooms: 5,
        area: 5800,
        status: "pending",
        description: "Magnificent hillside mansion with infinity pool and breathtaking coastal views.",
        image: "[Property Image 5]"
    },
    {
        id: 6,
        title: "Urban Loft",
        price: 650000,
        location: "Hollywood",
        type: "apartment",
        bedrooms: 1,
        bathrooms: 1,
        area: 1200,
        status: "new",
        description: "Stylish urban loft with high ceilings and industrial-chic design in a vibrant neighborhood.",
        image: "[Property Image 6]"
    },
    {
        id: 7,
        title: "Commercial Space for Lease",
        price: 1500000,
        location: "Downtown LA",
        type: "commercial",
        bedrooms: 0,
        bathrooms: 2,
        area: 3500,
        status: "new",
        description: "Prime commercial space in a high-traffic downtown location, perfect for retail or offices.",
        image: "[Property Image 7]"
    },
    {
        id: 8,
        title: "Suburban Family Home",
        price: 720000,
        location: "Pasadena",
        type: "house",
        bedrooms: 3,
        bathrooms: 2,
        area: 2100,
        status: "sold",
        description: "Well-maintained family home in a quiet suburban neighborhood with excellent schools.",
        image: "[Property Image 8]"
    },
    {
        id: 9,
        title: "Penthouse with Rooftop Terrace",
        price: 1850000,
        location: "Beverly Hills",
        type: "condo",
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        status: "new",
        description: "Luxurious penthouse featuring a private rooftop terrace with panoramic city views.",
        image: "[Property Image 9]"
    },
    {
        id: 10,
        title: "Modern Townhouse",
        price: 890000,
        location: "Santa Monica",
        type: "house",
        bedrooms: 3,
        bathrooms: 2.5,
        area: 1900,
        status: "pending",
        description: "Contemporary townhouse with open floor plan and private outdoor space.",
        image: "[Property Image 10]"
    },
    {
        id: 11,
        title: "Luxury Apartment Complex",
        price: 4500000,
        location: "Hollywood",
        type: "commercial",
        bedrooms: 0,
        bathrooms: 0,
        area: 12000,
        status: "new",
        description: "Investment opportunity: luxury apartment complex with high rental demand.",
        image: "[Property Image 11]"
    },
    {
        id: 12,
        title: "Cozy Bungalow",
        price: 680000,
        location: "Pasadena",
        type: "house",
        bedrooms: 2,
        bathrooms: 1,
        area: 1400,
        status: "sold",
        description: "Charming bungalow with original character and updated kitchen and bathrooms.",
        image: "[Property Image 12]"
    }
];

// DOM elements
const propertiesContainer = document.getElementById('properties-container');
const categoryFilter = document.getElementById('category-filter');
const locationFilter = document.getElementById('location-filter');
const priceFilter = document.getElementById('price-filter');
const bedroomsFilter = document.getElementById('bedrooms-filter');
const statusFilter = document.getElementById('status-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const propertiesCount = document.getElementById('properties-count');
const paginationContainer = document.getElementById('pagination');

// Pagination settings
const propertiesPerPage = 6;
let currentPage = 1;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProperties();
    setupEventListeners();
});

// Set up event listeners for filters
function setupEventListeners() {
    categoryFilter.addEventListener('change', filterProperties);
    locationFilter.addEventListener('change', filterProperties);
    priceFilter.addEventListener('change', filterProperties);
    bedroomsFilter.addEventListener('change', filterProperties);
    statusFilter.addEventListener('change', filterProperties);
    resetFiltersBtn.addEventListener('click', resetFilters);
}

// Filter properties based on selected criteria
function filterProperties() {
    currentPage = 1; // Reset to first page when filtering
    displayProperties();
}

// Reset all filters
function resetFilters() {
    categoryFilter.value = 'all';
    locationFilter.value = 'all';
    priceFilter.value = 'all';
    bedroomsFilter.value = 'all';
    statusFilter.value = 'all';
    currentPage = 1;
    displayProperties();
}

// Display properties based on current filters and pagination
function displayProperties() {
    const filteredProperties = getFilteredProperties();
    const paginatedProperties = getPaginatedProperties(filteredProperties);
    
    // Update properties count
    propertiesCount.textContent = filteredProperties.length;
    
    // Clear container
    propertiesContainer.innerHTML = '';
    
    // Display properties
    if (paginatedProperties.length === 0) {
        propertiesContainer.innerHTML = '<div class="no-results"><p>No properties match your search criteria. Please try different filters.</p></div>';
    } else {
        paginatedProperties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            propertiesContainer.appendChild(propertyCard);
        });
    }
    
    // Update pagination
    updatePagination(filteredProperties.length);
}

// Get properties filtered by current criteria
function getFilteredProperties() {
    return propertiesData.filter(property => {
        // Category filter
        if (categoryFilter.value !== 'all' && property.type !== categoryFilter.value) {
            return false;
        }
        
        // Location filter
        if (locationFilter.value !== 'all') {
            const locationMap = {
                'beverly-hills': 'Beverly Hills',
                'downtown-la': 'Downtown LA',
                'pasadena': 'Pasadena',
                'santa-monica': 'Santa Monica',
                'malibu': 'Malibu',
                'hollywood': 'Hollywood'
            };
            
            if (property.location !== locationMap[locationFilter.value]) {
                return false;
            }
        }
        
        // Price filter
        if (priceFilter.value !== 'all') {
            const priceRanges = {
                '0-500000': property.price <= 500000,
                '500000-1000000': property.price > 500000 && property.price <= 1000000,
                '1000000-2000000': property.price > 1000000 && property.price <= 2000000,
                '2000000+': property.price > 2000000
            };
            
            if (!priceRanges[priceFilter.value]) {
                return false;
            }
        }
        
        // Bedrooms filter
        if (bedroomsFilter.value !== 'all' && property.bedrooms < parseInt(bedroomsFilter.value)) {
            return false;
        }
        
        // Status filter
        if (statusFilter.value !== 'all' && property.status !== statusFilter.value) {
            return false;
        }
        
        return true;
    });
}

// Get properties for current page
function getPaginatedProperties(properties) {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return properties.slice(startIndex, endIndex);
}

// Create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-status', property.status);
    
    // Format price with commas
    const formattedPrice = property.price.toLocaleString();
    
    // Status class and text
    let statusClass = '';
    let statusText = '';
    
    switch(property.status) {
        case 'new':
            statusClass = 'status-new';
            statusText = 'New Listing';
            break;
        case 'sold':
            statusClass = 'status-sold';
            statusText = 'Sold';
            break;
        case 'pending':
            statusClass = 'status-pending';
            statusText = 'Pending';
            break;
    }
    
    card.innerHTML = `
        <div class="property-img">
            ${property.image}
        </div>
        <div class="property-info">
            <span class="property-status ${statusClass}">${statusText}</span>
            <h3>${property.title}</h3>
            <div class="property-price">$${formattedPrice}</div>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i> ${property.location}
            </div>
            <p class="property-description">${property.description}</p>
            <div class="property-features">
                <div class="feature">
                    <i class="fas fa-bed"></i> ${property.bedrooms} Beds
                </div>
                <div class="feature">
                    <i class="fas fa-bath"></i> ${property.bathrooms} Baths
                </div>
                <div class="feature">
                    <i class="fas fa-ruler-combined"></i> ${property.area} sqft
                </div>
            </div>
            <div class="property-actions">
                <button class="btn btn-view-details" data-id="${property.id}">View Details</button>
                <button class="btn btn-accent btn-schedule-tour" data-id="${property.id}">Schedule Tour</button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const viewDetailsBtn = card.querySelector('.btn-view-details');
    const scheduleTourBtn = card.querySelector('.btn-schedule-tour');
    
    viewDetailsBtn.addEventListener('click', () => viewPropertyDetails(property.id));
    scheduleTourBtn.addEventListener('click', () => scheduleTour(property.id));
    
    return card;
}

// View property details (placeholder function)
function viewPropertyDetails(propertyId) {
    alert(`Viewing details for property #${propertyId}. In a real application, this would open a detailed property page.`);
}

// Schedule a tour (placeholder function)
function scheduleTour(propertyId) {
    alert(`Scheduling tour for property #${propertyId}. In a real application, this would open a contact form.`);
}

// Update pagination controls
function updatePagination(totalProperties) {
    const totalPages = Math.ceil(totalProperties / propertiesPerPage);
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.className = 'pagination-btn';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayProperties();
        });
        paginationContainer.appendChild(prevButton);
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayProperties();
        });
        paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.className = 'pagination-btn';
        nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayProperties();
        });
        paginationContainer.appendChild(nextButton);
    }
}