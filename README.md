# Patient Directory - Next.js Application

A modern, responsive patient directory application built with Next.js 15, TypeScript, and TailwindCSS. This application provides both table and card views for managing patient data with advanced search, filtering, sorting, and pagination capabilities.

## 🚀 Features

- **Dual View Modes**: Switch between Table View and Card View
- **Advanced Search**: Search across patient names, medical issues, and email addresses
- **Smart Filtering**: Filter by medical issues and age
- **Flexible Sorting**: Sort by name, age, medical issue, or patient ID
- **Pagination**: Efficient data loading with pagination support
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Type Safety**: Full TypeScript implementation with strict typing
- **Modern UI**: Clean, professional interface with TailwindCSS
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Data**: Local JSON file (1000+ patient records)
- **State Management**: React useState and useEffect hooks
- **API**: Next.js Route Handlers

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/krVatsal/doctor-dashboard.git
cd doctor-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open the Application

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── patients/
│   │       └── route.ts          # API endpoint for patient data
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main patient directory page
public/
└── MOCK_DATA 1.json             # Patient data (1000+ records)
```

## 🏗️ Architecture Decisions

### 1. **Next.js App Router**
- **Choice**: Used the new App Router instead of Pages Router
- **Rationale**: Modern routing system with better performance, server components support, and improved developer experience
- **Benefits**: Automatic code splitting, better SEO, and streamlined data fetching

### 2. **TypeScript Implementation**
- **Choice**: Full TypeScript with strict typing
- **Rationale**: Enhanced code quality, better developer experience, and reduced runtime errors
- **Implementation**: 
  - Defined `Patient` interface for type safety
  - Proper typing for API responses and component props
  - Type-safe sorting and filtering operations

### 3. **Local API Endpoint**
- **Choice**: Created `/api/patients` route handler
- **Rationale**: Simulates real-world API integration while using local data
- **Features**:
  - Server-side pagination
  - Search functionality
  - Filtering and sorting
  - Proper error handling

### 4. **Component Architecture**
- **Choice**: Single-page application with state management
- **Rationale**: Simplified architecture for this scope while maintaining modularity
- **Structure**:
  - Client-side rendering for interactive features
  - Reusable utility functions
  - Clean separation of concerns

### 5. **Data Handling**
- **Choice**: JSON file in public directory
- **Rationale**: Easy to manage, version control, and modify
- **Benefits**: No database setup required, fast development iteration

### 6. **Styling Strategy**
- **Choice**: TailwindCSS with utility-first approach
- **Rationale**: Rapid development, consistent design system, and smaller bundle size
- **Implementation**:
  - Custom color scheme
  - Responsive design patterns
  - Component-level styling

### 7. **Search & Filter Implementation**
- **Choice**: Server-side processing with client-side state management
- **Rationale**: Better performance for large datasets and consistent UX
- **Features**:
  - Debounced search (can be implemented for performance)
  - Multiple filter criteria
  - Real-time updates

### 8. **Error Handling**
- **Choice**: Comprehensive error boundaries and loading states
- **Rationale**: Better user experience and debugging capabilities
- **Implementation**:
  - API error handling
  - Loading indicators
  - Graceful fallbacks

## 🔧 API Endpoints

### GET `/api/patients`

Retrieves patient data with support for pagination, search, filtering, and sorting.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Records per page (default: 20)
- `search` (string): Search term for name, medical issue, or email
- `medical_issue` (string): Filter by specific medical issue
- `age` (number): Filter by specific age
- `sort` (string): Sort field (patient_name, age, medical_issue, patient_id)
- `order` (string): Sort order (asc, desc)

**Response:**
```json
{
  "data": Patient[],
  "total": number,
  "page": number,
  "limit": number
}
```

## 🎨 UI/UX Features

### Table View
- Clean, professional table layout
- Sortable columns
- Responsive design
- Hover effects and visual feedback

### Card View
- Grid layout with patient cards
- Profile image placeholders
- Color-coded medical issue badges
- Contact information display

### Search & Filters
- Real-time search functionality
- Dropdown filters for medical issues
- Sort controls with visual indicators
- Clear filter options

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with large tables and grid layouts
- **Tablet**: Optimized layouts with adjusted spacing
- **Mobile**: Compact views with touch-friendly controls

## 🚀 Performance Optimizations

- **Pagination**: Reduces initial load time and memory usage
- **Server-side Processing**: Efficient data filtering and sorting
- **Type Safety**: Prevents runtime errors and improves performance
- **Optimized Imports**: Tree-shaking and code splitting

## 🔮 Future Enhancements

- **Debounced Search**: Reduce API calls during typing
- **Virtual Scrolling**: Handle larger datasets efficiently
- **Export Functionality**: CSV/PDF export capabilities
- **Advanced Filters**: Date ranges, multiple criteria
- **Patient Details Modal**: Detailed view for individual patients
- **Dark Mode**: Theme switching capability
- **Progressive Web App**: Offline functionality

## 🧪 Testing

The application includes:
- Type checking with TypeScript
- Runtime error handling
- API response validation
- UI state management testing

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. No additional configuration required

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Environment Variables

No environment variables are required for this application as it uses local data.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**
