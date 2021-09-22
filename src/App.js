import React from 'react';
import './App.css';
import {useForm} from 'react-hook-form';

function App() {
    const {handleSubmit, formState: {errors}, register, watch} = useForm();

    const selectedReferrer = watch('found-through');

    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-container">
                    <fieldset>
                        <legend>Gegevens</legend>
                        <label htmlFor="name">Naam
                            <input
                                type="text"
                                placeholder=""
                                {...register("name", {
                                    required: "Naam mag niet leeg zijn",
                                    validate: {
                                        value: (value) => value.includes('@'),
                                        message: "Naam mag geen @ bevatten",
                                    },
                                })}
                            />
                        </label>
                        {errors.name && <p>{errors.name.message}</p>}

                        <label htmlFor="age">Leeftijd
                            <input
                                type="number"
                                placeholder="0"
                                {...register("age", {
                                    max: {
                                        value: 80,
                                        message: "U mag maximaal 80 jaar oud zijn",
                                    }
                                })}
                            />
                        </label>
                        {errors.age && <p>{errors.age.message}</p>}
                    </fieldset>
                </div>

                <div className="form-container">
                    <fieldset>
                        <legend>Jouw review</legend>
                        <label htmlFor="comments">Opmerkingen:
                            <textarea
                                {...register("comments", {
                                    required: "Opmerking mag niet leeg zijn",
                                    maxLength: {
                                        value: 50,
                                        message: "Er mogen maximaal 50 karakters gebruikt worden",
                                    },
                                })}
                                rows="4"
                                cols="35"
                                placeholder="Wat vond je van het recept?"
                            />
                        </label>
                        {errors.comments && <p>{errors.comments.message}</p>}

                        <input
                            type="checkbox"
                            {...register("newsletter")}
                        />
                        Ik schrijf me in voor de nieuwsbrief

                        <label htmlFor="referrer">
                            Hoe heb je dit recept gevonden?
                            <select id="referrer" {...register("found-through")} >
                                <option value="google">Google</option>
                                <option value="friend">Vriend</option>
                                <option value="advertisement">Advertentie</option>
                                <option value="other">Anders</option>
                            </select>
                        </label>

                        {selectedReferrer === "other" &&
                        <input
                            type="text"
                            {...register("found-through-anders")}
                        />
                        }

                        <button
                            type="submit"
                        >
                            Verstuur
                        </button>
                    </fieldset>
                </div>

            </form>
        </>
    );
}

export default App;
