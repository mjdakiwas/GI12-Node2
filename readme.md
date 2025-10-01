# 🎬 Movie Explorer App

Movie Explorer is a dynamic web application that allows users to search, browse, and interact with movie data from [The Movie Database (TMDb)](https://www.themoviedb.org/).  
The app showcases responsive front-end rendering, back-end processing, pagination, and categorization of movies.

---

## ✨ Core Functionality

-   🔍 **Search for Movies**  
    Instantly find movies by title and see results displayed on a clean results page.

-   ⭐ **Browse by Categories**  
    Explore movies from curated lists such as **Now Playing**, **Popular**, **Top Rated**, and **Upcoming**.

-   📄 **Paginated Results**  
    Results are split into pages so users can easily navigate large lists without overwhelming scrolling.

-   🎟 **Interactive Movie Cards**  
    Clickable movie cards that lead to dedicated routes for more details (in-progress expansion).

-   ⏳ **Smooth Experience**  
    Loading indicators and consistent card designs ensure a polished browsing experience.

---

## 🛠 Tech Stack

-   **Frontend:** HTML, CSS, JavaScript (CommonJS + Fetch API)
-   **Backend:** Node.js + Express
-   **API:** [The Movie Database (TMDb)](https://developer.themoviedb.org/)
-   **Utilities:** Custom `utils/` functions for categorizing and filtering movie fetches

---

## 🚀 Live Demo

👉 [**View Demo Here**](https://gi12-node2.onrender.com/)

---

## 📸 Preview

_(screenshot placeholder — insert image here)_  
![App Screenshot](screenshot-placeholder.png)

---

## ⚙️ Setup & Installation (For Developers)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

2. **Install dependencies**

```bash
npm install

```

3. **Set up environment variables**

-   Create a .env file in the root directory
-   Add your TMDb API key:
    `TMDB_API_KEY=your_api_key_here`

4. **Run the development server**

```bash
npm start
```

5. **Open in browser**

http://localhost:3000

## ⚖️ Disclaimer

This project uses the TMDb API, but is **not endorsed or certified by TMDb**.
It is intended for **educational and portfolio purposes only**.
