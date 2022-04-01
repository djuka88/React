// ovo je moj custom hook, koji koristi druge hookse
import { useState, useEffect } from "react";

const localCache = {};

export function useBreedList(animal){
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(()=>{
        if(!animal){
            setBreedList([]);
        }
        else if(localCache[animal]){
            setBreedList(localCache[animal]);
        }
        else{
            requestBreedList();
        }
    

        async function requestBreedList(){
            setBreedList([]);

            setStatus("loading");

            const site = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;
            const res=await fetch(site);

            const json = await res.json();

            console.log(json);

            localCache[animal]=json.breeds || []; // ovo prazan string se stavlja u slucaju da se nista ne vrati da padne server

            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    },[animal])

    return [breedList,status];
}