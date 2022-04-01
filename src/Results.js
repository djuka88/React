import Pet from "./Pet"

// moze i props a ovo je kraci nacin
const Results = ({ pets }) => {
    
    return (
        <div className="search">
            {!pets.length ? (<h2>No pets found</h2>) : (
                pets.map((pet)=>(
                    <Pet
                        animal={pet.animal}
                        key={pet.key}  //ovo se valjda koristi samo zbog reacta
                        name={pet.name}
                        breed={pet.breed}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                        id={pet.id}
                    />
                ))
            )}
        </div>
    )
}

export default Results;