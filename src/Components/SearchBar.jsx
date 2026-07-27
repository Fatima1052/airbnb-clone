
import "./SearchBar.css";
import { useState, useRef, useEffect } from "react";






function SearchBar(){

    const searchRef = useRef(null);

    useEffect(() => {

    function handleClickOutside(event) {

        if (
            searchRef.current &&
            !searchRef.current.contains(event.target)
        ) {
            setActiveSection("");
        }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, []);


    const [activeSection, setActiveSection] = useState("");

    return(
<div
    className="search-container"
    ref={searchRef}
>
           <div
    className={`search-section ${activeSection === "where" ? "active" : ""}`}
    onClick={() => setActiveSection("where")}
>
                <h4>Where</h4>
                <p>Search destinations</p>
            </div>


            <div className="divider"></div>


           <div
    className={`search-section ${activeSection === "when" ? "active" : ""}`}
    onClick={() => setActiveSection("when")}
>
    <h4>When</h4>
    <p>Add dates</p>
</div>


            <div className="divider"></div>


           <div
    className={`search-section ${activeSection === "who" ? "active" : ""}`}
    onClick={() => setActiveSection("who")}
>
    <h4>Who</h4>
    <p>Add guests</p>
</div>


            <button className="search-button">
                🔍
            </button>


{activeSection === "where" && (

<div className="where-dropdown">

    <h4 className="dropdown-title">
        Suggested destinations
    </h4>

    <div className="destination-item">

        <div className="icon-box">📍</div>

        <div>

            <h5>Nearby</h5>

            <p>Find what's around you</p>

        </div>

    </div>

    <div className="destination-item">

        <div className="icon-box">🏙️</div>

        <div>

            <h5>Islamabad, Pakistan</h5>

            <p>For sights like Faisal Mosque</p>

        </div>

    </div>

    <div className="destination-item">

        <div className="icon-box">🌆</div>

        <div>

            <h5>Lahore, Pakistan</h5>

            <p>Historic city</p>

        </div>

    </div>

    <div className="destination-item">

        <div className="icon-box">🏔️</div>

        <div>

            <h5>Murree, Pakistan</h5>

            <p>Near you</p>

        </div>

    </div>

</div>

)}


{activeSection === "when" && (

<div className="when-dropdown">

    <div className="date-tabs">

        <button className="active-tab">
            Dates
        </button>

        <button>
            Flexible
        </button>

    </div>

    <div className="calendar">

        <div className="month">

            <h3>July 2026</h3>

            <div className="days">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>

<div className="dates">

    <span></span>
    <span></span>
    <span></span>

    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>

    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span>
    <span>11</span>

    <span>12</span>
    <span>13</span>
    <span>14</span>
    <span>15</span>
    <span>16</span>
    <span>17</span>
    <span>18</span>

    <span>19</span>
    <span>20</span>
    <span>21</span>
    <span>22</span>
    <span>23</span>
    <span>24</span>
    <span>25</span>

    <span>26</span>
    <span>27</span>
    <span>28</span>
    <span>29</span>
    <span>30</span>
    <span>31</span>

</div>


        </div>

        <div className="month">

            <h3>August 2026</h3>

            <div className="days">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>
<div className="dates">

    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>

    <span>1</span>

    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>

    <span>9</span>
    <span>10</span>
    <span>11</span>
    <span>12</span>
    <span>13</span>
    <span>14</span>
    <span>15</span>

    <span>16</span>
    <span>17</span>
    <span>18</span>
    <span>19</span>
    <span>20</span>
    <span>21</span>
    <span>22</span>

    <span>23</span>
    <span>24</span>
    <span>25</span>
    <span>26</span>
    <span>27</span>
    <span>28</span>
    <span>29</span>

    <span>30</span>
    <span>31</span>

</div>


        </div>

    </div>

</div>

)}



{activeSection === "who" && (

<div className="who-dropdown">

    <div className="guest-row">

        <div>
            <h4>Adults</h4>
            <p>Ages 13 or above</p>
        </div>

        <div className="counter">

            <button>-</button>

            <span>0</span>

            <button>+</button>

        </div>

    </div>

    <div className="guest-row">

        <div>
            <h4>Children</h4>
            <p>Ages 2–12</p>
        </div>

        <div className="counter">

            <button>-</button>

            <span>0</span>

            <button>+</button>

        </div>

    </div>

    <div className="guest-row">

        <div>
            <h4>Infants</h4>
            <p>Under 2</p>
        </div>

        <div className="counter">

            <button>-</button>

            <span>0</span>

            <button>+</button>

        </div>

    </div>

    <div className="guest-row">

        <div>
            <h4>Pets</h4>
            <p>Bringing a service animal?</p>
        </div>

        <div className="counter">

            <button>-</button>

            <span>0</span>

            <button>+</button>

        </div>

    </div>

</div>

)}




        </div>

    )

}

export default SearchBar;