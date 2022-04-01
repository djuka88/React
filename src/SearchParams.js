import { useState, useEffect } from 'react';
import { useBreedList } from './useBreedList';
import Results from './Results'

const SearchParams = () =>{

    // ovako setujem hook
    // kako ovo tacno radi ne znam ali fora je da React radi render svaki put kada se nesto promeni

    //const [location, setLocation] = useState("Seatle, WA");

    // ovaj kod iznad je isti kao ovaj
    const locationTuple = useState("");
    const location = locationTuple[0];
    const setLocation = locationTuple[1];

    const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

    const [animal, setAnimal] = useState(""); // hook za animal
    const [breed, setBreed] = useState(""); // hook za breed
    const [pets, setPets] = useState([]); // lista petsa koje treba da dobijem od API-ja
    const [breeds] = useBreedList(animal); // takodje drugi parametar je status ali mi za sad ne treba

    // ovaj hook se izvrsava svaki put kada se desi
    useEffect(()=>{
        requestPets();
    },[animal]);

    async function requestPets(){

        const site = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;

        const res = await fetch(site);

        const json = await res.json();

        console.log(json);

        setPets(json.pets);
    }

    return(
        <div className="search-params">
            <form
            onSubmit={e=>{
                e.preventDefault(); // ovo sluzi da se forma ne bi submitovala 
                requestPets();
            }}
            >
                <label htmlFor="location">
                    Location
                        <input 
                            id="location" 
                            onChange={(e)=> setLocation(e.target.value)} 
                            value={location} 
                            placeholder="Location"
                        />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e)=> setAnimal(e.target.value)}
                        onBlur={(e)=> setAnimal(e.target.value)}
                    >
                        <option/>
                            {
                                // kada u arrow funkciji stavim obicne zagrade onda mi vraca sve sta je unutra
                                ANIMALS.map(animal=>(
                                    <option value={animal} key={animal}>
                                        {animal}
                                    </option>
                                ))
                            }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e)=> setBreed(e.target.value)}
                        onBlur={(e)=> setBreed(e.target.value)}
                    >
                        <option/>
                            {
                                // kada u arrow funkciji stavim obicne zagrade onda mi vraca sve sta je unutra
                                breeds.map(breed=>(
                                    <option value={breed} key={breed}>
                                        {breed}
                                    </option>
                                ))
                            }
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    )
}

export default SearchParams;