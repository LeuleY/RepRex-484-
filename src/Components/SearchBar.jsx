import { useEffect, useState } from "react";
import '../ComponentCSS/SearchBar.css';
import { Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';

function SearchBar() {
    const apikey = "OkNEOkKX82avKszpBT2cVw==FGO3R5R2b3opoedm";
    const url = "https://api.api-ninjas.com/v1/exercises";
    const navigate = useNavigate();

    const [searchResultList, setSearchResultList] = useState([]);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debouncing logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Adjust debounce delay as needed

        return () => {
            clearTimeout(handler); // Clear timeout on query change
        };
    }, [query]);

    // Fetch data when debounced query changes
    useEffect(() => {
        const getExerciseData = async () => {
            if (!debouncedQuery) {
                setSearchResultList([]); // Clear results if query is empty
                return;
            }

            try {
                const response = await fetch(`${url}?name=${debouncedQuery}`, {
                    method: "GET",
                    headers: {
                        "X-Api-Key": apikey,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("API response issues detected");
                }

                const data = await response.json();
                setSearchResultList(data);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };

        getExerciseData();
    }, [debouncedQuery]);

    const handleClick = (exercise) => {
        localStorage.setItem(`${exercise.name}`, JSON.stringify(exercise))
        navigate(`/details/${exercise.name}`)

    }

    return (
        <div className="searchBarWrapper">
          
          <label id='searchBarLabel' htmlFor="SearchBar">Search Exercises</label>
            <input
                className="SearchBar"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

        

            <ul className="searchBarList">
                {searchResultList.map((exercise, index) => (
                    <li className="searchBarListItem" key={index} onClick={() => handleClick(exercise)}>
                        {exercise.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
