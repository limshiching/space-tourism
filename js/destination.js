const destinations = {
    moon: {
      name: "Moon",
      image: "../assets/destination/image-moon.png",
      description:
        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      distance: "384,400 KM",
      travel: "3 DAYS",
    },
    mars: {
      name: "Mars",
      image: "../assets/destination/image-mars.png",
      description: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      distance: "225 MIL. KM",
      travel: "9 MONTHS",
    },
    europa: {
      name: "Europa",
      image: "../assets/destination/image-europa.png",
      description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      distance: "628 MIL. KM",
      travel: "3 YEARS",
    },
    titan: {
      name: "Titan",
      image: "../assets/destination/image-titan.png",
      description: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      distance: "1.6 BIL. KM",
      travel: "7 YEARS",
    },
  };


const img = document.getElementById("planet-img");
const nameEl = document.getElementById("planet-name");
const desc = document.getElementById("planet-description");
const distanceEl = document.getElementById("planet-distance");
const travelEl = document.getElementById("planet-travel");
const tabs = document.querySelectorAll("[data-destination]");

function renderDestination(key) {
  const data = destinations[key];

  if (!data) return;

  img.src = data.image;
  img.alt = data.name;

  nameEl.textContent = data.name;
  desc.textContent = data.description;
  distanceEl.textContent = data.distance;
  travelEl.textContent = data.travel;
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.destination;

    tabs.forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");

    renderDestination(key);
  });
});

renderDestination("moon");